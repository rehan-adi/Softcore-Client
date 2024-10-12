import { useCallback } from "react";
import { Loader } from 'lucide-react'
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupValidation } from "../validations/auth.validation";

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignupValidation),
    mode: "onSubmit"
  });

  const { onSubmit, loading } = useSignup();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    const success = await onSubmit(data);
    if (success) {
      navigate("/signin");
    }
  };


  const handleGoogleSignin = useCallback(() => {
    window.location.href = "http://localhost:3333/api/v1/auth/google";
  }, []);

  return (
    <div className="bg-black w-full max-h-fit relative pb-40 lg:pb-36 flex flex-col items-center">
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
      <form
        className="w-full mt-4 max-w-xs"
        onSubmit={handleSubmit(handleSignup)}
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border border-opacity-30 border-white rounded w-full py-3 px-3 bg-transparent text-white leading-tight focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            id="username"
            type="text"
            placeholder="Username"
            {...register('username')}
            disabled={loading}
            autoComplete="username"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border-opacity-30 border-white rounded w-full py-3 px-3 bg-transparent text-white leading-tight focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            id="fullname"
            type="text"
            placeholder="FullName"
            {...register('fullname')}
            disabled={loading}
            autoComplete="fullname"
          />
          {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border-opacity-30 border-white rounded w-full py-3 px-3 bg-transparent text-white leading-tight focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            id="email"
            type="email"
            placeholder="Email"
            {...register('email')}
            disabled={loading}
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border-opacity-30 border-white bg-transparent rounded w-full py-3 px-3 text-white mb-3 leading-tight focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
            disabled={loading}
            autoComplete="off"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="flex items-center mt-6 justify-between">
          <button
            className="text-black bg-white font-bold w-full py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader className="w-6 h-6 animate-spin mr-3 inline-block" /> : "Sign Up"}
          </button>
        </div>
      </form>
      <div className="text-white text-sm mt-7">
        Already have an account?{" "}
        <a href="/signin" className="underline">
          Sign in
        </a>
      </div>
      <div className="flex items-center my-4">
        <hr className="border-t border-opacity-15 border-white w-[137px] flex-grow" />
        <span className="text-gray-400 mx-3">or</span>
        <hr className="border-t border-opacity-15 border-white w-[137px]  flex-grow" />
      </div>
      <button
        className="bg-white w-full max-w-xs text-black font-semibold text-base py-3 px-3 rounded focus:outline-none focus:shadow-outline hover:opacity-80 mt-2 flex items-center justify-center"
        onClick={handleGoogleSignin}
        disabled={loading}
      >
        {loading ?
          <><Loader className="w-6 h-6 animate-spin mr-3 inline-block" /> <img
          src="/images/google.svg"
          alt="Google Logo"
          className="w-6 h-6 mr-4"
        />
        Continue with Google
       </>
          :
          <>
            <img
              src="/images/google.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-5"
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

export default Signup;
