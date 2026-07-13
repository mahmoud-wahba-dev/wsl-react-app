import { useSearchParams } from "react-router-dom";
import OrgCard from "../components/OrgCard";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { api } from "../utils/api";

const Organizations = () => {
  const [donorOrgs, setDonorOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1 });
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const funding_area = searchParams.get("funding_area") || "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api(`/api/grants/donors/${query}`);
        setDonorOrgs(data?.data?.results || []);
        setPagination({
          current_page: data?.data?.current_page || 1,
          total_pages: data?.data?.total_pages || 1,
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, search ? 500 : 0);
    return () => clearTimeout(timer);
  }, [search, funding_area, page]);
  return (
    <section>
      <div className="container">
        <div className="flex items-center  gap-4 mb-12">
          <div className="mt-16">
            <h1 className="font-bold text-32px text-[#0D1D2C] mb-1">
              المؤسسات المانحة
            </h1>

            <p className="font-normal text-base text-[#3E4946]">
              استكشف واكتشف الشريك المانح الأمثل لمشروعك التنموي{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-10">
          <label className="input flex-1">
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
              className="border-[#BDC9C5] h-12 rounded-8px"
              type="search"
              placeholder="البحث عن اسم المؤسسة..."
              value={search}
              onChange={(e) =>
                setSearchParams({ search: e.target.value, funding_area, page: "1" })
              }
            />
          </label>

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
                <a onClick={() => setSearchParams({ search, page: "1" })}>الكل</a>
              </li>
              <li>
                <a
                  onClick={() =>
                    setSearchParams({ search, funding_area: "التعليم", page: "1" })
                  }
                >
                  التعليم
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    setSearchParams({ search, funding_area: "الصحة", page: "1" })
                  }
                >
                  الصحة
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {loading ? (
            <div className="col-span-full">
              <Loader />
            </div>
          ) : donorOrgs.length > 0 ? (
            donorOrgs.map((item) => <OrgCard key={item.id} item={item} />)
          ) : (
            <h4 className="col-span-full text-center">لا يوجد مؤسسات مانحه</h4>
          )}
        </div>

        {pagination.total_pages > 1 && (
          <div className="flex justify-center mb-10">
            <div className="join gap-2">
              <button
                className="join-item btn"
                disabled={page <= 1}
                onClick={() => setSearchParams({ search, funding_area, page: String(page - 1) })}
              >«</button>

              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`join-item btn ${p === page ? "btn-active border-[#BDC9C5]" : ""}`}
                  onClick={() => setSearchParams({ search, funding_area, page: String(p) })}
                >{p}</button>
              ))}

              <button
                className="join-item btn"
                disabled={page >= pagination.total_pages}
                onClick={() => setSearchParams({ search, funding_area, page: String(page + 1) })}
              >»</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Organizations;
