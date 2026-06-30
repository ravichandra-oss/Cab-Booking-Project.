import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Uhome from './pages/Uhome';
import Cabs from './pages/Cabs';
import BookCab from './pages/BookCab';
import Mybookings from './pages/Mybookings';
import Alogin from './pages/Alogin';
import Aregister from './pages/Aregister';
import Ahome from './pages/Ahome';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import Acabs from './pages/Acabs';
import Acabedit from './pages/Acabedit';
import Addcar from './pages/Addcar';
import Bookings from './pages/Bookings';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/uhome" element={<Uhome />} />
                        <Route path="/cabs" element={<Cabs />} />
                        <Route path="/bookcab/:id" element={<BookCab />} />
                        <Route path="/mybookings" element={<Mybookings />} />
                        <Route path="/alogin" element={<Alogin />} />
                        <Route path="/aregister" element={<Aregister />} />
                        <Route path="/ahome" element={<Ahome />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/useredit/:id" element={<UserEdit />} />
                        <Route path="/acabs" element={<Acabs />} />
                        <Route path="/acabedit/:id" element={<Acabedit />} />
                        <Route path="/addcar" element={<Addcar />} />
                        <Route path="/bookings" element={<Bookings />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
