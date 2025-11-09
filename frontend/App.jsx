import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Stadium from "./Stadium";
import SeatSelection from "./SeatSelection";
import LoginForm from "./LoginForm";
import Signup from "./Signup";
import ForgotPass from "./ForgotPass";
import RrethNesh from "./Rreth Nesh";
import Ndeshjet from "./Ndeshjet";
import Cart from "./Cart";
import CreditCard from "./CreditCard";
import ProtectedRoute from "./ProtectedRoute";
import { UserProvider } from "./UserContext";

const SeatSelectionWrapper = ({ cart, setCart }) => {
  const location = useLocation();
  const sector = location.state?.sector || '';
  if (!sector) return <Stadium />;
  return <SeatSelection sector={sector} cart={cart} setCart={setCart} />;
};

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Private routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/biletat" element={<ProtectedRoute><SeatSelectionWrapper cart={cart} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/ndeshjet" element={<ProtectedRoute><Ndeshjet cart={cart} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/info-ffk" element={<ProtectedRoute><RrethNesh /></ProtectedRoute>} />
          <Route path="/ffk-cart" element={<ProtectedRoute><Cart cart={cart} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/credit-card" element={<ProtectedRoute><CreditCard /></ProtectedRoute>} />

          {/* Public routes */}
          <Route path="/loginpage" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
