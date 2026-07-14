import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
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