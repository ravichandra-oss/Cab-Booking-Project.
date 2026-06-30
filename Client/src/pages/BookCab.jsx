import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, bookRide } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Unav from '../components/Unav';

const BookCab = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [booked, setBooked] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        selectedPickupState: '', selectedPickupCity: '',
        selectedDropState: '', selectedDropCity: '',
        pickupdate: '', pickuptime: '',
        dropdate: '', droptime: ''
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await getCarById(id);
                setCar(res.data);
            } catch (err) {
                setError('Failed to load car details');
            }
            setLoading(false);
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setBooking(true);
        try {
            const res = await bookRide({ ...formData, carId: id });
            setBooked(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        }
        setBooking(false);
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                <Unav />
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
            </div>
        );
    }

    if (booked) {
        return (
            <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
                <Unav />
                <div style={{ maxWidth: '500px', margin: '2rem auto', background: '#fff', borderRadius: '8px', padding: '2.5rem', border: '1px solid #e0e0e0', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#111' }}>Booking Confirmed!</h2>
                    <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                            <span style={{ color: '#666' }}>Car</span><strong>{booked.carname}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                            <span style={{ color: '#666' }}>Driver</span><strong>{booked.drivername}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                            <span style={{ color: '#666' }}>Pickup</span><strong>{booked.selectedPickupCity}, {booked.selectedPickupState}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                            <span style={{ color: '#666' }}>Drop</span><strong>{booked.selectedDropCity}, {booked.selectedDropState}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', fontSize: '0.9rem' }}>
                            <span style={{ color: '#666' }}>Fare</span><strong style={{ color: '#111', fontSize: '1.1rem' }}>₹{booked.fare}</strong>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => navigate('/mybookings')} style={{ flex: 1, padding: '0.7rem', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>My Bookings</button>
                        <button onClick={() => navigate('/cabs')} style={{ flex: 1, padding: '0.7rem', backgroundColor: '#fff', color: '#111', border: '1px solid #111', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Book Another</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Unav />
            <div style={{ maxWidth: '550px', margin: '2rem auto', padding: '0 1rem' }}>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ textAlign: 'center', fontWeight: '700', marginBottom: '0.5rem', color: '#111' }}>Book a Ride</h2>
                    {car && (
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {car.carname} • {car.cartype} • ₹{car.price}/km
                        </p>
                    )}

                    {error && <div style={{ background: '#fee', border: '1px solid #fcc', padding: '0.6rem', borderRadius: '4px', color: '#c00', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Pickup State</label>
                                <input type="text" name="selectedPickupState" value={formData.selectedPickupState} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} placeholder="State" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Pickup City</label>
                                <input type="text" name="selectedPickupCity" value={formData.selectedPickupCity} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} placeholder="City" />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Drop State</label>
                                <input type="text" name="selectedDropState" value={formData.selectedDropState} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} placeholder="State" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Drop City</label>
                                <input type="text" name="selectedDropCity" value={formData.selectedDropCity} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} placeholder="City" />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Pickup Date</label>
                                <input type="date" name="pickupdate" value={formData.pickupdate} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Pickup Time</label>
                                <input type="time" name="pickuptime" value={formData.pickuptime} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Drop Date</label>
                                <input type="date" name="dropdate" value={formData.dropdate} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.8rem', color: '#333' }}>Drop Time</label>
                                <input type="time" name="droptime" value={formData.droptime} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                            </div>
                        </div>
                        <button type="submit" disabled={booking} style={{
                            width: '100%', padding: '0.75rem', backgroundColor: '#111', color: '#fff',
                            border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600'
                        }}>{booking ? 'Booking...' : 'Confirm Booking'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookCab;
