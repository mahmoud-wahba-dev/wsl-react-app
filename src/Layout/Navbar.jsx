import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isLoggedIn } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const items = [
    ...(user?.role === "admin"
      ? [{ name: "لوحة الإدارة الطلبات", href: "/admin" }]
      : [{ name: "الرئيسيه", href: "/" }]),
    { name: "المؤسسات", href: "/organizations" },
    { name: "الطلبات", href: "/requests" },
    { name: "تقديم طلب جديد", href: "/match-request" },
  ];

  return (
    <nav className="bg-[#F8F9FF] shadow-sm">
      <div className="container">
        <div className="navbar px-0">
          <div className="flex-1">
            <NavLink
              to={"/"}
              className="btn btn-link text-xl no-underline px-0 hover:bg-transparent hover:!shadow-none"
            >
              <span className="text-primary"> وصل</span>
            </NavLink>
          </div>
          <div className="flex-none gap-2">
            {isLoggedIn && (
              <ul className="menu menu-horizontal px-1 max-md:hidden">
                {items.map((item, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={item.href}
                      className={({isActive})=>`font-normal text-base text-[#3E4946] px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="btn btn-ghost btn-circle text-[#3E4946] hover:bg-gray-200"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                </svg>
              )}
            </button>
            {isLoggedIn && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {(user?.email || "U").charAt(0).toUpperCase()}
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-3 shadow-lg"
                >
                   <li className="p-2 border-b border-gray-100 mb-1 [&.active]:!bg-transparent [&>*]:!bg-transparent">
                    <Link to="/profile" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-white w-10 rounded-full flex items-center justify-center text-base font-bold">
                          {(user?.email || "U").charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-[#0D1D2C]">{user?.email}</span>
                        <span className="font-normal text-xs text-[#3E4946]">{user?.role === "admin" ? "مدير النظام" : "مستخدم"}</span>
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
            )}
            <div className="dropdown dropdown-end md:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              {isLoggedIn && (
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg"
                >
                  {items.map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={item.href}
                        className="font-normal text-base text-[#3E4946]"
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-normal text-base text-[#3E4946]"
                    >
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
