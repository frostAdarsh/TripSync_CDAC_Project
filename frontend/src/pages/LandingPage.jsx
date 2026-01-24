import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <div className="hero">
                <h1>Explore the World with Us</h1>
                <p>Unforgettable journeys, curated just for you.</p>
                <div className="buttons">
                    <Link to="/login">
                        <button className="btn-primary">Book Now / Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn-secondary">Sign Up</button>
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="features">
                <div className="feature-card">
                    <h3>🌍 Global Destinations</h3>
                    <p>Access packages from over 50 countries.</p>
                </div>
                <div className="feature-card">
                    <h3>🔒 Secure Booking</h3>
                    <p>Your data is protected with top-tier security.</p>
                </div>
                <div className="feature-card">
                    <h3>✈️ Best Prices</h3>
                    <p>Guaranteed lowest rates on tour packages.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;