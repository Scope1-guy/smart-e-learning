import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const sidebarLinks = [
  { label: "Dashboard", path: "/" },
  { label: "Lessons", path: "lessons" },
  { label: "Schedule", path: "schedule" },
  { label: "Materials", path: "materials" },
  { label: "Forum", path: "forum" },
  { label: "Assessments", path: "assessments" },
  { label: "Settings", path: "settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Logo />
      <Nav />
      <LogoutButton />
    </aside>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <span className="logo-icon">◆</span>
      <span className="logo-text">Smart</span>
    </div>
  );
}

function Nav() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <nav className="nav">
      <ul>
        {sidebarLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={activePage === item ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage(item)}
          >
            <span className="nav-icon">▦</span>
            {item.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
function LogoutButton() {
  return (
    <button className="logout-btn">
      <span className="nav-icon">⏻</span>
      Log Out
    </button>
  );
}
