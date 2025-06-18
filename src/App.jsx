import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './Navbar/Navbar';
import AdminNavbar from'./Admin/AdminNavbar';
import AnimatedRouteWrapper from './AnimatedRouteWrapper';
import { useAuth } from './Auth/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Router>
        { isAuthenticated ? (<AdminNavbar />) : (<Navbar />)}
        <AnimatedRouteWrapper />
      </Router>
    </>
    
  );
}

export default App;
