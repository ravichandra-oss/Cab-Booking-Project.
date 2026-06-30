import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Anav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/alogin');
    };

    return (
        <nav style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 3rem', backgroundColor: '#FFC107', color: '#111',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            <Link to="/ahome" style={{ color: '#111', textDecoration: 'none', fontWeight: '800', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
                Qcab Admin
            </Link>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/ahome" style={{ color: '#111', textDecoration: 'none', fontSize: '1rem', fontWeight: '600' }}>Dashboard</Link>
                <Link to="/users" style={{ color: '#111', textDecoration: 'none', fontSize: '1rem', fontWeight: '600' }}>Users</Link>
                <Link to="/acabs" style={{ color: '#111', textDecoration: 'none', fontSize: '1rem', fontWeight: '600' }}>Cabs</Link>
                <Link to="/addcar" style={{ color: '#111', textDecoration: 'none', fontSize: '1rem', fontWeight: '600' }}>Add Cab</Link>
                <Link to="/bookings" style={{ color: '#111', textDecoration: 'none', fontSize: '1rem', fontWeight: '600' }}>Bookings</Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={handleLogout} style={{
                        background: '#111', color: '#FFC107', border: 'none', padding: '0.5rem 1.2rem',
                        borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem',
                        transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} onMouseOver={e => e.target.style.transform = 'translateY(-2px)'} onMouseOut={e => e.target.style.transform = 'translateY(0)'}>
                        Logout
                    </button>
                    <span style={{ color: '#111', fontSize: '0.95rem', fontWeight: '700' }}>({user?.name || 'Admin'})</span>
                </div>
            </div>
        </nav>
    );
};

export default Anav;
