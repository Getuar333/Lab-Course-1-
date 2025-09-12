import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart= ({ cart, setCart })=>{
  const navigate = useNavigate();
  const handleInputChange = (index, field, value)=>{
    const updatedCart = [...cart];
    updatedCart[index][field] = value;
    setCart(updatedCart);
  };
  const handleRemove = (index) =>{
    const updatedCart = cart.filter((_, i)=>i!==index);
    setCart(updatedCart);
  };
  const total = cart.length *30;
  const handleCheckout=() =>{
    if (cart.length === 0)return;
    navigate('/credit-card',{
      state:{
        passengerDetails: cart,total,
      },
    });
  };
  return(
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-3xl font-bold text-center  text-gray-600 mb-3">Your Cart</h2>
      {cart.length===0?(
        <p className="text-center text-gray-500">You haven't added any tickets.</p>
      ):(
        cart.map((item, index)=>(
          <div key={index} className="mb-4 border-b pb-6">
            <div className="mb-2 text-lg font-semibold text-gray-600">Seat {item.seat} in Sector {item.sector}</div>
            <div className="text-gray-600 mb-2">1 x 30 EUR</div>
            <div className="flex items-center mb-3"> 
               <div>
                <label className="w-40 text-gray-700 font-medium">Seat First Name:</label>
                <input  type="text" value={item.firstName} onChange={(e) => handleInputChange(index, 'firstName', e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1"/>
                </div>
                <div>
                  <label className="w-40 text-gray-700 font-medium">Seat Last Name:</label>
                  <input  type="text" value={item.lastName} onChange={(e) => handleInputChange(index, 'lastName', e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1"/>
                </div>
              </div>
            <button className="mt-4 bg-red-500 text-white px-69 pt-1 rounded hover:bg-red-500" onClick={()=>handleRemove(index)}>Remove</button>
          </div>
        ))
      )}
      {cart.length>0&&(<><div className="text-right text-gray-600 font-bold mb-6">Total: {total} EUR</div>
          <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Buy now</button></>
      )}
    </div>
  );
};
export default Cart;
