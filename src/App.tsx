import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Home from './Pages/Home';
import Events from './Pages/Events';
import Projects from './Pages/Projects';
import Membership from './Pages/Membership';
import JoinUs from './Pages/JoinUs';
import Results from './Pages/Results';
import Contact from './Pages/Contact';

function App() {
  return (
    <MantineProvider>
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/results" element={<Results />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
