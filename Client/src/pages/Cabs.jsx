import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../services/api';
import Unav from '../components/Unav';

const Cabs = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await getCars();
                setCars(res.data);
            } catch (err) {
                console.error('Failed to fetch cars:', err);
            }
            setLoading(false);
        };
        fetchCars();
    }, []);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                <Unav />
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div style={{ width: '32px', height: '32px', border: '3px solid #ddd', borderTop: '3px solid #111', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Unav />
            <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: '700', marginBottom: '2rem', color: '#111' }}>Available Cabs</h2>

                {cars.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</p>
                        <p>No cabs available at the moment.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {cars.map(car => (
                            <div key={car._id} style={{
                                background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px',
                                overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}>
                                {car.carImage && (
                                    <img
                                        src={`http://localhost:8000${car.carImage}`}
                                        alt={car.carname}
                                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderBottom: '1px solid #eee' }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                )}
                                <div style={{ padding: '1.2rem' }}>
                                    <h3 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.3rem', color: '#111' }}>{car.carname}</h3>
                                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Type: {car.cartype}</p>
                                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Driver: {car.drivername}</p>
                                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Plate: {car.carno}</p>
                                    <p style={{ fontWeight: '700', fontSize: '1rem', color: '#111', marginBottom: '1rem' }}>₹{car.price}/km</p>
                                    <Link to={`/bookcab/${car._id}`}>
                                        <button style={{
                                            width: '100%', padding: '0.6rem', backgroundColor: '#111', color: '#fff',
                                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem'
                                        }}>Book Now</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cabs;
