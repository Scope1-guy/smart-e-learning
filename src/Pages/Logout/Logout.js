import React from "react";
import "../Shell.css";
import "./Logout.css";

function Logout() {
  return (
    <div className="app">
      {/* ---------- Main content wrapper ---------- */}
      <div className="main-wrapper logout-wrapper">
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
              <button className="pill-btn ghost full">Cancel</button>
              <button className="pill-btn full danger">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
