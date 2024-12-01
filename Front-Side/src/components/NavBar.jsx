import React from 'react';
import '../css/nav.css';
import { Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Venue<span></span></div>
            <div className="nav-links">
                <a href="#features">Features</a>
                <a href="#about">About</a>
                <a href="/booking">Bookings</a>
                <a href="#contact">Contact</a>
            </div>
            <div>
                <a href="/login" className="auth-button">Login</a>
                <a href="/signup" className="auth-button">Signup</a>
            </div>
            <a href="#" className="nav-button">Get Started</a>
        </nav>
    );
};

export default Navbar;
