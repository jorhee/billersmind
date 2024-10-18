import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Content from './components/Content';
import Footer from './components/Footer';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Home /><Content /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" component={UserProfile} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;

