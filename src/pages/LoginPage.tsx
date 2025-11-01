import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, login } from "../redux/userSlice";
import type { AppDispatch } from "../redux/store";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (isSignup && !formData.name) e.name = "Name required";
    if (!formData.email) e.email = "Email required";
    if (!formData.password) e.password = "Password required";
    if (isSignup && formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isSignup) {
      dispatch(signup({ name: formData.name, email: formData.email, password: formData.password }));
      alert("Account created! Please login.");
      setIsSignup(false);
    } else {
      dispatch(login({ email: formData.email, password: formData.password }));
      const stored = localStorage.getItem("currentUser");
      if (stored) onNavigate("songs");
      else setErrors({ email: "Invalid credentials" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400">
      <form onSubmit={handleSubmit} className="bg-white/95 p-8 rounded-2xl backdrop-blur-lg shadow-2xl w-96 border-2 border-yellow-500">
        <h1 className="text-gray-800 text-3xl font-bold mb-6 text-center">{isSignup ? "Sign Up" : "Login"}</h1>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full shadow-md mb-3 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        )}
        {errors.name && <p className="text-red-300 text-sm mb-2">{errors.name}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full shadow-md mb-3 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
        {errors.email && <p className="text-red-300 text-sm mb-2">{errors.email}</p>}
        
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full shadow-md mb-3 p-3 rounded bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.password && <p className="text-red-300 text-sm mb-2">{errors.password}</p>}
        
        {isSignup && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full mb-3 p-3 shadow-md rounded-lg bg-white text-gray-800 placeholder-gray-400 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {errors.confirmPassword && <p className="text-red-300 text-sm mb-2">{errors.confirmPassword}</p>}
          </>
        )}

        <button
          type="submit"
          className="!bg-gray-200 text-yellow-400 shadow-md w-full py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors mt-2"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="!bg-gray-200 text-yellow-400 mt-4 hover:text-yellow-200 shadow-md transition-colors w-full text-center"
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;