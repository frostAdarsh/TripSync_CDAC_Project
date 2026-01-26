import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { catalogApi } from '../api/axiosConfig';
import BookingModal from '../components/BookingModal'; // <--- Import Modal

const TourPackages = () => {
    const { destinationId } = useParams(); 
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState(null); // <--- New State
    const navigate = useNavigate();

    // ... useEffect fetchPackages logic remains the same ...
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await catalogApi.get(`/packages/destination/${destinationId}`);
                setPackages(response.data);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setLoading(false);
            }
        };
        if (destinationId) fetchPackages();
    }, [destinationId]);


    return (
        <div className="container">
            {/* ... Header Section remains the same ... */}
            <div className="dashboard-header">
                <h1>Available Tour Packages</h1>
                <button onClick={() => navigate('/dashboard')} className="btn-back">
                    Back to Destinations
                </button>
            </div>

            {/* ... Loading/Error logic remains the same ... */}
            {loading && <p>Loading packages...</p>}
            
            <div className="grid">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="card">
                        <h3>{pkg.packageName}</h3>
                        <p className="card-meta">Duration: {pkg.duration}</p>
                        <p className="card-meta">Available Slots: {pkg.availableSlots}</p>
                        
                        <div className="package-price">₹{pkg.price}</div>

                        {/* UPDATE BUTTON: Opens Modal */}
                        <button 
                            className="btn-primary btn-book"
                            onClick={() => setSelectedPackage(pkg)} 
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Render Modal if a package is selected */}
            {selectedPackage && (
                <BookingModal 
                    tourPackage={selectedPackage} 
                    onClose={() => setSelectedPackage(null)} 
                />
            )}
        </div>
    );
};

export default TourPackages;