import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar/sidebar";
import "../Pages/Shell.css";

function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
