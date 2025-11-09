import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import { UserContext } from "./UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/User/Authenticate", {
        Email: email,
        Password: password,
      });

      const { jwtToken, refreshToken } = response.data;
      localStorage.setItem("user", JSON.stringify({ email, token: jwtToken, refreshToken }));
      setUser({ email, token: jwtToken, refreshToken });

      navigate("/home");
    } catch (err) {
      setError("Email ose fjalëkalimi i gabuar");
    }
  };

  return (
    <div className="h-[94vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Kyçu</h2>
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded" />
          <input type="password" placeholder="Fjalëkalimi..." value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Kyçu</button>
        </form>
        <div className="text-center mt-6">
          <Link to="/signup" className="text-blue-600 hover:underline text-sm">Krijo një llogari</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

