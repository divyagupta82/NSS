import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, HandHeart, LogIn } from 'lucide-react';
import VignanLogo from '../assets/VIGNANLOGO.svg';
import useLocalStorage from "use-local-storage";
import { Toggle } from "../components/Toggle";
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your API URL

function Navbar({setIsLoggedIn, isLoggedIn}) {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  
  const navigate = useNavigate();

  // // Check for token in local storage on initial render
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setIsLoggedIn(!!token); // Set logged in state based on token presence
  // }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/user/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token'); // Remove the token from local storage
      setIsLoggedIn(false); // Update login state
      navigate('/'); // Redirect to home
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`backdrop-blur-lg sticky top-0 z-50 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white/80'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src={VignanLogo} alt="Vignan NSS Logo" className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
              <span className={`text-2xl font-bold bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-primary-600 to-accent-500'} bg-clip-text text-transparent`}>
                Helping Hands
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-primary-600 transition`}>
              <span>Home</span>
            </Link>

            <Link to="/about" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-primary-600 transition`}>
              <span>About</span>
            </Link>

            <Link to="/gallery" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-primary-600 transition`}>
              <span>Gallery</span>
            </Link>
            
            <Link to="/administration" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-primary-600 transition`}>
             
              <span>Administration</span>
            </Link>

            {/* {isUser ? (
              <Link to="/admin" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-primary-600 transition`}>
                <HandHeart className="h-5 w-5" />
                <span>Requested-Help</span>
              </Link>
            ) : ( */}
              <Link to="/request-help" className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} hover:text-primary-600 transition`}>
                <HandHeart className="h-5 w-5" />
                <span>Request Help</span>
              </Link>
            {/* )} */}

            {isLoggedIn ? (
            <button onClick={handleLogout} className={`flex items-center space-x-2 ${isDark ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-gradient-to-r from-primary-600 to-accent-500'} text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition duration-300`}>
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className={`flex items-center space-x-2 ${isDark ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-primary-600 to-accent-500'} text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition duration-300`}>
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}


            <div className="flex items-center">
              <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
