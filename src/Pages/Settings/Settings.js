import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "../Shell.css";
import "./Settings.css";

function Settings() {
  return (
    <div className="app">
      {/* ---------- Main content wrapper ---------- */}
      <div className="main-wrapper">
        {/* Page heading */}
        <div className="page-heading">
          <div>
            <h1>Settings</h1>
            <p>Manage your account and preferences</p>
          </div>
        </div>

        <div className="settings-layout">
          {/* Settings tabs */}
          <nav className="settings-tabs card">
            <ul>
              <li className="settings-tab active">Profile</li>
              <li className="settings-tab">Account</li>
              <li className="settings-tab">Notifications</li>
              <li className="settings-tab">Security</li>
              <li className="settings-tab">Appearance</li>
            </ul>
          </nav>

          {/* Settings content */}
          <SettingContent />
        </div>
      </div>
    </div>
  );
}

function SettingContent() {
  const { user } = useContext(AuthContext);

  return (
    <div className="settings-content">
      {/* Profile card */}
      <section className="card">
        <div className="card-header">
          <h2>Profile information</h2>
          <button>Edit details</button>
        </div>

        <div className="profile-upload">
          <div className="avatar large" />
          <div>
            <button className="pill-btn ghost small">Change photo</button>
            <p className="upload-hint">JPG or PNG, max 2MB</p>
          </div>
        </div>

        <div className="form-grid">
          <label className="form-field">
            <span>Full name</span>
            <input type="text" defaultValue={user.name} readOnly />
          </label>
          <label className="form-field">
            <span>Email address</span>
            <input type="email" defaultValue={user.email} readOnly />
          </label>
          <label className="form-field">
            <span>Phone number</span>
            <input type="text" defaultValue={user.phoneNUmber} readOnly />
          </label>
          <label className="form-field">
            <span>Date of birth</span>
            <input type="text" defaultValue={user.dob} readOnly />
          </label>
        </div>

        <label className="form-field full">
          <span>Bio</span>
          <textarea
            rows="3"
            readOnly
            defaultValue="Computer science student, passionate about robotics and web development."
          />
        </label>
      </section>

      {/* Notifications card */}
      <section className="card">
        <div className="card-header">
          <h2>Notifications</h2>
        </div>

        <ul className="toggle-list">
          <li className="toggle-row">
            <div>
              <p className="toggle-title">Email notifications</p>
              <p className="toggle-desc">
                Receive updates about lessons and grades
              </p>
            </div>
            <span className="switch on" />
          </li>
          <li className="toggle-row">
            <div>
              <p className="toggle-title">Push notifications</p>
              <p className="toggle-desc">
                Get reminders before scheduled lessons
              </p>
            </div>
            <span className="switch on" />
          </li>
          <li className="toggle-row">
            <div>
              <p className="toggle-title">Forum activity</p>
              <p className="toggle-desc">
                Notify when someone replies to your topic
              </p>
            </div>
            <span className="switch" />
          </li>
        </ul>
      </section>

      <div className="settings-actions">
        <button className="pill-btn ghost">Cancel</button>
        <button className="pill-btn">Save changes</button>
      </div>
    </div>
  );
}

export default Settings;
