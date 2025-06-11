import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null); // null: unknown, object: logged in, false: guest
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(false);
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(false);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/");
  };

  if (loading) return null; // Or show a loading spinner

  return (
    <nav className="flex items-center justify-between px-6">
      {/* Logo */}
      <img
        src={Logo}
        alt="Reel Talk Logo"
        className="w-auto"
        onClick={() => navigate("/")}
      />

      {/* NavLinks */}
      <ul className="flex gap-5 text-lg font-mono">
        <li className="hover:text-amber-50 transition-all duration-100 ease-in hover:scale-105">
          About
        </li>
        <li
          className="hover:text-amber-50 transition duration-100 ease-in hover:scale-105"
          onClick={() => {
            navigate("/movies");
          }}
        >
          Movies
        </li>
        <li className="hover:text-amber-50 transition duration-100 ease-in hover:scale-105">
          {user ? "AddReviews" : "Reviews"}
        </li>
      </ul>

      {/* Right Side Buttons */}
      <div className="flex gap-3">
        {!user ? (
          <>
            <button
              className="bg-gray-950 text-orange-500 w-36 py-2 border-2 border-orange-500 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-white transition-all duration-200 ease-in font-mono"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="bg-gray-950 text-orange-500 w-36 py-2 border-2 border-orange-500 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-white transition-all duration-200 ease-in font-mono"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <span className=" px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </span>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 font-mono"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
