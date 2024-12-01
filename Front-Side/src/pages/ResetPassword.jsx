import React, { useState } from "react";
import "../css/reset.css"
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePasswords = () => {
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validatePasswords()) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (!token) {
                setError("Invalid reset token. Please request a new password reset link.");
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:8081/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (response.ok) {
                setSuccessMessage("Password reset successful! Redirecting to login...");
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    window.location.href = "./login.html";
                }, 2000);
            } else {
                const data = await response.text();
                setError(data || "Failed to reset password. Please try again.");
            }
        } catch (err) {
            setError("Error connecting to server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <button type="submit" className="btn-reset" disabled={loading}>
                    {loading ? "Processing..." : "Reset Password"}
                </button>
                {loading && <div className="loading-spinner"></div>}
            </form>
        </div>
    );
};

export default ResetPassword;
