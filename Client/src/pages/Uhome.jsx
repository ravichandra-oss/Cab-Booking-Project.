import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Unav from '../components/Unav';
import checkRideImg from '../assets/check_ride.png';
import easyBookedImg from '../assets/easy_booked.png';
import enjoyRideImg from '../assets/enjoy_ride.png';
import bannerPassengersImg from '../assets/banner_passengers.png';

const Uhome = () => {
    const { user } = useAuth();

    return (
        <div style={{ minHeight: '100vh', background: '#FFFDE7', display: 'flex', flexDirection: 'column' }}>
            <Unav />
            
            {/* Main Content Container */}
            <div style={{ padding: '3rem 2rem 0 2rem', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#111', textAlign: 'center' }}>
                    Welcome to Qcab
                </h1>
                <p style={{ color: '#555', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem', lineHeight: '1.6', textAlign: 'center' }}>
                    Cab Booking is the ultimate solution for all your transportation needs. Whether you're looking for a convenient ride to work, a hassle-free airport transfer, or a safe and reliable ride around town, our app has you covered.
                </p>

                {/* Primary Action Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {/* Card 1 */}
                    <Link to="/cabs" style={{ textDecoration: 'none' }}>
                        <div style={cardStyle} className="hover-card">
                            <div style={cardTopStyle}>
                                <img src={checkRideImg} alt="Check Your Ride" style={imageStyle} />
                            </div>
                            <div style={cardBottomStyle}>
                                <h3 style={cardTitleStyle}>Check Your Ride</h3>
                                <p style={cardDescStyle}>Find the nearest available cabs and check their estimated time of arrival instantly.</p>
                                <button style={cardButtonStyle}>Book Now</button>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2 */}
                    <Link to="/mybookings" style={{ textDecoration: 'none' }}>
                        <div style={cardStyle} className="hover-card">
                            <div style={cardTopStyle}>
                                <img src={easyBookedImg} alt="Easy Booked" style={imageStyle} />
                            </div>
                            <div style={cardBottomStyle}>
                                <h3 style={cardTitleStyle}>Easy Booked</h3>
                                <p style={cardDescStyle}>Manage all your current and past bookings effortlessly from your dashboard.</p>
                                <button style={cardButtonStyle}>View History</button>
                            </div>
                        </div>
                    </Link>

                    {/* Card 3 */}
                    <Link to="/cabs" style={{ textDecoration: 'none' }}>
                        <div style={cardStyle} className="hover-card">
                            <div style={cardTopStyle}>
                                <img src={enjoyRideImg} alt="Enjoy The Ride" style={imageStyle} />
                            </div>
                            <div style={cardBottomStyle}>
                                <h3 style={cardTitleStyle}>Enjoy The Ride</h3>
                                <p style={cardDescStyle}>Sit back, relax, and enjoy a comfortable journey with our top-rated drivers.</p>
                                <button style={cardButtonStyle}>Book Now</button>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Passenger Banner Area (from reference photo) */}
                <div style={bannerContainerStyle}>
                    <img src={bannerPassengersImg} alt="Passengers" style={bannerImageStyle} />
                </div>

                {/* Info Cards Row (from reference photo) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
                    <div style={infoCardStyle} className="hover-info-card">
                        <h4 style={infoCardTitleStyle}>Rides on demand</h4>
                        <p style={infoCardDescStyle}>Request a ride at any time and on any day of the year.</p>
                    </div>
                    <div style={infoCardStyle} className="hover-info-card">
                        <h4 style={infoCardTitleStyle}>Budget-friendly options</h4>
                        <p style={infoCardDescStyle}>Compare prices on every kind of ride, from daily commutes to special evenings out.</p>
                    </div>
                    <div style={infoCardStyle} className="hover-info-card">
                        <h4 style={infoCardTitleStyle}>An easy way to get around</h4>
                        <p style={infoCardDescStyle}>Tap and let your driver take you where you want to go.</p>
                    </div>
                </div>
            </div>

            {/* Dark Footer (from reference photo) */}
            <footer style={footerStyle}>
                <div style={footerGridStyle}>
                    <div>
                        <h5 style={footerHeaderStyle}>Contact Us:</h5>
                        <p style={footerLinkStyle}>📧 Email: <a href="mailto:support@qcab.com" style={{ color: '#fff', textDecoration: 'none' }}>support@qcab.com</a></p>
                        <p style={footerLinkStyle}>📞 Phone: +1-123-456-7890</p>
                    </div>
                    <div>
                        <h5 style={footerHeaderStyle}>Follow Us:</h5>
                        <p style={footerLinkStyle}>🌐 Website: <a href="https://www.qcab.com" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: '600' }}>www.qcab.com</a></p>
                        <p style={footerLinkStyle}>📱 Social Media: <span style={{ opacity: 0.7 }}>[Facebook, Twitter, Instagram]</span></p>
                    </div>
                    <div>
                        <h5 style={footerHeaderStyle}>Help & Support:</h5>
                        <p style={footerLinkStyle}><a href="#faqs" style={footerSubLinkStyle}>📖 FAQs</a></p>
                        <p style={footerLinkStyle}><a href="#privacy" style={footerSubLinkStyle}>🔒 Privacy Policy</a></p>
                        <p style={footerLinkStyle}><a href="#terms" style={footerSubLinkStyle}>📄 Terms of Service</a></p>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2.5rem', paddingTop: '1.5rem', textAlign: 'center' }}>
                    <p style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>[ Qcab App ] - Your Trusted Transportation Partner</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Copyright © 2025 - All rights reserved</p>
                </div>
            </footer>

            {/* Adding hover effect for cards */}
            <style>{`
                .hover-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .hover-card:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.15) !important; }
                .hover-card button { transition: background 0.3s ease; }
                .hover-card:hover button { background: #E6A800 !important; }
                .hover-info-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .hover-info-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important; }
            `}</style>
        </div>
    );
};

