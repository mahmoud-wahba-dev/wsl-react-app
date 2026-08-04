import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const checkbox = document.getElementById("my-drawer-4");
    if (!checkbox) return;

    const saved = localStorage.getItem("admin-sidebar-open");
    checkbox.checked = saved !== null ? saved === "true" : true;

    const handleChange = (e) => {
      localStorage.setItem("admin-sidebar-open", String(e.target.checked));
    };

    checkbox.addEventListener("change", handleChange);
    return () => checkbox.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <AdminNavbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <AdminSidebar />
    </div>
  );
};

export default AdminLayout;