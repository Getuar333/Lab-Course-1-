import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moneyImages from './money.png';
import payImages from './pay.png';
import masTCardImages from './card.png';
import creditCImages from './credit-card.png';

const CreditCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, passengerDetails = [], selectedSeats = [] } = location.state || {};

  const [successMsg, setSuccessMsg] = useState("");
  const handlePay = () => {
    setSuccessMsg("The payment was successful!");
    setTimeout(() => navigate("/home"), 3000);
  };
  return (
    <div className="max-w-xl mx-auto my-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center  text-gray-600">Pay with card</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePay();
        }}
      >
        <div className="mb-4">
          <label className="block font-semibold  text-gray-600">Email</label>
          <input type="text" required className="w-full border border-gray-300 rounded px-4 py-2"/>
        </div>
        

        <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-1">Card information</label>
          <div className="relative"></div>
           <input type="text" required className="w-full border border-gray-300 rounded px-3 py-1 pr-14" placeholder="1234 1234 1234 1234"/>
           <img src={moneyImages} alt="Money" className="absolute right-128 top-/3 transform -translate-y-2/2 w-8 h-8"/>
           <img src={payImages} alt="Paypal" className="absolute right-138 top-/3 transform -translate-y-2/2 w-8 h-8"/>
           <img src={masTCardImages} alt="MasterCard" className="absolute right-148 top-/3 transform -translate-y-2/2 w-8 h-8"/>
          </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2 pt-3 " placeholder="MM / YY"/>
          </div>
          <div>
            <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2 pt-3" placeholder="CVC "/>
            <img src={creditCImages} alt="CreditCard" className="absolute right-128 top-/3 transform -translate-y-2/2 w-8 h-11"/>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold  text-gray-600">Cardholder name</label>
          <input type="text" required className="w-full border border-gray-300 rounded px-4 py-2" placeholder="Full name on card"/>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-600">Country or region</label>
          <select required className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">Select your country</option>
            <option value="Kosova">Kosova</option>
            <option value="Shqiperia">Albania</option>
          </select>
        </div>
        <div className="text-right font-bold mb-6  text-gray-600">Pay: {total}€</div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Pay Now</button>
        {successMsg && (
        <div className="mt-3 py-2 p-2 text-green-700 bg-green-100 border border-green-200 rounded text-center">{successMsg}</div>
        )}
      </form>
    </div>
  );
};
export default CreditCard;