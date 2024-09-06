import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoutes/PrivateRoutes';
import Home from './pages/Home/Home';

const App: React.FC = () => {
    const token: string | null = localStorage.getItem('token');
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;