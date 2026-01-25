import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { catalogApi } from '../api/axiosConfig';

const TourPackages = () => {
    const { destinationId } = useParams(); 
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await catalogApi.get(`/packages/destination/${destinationId}`);
                setPackages(response.data);
            } catch (error) {
                console.error("Error fetching packages", error);
            } finally {
                setLoading(false);
            }
        };

        if (destinationId) {
            fetchPackages();
        }
    }, [destinationId]);

    return (
        <div className="container">
           
            <div className="dashboard-header">
                <h1>Available Tour Packages</h1>
                <button 
                    onClick={() => navigate('/dashboard')} 
                    className="btn-back"
                >
                    Back to Destinations
                </button>
            </div>

            
            {loading && <p>Loading packages...</p>}

            
            {!loading && packages.length === 0 && (
                <div className="no-results">
                    <h3>No packages found for this destination yet.</h3>
                    <p>Check back later!</p>
                </div>
            )}

            
            <div className="grid">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="card">
                        <h3>{pkg.packageName}</h3>
                        <p className="card-meta">Duration: {pkg.duration}</p>
                        <p className="card-meta">Available Slots: {pkg.availableSlots}</p>
                        
                       
                        <div className="package-price">
                            ₹{pkg.price}
                        </div>

                        <button className="btn-primary btn-book">
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourPackages;