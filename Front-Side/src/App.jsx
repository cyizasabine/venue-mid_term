import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VenueBooking from './pages/Bookings';
import Login from './pages/Login';
import SignUpForm from './pages/SignUpForm';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const isLoginOrRegisterPage =
    window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/booking' || window.location.pathname === '/dashboard';

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div>Loading...</div> // Add a loading indicator
        ) : (
          <>
            {!isLoginOrRegisterPage && <Navbar />}
            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/booking" element={<VenueBooking />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
            {!isLoginOrRegisterPage && <Footer />}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;