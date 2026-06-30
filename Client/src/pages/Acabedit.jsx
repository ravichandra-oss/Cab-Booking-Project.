import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar } from '../services/api';
import Anav from '../components/Anav';

const Acabedit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        carname: '', cartype: 'Mini', drivername: '', price: '', carno: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await getCarById(id);
                setFormData({
                    carname: res.data.carname || '',
                    cartype: res.data.cartype || 'Mini',
                    drivername: res.data.drivername || '',
                    price: res.data.price || '',
                    carno: res.data.carno || ''
                });
            } catch (err) {
                setError('Failed to load cab');
            }
            setLoading(false);
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            await updateCar(id, data);
            navigate('/acabs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update cab');
        }
        setSaving(false);
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
            <div style={{ maxWidth: '450px', margin: '2rem auto', padding: '0 1rem' }}>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ textAlign: 'center', fontWeight: '700', marginBottom: '1.5rem', color: '#111' }}>Edit Car Data</h2>

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
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Update Image (Optional)</label>
                            <input type="file" onChange={handleFileChange} accept="image/*"
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fafafa' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" disabled={saving} style={{
                                flex: 1, padding: '0.75rem', backgroundColor: '#111', color: '#fff',
                                border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
                            }}>{saving ? 'Updating...' : 'Update'}</button>
                            <button type="button" onClick={() => navigate('/acabs')} style={{
                                flex: 1, padding: '0.75rem', backgroundColor: '#fff', color: '#111',
                                border: '1px solid #111', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Acabedit;
