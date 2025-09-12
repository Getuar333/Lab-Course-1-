import React from "react";
import { Link } from "react-router-dom";

const LoginForm=()=>{
  return (
    <div className="h-[93.33vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Mirë se vini përsëri!</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input type="password" placeholder="Fjalëkalimi"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="accent-blue-600"/>
            <label htmlFor="remember" className="text-sm text-gray-700">Më mbaj mend</label>
          </div>
          <Link to="/home">
            <button type="button" className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded transition duration-200">Kyquni</button>
          </Link>
        </form>
        <div className="text-center mt-6 p-3 rounded-md shadow-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm block mb-1">Keni harruar fjalëkalimin?</Link>
          <Link to="/signup" className="text-blue-600 hover:underline text-sm">Krijo një llogari!</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
