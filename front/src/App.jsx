import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Header from './components/Header/Header';
import NosServices from './components/NosServices/NosServices';
import Apropos from './components/Apropos/Apropos';
import React from 'react';
import NosValeurs from './components/NosValeurs/NosValeurs';
import Portfolio from './components/Portfolio/Portfolio';
import NosClients from './components/NosClients/NosClients';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <div className="main-content">
              <Header />
              <main>
                <Apropos />
                <NosServices />
                <NosValeurs />
                <Portfolio />
                <NosClients />
                <Contact />
              </main>
            </div>
            <Footer />
          </>
        } />
        <Route path="/service/:id" element={
          <>
            <Navbar />
            <ServiceDetails />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;