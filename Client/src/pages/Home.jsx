import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fdfdfd' }}>
            {/* Top Navigation Bar mimicking the screenshot's top bar */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#000' }}>Qcab</div>
                <div>
                    <Link to="/login" style={{ color: '#000', textDecoration: 'none', fontWeight: '500', marginRight: '1rem' }}>Login ▾</Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#000', marginBottom: '1rem' }}>
                    Your Ride, Your Way
                </h1>
                <p style={{ color: '#555', fontSize: '1rem', marginBottom: '2rem' }}>
                    Reliable. Fast. Affordable. Book cabs anytime, anywhere.
                </p>
                <button 
                    onClick={() => navigate('/login')}
                    style={{ backgroundColor: '#000', color: '#fff', padding: '0.8rem 2rem', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', marginBottom: '3rem', fontWeight: '500' }}
                >
                    Explore Services
                </button>
                
                {/* Taxi Image */}
                <img src="/taxi_hero.png" alt="Taxi" style={{ maxWidth: '100%', height: 'auto', width: '450px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} />
            </main>
        </div>
    );
};

export default Home;
