import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/admin",
    end: true,
    label: "لوحة التحكم",
    icon: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  },
  // {
  //   to: "/admin/requests",
  //   end: false,
  //   label: "الطلبات",
  //   icon: "M20 7h-9M14 17H5M17 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  // },
  // {
  //   to: "/admin/donors",
  //   end: false,
  //   label: "المؤسسات المانحة",
  //   icon: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  // },
  // {
  //   to: "/admin/users",
  //   end: false,
  //   label: "المستخدمين",
  //   icon: "M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1Zm0 0h6v-1a6 6 0 0 0-9-5.197M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  // },
];

const AdminSidebar = () => {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300">
        <div className=" flex flex-col items-center w-full mb-6">
          <div className="bg-primary is-drawer-close:!hidden is-drawer-close:size-10 is-drawer-open:size-16 center is-drawer-close:rounded-sm rounded-16px m-auto mt-10 mb-3 is-drawer-close:hidden">
            <svg
              className="is-drawer-close:size-4"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 24V13.5H7.5V24H4.5ZM13.5 24V13.5H16.5V24H13.5ZM0 30V27H30V30H0ZM22.5 24V13.5H25.5V24H22.5ZM0 10.5V7.5L15 0L30 7.5V10.5H0ZM6.675 7.5H15H23.325H6.675ZM6.675 7.5H23.325L15 3.375L6.675 7.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="font-bold text-32px text-center text-primary is-drawer-close:hidden">
            نظام المنح
          </div>
          <p className="text-center font-normal text-12px text-center is-drawer-close:hidden">
            لوحة التحكم الإدارية
          </p>
        </div>
        <div className="flex flex-col justify-between grow w-full">
          <ul className="menu w-full grow ">
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
          <div className="p-4 bg-[#EEF4FF] rounded-12px center gap-4">
            <div className="is-drawer-close:hidden">
              <p className="font-bold text-14px text-[#0D1D2C]">أحمد المسؤول</p>
              <p className="font-normal text-12px text-[#3E4946]">
                مدير النظام
              </p>
            </div>

            <div className="dropdown dropdown-top">
              <div tabIndex={0} role="button" className="btn m-1 is-drawer-close:m-0 is-drawer-close:p-0" >
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-8 rounded-full">
                    <span className="text-xs">AD</span>
                  </div>
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
