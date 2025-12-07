import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { useAuth } from "../api/hooks/useauth";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be 6+ chars" }),
});

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname.includes("register");
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputType, setInputType] = useState("password");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setErrors({});
    setServerError("");
  }, [isRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setErrors({});

    try {
      if (isRegister) {
        const parsed = registerSchema.parse(formData);
        register.mutate(parsed, {
          onSuccess(data) {
            if (data?.token) localStorage.setItem("token", data.token);
            if (data?.user)
              localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
          },
          onError(err) {
            setServerError(
              err?.response?.data?.message ||
                err.message ||
                "Registration failed"
            );
          },
        });
      } else {
        const parsed = loginSchema.parse(formData);
        login.mutate(parsed, {
          onSuccess(data) {
            if (data?.token) localStorage.setItem("token", data.token);
            if (data?.user)
              localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
          },
          onError(err) {
            setServerError(
              err?.response?.data?.message || err.message || "Login failed"
            );
          },
        });
      }
    } catch (zErr) {
      // zod error parsing
      const zIssues = zErr?.issues || [];
      const nextErrors = {};
      zIssues.forEach((issue) => {
        nextErrors[issue.path[0]] = issue.message;
      });
      setErrors(nextErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setInputType((t) => (t === "password" ? "text" : "password"));
  };

  const loading = isRegister ? register.isLoading : login.isLoading;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            E-Store
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {isRegister ? "Create your account" : "Welcome back to your store"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {serverError && (
              <div className="text-red-600 text-sm pb-2">{serverError}</div>
            )}

            {isRegister && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium text-sm sm:text-base"
                >
                  Name
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg outline-none transition border ${
                    errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Your name"
                  type="text"
                />
                {errors.name && (
                  <span className="px-1 font-medium capitalize text-red-600">
                    {errors.name}
                  </span>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium text-sm sm:text-base"
              >
                Email Address
              </label>
              <input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className={`w-full px-4 py-2 sm:py-3 rounded-lg outline-none transition border ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
                type="email"
              />
              {errors.email && (
                <span className="px-1 font-medium capitalize text-red-600">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium text-sm sm:text-base"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg outline-none transition border ${
                    errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Enter your password"
                  type={inputType}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {inputType === "password" ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="py-1 font-medium capitalize text-red-600">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-blue-500"
                />
                <span>Remember me</span>
              </label>
              <a
                href="/verifyemail"
                className="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Reset Password
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 sm:py-3 rounded-lg transition"
            >
              {loading
                ? isRegister
                  ? "Registering..."
                  : "Logging in..."
                : isRegister
                ? "Register"
                : "Log In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <p className="text-center text-gray-700 text-sm sm:text-base">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href={isRegister ? "/auth/login" : "/auth/register"}
              className="text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              {isRegister ? "Login Here" : "Register Here"}
            </a>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs sm:text-sm mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
