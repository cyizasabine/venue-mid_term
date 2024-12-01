import React, { useState } from "react";
import '../css/signup.css';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessageColor("green");
                setMessage("Sign up successful!");
            } else {
                const errorData = await response.json();
                setMessageColor("red");
                setMessage(errorData.message || "Sign up failed!");
            }
        } catch (error) {
            setMessageColor("red");
            setMessage("Error: Unable to connect to the server.");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                fontFamily: "Arial, sans-serif",
                background: "linear-gradient(135deg, #2d2e2e, #2a2a2b, #2d2e2e)",
                margin: 0,
            }}
        >
            <div
                style={{
                    background: "wheat",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                    width: "350px",
                    textAlign: "center",
                }}
            >
                <h2 style={{ marginBottom: "20px", fontSize: "26px", color: "#333", fontWeight: "700" }}>
                    Venue Management Sign Up
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        aria-label="username"
                        style={{
                            width: "100%",
                            padding: "12px",
                            margin: "12px 0",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-label="Email"
                        style={{
                            width: "100%",
                            padding: "12px",
                            margin: "12px 0",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        aria-label="Password"
                        style={{
                            width: "100%",
                            padding: "12px",
                            margin: "12px 0",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#505850",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        Sign Up
                    </button>
                </form>
                {message && (
                    <div
                        style={{
                            marginTop: "15px",
                            fontSize: "14px",
                            color: messageColor,
                        }}
                    >
                        {message}
                    </div>
                )}
                <a
                    href="./loginform.html"
                    style={{
                        display: "block",
                        marginTop: "20px",
                        fontSize: "14px",
                        color: "#505850",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#404848")}
                    onMouseOut={(e) => (e.target.style.color = "#505850")}
                >
                    Already have an account? Log in here
                </a>
            </div>
        </div>
    );
};

export default SignUpForm;
