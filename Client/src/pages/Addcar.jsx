import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../services/api';
import Anav from '../components/Anav';

const Addcar = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        carname: '', cartype: 'Mini', drivername: '', price: '', carno: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            await addCar(data);
            navigate('/acabs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add cab');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Anav />
            <div style={{ maxWidth: '450px', margin: '2rem auto', padding: '0 1rem' }}>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ textAlign: 'center', fontWeight: '700', marginBottom: '1.5rem', color: '#111' }}>Add Car</h2>

                    {error && <div style={{ background: '#fee', border: '1px solid #fcc', padding: '0.6rem', borderRadius: '4px', color: '#c00', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Car Name</label>
                            <input type="text" name="carname" value={formData.carname} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Car Type</label>
                            <select name="cartype" value={formData.cartype} onChange={handleChange}
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }}>
                                <option value="Mini">Mini</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Driver Name</label>
                            <input type="text" name="drivername" value={formData.drivername} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Fare per km (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Plate Number</label>
                            <input type="text" name="carno" value={formData.carno} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Car Image</label>
                            <input type="file" onChange={handleFileChange} accept="image/*"
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fafafa' }} />
                        </div>

                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '0.75rem', backgroundColor: '#111', color: '#fff',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
                        }}>{loading ? 'Adding...' : 'Add'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addcar;
