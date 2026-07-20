import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.email
    ? user.email.split("@")[0].slice(0, 2).toUpperCase()
    : "AD";

  return (
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="my-1.5 inline-block size-4"
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
          <path d="M9 4v16"></path>
          <path d="M14 10l2 2l-2 2"></path>
        </svg>
      </label>
      <div className="flex-1 px-4 font-medium">لوحة التحكم</div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
          </div>
          <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-3 shadow-lg">
            <li className="p-2 border-b border-gray-100 mb-1 [&.active]:!bg-transparent [&>*]:!bg-transparent">
              <Link to="/admin/profile" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
                <div className="avatar placeholder">
                  <div className="bg-primary text-white w-10 rounded-full flex items-center justify-center text-base font-bold">
                    {initials}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-[#0D1D2C]">{user?.email}</span>
                  <span className="font-normal text-xs text-[#3E4946]">مدير النظام</span>
                </div>
              </Link>
            </li>
            <li className="[&.active]:!bg-transparent">
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm w-full justify-start font-normal text-14px text-error hover:bg-red-50"
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;