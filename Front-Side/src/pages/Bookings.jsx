import React, { useEffect, useState } from "react";
import "../css/bookings.css";

const VenueBooking = () => {
    const [venues, setVenues] = useState([]);
    const [formData, setFormData] = useState({
        venue: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Fetch venues when the component mounts
        const fetchVenues = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/venues");
                if (response.ok) {
                    const data = await response.json();
                    setVenues(data);
                } else {
                    throw new Error("Failed to fetch venues");
                }
            } catch (error) {
                setErrorMessage("Failed to load venues");
                console.error("Error fetching venues:", error);
            }
        };
        fetchVenues();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage("Booking Successful!");
                setErrorMessage("");
                setFormData({
                    venue: "",
                    name: "",
                    email: "",
                    phone: "",
                    date: "",
                    time: "",
                });
                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                throw new Error("Booking failed");
            }
        } catch (error) {
            console.error("Booking error:", error);
            setSuccessMessage("");
            setErrorMessage("Booking Failed. Please try again.");
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Book Your Venue</h2>

                <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <select
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Venue</option>
                        {venues.map((venue) => (
                            <option key={venue.id} value={venue.id}>
                                {venue.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your Phone Number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    Book Now
                </button>
            </form>

            {successMessage && (
                <div className="message success-message">{successMessage}</div>
            )}
            {errorMessage && <div className="message error-message">{errorMessage}</div>}
        </div>
    );
};

export default VenueBooking;
