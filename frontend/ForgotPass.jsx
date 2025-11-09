import React from 'react';
import { Link } from "react-router-dom";

const ForgotPass=()=>{
  return (
    <div className="h-[93.99vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-xl p-13 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Keni harruar fjalëkalimin?</h2>
        <form className="space-y-6">
          <div>
            <input type="email" className="w-full border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Shkruani email-in..." required/>
          </div>
          <div>
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">Dërgo të dhënat tuaja për verifikim</button>
        </form>
       <div className="text-center mt-6 p-3 rounded-md shadow-sm">
            <p className="text-sm">I dërguat të dhënat? <Link to="/loginpage" className="text-blue-600 hover:underline">Kyquni këtu</Link></p>
        </div>
      </div>
    </div>
  );
};
export default ForgotPass;
