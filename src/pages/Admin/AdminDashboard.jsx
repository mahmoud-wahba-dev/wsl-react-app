import { Link, useSearchParams } from "react-router-dom";
import BarChart from "../../components/BarChart";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import Toast from "../../../public/services/toast";

const monthNames = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const AdminDashboard = () => {
  const [dashStats, setDashStats] = useState(null);
  const [userTable, setUserTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";
  const page = Number(searchParams.get("page")) || 1;

  const getDashStats = async () => {
    try {
      const res = await api("/api/admin/stats/");
      setDashStats(res.data);
    } catch {
      setDashStats(null);
    }
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const query = searchParams.toString()
        ? `?${searchParams.toString()}`
        : "";
      const res = await api(`/api/admin/users/${query}`);
      setUserTable(res.data);
    } catch {
      setUserTable(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => getUsers(), search ? 500 : 0);
    return () => clearTimeout(timer);
  }, [search, role, page]);

  const totalUsers = dashStats?.total_users ?? 0;
  const verifiedPct = dashStats?.verified_percentage ?? 0;
  const chartData = (dashStats?.registrations_chart || []).map((item) => {
    const month = new Date(item.month + "-01").getMonth();
    return { x: monthNames[month], y: item.count };
  });

  const users = userTable?.results || [];
  const count = userTable?.count || 0;
  const totalPages = userTable?.total_pages || 1;
  const currentPage = userTable?.current_page || 1;

  const handleStatus = async (id, isVerified) => {
    setLoadingId(id);
    const previous = userTable;

    setUserTable((prev) => ({
      ...prev,
      results: (prev?.results || []).map((u) =>
        u.id === id ? { ...u, isVerified: !isVerified } : u
      ),
    }));

    try {
      const endpoint = isVerified
        ? `/api/auth/users/${id}/unverify/`
        : `/api/auth/users/${id}/verify/`;

      const res = await api(endpoint, { method: "POST" });
      Toast.success(res.message);
      getUsers();
      setLoadingId(null);
    } catch (error) {
      console.log(error);
      setUserTable(previous);
      setLoadingId(null);
      Toast.error(error?.message || "حدث خطأ");
    }
  };
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between my-10">
          <div>
            <h1 className="text-32px text-[#0D1D2C] font-bold mb-1">
              إدارة المستخدمين
            </h1>
            <p className="font-normal text-base text-[#3E4946]">
              إدارة وتحديث صلاحيات وحالات مستخدمي المنصة.
            </p>
          </div>
          {/* <Link className="btn btn-primary font-medium text-14px">
            إضافة مستخدم جديد
            <span>
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 10V7H14V5H17V2H19V5H22V7H19V10H17ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z"
                  fill="white"
                />
              </svg>
            </span>
          </Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
          <div className="md:col-span-4 h-fit min-h-32 rounded-12px bg-[#FFD578] shadow-xl p-6 flex justify-between">
            <div>
              <div className="font-bold text-14px text-[#795A03]">
                الحسابات النشطة
              </div>
              <p className="text-3xl font-bold my-1">{verifiedPct}%</p>
              <div className="font-normal text-12px text-[#795A03]">
                كفاءة تشغيل الحسابات
              </div>
            </div>
            <div>
              <svg
                width="20"
                height="25"
                viewBox="0 0 20 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.6875 16.9375L15.75 9.875L13.9688 8.09375L8.6875 13.375L6.0625 10.75L4.28125 12.5312L8.6875 16.9375ZM10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 14.5417 19.0573 17.4219 17.1719 20.0156C15.2865 22.6094 12.8958 24.2708 10 25ZM10 22.375C12.1667 21.6875 13.9583 20.3125 15.375 18.25C16.7917 16.1875 17.5 13.8958 17.5 11.375V5.46875L10 2.65625L2.5 5.46875V11.375C2.5 13.8958 3.20833 16.1875 4.625 18.25C6.04167 20.3125 7.83333 21.6875 10 22.375Z"
                  fill="#795A03"
                />
              </svg>
            </div>
          </div>

          <div className="md:col-span-8 rounded-12px bg-[#FFFFFFCC] shadow-xl p-6 gap-3 flex justify-between">
            <div>
              <div className="font-normal text-12px text-[#3E4946]">
                إجمالي المستخدمين
              </div>
              <p className="font-bold text-48px text-primary my-1">
                {totalUsers.toLocaleString()}
              </p>
              <div className="font-normal text-12px text-[#006153] flex items-center gap-1">
                إجمالي المسجلين في المنصة
              </div>
            </div>
            <div className="grow">
              <BarChart data={chartData} height={250} />
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between bg-[#EEF4FF] p-6 rounded-tr-25px rounded-tl-25px">
            <div className="w-[40%]">
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  placeholder="بحث باسم المستخدم أو البريد..."
                  value={search}
                  onChange={(e) =>
                    setSearchParams({ search: e.target.value, role, page: "1" })
                  }
                />
              </label>
            </div>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 font-medium text-14px text-[#0D1D2C] bg-white"
              >
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12V10H11V12H7ZM3 7V5H15V7H3ZM0 2V0H18V2H0Z"
                    fill="#0D1D2C"
                  />
                </svg>
                تصفية النتائج
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a onClick={() => setSearchParams({ search, page: "1" })}>
                    الكل
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      setSearchParams({ search, role: "admin", page: "1" })
                    }
                  >
                    مدير
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      setSearchParams({ search, role: "user", page: "1" })
                    }
                  >
                    مستخدم
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead className="bg-[#DAEAFF]">
                <tr className="">
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    الاسم الكامل
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    البريد الإلكتروني
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    الدور
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    الحالة
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          {/* <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div> */}
                          <div>
                            <div className="font-bold text-base text-[#0D1D2C]">
                              {item.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-normal text-base text-[#3E4946 ]">
                        {item.email}
                      </td>
                      <td>
                        <div className="badge">{item.role}</div>
                      </td>
                      <td>
                        <div
                          className={`font-normal text-12px ${item.is_verified  ? "text-primary" : "text-error"}`}
                        >
                          {item.is_verified == true ? "نشط" : "غير نشط"}
                          <span></span>
                        </div>
                      </td>
                      {item.role == "user" ? (
                        <th>
                          <button
                            className={`btn btn-outline font-normal text-12px ${item.is_verified ? "btn-error" : "btn-primary"}`}
                            onClick={() =>
                              handleStatus(item.id, item.is_verified)
                            }
                            disabled={loadingId === item.id}
                          >
                            {loadingId === item.id ? (
                              <span className="loading loading-spinner"></span>
                            ) : item.is_verified ? (
                              " إلغاء التفعيل"
                            ) : (
                              "تفعيل"
                            )}
                          </button>
                        </th>
                      ) : (
                        <th></th>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                      لا يوجد مستخدمين
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="flex justify-center mb-10">
              <div className="join gap-2">
                <button
                  className="join-item btn"
                  disabled={page <= 1}
                  onClick={() =>
                    setSearchParams({ search, role, page: String(page - 1) })
                  }
                >
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      className={`join-item btn ${p === page ? "btn-active" : ""}`}
                      onClick={() =>
                        setSearchParams({ search, role, page: String(p) })
                      }
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  className="join-item btn"
                  disabled={page >= totalPages}
                  onClick={() =>
                    setSearchParams({ search, role, page: String(page + 1) })
                  }
                >
                  »
                </button>
              </div>
            </div>
            <p className="font-normal text-12px text-[#3E4946]">
              عرض 1-{users.length} من أصل {count} مستخدم
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
