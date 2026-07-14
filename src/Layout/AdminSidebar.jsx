import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/admin",
    end: true,
    label: "لوحة التحكم",
    icon: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  },
  {
    to: "/admin/requests",
    end: false,
    label: "الطلبات",
    icon: "M20 7h-9M14 17H5M17 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    to: "/admin/donors",
    end: false,
    label: "المؤسسات المانحة",
    icon: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  },
  {
    to: "/admin/users",
    end: false,
    label: "المستخدمين",
    icon: "M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1Zm0 0h6v-1a6 6 0 0 0-9-5.197M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  },
];

const AdminSidebar = () => {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300">
        <div className="p-4 font-bold text-lg text-primary is-drawer-close:hidden">وصل</div>
        <ul className="menu w-full grow">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "active bg-primary text-white" : ""}`
                }
                data-tip={link.label}
              >
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
                  <path d={link.icon}></path>
                </svg>
                <span className="is-drawer-close:hidden">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;