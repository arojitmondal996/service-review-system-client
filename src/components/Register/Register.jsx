import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authContext } from "../Authprovider/AuthProvider";

const Register = () => {
    const { handleRegister, handleGoogleLogin, manageProfile } = useContext(authContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        // if (password.length < 6) {
        //     setError("Password must be at least 6 characters.");
        //     return;
        // }

        // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password)) {
        //     setError("Password must include uppercase, lowercase, number, and special character.");
        //     return;
        // }

        handleRegister(email, password)
            .then(() => {
                manageProfile(name, photo);
                navigate("/");
            })
            .catch((err) => setError(err.message));
    };

    const handleGoogleLog = () => {
        handleGoogleLogin()
            .then(() => navigate("/"))
            .catch((err) => setError(err.message));
    };

    return (
        <div className="mt-10 mb-10 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 text-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={handleGoogleLog}
                        className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition"
                    >
                        <AiOutlineGoogle size={24} />
                    </button>
                </div>
                {/* <div className="text-center text-gray-400">Or</div> */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-sm">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                            placeholder="Enter photo URL"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-8 text-gray-400"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-full p-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
                >
                    Signup Now
                </button>
                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-green-500 hover:underline">
                        Sign In
                    </NavLink>
                </p>
            </form>
        </div>
    );
};

export default Register;