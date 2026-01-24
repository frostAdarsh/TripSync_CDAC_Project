import { useState } from 'react';
import { authApi } from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Loading Toast
        const toastId = toast.loading('Logging in...');

        try {
            const response = await authApi.post('/login', { email, password });
            
            localStorage.setItem('token', response.data.accessToken);
            
            // Success Toast
            toast.success('Welcome back!', { id: toastId });
            
            // Small delay so user can see the message before redirect
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);

        } catch (error) {
            console.error(error);
            // Error Toast
            toast.error('Login failed! Check email/password.', { id: toastId });
        }
    };

    return (
        <div className="login-form card">
            {/* Add the Toaster here so notifications can show up */}
            <Toaster position="top-right" reverseOrder={false} />
            
            <h2 style={{ textAlign: 'center' }}>Welcome Back</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                
                <label>Password</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;