import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import IdleTimeout from './components/IdleTimeout';
import ProviderCard from './components/ProviderCard';
import AddProvider from './components/AddProvider';
import AddPayer from './components/AddPayer';
import AddUser from './components/AddUser';
import AddPatient from './components/AddPatient';
import PatientsCard from './components/PatientsCard';



import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ProfilePage from './pages/ProfilePage';
import Footer from './pages/Footer';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Payer from './pages/Payer';
import ProviderPage from './pages/ProviderPage';




function App() {
  return (
    <>
    <Router>
      <Navbar />
      <IdleTimeout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/register" element={<AddUser />} />
        <Route path="/add-provider" element={<AddProvider />} />
        <Route path="/providers/all" element={<ProviderCard />} />
        <Route path="/add-payer" element={<AddPayer />} />
        <Route path="/payers/all" element={<Payer />} />
        <Route path="/providers/:providerId" element={<ProviderPage />} />
        <Route path="/patients/:providerId/add-patient" element={<AddPatient />} />
        <Route path="/patients/:providerId/all" element={<PatientsCard />} />


      </Routes>
      <Footer />
    </Router>
    </>
  );
}



export default App;

