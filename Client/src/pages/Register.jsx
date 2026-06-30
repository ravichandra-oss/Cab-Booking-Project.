import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await registerUser(formData);
            login(res.data);
            navigate('/uhome');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 2rem', backgroundColor: '#FFC107', color: '#111' }}>
                <Link to="/" style={{ color: '#111', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Qcab</Link>
                <Link to="/alogin" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Admin Login</Link>
            </header>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e0e0' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: '700', color: '#111' }}>Register</h2>

                    {error && <div style={{ background: '#fee', border: '1px solid #fcc', padding: '0.6rem', borderRadius: '4px', color: '#c00', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                                placeholder="Enter your name" />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                                placeholder="Enter your email" />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500', fontSize: '0.85rem', color: '#333' }}>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                                placeholder="Create a password" />
                        </div>
                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '0.75rem', backgroundColor: '#111', color: '#fff',
                            border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600'
                        }}>{loading ? 'Registering...' : 'Register'}</button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.85rem', color: '#555' }}>
                        Already have an account? <Link to="/login" style={{ color: '#111', fontWeight: '600' }}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
