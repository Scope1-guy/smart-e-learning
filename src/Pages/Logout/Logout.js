import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "../Shell.css";
import "./Logout.css";

function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // go back to whatever page they were on
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="logout-wrapper">
      {/* Centered confirmation card */}
      <div className="logout-overlay">
        <div className="card logout-card">
          <div className="logout-icon">⏻</div>
          <h1>Log out from Smart?</h1>
          <p>
            You'll need to sign in again to access your lessons, schedule and
            messages.
          </p>
          <div className="logout-actions">
            <button className="pill-btn ghost full" onClick={handleCancel}>
              Cancel
            </button>
            <button className="pill-btn full danger" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
