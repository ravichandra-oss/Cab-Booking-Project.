import React, { useState, useEffect } from 'react';
import { getAdminBookings } from '../services/api';
import Anav from '../components/Anav';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await getAdminBookings();
                setBookings(res.data);
            } catch (err) {
                console.error('Failed to fetch bookings:', err);
            }
            setLoading(false);
        };
        fetchBookings();
    }, []);

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
                <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: '700', marginBottom: '2rem', color: '#111' }}>My Booking</h2>

                {bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No bookings found.</div>
                ) : (
                    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ background: '#f0f0f0' }}>
                                    <th style={thStyle}>#</th>
                                    <th style={thStyle}>User</th>
                                    <th style={thStyle}>Car</th>
                                    <th style={thStyle}>Driver</th>
                                    <th style={thStyle}>Pickup</th>
                                    <th style={thStyle}>Drop</th>
                                    <th style={thStyle}>Fare</th>
                                    <th style={thStyle}>Booked Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b, i) => (
                                    <tr key={b._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={tdStyle}>{i + 1}</td>
                                        <td style={tdStyle}>{b.userName}</td>
                                        <td style={tdStyle}>{b.carname}</td>
                                        <td style={tdStyle}>{b.drivername}</td>
                                        <td style={tdStyle}>{b.selectedPickupCity}, {b.selectedPickupState}</td>
                                        <td style={tdStyle}>{b.selectedDropCity}, {b.selectedDropState}</td>
                                        <td style={{ ...tdStyle, fontWeight: '700' }}>₹{b.fare}</td>
                                        <td style={tdStyle}>{b.bookeddate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const thStyle = { padding: '0.8rem 1rem', textAlign: 'left', fontWeight: '600', color: '#333', fontSize: '0.8rem', textTransform: 'uppercase' };
const tdStyle = { padding: '0.7rem 1rem', color: '#333' };

export default Bookings;
