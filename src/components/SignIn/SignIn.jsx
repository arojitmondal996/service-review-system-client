import { NavLink, useNavigate } from "react-router-dom";
// import image from "../../assets/extra6.jpg";
import { AiOutlineGoogle } from "react-icons/ai";
import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from "../Authprovider/AuthProvider";

const SignIn = () => {
  const { handleGoogleLogin, handleLogin } = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleLogin(email, password)
      .then((res) => {
        navigate("/");
        toast("Successfully logged in!");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogle = () => {
    handleGoogleLogin().then(() => {
      navigate("/");
    });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide a valid email address");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent. Please check your inbox.");
        })
        .catch((err) => {
          alert("Error: " + err.message);
        });
    }
  };

  return (
    <div className="flex items-center w-11/12 mx-auto justify-center mt-10 mb-10 overflow-x-hidden">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row max-w-4xl w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        {/* <div className="hidden md:flex flex-1 bg-black">
          <img src={image} alt="Illustration" className="w-full h-full object-cover" />
        </div> */}

        {/* Form Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl text-white font-semibold text-center mb-6">Sign in</h2>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={handleGoogle}
              className="p-2 rounded-full bg-green-600 text-white text-2xl flex items-center justify-center hover:bg-green-500"
            >
              <AiOutlineGoogle />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gray-600 flex-1"></div>
            <span className="text-gray-400">Or</span>
            <div className="h-px bg-gray-600 flex-1"></div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Email Address</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-green-400 hover:underline text-sm"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-green-600 hover:underline">
              Register
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
