import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="header">
            <div className="header-title">DevSecOps</div>
            <nav className="header-nav">
                <Link className="header-link" to="/">Home</Link>
                {!token && <Link className="header-link" to="/login">Login</Link>}
                {!token && <Link className="header-link" to="/register">Register</Link>}
                {token && (
                    <button className="header-button" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
