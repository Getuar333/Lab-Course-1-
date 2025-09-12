import React from 'react';
import { Link } from 'react-router-dom';



const Signup=()=>{
  return(
    <div className="h-[93.33vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-lg rounded-xl p-12 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Krijoni llogarinë tuaj</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Emri dhe Mbiemri"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-blue-400" required />
          <input type="email" placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="password" placeholder="Fjalëkalimi"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded transition duration-200">Regjistrohu</button>
        </form>
        <div className="text-center mt-6 p-3 rounded-md shadow-sm">
          <p className="text-sm">Ke një llogari? <Link to="/loginpage" className="text-blue-600 hover:underline">Kyquni këtu</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
