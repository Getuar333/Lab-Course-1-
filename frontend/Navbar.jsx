import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/loginpage");
  };

  return (
    <nav className="bg-gradient-to-r from-[#1e1e2f] to-[#2e3b9d] p-2 text-white flex justify-between items-center">
      <div className="flex space-x-6 text-lg font-semibold">
        <Link to={user ? "/home" : "/loginpage"} className="hover:text-yellow-300">Home</Link>
        <Link to={user ? "/biletat" : "/loginpage"} className="hover:text-yellow-300">Biletat</Link>
        <Link to={user ? "/ndeshjet" : "/loginpage"} className="hover:text-yellow-300">Ndeshjet</Link>
        <Link to={user ? "/info-ffk" : "/loginpage"} className="hover:text-yellow-300">Rreth Nesh</Link>
        <Link to={user ? "/ffk-shop" : "/loginpage"} className="hover:text-yellow-300">FFK SHOP</Link>
        <Link to={user ? "/ffk-cart" : "/loginpage"} className="hover:text-yellow-300">🛒Cart</Link>
      </div>

      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:scale-105 transition duration-100"
          >
            Dil
          </button>
        ) : (
          <button
            onClick={() => navigate("/loginpage")}
            className="bg-green-600 px-3 py-1 rounded hover:scale-105 transition duration-100"
          >
            Kyçu
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
