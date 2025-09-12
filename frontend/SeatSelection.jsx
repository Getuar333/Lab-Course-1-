import React, {useState, useMemo} from 'react';
import{useNavigate} from 'react-router-dom';
import{
  LindjeSector,
  PerendimSector,
  JugSector,
  VeriSector,
}from './Sector';

const SeatSelection = ({sector, cart, setCart}) =>{
  const[selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const currentSector = useMemo(()=>{
    const s =sector.toLowerCase();
    if(s==='lindje') return new LindjeSector();
    else if(s=== 'perendim') return new PerendimSector();
    else if(s===  'jug') return new JugSector();
    else if (s==='veri') return new VeriSector();
    else return new DefaultSector(sector);
  },[sector]);
  const seats =currentSector.getSeats();
  const toggleSeat= (seat)=>{
    let alreadySelected =false;
    for(let i=0;i<selectedSeats.length;i++){
      if(selectedSeats[i]===seat){
        alreadySelected = true;
        break;
      }
    }
    if(alreadySelected){
      const newSelection= [];
      for(let i=0;i< selectedSeats.length;i++){
        if(selectedSeats[i] !== seat) {
          newSelection.push(selectedSeats[i]);
        }
      }
      setSelectedSeats(newSelection);
    }else{
      setSelectedSeats([...selectedSeats,seat]);
    }
  };
  const handleContinue=()=>{
    if(selectedSeats.length===0)return;
      const newItems=selectedSeats.map((seat)=>({seat,firstName:'',lastName:'',sector:sector,}));
    setCart([...cart, ...newItems]);
    navigate('/ffk-cart');
  };
  return(
    <div className="text-center min-h-[93.33vh] pt-29 px-30">
      <h2 className="text-2xl font-bold mb-6 text-gray-600">Seats in Sector {currentSector.name}</h2>
      <div className="grid grid-cols-5 gap-x-8 gap-y-4 justify-center mx-33 mb-6">
        {seats.map((seat)=>{
          let isSelected = false;
          for(let i=0;i<selectedSeats.length;i++){
            if(selectedSeats[i]=== seat){
              isSelected = true;
              break;
            }
          }
          const seatClass = isSelected? 'bg-orange-400 text-white' : 'bg-green-600 text-white';
          return(
            <div key={seat} className={`${seatClass} rounded-lg cursor-pointer p-3 relative`} onClick={() => toggleSeat(seat)}>{seat}
              <div className="text-sm mt-0">30 EUR</div>
            </div>
          );
        })}
      </div>
      {selectedSeats.length>0&&(
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-600">Selected Seats:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedSeats.map((seat)=>(
              <span key={seat} className="bg-gray-200 px-3 py-1 rounded">{seat} - 30 EUR
              </span>
            ))}
          </div>
        </div>
      )}
      <button onClick={handleContinue} disabled={selectedSeats.length === 0}className={`mt-6 px-10 py-2 rounded-2xl text-white ${
          selectedSeats.length=== 0? 'bg-blue-300 cursor-not-allowed opacity-60' : 'bg-blue-600 hover:bg-blue-700'}`}>Proceed to Cart</button>
    </div>
  );
};
export default SeatSelection;
