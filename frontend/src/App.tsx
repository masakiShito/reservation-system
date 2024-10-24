// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reservations from './pages/Reservations';
import CreateReservation from './pages/CreateReservation';
const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('jwt');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reservations" element={isAuthenticated ? <Reservations /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/create-reservation" element={<CreateReservation />} />

            </Routes>
        </Router>
    );
};

export default App;
