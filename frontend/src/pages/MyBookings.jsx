import { useEffect, useState } from 'react';
import { bookingApi } from '../api/axiosConfig';
import { getUserId } from '../utils/authUtils';
import toast from 'react-hot-toast';


const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const userId = getUserId();
            if (!userId) return;

            try {
                const response = await bookingApi.get(`/bookings/user/${userId}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                toast.error("Could not load your bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;

    return (
        <div className="bookings-page container">
            <h2>My Trips ✈️</h2>
            
            {bookings.length === 0 ? (
                <div className="empty-state">
                    <p>You haven't booked any trips yet.</p>
                    <a href="/" className="btn-primary">Explore Packages</a>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="card booking-card">
                            <div className="card-header">
                                <h3>Booking #{booking.id}</h3>
                                <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                </span>
                            </div>
                            <div className="card-body">
                                <p><strong>Package ID:</strong> {booking.packageId}</p>
                                <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;