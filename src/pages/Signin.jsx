import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignin } from '../hooks/auth/useSignin';
import useAuthStore  from '../store/useAuthStore';
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninValidation } from "../validations/auth.validation";

function Signin() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SigninValidation),
    mode: "onSubmit"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signin, loading } = useSignin();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data) => {
    const success = await signin(data);
    if (success) {
      login();
      navigate("/");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignin = useCallback(() => {
    setGoogleLoading(true);
    window.location.href = "http://localhost:3333/api/v1/auth/google";
  }, []);

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center">
      <nav className="w-full flex py-12 justify-center items-center">
        <svg
          width="48"
          height="48"
          className="text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 187.47 94.63"
        >
          <g fill="currentColor">
            <polygon points="100.99 45.87 120.42 35.22 120.42 8.22 27.09 59.79 27.09 86.41 71.84 61.56 71.84 46.99 87.44 38.3 100.99 45.87"></polygon>
            <polygon points="0 87.63 12.61 94.54 24.29 88 24.29 36.9 0 23.26 0 87.63"></polygon>
            <polygon points="74.64 48.67 74.64 61.47 135.18 94.63 147.41 87.81 147.41 75.3 88.09 41.2 74.64 48.67"></polygon>
            <polygon points="70.91 32.42 12.05 0 0 6.63 0 20.18 46.43 45.96 70.91 32.42"></polygon>
            <polygon points="123.22 6.73 123.22 58.39 147.41 71.84 147.41 7.1 134.99 0.19 123.22 6.73"></polygon>
            <path d="M177.78,14.27c0-3.41-2.27-5.9-6.61-5.9h-7V25.53h4.21V19.81H171l2.88,5.72h4.69L174.85,19A5.14,5.14,0,0,0,177.78,14.27Zm-6.61,2.06h-2.84v-4h2.84c1.49,0,2.36.7,2.36,1.93C173.53,15.79,172.39,16.33,171.17,16.33Z"></path>
            <path d="M187.47,17.17a17,17,0,0,0-17-17h0a17,17,0,1,0,17,17Zm-16.9,14.09h-.12a14,14,0,1,1,.12,0Z"></path>
          </g>
        </svg>
      </nav>
      <form className="w-full mt-4 max-w-xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 relative">
          <input
            className="shadow appearance-none border border-opacity-30 border-white rounded-full w-full py-4 px-5 text-white leading-tight bg-[#1E1E1E] focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            type="email"
            placeholder="Email*"
            {...register('email')}
            disabled={loading}
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500 mt-3">{errors.email.message}</p>}
        </div>
        <div className="relative">
          <input
            className="shadow appearance-none border border-opacity-30 bg-[#1E1E1E] border-white  rounded-full w-full py-4 px-5 text-white leading-tight mb-3 focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            type={showPassword ? "text" : "password"}
            placeholder="Password*"
            {...register('password')}
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex mb-2.5 items-center px-3 text-white"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              < Eye />
            ) : (
              < EyeOff />
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <div className="flex items-center mt-6 justify-between">
          <button
            className='text-black bg-white font-bold w-full py-3 px-4 rounded-full focus:outline-none focus:shadow-outline'
            type='submit'
            disabled={loading}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin mr-3 inline-block" /> : "Sign In"}
          </button>
        </div>
      </form>
      <div className="text-white text-sm mt-7">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline">
          Sign up
        </a>
      </div>
      <div className="flex items-center my-4">
        <hr className="border-t border-opacity-15 border-white w-[137px] flex-grow" />
        <span className="text-gray-400 mx-3">or</span>
        <hr className="border-t border-opacity-15 border-white w-[137px]  flex-grow" />
      </div>
      <button
        className="bg-white w-full max-w-xs text-black hover:opacity-80 font-semibold text-base py-3 px-3 rounded-full focus:outline-none focus:shadow-outline mt-2 flex items-center justify-center"
        onClick={handleGoogleSignin}
        disabled={googleLoading}
      >
        {googleLoading ? 
        <>
        <Loader2 className="w-6 h-6 animate-spin mr-3 inline-block" />
        </>
          : <>
            <img
              src="/images/google.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-4"
            />
            Continue with Google
          </>
        }
      </button>
      <footer className="absolute bottom-8">
        <div className="text-white text-sm">
          <a href="/terms" className="hover:underline">
            Terms of Use
          </a>{" "}
          <span className="mx-5">|</span>{" "}
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Signin;
