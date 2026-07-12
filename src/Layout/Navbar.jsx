import { NavLink, useNavigate } from "react-router-dom";
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
      ? [{ name: "  لوحة الإدارة الطلبات", href: "/admin" }]
      : []),
    { name: "نتائج المطابقه", href: "/match-result" },
    { name: "المؤسسات", href: "/organizations" },
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
            <button
              type="button"
              className="btn btn-ghost btn-circle"
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
            <div className="dropdown dropdown-end">
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
