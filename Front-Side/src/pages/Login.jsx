import React, { useState } from "react";
import '../css/login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data;

                if (token) {
                    localStorage.setItem("authToken", token);

                    const base64Url = token.split(".")[1];
                    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                    const jsonPayload = decodeURIComponent(
                        atob(base64)
                            .split("")
                            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
                            .join("")
                    );

                    const user = JSON.parse(jsonPayload);

                    localStorage.setItem(
                        "loginedUser",
                        JSON.stringify({ email: user.sub, role: user.role })
                    );

                    if (user.role === "ADMIN") {
                        window.location.href = "./dashboard.html";
                    } else {
                        window.location.href = "/";
                    }
                } else {
                    throw new Error("Token not defined in the response.");
                }
            } else {
                throw new Error("Login failed. Please try again.");
            }
        } catch (error) {
            setMessage(error.message || "An error occurred while logging in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Venue Management Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="remember-me">
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" id="submitButton" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {message && <div id="message" className="message">{message}</div>}
            <a href="./Forgot.html" className="forgot-password-link">
                Forgot Password?
            </a>
            <a href="./signup.html" className="signup-link">
                Don't have an account? Sign up here
            </a>
        </div>
    );
};

export default Login;
