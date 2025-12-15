import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PageContainer.css";
import "./Logout.css";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        setTimeout(() => navigate("/"), 1000);
    }, [navigate]);

    return (
        <div className="page-content">
            <div className="page-inner logout-container">
                Logging out...
            </div>
        </div>
    );
};

export default Logout;


