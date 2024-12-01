import React, { useState } from "react";
import '../css/forgot.css'

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("http://localhost:8080/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseText = await response.text();
      let responseMessage;

      try {
        responseMessage = JSON.parse(responseText).message;
      } catch {
        responseMessage = responseText;
      }

      if (response.ok) {
        setMessage({ text: responseMessage || "Password reset link sent to your email!", type: "success" });
        setEmail(""); // Clear the input
      } else {
        setMessage({ text: responseMessage || "Failed to send reset link. Please try again.", type: "error" });
      }
    } catch {
      setMessage({ text: "Error: Unable to connect to the server. Please try again later.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading && <span className="spinner"></span>}
          {!loading && <span>Send Reset Link</span>}
        </button>
      </form>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <a href="./login form.html" className="login-link">
        Back to Login
      </a>
    </div>
  );
}

export default ForgotPassword;
