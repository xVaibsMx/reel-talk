import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className=" flex items-center justify-between px-6">
      {/* Logo */}
      <img
        src={Logo}
        alt="Reel Talk Logo"
        className=" w-auto"
        onClick={() => {
          navigate("/");
        }}
      />
      {/* NavLinks */}
      <ul className=" flex gap-5 text-lg font-mono">
        <li className=" hover:text-amber-50 transition-all  duration-100 ease-in hover:scale-105">
          About
        </li>
        <li className="hover:text-amber-50 transition  duration-100 ease-in hover:scale-105">
          Movies
        </li>
        <li className=" hover:text-amber-50 transition duration-100 ease-in hover:scale-105">
          Reviews
        </li>
      </ul>
      {/* Buttons */}
      <div className=" flex gap-3">
        <button
          className=" bg-gray-950 text-orange-500 w-36 py-2 border-2 border-orange-500 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-white transition-all duration-200 ease-in font-mono"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
        <button
          className=" bg-gray-950 text-orange-500 w-36 py-2 border-2 border-orange-500 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-white transition-all duration-200 ease-in font-mono"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
