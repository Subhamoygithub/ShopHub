import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup'
import {
    FaGoogle,
    FaFacebookF,
    FaTwitter,
    FaApple,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
   
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required"),
});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await loginSchema.validate(formData, {
      abortEarly: false,
    });

    setErrors({});

    const response = await axios.post(
      "http://localhost:5000/api/exam/auth/login",
      formData
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    toast.success("Login Successful");

    if (response.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/products");
    }

  } catch (error) {

    if (error.name === "ValidationError") {

      const validationErrors = {};

      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });

      setErrors(validationErrors);

      return;
    }

    console.log(error);

    toast.error("Login Failed");
  }
};
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Side Image */}
                <div className="hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                        alt="Register"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side Form */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-blue-500 mb-2">
                        Sign in
                    </h1>

                    <p className="text-gray-400 mb-8">
                        Create your account in seconds
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>



                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            value={formData.email}
                            className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>



                        {/* Terms */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4"
                            />

                            <label
                                htmlFor="terms"
                                className="text-sm text-gray-500"
                            >
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                        </div>



                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-4 rounded-xl font-semibold"
                        >Login
                        </button>

                        {/* Login */}
                        <p className="text-center text-gray-500">
                            Create an account?{" "}
                           <Link to="/">
                            <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                                Register
                            </span>
                           </Link>
                        </p>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-300"></div>

                            <span className="text-sm text-gray-400">
                                Or continue with
                            </span>

                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-8 text-2xl">
                            <FaApple className="cursor-pointer hover:scale-110 transition" />
                            <FaGoogle className="cursor-pointer text-red-500 hover:scale-110 transition" />
                            <FaTwitter className="cursor-pointer text-sky-500 hover:scale-110 transition" />
                            <FaFacebookF className="cursor-pointer text-blue-600 hover:scale-110 transition" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;