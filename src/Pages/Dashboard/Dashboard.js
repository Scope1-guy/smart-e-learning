import "./header.css";
import ContentGrid from "./Content Grid/content-grid";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Dashboard() {
  return (
    <>
      <TopHeader />
      <ContentGrid />
    </>
  );
}

function TopHeader() {
  return (
    <header className="top-header">
      <Search />

      <div className="header-right">
        <LangSelect />
        <span className="header-icon">✉</span>
        <span className="header-icon">🔔</span>
        <UserProfile />
      </div>
    </header>
  );
}

function Search() {
  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input type="text" placeholder="Search" />
    </div>
  );
}

function LangSelect() {
  return (
    <div className="lang-select">
      <select>
        <option>ENG</option>
        <option>YOR</option>
        <option>CHI</option>
      </select>
    </div>
  );
}

function UserProfile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="user-profile">
      <div className="avatar" />
      <span className="user-name">{user?.name}</span>
      <span className="caret">▾</span>
    </div>
  );
}
