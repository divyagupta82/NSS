import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Faqs from './components/Faqs';
import Home from './pages/Home';
import RequestHelp from './pages/RequestHelp';
import Login from './pages/Login';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminComponent from "./pages/Administration";
import Admin from './pages/Admin';
import Gallery from './components/Gallery';
import About from './pages/About';


import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import axios from "axios";
import useLocalStorage from "use-local-storage"; 
import NssInfo from './pages/About';

function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark] = useLocalStorage("isDark", preference);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getData");
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update login state if token is present
  }, []);
  
  // Show loading screen if data is still loading
  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <div className={`min-h-screen bg-gradient-to-br ${isDark ? 'from-gray-900 to-gray-800' : 'from-indigo-50 to-white'}`} data-theme={isDark ? "dark" : "light"}>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<NssInfo />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/administration" element={<AdminComponent />}/>
          <Route path="/admin" element={<Admin />} />

          <Route path="/gallery" element={<Gallery />} />
          
         
          <Route path="/request-help" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RequestHelp />
            </ProtectedRoute>
          } />
        </Routes>
        
        <Faqs />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
