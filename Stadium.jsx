import React, { useState } from 'react';
import stadiumImage from './ffk-stadium.png';

const Stadium = ({ onSectorClick })=>{
  const [selectedSector, setSelectedSector] = useState('');

  const handleSectorClick = (sector)=>{
    setSelectedSector(sector);
  };

  const handleContinue = ()=>{
    if (selectedSector) {
      onSectorClick(selectedSector);
    }
  };
  return(
    <div className="h-[93.33vh]  pt-9 text-center font-sans bg-gradient-to-r from-[#1e1e2f] to-[#2e3b9d] text-gray-300">
      <h2 className="text-[23px] mb-[60px]">Ju lutem zgjidhni sektorin</h2>
      <div className="relative w-[780px] h-[400px] mx-auto rounded-[20px] bg-cover bg-center shadow-[0_10px_25px_rgba(45,45,45,0.5)] overflow-hidden" style={{ backgroundImage: `url(${stadiumImage})`, backgroundSize: '99%', backgroundPosition: 'center' }}>
        <div className="mt-[201px] ml-[139px] w-[83%] h-[1%]">⚽</div>
        <div className="absolute top-[6%] left-[26%] w-[46%] h-[10%] rounded-[60%_80%] skew-y-[1deg] cursor-pointer z-10 group" onClick={() => handleSectorClick('Lindje')}>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold text-gray-300 bg-[rgba(20,19,19,0.4)] px-2.5 py-1 rounded-[10px]">Lindje</span>
        </div>
        <div className="absolute bottom-[22%] left-[23%] w-[46%] h-[6%] rounded-[60%_80%] skew-y-[1deg] cursor-pointer z-10 group" onClick={() => handleSectorClick('Perendim')}>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold text-gray-300 bg-[rgba(20,19,19,0.4)] px-2.5 py-1 rounded-[10px]">Perendim</span>
        </div>
        <div className="absolute top-[38%] left-[-3%] w-[13%] h-[6%] [border-radius:90%_120%_9%_10%/400%_200%_70%_10%] rotate-[-63deg] cursor-pointer z-10 group" onClick={() => handleSectorClick('Veri')}>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold text-gray-300 bg-[rgba(20,19,19,0.4)] px-2.5 py-1 rounded-[10px]">Veri</span>
        </div>
        <div className="absolute top-[27%] right-[9%] w-[10%] h-[40%] rounded-[15px] rotate-[63deg] cursor-pointer z-10 group" onClick={() => handleSectorClick('Jug')}>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold text-gray-300 bg-[rgba(44,42,42,0.4)] px-2.5 py-1 rounded-[10px]">Jug</span>
        </div>
      </div>
      <button className={`mt-[70px] px-[16px] py-[7px] text-[18px] text-white rounded-[8px] transition-colors ${selectedSector ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed opacity-60'}`} disabled={!selectedSector} onClick={handleContinue}>Vazhdo</button>
    </div>
  );
};
export default Stadium;
