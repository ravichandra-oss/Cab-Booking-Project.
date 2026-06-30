import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminUsers, deleteUser } from '../services/api';
import Anav from '../components/Anav';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await getAdminUsers();
            setUsers(res.data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        }
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await deleteUser(id);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert('Failed to delete user');
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
            <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: '700', marginBottom: '2rem', color: '#111' }}>Users</h2>

                {users.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>No users found.</div>
                ) : (
                    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ background: '#f0f0f0' }}>
                                    <th style={thStyle}>#</th>
                                    <th style={thStyle}>Name</th>
                                    <th style={thStyle}>Email</th>
                                    <th style={thStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u, i) => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={tdStyle}>{i + 1}</td>
                                        <td style={tdStyle}>{u.name}</td>
                                        <td style={tdStyle}>{u.email}</td>
                                        <td style={tdStyle}>
                                            <Link to={`/useredit/${u._id}`}>
                                                <button style={{ marginRight: '0.5rem', padding: '0.3rem 0.8rem', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
                                            </Link>
                                            <button onClick={() => handleDelete(u._id)} style={{ padding: '0.3rem 0.8rem', backgroundColor: '#fff', color: '#c00', border: '1px solid #c00', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                                        </td>
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

export default Users;
