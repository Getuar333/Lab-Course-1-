import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import { LindjeSector, PerendimSector, JugSector, VeriSector } from './Sector';

const SeatSelection = ({ sector, cart, setCart }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);
  const connectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7189/seatHub", { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.start()
      .then(() => console.log("SignalR Connected!"))
      .catch(err => console.error("SignalR Connection Error: ", err));

    connection.on("UpdateSeatStatus", (seatId, isLocked) => {
      setLockedSeats(prev => {
        if (isLocked && !prev.includes(seatId)) return [...prev, seatId];
        if (!isLocked) return prev.filter(s => s !== seatId);
        return prev;
      });
    });

    return () => {
      if (connectionRef.current) connectionRef.current.stop();
    };
  }, []);

  const currentSector = useMemo(() => {
    const s = sector.toLowerCase();
    if (s === 'lindje') return new LindjeSector();
    if (s === 'perendim') return new PerendimSector();
    if (s === 'jug') return new JugSector();
    if (s === 'veri') return new VeriSector();
    return null;
  }, [sector]);

  const seats = currentSector.getSeats();

  const toggleSeat = (seat) => {
    const isSelected = selectedSeats.includes(seat);
    const hubConnection = connectionRef.current;
    if (!hubConnection || hubConnection.state !== "Connected") return;

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
      hubConnection.invoke("DeselectSeat", seat.toString());
    } else if (!lockedSeats.includes(seat.toString())) {
      setSelectedSeats([...selectedSeats, seat]);
      hubConnection.invoke("SelectSeat", seat.toString());
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    const newItems = selectedSeats.map(seat => ({ seat, firstName: '', lastName: '', sector }));
    setCart([...cart, ...newItems]);
    navigate('/ffk-cart');
  };

  return (
    <div className="text-center h-[93.99vh] pt-18 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-600">Ulëset në Sektorin {currentSector.name}</h2>
      <div className="grid grid-cols-5 gap-4 justify-center mx-auto max-w-2xl mb-3">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat);
          const isLocked = lockedSeats.includes(seat.toString());

          let seatClass = 'bg-green-600 text-white hover:bg-green-700';
          if (isSelected) seatClass = 'bg-orange-400 text-white';
          if (isLocked) seatClass = 'bg-orange-400 text-white cursor-not-allowed';

          return (
            <div
              key={seat}
              className={`rounded-lg cursor-pointer p-3 relative transition-colors ${seatClass}`}
              onClick={() => !isLocked && toggleSeat(seat)}
            >
              {seat}
              <div className="text-xs mt-1">30 EUR</div>
            </div>
          );
        })}
      </div>
      {selectedSeats.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-600">Ulëset e zgjedhura:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedSeats.map(seat => (
              <span key={seat} className="bg-gray-200 px-3 py-1 rounded">{seat} - 30 EUR</span>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleContinue}
        disabled={selectedSeats.length === 0}
        className={`mt-6 px-10 py-2 rounded-2xl text-white ${selectedSeats.length === 0 ? 'bg-blue-300 cursor-not-allowed opacity-60' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        Vazhdo te Shporta
      </button>
    </div>
  );
};

export default SeatSelection;
