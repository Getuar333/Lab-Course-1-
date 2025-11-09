import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/User/Register", {
        Name: name,
        Email: email,
        Password: password,
      });
      alert("Regjistrimi u krye me sukses! Kyçu tani.");
      navigate("/loginpage");
    } catch (err) {
      if (err.response?.data?.Result === "User already exists")
        setError("Ky përdorues ekziston");
      else setError("Ndodhi një gabim, provoni përsëri");
    }
  };
  return (
    <div className="h-[94vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Krijo një llogari</h2>
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Emri..." value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded" />
          <input type="email" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded" />
          <input type="password" placeholder="Fjalëkalimi..." value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Regjistrohu</button>
        </form>
        <div className="text-center mt-6">
          <Link to="/loginpage" className="text-blue-600 hover:underline text-sm">Keni llogari? Kyçu këtu!</Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
