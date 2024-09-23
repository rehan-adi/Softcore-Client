import axios from "axios";
import { useState } from "react";
import { Loader } from 'lucide-react'
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { setToken } from '../../utils/token'
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninValidation } from "../../validations/auth.validation";

function Signin() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SigninValidation),
    mode: "onChange"
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3333/api/v1/auth/signin", data,
        { withCredentials: true }
      );
      if (response.data.success) {
        const { token } = response.data;
        setToken(token)
        toast.success("Sign in successfull");
        navigate("/");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Error signing in:", error);
    }
    setLoading(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignin = () => {
    window.location.href = "http://localhost:3333/api/v1/auth/google";
  };

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
            className="shadow appearance-none border border-opacity-30 border-white rounded w-full py-3 px-3 bg-transparent text-white leading-tight focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
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
            className="shadow appearance-none border border-opacity-30 border-white bg-transparent rounded w-full py-3 px-3 text-white leading-tight mb-3 focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            type={showPassword ? "text" : "password"}
            placeholder="Password*"
            {...register('password')}
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-white"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 mb-2 w-5 hover:scale-110 duration-200 Svg-sc-ytk21e-0 izdURe"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                fill="white"
              >
                <path d="M6.703 7.382A6.073 6.073 0 0 0 6.113 10c0 3.292 2.614 6 5.887 6 3.273 0 5.886-2.708 5.886-6 0-.936-.211-1.825-.589-2.618.573.341 1.115.744 1.634 1.204.674.596 1.77 1.793 2.683 3.414-.913 1.62-2.01 2.818-2.683 3.414C17.037 17.093 14.833 18 12 18s-5.037-.907-6.931-2.586c-.674-.596-1.77-1.793-2.683-3.414.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204zM12 4C8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453C5.996 18.908 8.672 20 12 20c3.329 0 6.004-1.091 8.258-3.089.896-.794 2.3-2.353 3.38-4.453l.237-.458-.236-.458c-1.082-2.1-2.485-3.659-3.381-4.453C18.004 5.09 15.328 4 12 4zm0 2c2.125 0 3.886 1.77 3.886 4S14.125 14 12 14s-3.886-1.77-3.886-4S9.875 6 12 6z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 mb-2 hover:scale-110 duration-200 w-5 Svg-sc-ytk21e-0 izdURe"
                viewBox="0 0 24 24"
                role="img"
                fill="white"
                aria-hidden="true"
              >
                <path d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453.278.246.562.479.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002 3.248-3.248zM14.884 7.32l-5.57 5.57A4.035 4.035 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11.319 11.319 0 0 1-.957-.763C4.396 14.8
                
                18 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.073 6.073 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.503 16.503 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.22 13.22 0 0 1-3.08-.348l1.726-1.726c.435.05.886.074 1.354.074 2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.515 14.515 0 0 0-2.146-2.896z" />
                <path d="M17.843 10.729c-.328 2.755-2.494 4.956-5.24 5.24l5.24-5.24z" />
              </svg>
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
            {loading ? <><Loader className="w-5 h-5 animate-spin mr-3 inline-block" /> Signing In... </> : "Sign In"}
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
        className="bg-white w-full max-w-xs text-black hover:opacity-80 font-semibold text-base py-3 px-3 rounded focus:outline-none focus:shadow-outline mt-2 flex items-center justify-center"
        onClick={handleGoogleSignin}
      >
        <img
          src="/images/google.svg"
          alt="Google Logo"
          className="w-6 h-6 mr-4"
        />
        Continue with Google
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
