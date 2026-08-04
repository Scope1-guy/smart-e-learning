import { NavLink, useNavigate } from "react-router-dom";
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
  return (
    <nav className="nav">
      <ul>
        {sidebarLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
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
  const navigate = useNavigate();

  return (
    <button className="logout-btn" onClick={() => navigate("logout")}>
      <span className="nav-icon">⏻</span>
      Log Out
    </button>
  );
}
