import React from "react";
import { useNavigate } from "react-router-dom";

const ndeshjetERradhes=[
  {
    kundershtari: "Shqiperia",
    data: "09/23/2025",
    ora: "8:00:00 PM",
    stadiumi: "Fadil Vokrri",
    kompeticioni: "World Cup Qualifiers"
  }
];
const rezultatetEFundit=[
  {
    kundershtari: "Spanja",
    rezultati: "Kosova 2 - 1 Andora",
    data: "06/17/2025",
    stadiumi: "Fadil Vokrri",
    kompeticioni: "World Cup Qualifiers"
  },
  {
    kundershtari: "Anglia",
    rezultati: "Kosova 1 - 2 Anglia",
    data: "02/03/2025",
    stadiumi: "Fadil Vokrri",
    kompeticioni: "UEFA Nations League"
  }
];
const Ndeshjet=()=>{
  const navigate = useNavigate();
  const handleBlejBileten=()=>{
    navigate("/biletat");
  };
  return(
    <div className="p-7"> <h2 className="text-2xl font-bold mb-4 border-b pb-1">Ndeshjet e Radhës</h2>{
        ndeshjetERradhes.map((ndeshje, index)=>(
        <div key={index} className="p-4 mb-4 bg-white shadow rounded">
          <p className="font-semibold">Kosova vs {ndeshje.kundershtari}</p>
          <p>Data: {ndeshje.data}</p>
          <p>Ora: {ndeshje.ora}</p>
          <p>Stadiumi: {ndeshje.stadiumi}</p>
          <p>Kompeticioni: {ndeshje.kompeticioni}</p>
          <button onClick={handleBlejBileten} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-400">Bleni Bileten</button>
        </div>
      ))}<br/>
      <h2 className="text-2xl font-bold mb-4 mt-10 border-b pb-2">Rezultatet e fundit të Kombëtares</h2>
      <div className="grid md:grid-cols-2 gap--2">
        {rezultatetEFundit.map((rez, index) => (
          <div key={index} className="p-4 bg-white shadow rounded">
            <p className="font-semibold">{rez.rezultati}</p>
            <p>Data: {rez.data}</p>
            <p>Stadiumi: {rez.stadiumi}</p>
            <p>Kompeticioni: {rez.kompeticioni}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Ndeshjet;