const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    cursor: 'pointer'
};

const cardTopStyle = {
    padding: '2rem',
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
};

const imageStyle = {
    maxWidth: '100%',
    maxHeight: '200px',
    objectFit: 'contain'
};

const cardBottomStyle = {
    background: '#009688', // Green matching the reference
    padding: '2rem 1.5rem',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

const cardTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '0.8rem'
};

const cardDescStyle = {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    opacity: '0.9',
    marginBottom: '1.5rem'
};

const cardButtonStyle = {
    background: '#FFC107',
    color: '#111',
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '30px',
    fontWeight: '700',
    cursor: 'pointer'
};

// Banner & Info Styles (matching reference image)
const bannerContainerStyle = {
    width: '100%',
    background: '#ccc',
    borderRadius: '24px 24px 0 0',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const bannerImageStyle = {
    width: '100%',
    maxHeight: '380px',
    objectFit: 'cover',
    display: 'block'
};

const infoCardStyle = {
    background: '#FFF9C4', // Pale yellow card background matching photo
    border: '1px solid rgba(0,0,0,0.05)',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
};

const infoCardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#111',
    marginBottom: '1rem'
};

const infoCardDescStyle = {
    fontSize: '0.95rem',
    color: '#444',
    lineHeight: '1.6'
};

// Dark Footer Styles
const footerStyle = {
    background: '#0B132B', // Dark navy blue background matching reference
    color: '#fff',
    padding: '4rem 2rem 2rem 2rem',
    marginTop: 'auto',
    width: '100%'
};

const footerGridStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    textAlign: 'left'
};

const footerHeaderStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#FFC107' // Yellow header accents
};

const footerLinkStyle = {
    fontSize: '0.95rem',
    marginBottom: '0.8rem',
    lineHeight: '1.5',
    color: '#e2e8f0'
};

const footerSubLinkStyle = {
    color: '#e2e8f0',
    textDecoration: 'none',
    transition: 'color 0.2s'
};

export default Uhome;
