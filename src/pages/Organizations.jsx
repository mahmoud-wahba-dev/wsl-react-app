import { useSearchParams } from "react-router-dom";
import OrgCard from "../components/OrgCard";
import { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { api } from "../utils/api";

const PAGE_SIZE = 10;

const Organizations = () => {
  const [donorOrgs, setDonorOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 0,
    current_page: 1,
    total_pages: 1,
    page_size: PAGE_SIZE,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("page_size")) || PAGE_SIZE;

  const getParams = useCallback(
    (overrides = {}) => {
      const params = new URLSearchParams();
      const values = {
        search,
        page: String(page),
        page_size: String(pageSize),
        ...overrides,
      };
      Object.entries(values).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          params.set(key, String(value));
        }
      });
      return params;
    },
    [search, page, pageSize]
  );

  const setPage = (nextPage) => {
    setSearchParams(getParams({ page: String(nextPage) }));
  };

  useEffect(() => {
    const params = getParams();
    const query = params.toString() ? `?${params.toString()}` : "";

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api(`/api/grants/donors/${query}`);
        setDonorOrgs(data?.data?.results || []);
        setPagination({
          count: data?.data?.count || 0,
          current_page: data?.data?.current_page || 1,
          total_pages: data?.data?.total_pages || 1,
          page_size: data?.data?.page_size || pageSize,
        });
      } catch (err) {
        console.error(err);
        setDonorOrgs([]);
        setPagination({ count: 0, current_page: 1, total_pages: 1, page_size: pageSize });
      }
      setLoading(false);
    }, search ? 500 : 0);
    return () => clearTimeout(timer);
  }, [getParams, search, pageSize]);

  const count = pagination.count || 0;
  const currentPage = pagination.current_page || page;
  const totalPages = pagination.total_pages || 1;
  const effectivePageSize = pagination.page_size || pageSize;
  const start = count ? (currentPage - 1) * effectivePageSize + 1 : 0;
  const end = (currentPage - 1) * effectivePageSize + donorOrgs.length;

  return (
    <section>
      <div className="container">
        <div className="flex items-center gap-4 mb-12">
          <div className="mt-16">
            <h1 className="font-bold text-32px text-[#0D1D2C] mb-1">
              المؤسسات المانحة
            </h1>
            <p className="font-normal text-base text-[#3E4946]">
              استكشف واكتشف الشريك المانح الأمثل لمشروعك التنموي
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mb-10">
          <label className="input flex-1">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input
              className="border-[#BDC9C5] h-12 rounded-8px"
              type="search"
              placeholder="ابحث باسم المؤسسة أو مجال التمويل..."
              value={search}
              onChange={(e) =>
                setSearchParams(getParams({ search: e.target.value, page: "1" }))
              }
            />
          </label>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 items-stretch">
          {loading ? (
            <div className="col-span-full">
              <Loader />
            </div>
          ) : donorOrgs.length > 0 ? (
            donorOrgs.map((item) => <OrgCard key={item.id} item={item} />)
          ) : (
            <h4 className="col-span-full text-center py-20 text-gray-500">
              لا يوجد مؤسسات مانحة
            </h4>
          )}
        </div>

        {/* Pagination */}
        {count > 0 && (
          <div className="flex flex-col items-center gap-2 mb-10">
            <div className="join gap-2">
              <button className="join-item btn" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>«</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`join-item btn ${p === currentPage ? "btn-active border-[#BDC9C5]" : ""}`}
                  onClick={() => setPage(p)}
                >{p}</button>
              ))}
              <button className="join-item btn" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>»</button>
            </div>
            <p className="font-normal text-12px text-[#3E4946]">
              عرض {start}-{end} من أصل {count} مؤسسة
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Organizations;
