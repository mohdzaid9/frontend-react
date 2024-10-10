import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/products" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/products" />} />
        <Route path="/products" element={user ? <ProductList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
