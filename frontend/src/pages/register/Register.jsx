import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import "../../styles/PageContainer.css";
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/register", { username, email, password });
            setMessage(res.data);
        } catch (err) {
            setMessage(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="page-content">
            <div className="page-inner register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Register</button>
                </form>
                {message && <p className="register-message">{message}</p>}
            </div>
        </div>
    );
};

export default Register;
