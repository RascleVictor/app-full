import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import "../../styles/PageContainer.css";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            setMessage(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="page-content">
            <div className="page-inner login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
