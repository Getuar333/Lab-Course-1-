import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Stadium from './Stadium';
import SeatSelection from './SeatSelection';
import LoginForm from './LoginForm';
import Signup from './Signup';
import ForgotPass from './ForgotPass';
import RrethNesh from './Rreth Nesh';
import Ndeshjet from './Ndeshjet';
import Cart from './Cart';
import CreditCard from './CreditCard';

const App=()=>{
  const [selectedSector, setSelectedSector] = useState('');
  const [cart, setCart]=useState([]);
  const handleSectorClick=(sector) =>{
    setSelectedSector(sector);
  };
  const handleBack=()=>{setSelectedSector('');};
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/biletat" element={selectedSector===''?(<Stadium onSectorClick={handleSectorClick}/>):(<SeatSelection sector={selectedSector} onBack={handleBack} cart={cart} setCart={setCart}/>)}/>
        <Route path="/loginpage" element={<LoginForm/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/info-ffk" element={<RrethNesh/>}/>
        <Route path="/forgot-password" element={<ForgotPass/>}/>
        <Route path="/ndeshjet" element={<Ndeshjet/>}/>
        <Route path="/ffk-cart" element={<Cart cart={cart} setCart={setCart}/>}/>
        <Route path="/credit-card" element={<CreditCard/>}/>
      </Routes>
    </Router>
  );
};
export default App;
