import { useSearchParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";

const AdminRequests = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const PAGE_SIZE = 7;

  const setPage = (p) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(p));
    params.set("page_size", String(PAGE_SIZE));
    setSearchParams(params);
  };

  const getRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", String(page));
      params.set("page_size", String(PAGE_SIZE));
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await api(`/api/grants/requests/${query}`);
      setTable(res.data);
    } catch {
      setTable(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => getRequests(), search ? 500 : 0);
    return () => clearTimeout(timer);
  }, [search, page]);

  const requests = table?.results || [];
  const count = table?.count || 0;
  const totalPages = table?.total_pages || 1;
  const currentPage = table?.current_page || 1;

  return (
    <section>
      <div className="container">
        <div className="my-10">
          <h1 className="text-32px text-[#0D1D2C] font-bold mb-1">
            طلبات المنح
          </h1>
          <p className="font-normal text-base text-[#3E4946]">
            مراجعة وإدارة طلبات المنح المقدمة من المستخدمين.
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
                  placeholder="بحث باسم الجمعية أو عنوان المشروع..."
                  value={search}
                  onChange={(e) =>
                    setSearchParams(
                      Object.fromEntries(
                        Object.entries({ search: e.target.value, page: "1" }).filter(
                          ([, v]) => v !== ""
                        )
                      )
                    )
                  }
                />
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-[#DAEAFF]">
                <tr>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    الجمعية
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    المشروع
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    صاحب الطلب
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    مجالات التركيز
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    المستفيدون
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    المبلغ المطلوب
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    المدة
                  </th>
                  <th className="font-medium text-14px text-[#3E4946] py-6">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </td>
                  </tr>
                ) : requests.length > 0 ? (
                  requests.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="font-bold text-base text-[#0D1D2C]">
                          {item.association_name}
                        </div>
                        {item.region && (
                          <div className="font-normal text-12px text-[#3E4946]">
                            {item.region}
                          </div>
                        )}
                      </td>
                      <td className="font-normal text-base text-[#3E4946]">
                        {item.project_title}
                      </td>
                      <td className="font-normal text-base text-[#3E4946]">
                        {item.owner?.email}
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {item.focus_areas?.slice(0, 2).map((area, i) => (
                            <span
                              key={i}
                              className="badge badge-soft bg-[#0061531A] text-[#006153] text-11px"
                            >
                              {area}
                            </span>
                          ))}
                          {item.focus_areas?.length > 2 && (
                            <div className="dropdown dropdown-right">
                              <div
                                tabIndex={0}
                                role="button"
                                className="badge bg-[#EEF4FF] text-primary cursor-pointer"
                              >
                                +{item.focus_areas.length - 2}
                              </div>
                              <ul
                                tabIndex="-1"
                                className="dropdown-content menu bg-base-100 rounded-box z-[999] w-48 p-2 shadow-sm"
                              >
                                {item.focus_areas.slice(2).map((area, i) => (
                                  <li key={i}>
                                    <span className="text-12px text-[#3E4946]">
                                      {area}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="font-normal text-base text-[#3E4946]">
                        {Number(item.beneficiaries_count || 0).toLocaleString("en-US")}
                      </td>
                      <td>
                        <div className="font-bold text-base text-primary">
                          {Number(item.requested_amount || 0).toLocaleString("en-US")}
                        </div>
                      </td>
                      <td className="font-normal text-base text-[#3E4946]">
                        {item.duration_months} شهر
                      </td>
                      <td>
                        <div className="flex flex-col gap-1">
                          <span
                            className={`badge  text-11px ${item.is_licensed ? "bg-[#0061531A] text-[#006153]" : "bg-[#FFD578] text-[#795A03]"}`}
                          >
                            {item.is_licensed ? "مرخصة" : "غير مرخصة"}
                          </span>
                          <span
                            className={`badge text-11px py-5 ${item.has_bank_account ? "bg-[#0061531A] text-[#006153]" : "bg-[#EEF4FF] text-[#3E4946]"}`}
                          >
                            {item.has_bank_account ? "لديه حساب بنكي" : "بدون حساب بنكي"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-500">
                      لا توجد طلبات
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
              عرض {requests.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-
              {(currentPage - 1) * PAGE_SIZE + requests.length} من أصل {count} طلب
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminRequests;
