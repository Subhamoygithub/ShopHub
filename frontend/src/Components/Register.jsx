import React, { useState } from "react";
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaApple,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileimage: null,
  });
  const [errors,srtErrors] = useState({})
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    profileimage: Yup.mixed().required("profileimage is Required"),

  })
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileimage" ? files[0] : value,
    })

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     srtErrors({});
    try {
      // setLoading(true);
        await validationSchema.validate(formData,{abortEarly:false});
      console.log("Form Submitted");
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("profileimage", formData.profileimage);

    
      

      const response = await axios.post(
        "http://localhost:5000/api/exam/auth/register", data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response.data);
      toast.success("Registration Successful")
      setFormData({});
      navigate("/login")
      

    } 
    
    catch (error) {
  if (error.name === "ValidationError") {
    const validationErrors = {};

    error.inner.forEach((err) => {
      validationErrors[err.path] = err.message;
    });

    srtErrors(validationErrors);

    return; //  stop
  }

  console.log(error);
 toast.error("Registration Failed");
  // setLoading(false);
}
  }

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
            Sign up
          </h1>

          <p className="text-gray-400 mb-8">
            Create your account in seconds
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Full Name */}
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.username}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}

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
            {/* Profile Image - LAST FIELD */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Profile Image
              </label>

              <input
                type="file"
                name="profileimage"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />
               {errors.profileimage && <div className="text-red-500 text-sm mt-1">{errors.profileimage}</div>}

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
            >
              Create an account
            </button>

            {/* Login */}
            <p className="text-center text-gray-500">
              Already a member?{" "}
              <Link to="/login">
                <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                  Log in
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

export default Register;