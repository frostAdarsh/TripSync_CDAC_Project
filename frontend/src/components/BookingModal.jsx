import { useState } from 'react';
import { bookingApi } from '../api/axiosConfig';
import { getUserId, getToken } from '../utils/authUtils'; // ✅ Imported correctly
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ tourPackage, onClose }) => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handlePayment = async () => {
        // 1. Get Token and User ID using your Utils
        const token = getToken(); 
        const userId = getUserId();
        
        // 2. Safety Check
        if (!userId || !token) {
            toast.error("Your session has expired. Please login again.");
            onClose(); 
            navigate('/login'); 
            return;
        }

        setStep(2); // Show loading spinner
        
        try {
            // 3. Create the Booking
            const bookingResponse = await bookingApi.post('/bookings', {
                userId: userId,
                packageId: tourPackage.id,
                status: 'PENDING'
            });

            const bookingId = bookingResponse.data.id;

            // 4. Process Payment
            await bookingApi.post('/payments', {
                booking: { id: bookingId },
                amount: tourPackage.price,
                paymentMethod: 'CREDIT_CARD'
            });

            // 5. Confirm Booking Status
            await bookingApi.put(`/bookings/${bookingId}/status?status=CONFIRMED`);

            setStep(3); // Show Success
            toast.success("Booking Successful!");
            
            setTimeout(() => {
                onClose();
                navigate('/my-bookings');
            }, 2000);

        } catch (error) {
            console.error("Booking Error:", error);

            // 6. Robust Error Handling
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 401) {
                    toast.error("Session expired. Please login again.");
                    navigate('/login');
                } else {
                    toast.error(error.response.data?.message || "Booking Failed. Server Error.");
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("Network Error. Is the backend running?");
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error("An unexpected error occurred.");
            }
            
            setStep(1); // Reset to start
        }
    };

    return (
        <div className="modal-overlay">
            <div className="card modal-card">
                {step === 1 && (
                    <>
                        <h2>Confirm Booking</h2>
                        <div className="summary">
                            <p><strong>Package:</strong> {tourPackage.packageName}</p>
                            <p><strong>Duration:</strong> {tourPackage.duration}</p>
                            <p className="total-price">Total: ₹{tourPackage.price}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={onClose} style={{color: '#64748b', borderColor: '#cbd5e1'}}>Cancel</button>
                            <button className="btn-primary" onClick={handlePayment}>Confirm & Pay</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Processing Secure Payment...</p>
                    </div>
                )}

                {step === 3 && (
                    <div className="success-state">
                        <h2 style={{color: '#10b981'}}>Success! 🎉</h2>
                        <p>Your trip has been booked.</p>
                        <p>Redirecting to your tickets...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;