import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminUserById, updateAdminUser } from '../services/api';
import Anav from '../components/Anav';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getAdminUserById(id);
                setFormData({ name: res.data.name, email: res.data.email });
            } catch (err) {
                setError('Failed to load user');
            }
            setLoading(false);
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);
        try {
            await updateAdminUser(id, formData);
            navigate('/users');
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
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
                <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', border: '1px solid #e0e0e0' }}>
                    <h2 style={{ textAlign: 'center', fontWeight: '700', marginBottom: '1.5rem', color: '#111' }}>Edit User</h2>

                    {error && <div style={{ background: '#fee', border: '1px solid #fcc', padding: '0.6rem', borderRadius: '4px', color: '#c00', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" disabled={saving} style={{
                                flex: 1, padding: '0.7rem', backgroundColor: '#111', color: '#fff',
                                border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
                            }}>{saving ? 'Saving...' : 'Save Changes'}</button>
                            <button type="button" onClick={() => navigate('/users')} style={{
                                flex: 1, padding: '0.7rem', backgroundColor: '#fff', color: '#111',
                                border: '1px solid #111', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
