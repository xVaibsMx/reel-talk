import React from "react";
import HeroBg from "../assets/HeroBg.webp";
import Logo from "../assets/Logo.svg";

const Hero = () => {
  return (
    <section className="h-[80vh] w-full relative overflow-hidden">
      {/* Hero Image */}
      <img
        src={HeroBg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Black Overlay */}
      <div className="absolute bg-black/70 inset-0 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-start px-6 md:px-12">
        <div className="max-w-3xl space-y-6">
          {/* Logo */}
          <img src={Logo} alt="Reel Talk Logo" className="h-28 w-auto" />

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to Reel-Talk
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 font-mono leading-relaxed">
            Discover. Review. Share your favorite movies. <br />
            Your ultimate movie review hub.
          </p>

          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pr-16 pl-6 py-4 rounded-full bg-gray-950 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in text-lg"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-400 hover:bg-orange-500 hover:text-white rounded-full p-1.5 transition duration-200 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16.65 16.65a7 7 0 111.414-1.414L21 21z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
