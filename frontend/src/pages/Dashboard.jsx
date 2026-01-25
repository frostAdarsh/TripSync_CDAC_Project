import { useEffect, useState } from 'react';
import { catalogApi } from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/authUtils';

const Dashboard = () => {
    const [destinations, setDestinations] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // 1. New State for Search
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

    // 2. Filter Logic: Only show destinations where country matches search
    const filteredDestinations = destinations.filter((dest) => 
        dest.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            {/* Header Section */}
            <div className="dashboard-header">
                <h1>Travel Destinations</h1>
                
                <div className="header-actions">
                    {isAdmin() && (
                        <button 
                            onClick={() => navigate('/admin')}
                            className="btn-primary"
                        >
                            Admin Panel
                        </button>
                    )}

                    <button 
                        onClick={handleLogout} 
                        className="btn-danger"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* 3. Search Bar Section */}
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search by country (e.g. Japan)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Grid Section - Now using 'filteredDestinations' */}
           <div className="grid">
                {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((dest) => (
                        <div key={dest.id} className="card">
                            <h3>{dest.name}</h3>
                            <p className="card-meta">
                                {dest.country} • {dest.location}
                            </p>
                            <p>{dest.description}</p>
                            
                            
                            <button 
                                className="btn-view-packages"
                                onClick={() => navigate(`/packages/${dest.id}`)}
                            >
                                View Packages
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No destinations found for "{searchQuery}"</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;