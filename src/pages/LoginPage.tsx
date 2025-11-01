import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signup, login } from "../redux/userSlice";
import type { AppDispatch } from "../redux/store";
import { Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    setLoginError("");

    if (isSignup) {
      dispatch(
        signup({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );
      alert("Account created! Please login.");
      setIsSignup(false);
      reset();
    } else {
      dispatch(login({ email: data.email, password: data.password }));
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        onNavigate("songs");
      } else {
        setLoginError("Invalid credentials");
      }
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setLoginError("");
    reset();
  };

  return (
    <div className="min-h-screen flex py-[5vw] items-center justify-center bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400">
      <div className="flex items-center py-[2vw] w-[65vw] rounded-md justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-8 z-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div
                className="text-4xl w-[20vw] font-bold mb-2"
                style={{ fontFamily: "cursive" }}
              >
                Welcome to the world
              </div>
              <p className="text-sm italic">of our cherished music!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {isSignup && (
                <div>
                  <label className="block text-xs text-gray-500 uppercase mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: isSignup ? "Name is required" : false,
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className="w-full px-3 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent text-black"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-[0.8vw] text-gray-500 uppercase mb-2">
                  Mail
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-3 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent text-black"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
                {loginError && !errors.email && (
                  <p className="text-red-500 text-xs mt-1">{loginError}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-[0.8vw] text-gray-500 uppercase mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full px-3 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent text-black pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 focus:!outline-none active:!outline-none !border-none top-1/2 -translate-y-1/2 !bg-transparent text-gray-600 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {isSignup && (
                <div className="relative">
                  <label className="block text-xs text-gray-500 uppercase mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: isSignup ? "Please confirm your password" : false,
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="w-full px-3 border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent text-black pr-8"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-0 focus:!outline-none active:!outline-none !border-none !bg-transparent top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full !border-none !bg-yellow-500 text-black font-bold py-4 rounded-full hover:!text-gray-200 hover:!bg-yellow-600 transition-colors mt-6"
              >
                Continue
              </button>

              <div className="flex items-center gap-4 mt-6">
                <span className="text-sm" style={{ fontFamily: "cursive" }}>
                  Connect with Social
                </span>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100"
                >
                  <span className="text-lg font-bold">f</span>
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100"
                >
                  <span className="text-lg">🍎</span>
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100"
                >
                  <span className="text-lg font-bold">G</span>
                </button>
              </div>

              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-600 mt-4 hover:underline text-sm"
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign up"}
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-9xl mb-4">🎧</div>
              <p className="text-gray-600 italic">
                Enjoying music with headphones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;