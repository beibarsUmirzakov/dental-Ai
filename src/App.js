import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import AIAnalysis from './pages/AIAnalysis';
import Doctors from './pages/Doctors';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-layout">
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/ai-analysis" element={<AIAnalysis />} />
                        <Route path="/doctors" element={<Doctors />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
