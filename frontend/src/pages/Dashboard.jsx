import { useEffect, useState } from 'react';
import { catalogApi } from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/authUtils';

const Dashboard = () => {
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await catalogApi.get('/destinations');
            setDestinations(response.data);
        } catch (error) {
            console.error("Error:", error);
            if(error.response && error.response.status === 403) {
                navigate('/');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Travel Destinations</h1>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    
                    {isAdmin() && (
                        <button 
                            onClick={() => navigate('/admin')}
                            style={{ background: '#2563eb' }} 
                        >
                            Admin Panel
                        </button>
                    )}
                   

                    <button onClick={handleLogout} style={{ background: '#ef4444' }}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid">
                {destinations.map((dest) => (
                    <div key={dest.id} className="card">
                        <h3>{dest.name}</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{dest.country} • {dest.location}</p>
                        <p>{dest.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;