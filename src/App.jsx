// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Blog from './components/Blog';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import BlogReadingPage from './pages/BlogReadingPage';
import { BlogProvider } from './context/BlogContext';
const App = () => {
  return (
    <BlogProvider>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<BlogReadingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/author-dashboard" 
            element={<Blog />} 

          />
        </Routes>
    </AuthProvider>
    </BlogProvider>
  );
};

export default App;

