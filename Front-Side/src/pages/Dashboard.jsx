import React, { useState, useEffect } from "react";
import '../css/dash.css'


const Dashboard = () => {
    const [view, setView] = useState("dashboard");
    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const fetchVenues = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/venues");
            if (!response.ok) throw new Error("Failed to fetch venues");
            const data = await response.json();
            setVenues(data);
        } catch (error) {
            console.error("Error fetching venues:", error);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/bookings");
            if (!response.ok) throw new Error("Failed to fetch bookings");
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
    const handleFilter = (e) => setFilterStatus(e.target.value);

    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.venue.toLowerCase().includes(searchQuery) ||
            booking.name.toLowerCase().includes(searchQuery);
        const matchesFilter = filterStatus
            ? booking.status === filterStatus
            : true;
        return matchesSearch && matchesFilter;
    });

    useEffect(() => {
        if (view === "venues") fetchVenues();
        if (view === "bookings") fetchBookings();
    }, [view]);

    const renderView = () => {
        switch (view) {
            case "dashboard":
                return (
                    <div id="dashboard-view">
                        <h1>Dashboard Overview</h1>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <i className="fas fa-building mb-3"></i>
                                <h3>12</h3>
                                <p>Total Venues</p>
                            </div>
                        </div>
                    </div>
                );
            case "venues":
                return (
                    <div id="venues-view">
                        <h1>Manage Venues</h1>
                        <div className="venues-list">
                            <h2>Venues List</h2>
                            {venues.map((venue) => (
                                <div className="venue-item" key={venue.id}>
                                    <h3>{venue.name}</h3>
                                    <p>Location: {venue.address}</p>
                                    <p>Capacity: {venue.capacity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "bookings":
                return (
                    <div id="bookings-view">
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by client Name"
                                onChange={handleSearch}
                            />
                            <select className="form-select" onChange={handleFilter}>
                                <option value="">Filter by status</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="PENDING">Pending</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                        <div className="list-group">
                            {filteredBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h5>{booking.venue}</h5>
                                        <small>Client: {booking.name}</small>
                                        <br />
                                        <small>
                                            Date: {new Date(booking.date).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <span className={`badge bg-${getStatusBadge(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "CONFIRMED":
                return "success";
            case "PENDING":
                return "warning";
            case "CANCELLED":
                return "danger";
            default:
                return "secondary";
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h1>VMS</h1>
                <ul className="nav-menu">
                    <li>
                        <a
                            href="#"
                            className={view === "dashboard" ? "active" : ""}
                            onClick={() => setView("dashboard")}
                        >
                            <i className="fas fa-home"></i> Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={view === "venues" ? "active" : ""}
                            onClick={() => setView("venues")}
                        >
                            <i className="fas fa-building"></i> Venues
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={view === "bookings" ? "active" : ""}
                            onClick={() => setView("bookings")}
                        >
                            <i className="fas fa-calendar-alt"></i> Bookings
                        </a>
                    </li>
                </ul>
            </aside>
            <main className="main-content">{renderView()}</main>
        </div>
    );
};

export default Dashboard;
