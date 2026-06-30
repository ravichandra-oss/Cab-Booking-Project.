import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminAnalytics, getCars } from '../services/api';
import Anav from '../components/Anav';

const Ahome = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalCars: 0, totalBookings: 0 });
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [analyticsRes, carsRes] = await Promise.all([
                    getAdminAnalytics(),
                    getCars()
                ]);
                setStats(analyticsRes.data);
                setCars(carsRes.data.slice(0, 3)); // Show top 3 cars
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#FFFDE7' }}>
                <Anav />
                <div style={{ textAlign: 'center', padding: '4rem', color: '#111', fontSize: '1.2rem', fontWeight: 'bold' }}>Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#FFFDE7' }}>
            <Anav />
            <div style={{ padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', color: '#111' }}>Admin Dashboard</h2>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{ ...statCardStyle, borderBottom: '4px solid #FFC107' }} className="hover-stat">
                        <div style={iconContainerStyle}><span style={{ fontSize: '2rem' }}>👤</span></div>
                        <div style={statValueStyle}>{stats.totalUsers}</div>
                        <div style={statLabelStyle}>Total Users</div>
                    </div>
                    <div style={{ ...statCardStyle, borderBottom: '4px solid #009688' }} className="hover-stat">
                        <div style={iconContainerStyle}><span style={{ fontSize: '2rem' }}>🚕</span></div>
                        <div style={statValueStyle}>{stats.totalCars}</div>
                        <div style={statLabelStyle}>Total Cabs</div>
                    </div>
                    <div style={{ ...statCardStyle, borderBottom: '4px solid #FFC107' }} className="hover-stat">
                        <div style={iconContainerStyle}><span style={{ fontSize: '2rem' }}>📋</span></div>
                        <div style={statValueStyle}>{stats.totalBookings}</div>
                        <div style={statLabelStyle}>Total Bookings</div>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    
                    {/* Car Images */}
                    <div style={contentCardStyle} className="hover-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontWeight: '800', color: '#111', fontSize: '1.2rem' }}>Recent Cabs</h3>
                            <Link to="/acabs" style={{ color: '#009688', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: 'none' }}>View All →</Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {cars.map(car => (
                                <div key={car._id} style={{ background: '#f9f9f9', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                                    {car.carImage ? (
                                        <img src={`http://localhost:8000${car.carImage}`} alt={car.carname}
                                            style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
                                            onError={(e) => { e.target.style.display = 'none'; }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '80px', background: '#FFC107', opacity: '0.2', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🚕</div>
                                    )}
                                    <p style={{ fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem', color: '#333' }}>{car.carname}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div style={contentCardStyle} className="hover-content">
                        <h3 style={{ fontWeight: '800', marginBottom: '1.5rem', color: '#111', fontSize: '1.2rem' }}>System Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={barStyle}>
                                <span style={barLabelStyle}>Users</span>
                                <div style={barTrackStyle}>
                                    <div style={{ width: `${Math.min(stats.totalUsers * 10, 100)}%`, height: '100%', background: '#FFC107', borderRadius: '6px' }}></div>
                                </div>
                                <span style={barValueStyle}>{stats.totalUsers}</span>
                            </div>
                            <div style={barStyle}>
                                <span style={barLabelStyle}>Cabs</span>
                                <div style={barTrackStyle}>
                                    <div style={{ width: `${Math.min(stats.totalCars * 10, 100)}%`, height: '100%', background: '#009688', borderRadius: '6px' }}></div>
                                </div>
                                <span style={barValueStyle}>{stats.totalCars}</span>
                            </div>
                            <div style={barStyle}>
                                <span style={barLabelStyle}>Bookings</span>
                                <div style={barTrackStyle}>
                                    <div style={{ width: `${Math.min(stats.totalBookings * 10, 100)}%`, height: '100%', background: '#333', borderRadius: '6px' }}></div>
                                </div>
                                <span style={barValueStyle}>{stats.totalBookings}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .hover-stat { transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .hover-stat:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important; }
                .hover-content { transition: box-shadow 0.2s ease; }
                .hover-content:hover { box-shadow: 0 8px 16px rgba(0,0,0,0.08) !important; }
            `}</style>
        </div>
    );
};

// Styles
const statCardStyle = { 
    background: '#fff', 
    borderRadius: '12px', 
    padding: '2rem 1.5rem', 
    textAlign: 'center', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};
const iconContainerStyle = {
    background: '#FFFDE7',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto'
};
const statValueStyle = { fontSize: '2.5rem', fontWeight: '800', color: '#111', marginBottom: '0.2rem' };
const statLabelStyle = { fontSize: '0.9rem', color: '#666', fontWeight: '600' };

const contentCardStyle = { 
    background: '#fff', 
    borderRadius: '12px', 
    padding: '2rem', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
};

const barStyle = { display: 'flex', alignItems: 'center' };
const barLabelStyle = { fontSize: '0.9rem', fontWeight: '600', color: '#444', width: '70px' };
const barTrackStyle = { flex: 1, background: '#f0f0f0', borderRadius: '6px', height: '12px', margin: '0 1rem', position: 'relative', overflow: 'hidden' };
const barValueStyle = { fontWeight: '800', fontSize: '0.9rem', color: '#111', width: '30px', textAlign: 'right' };

export default Ahome;
