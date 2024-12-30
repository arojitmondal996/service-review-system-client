import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../Authprovider/AuthProvider";

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setIsVisible(!isScrollingDown);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const loggedOutLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium text-white">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className="font-medium text-white">
          Services
        </NavLink>
      </li>
      <li>
        <Link to="/login" className="btn bg-teal-700 text-white rounded-full px-4 py-2">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="btn bg-green-800 text-white rounded-full px-4 py-2">
          Register
        </Link>
      </li>
    </>
  );

  const loggedInLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium text-white">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/service" className="font-medium text-white">
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/addService" className="font-medium text-white">
          Add Service
        </NavLink>
      </li>
      <li>
        <NavLink to="/myReviews" className="font-medium text-white">
          My Reviews
        </NavLink>
      </li>
      <li>
        <NavLink to="/myServices" className="font-medium text-white">
          My Services
        </NavLink>
      </li>
      <li>
        <div className="flex items-center gap-4">
          <img className="rounded-full w-10 h-10" src={user?.photoURL} alt="user" />
          <button
            onClick={handleLogout}
            className="btn bg-green-400 text-white rounded-full px-4 py-2"
          >
            Logout
          </button>
        </div>
      </li>
    </>
  );

  return (
    <nav
      className={`navbar flex justify-between bg-green-700 px-4 md:px-8 sticky transition-transform duration-300 z-[100] top-0 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <div className="text-white text-lg font-bold">LOGO</div>
        </Link>
      </div>

      {/* Navbar Links */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal text-white gap-4">
          {user?.email ? loggedInLinks : loggedOutLinks}
        </ul>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div className="dropdown lg:hidden">
        <button className="btn btn-warning" tabIndex={0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box"
        >
          {user?.email ? loggedInLinks : loggedOutLinks}
        </ul>
      </div>

      {/* Theme Toggle */}
      {/* <button
        onClick={toggleTheme}
        className={`px-2 py-1 text-xs text-white ${isDarkMode ? "bg-black" : "bg-green-400"} rounded-full`}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button> */}
    </nav>
  );
};

export default Navbar;
