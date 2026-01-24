import { useState } from 'react';
import { catalogApi } from '../api/axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState({
        name: '',
        country: '',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        setDestination({ ...destination, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Adding destination...');

        try {
            await catalogApi.post('/destinations', destination);
            
            toast.success('Destination Added!', { id: toastId });
            
            // Clear form
            setDestination({ name: '', country: '', location: '', description: '' });

        } catch (error) {
            console.error(error);
            toast.error('Failed to add. Are you an Admin?', { id: toastId });
        }
    };

    return (
        <div className="container">
            <Toaster position="top-right" />
            
            {/* Header Section */}
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <button 
                    className="btn-back" 
                    onClick={() => navigate('/dashboard')}
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Form Section */}
            <div className="card admin-card">
                <h2>Add New Destination</h2>
                <form onSubmit={handleSubmit}>
                    <label>Destination Name</label>
                    <input 
                        name="name" 
                        value={destination.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="e.g. Kyoto" 
                    />

                    <label>Country</label>
                    <input 
                        name="country" 
                        value={destination.country} 
                        onChange={handleChange} 
                        required 
                        placeholder="e.g. Japan" 
                    />

                    <label>Location / Region</label>
                    <input 
                        name="location" 
                        value={destination.location} 
                        onChange={handleChange} 
                        required 
                        placeholder="e.g. Asia" 
                    />

                    <label>Description</label>
                    <textarea 
                        name="description" 
                        value={destination.description} 
                        onChange={handleChange} 
                        required 
                        rows="4"
                    />

                    <button type="submit" className="btn-submit">Add Destination</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;