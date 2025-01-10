import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-transparent fixed top-0 left-0 right-0 z-50 w-[98%] mx-auto transition-all duration-300 backdrop-blur-lg rounded-full border border-sky-400 shadow-lg m-4">
      <div className="flex justify-between items-center p-3">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-sky-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
            <img src="/logo.png" alt="SenseGrass Logo" className="w-8 h-8" />
          </div>
          <span className="text-white text-2xl font-semibold">SenseGrass</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-white text-lg">
          <a href="/" className="hover:text-sky-400 transition duration-300">Home</a>
          <a href="/ai-agronomist" className="hover:text-sky-400 transition duration-300">AI-Agronomist</a>
          <a href="/about-us" className="hover:text-sky-400 transition duration-300">About Us</a>
          <a href="/contact-us" className="hover:text-sky-400 transition duration-300">Contact Us</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gradient-to-br from-pink-400 via-sky-400 to-purple-500 text-white rounded-full hover:opacity-90 transition duration-300 shadow-md">
            Register
          </button>
          <button className="px-4 py-2 bg-gradient-to-br from-pink-400 via-sky-400 to-purple-500 text-white rounded-full hover:opacity-90 transition duration-300 shadow-md">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



