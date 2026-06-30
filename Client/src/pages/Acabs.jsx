import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCars, deleteCar } from '../services/api';
import Anav from '../components/Anav';

const Acabs = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCars = async () => {
        try {
            const res = await getCars();
            setCars(res.data);
        } catch (err) {
            console.error('Failed to fetch cars:', err);
        }
        setLoading(false);
    };

    useEffect(() => { fetchCars(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this cab?')) return;
        try {
            await deleteCar(id);
            setCars(cars.filter(c => c._id !== id));
        } catch (err) {
            alert('Failed to delete cab');
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                <Anav />
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Anav />
            <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#111' }}>Car List</h2>
                    <Link to="/addcar">
                        <button style={{ padding: '0.5rem 1.2rem', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>+ Add Car</button>
                    </Link>
                </div>

                {cars.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No cabs added yet.</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {cars.map(car => (
                            <div key={car._id} style={{
                                background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px',
                                overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                            }}>
                                {car.carImage && (
                                    <img
                                        src={`http://localhost:8000${car.carImage}`}
                                        alt={car.carname}
                                        style={{ width: '100%', height: '160px', objectFit: 'cover', borderBottom: '1px solid #eee' }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                )}
                                <div style={{ padding: '1rem' }}>
                                    <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem', color: '#111' }}>{car.carname}</h3>
                                    <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Type: {car.cartype}</p>
                                    <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Driver: {car.drivername}</p>
                                    <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Plate: {car.carno}</p>
                                    <p style={{ fontWeight: '700', color: '#111', marginBottom: '0.8rem' }}>₹{car.price}/km</p>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link to={`/acabedit/${car._id}`} style={{ flex: 1 }}>
                                            <button style={{ width: '100%', padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>Edit</button>
                                        </Link>
                                        <button onClick={() => handleDelete(car._id)} style={{ flex: 1, padding: '0.4rem', backgroundColor: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Acabs;
