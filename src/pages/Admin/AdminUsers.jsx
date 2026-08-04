import { useSearchParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import Toast from "../../../public/services/toast";

const AdminUsers = () => {
  const [userTable, setUserTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";
  const page = Number(searchParams.get("page")) || 1;

  const PAGE_SIZE = 7;

  const setPage = (p, newRole) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (newRole) params.set("role", newRole);
    else if (role) params.set("role", role);
    params.set("page", String(p));
    params.set("page_size", String(PAGE_SIZE));
    setSearchParams(params);
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (role) params.set("role", role);
      params.set("page", String(page));
      params.set("page_size", String(PAGE_SIZE));
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await api(`/api/admin/users/${query}`);
      setUserTable(res.data);
    } catch {
      setUserTable(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => getUsers(), search ? 500 : 0);
    return () => clearTimeout(timer);
  }, [search, role, page]);

  const users = userTable?.results || [];
  const count = userTable?.count || 0;
  const totalPages = userTable?.total_pages || 1;
  const currentPage = userTable?.current_page || page;
  const pageSize = userTable?.page_size || PAGE_SIZE;
  const start = count ? (currentPage - 1) * pageSize + 1 : 0;
  const end = (currentPage - 1) * pageSize + users.length;

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
        <div className="my-10">
          <h1 className="text-32px text-[#0D1D2C] font-bold mb-1">
            إدارة المستخدمين
          </h1>
          <p className="font-normal text-base text-[#3E4946]">
            إدارة وتحديث صلاحيات وحالات مستخدمي المنصة.
          </p>
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
                    setSearchParams(
                      Object.fromEntries(
                        Object.entries({ search: e.target.value, role, page: "1" }).filter(
                          ([, v]) => v !== ""
                        )
                      )
                    )
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
                  <a onClick={() => setPage(1)}>الكل</a>
                </li>
                <li>
                  <a onClick={() => setPage(1, "admin")}>مدير</a>
                </li>
                <li>
                  <a onClick={() => setPage(1, "user")}>مستخدم</a>
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
                          className={`font-normal text-12px ${item.is_verified ? "text-primary" : "text-error"}`}
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
        {count > 0 && (
          <div className="flex flex-col items-center gap-2 mb-10">
            <div className="join gap-2">
              <button
                className="join-item btn"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    className={`join-item btn ${p === page ? "btn-active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                className="join-item btn"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                »
              </button>
            </div>
            <p className="font-normal text-12px text-[#3E4946]">
              عرض {start}-{end} من أصل {count} مستخدم
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminUsers;
