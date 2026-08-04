import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/layout";
import Auth from "./Pages/Login/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Lessons from "./Pages/Lessons/Lessons";
import Schedule from "./Pages/Schedule/Schedule";
import Materials from "./Pages/Materials/Materials";
import Assessments from "./Pages/Assessment/Assessments";
import Forum from "./Pages/Forum/Forum";
import Logout from "./Pages/Logout/Logout";
import Settings from "./Pages/Settings/Settings";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="materials" element={<Materials />} />
        <Route path="forum" element={<Forum />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}

export default App;
