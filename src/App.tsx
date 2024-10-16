import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Home from './Pages/Home';
import Events from './Pages/Events';
import Projects from './Pages/About';
import Membership from './Pages/Membership';
import JoinUs from './Pages/JoinUs';
import Contact from './Pages/Contact';
import Finance from './Financev2/Finance'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<Projects />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/purchase" element={<Finance />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
