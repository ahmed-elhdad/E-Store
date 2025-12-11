import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import { defaultInstance } from "../api/axiosInstant";

const Login = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [formData, setFormData] = useState({ email: "", password: "" }),
    [inputType, setInputType] = useState("password"),
    [loading, setLoading] = useState(false),
    [errors, setErrors] = useState({ email: "", password: "" }),
    emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/,
    [serverError, setServerError] = useState("");

  const validate = () => {
    if (!formData.email || !formData.email.match(emailRegex)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email" }));
      return false;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }
    // clear errors if valid
    setErrors({ email: "", password: "" });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const isValid = validate();
    if (!isValid) return;

    setLoading(true);
    try {
      const response = await defaultInstance.post(
        `${BASE_URL}/api/v1/auth/login`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      // Check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        setServerError("Feild to login");
        console.error("Non-JSON response:", text);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data || {};
        if (token) {
          localStorage.setItem("token", token);
        }
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        console.log("Login successful:", user || data);
        // Navigate to home page after successful login
        navigate("/");
      } else {
        setServerError(
          data?.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setServerError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              E-Store
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Welcome back to your store
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Server error */}
              {serverError && (
                <div className="text-red-600 text-sm pb-2">{serverError}</div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="emailField"
                  className="block text-gray-700 font-medium text-sm sm:text-base"
                >
                  Email Address
                </label>
                <input
                  id="emailField"
                  className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  type="email"
                  name="emailField"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <span className="px-1 font-medium capitalize text-red-600">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="passwordField"
                  className="block text-gray-700 font-medium text-sm sm:text-base"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="passwordField"
                    className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                    type={inputType}
                    name="passwordField"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition focus:outline-none"
                    onClick={togglePasswordVisibility}
                    type="button"
                    aria-label="Toggle password visibility"
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

              {/* Remember Me & Reset Password */}
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
              {/* Login Button */}
              <PrimaryButton type="submit" loading={loading} text="login" />
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-700 text-sm sm:text-base">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                Register Here
              </a>
            </p>
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-600 text-xs sm:text-sm mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
