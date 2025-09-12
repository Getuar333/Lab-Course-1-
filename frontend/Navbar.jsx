import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
  return (
    <nav className="bg-gradient-to-r from-[#1e1e2f] to-[#2e3b9d] p-2 text-white flex justify-between items-center">
      <div className="flex space-x-6 text-lg font-semibold">
        <Link to="/home" className="hover:text-yellow-300">Home</Link>
        <Link to="/biletat" className="hover:text-yellow-300">Biletat</Link>
        <Link to="/ndeshjet" className="hover:text-yellow-300">Ndeshjet</Link>
        <Link to="/info-ffk" className="hover:text-yellow-300">Rreth Nesh</Link>
        <Link to="/ffk-shop" className="hover:text-yellow-300">FFK SHOP</Link>
        <Link to="/ffk-cart" className="hover:text-yellow-300 ">🛒Cart</Link>
      </div>
      <div className="ml-4">
        <Link to="/loginpage">
          <button className="bg-gradient-to-r from-white to-gray-300 text-blue-900 px-3 py-1 rounded shadow hover:scale-105 hover:shadow-lg transition duration-100">Kyçu</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
