import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import { UserContext } from "./UserContext";

const Cart = ({ cart, setCart, connection }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext); 
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (index, field, value) => {
    const updatedCart = [...cart];
    updatedCart[index][field] = value;
    setCart(updatedCart);
  };

  const handleRemove = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.length * 30;

  const mapSectorToEnum = (sectorName) => {
    switch (sectorName.toLowerCase()) {
      case "lindje":
        return 0;
      case "perendim":
        return 1;
      case "veri":
        return 2;
      case "jug":
        return 3;
      default:
        return 0;
    }
  };

  const handleCheckout = async () => {
    if (loading) return;
    if (!user?.userId || !user?.token) {
      setErrorMsg("Ju lutemi identifikohuni para blerjes.");
      return;
    }

    if (cart.length === 0) {
      setErrorMsg("Nuk keni bileta në karrocë.");
      return;
    }

    setSuccessMsg("");
    setErrorMsg("");

    const nameRegex = /^[a-zA-Z\s]+$/;

    for (const item of cart) {
      if (!item.firstName || !nameRegex.test(item.firstName)) {
        setErrorMsg(`Ju lutemi shkruani emër të vlefshëm për ulësën ${item.seat}`);
        return;
      }
      if (!item.lastName || !nameRegex.test(item.lastName)) {
        setErrorMsg(`Ju lutemi shkruani mbiemër të vlefshëm për ulësën ${item.seat}`);
        return;
      }
    }

    try {
      for (const item of cart) {
        const response = await API.post(
          "/TicketierAPI/Tickets/create",
          {
            UserId: user.userId,
            Time: new Date(),
            Sector: mapSectorToEnum(item.sector),
            SeatNumber: item.seat,
            Price: 30,
            SFirstName: item.firstName,
            SLastName: item.lastName,
            ISaSold: true,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (!response || response.status !== 200) {
          setErrorMsg(`Ulësja ${item.seat} është blerë tashmë ose ndodhi gabim.`);
          return;
        }

        if (connection && connection.state === "Connected") {
          await connection.invoke("SelectSeat", item.seat.toString());
        }
      }

      setSuccessMsg("Biletat u ruajtën me sukses!");
      setTimeout(() => {
        setCart([]);
        navigate("/credit-card");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Ndodhi një gabim gjatë ruajtjes së biletave. Provoni përsëri.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-600 mb-3">Karroca juaj</h2>

      {cart.length === 0 ? (
        <p className="text-center text-red-500">Nuk keni shtuar bileta.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="mb-4 border-b pb-6">
            <div className="mb-2 text-lg font-semibold text-gray-600">
              Seat {item.seat} in Sector {item.sector}
            </div>
            <div className="text-gray-600 mb-2">1 x 30 EUR</div>
            <div className="flex flex-wrap gap-4 mb-3">
              <div>
                <label className="w-40 text-gray-700 font-medium">First Name:</label>
                <input
                  type="text"
                  value={item.firstName}
                  onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="w-40 text-gray-700 font-medium">Last Name:</label>
                <input
                  type="text"
                  value={item.lastName}
                  onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <>
          <div className="text-right text-gray-600 font-bold mb-6">Total: {total} EUR</div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Buy Now
          </button>

          {successMsg && (
            <div className="mt-3 py-2 p-2 text-green-700 bg-green-100 border border-green-200 rounded text-center">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mt-3 py-2 p-2 text-red-700 bg-red-100 border border-red-200 rounded text-center">
              {errorMsg}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
