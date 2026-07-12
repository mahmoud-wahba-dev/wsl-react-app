import { Link } from "react-router-dom";
import OrgCard from "../components/OrgCard";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "../components/Loader";
import { api } from "../utils/api";

const baseURL = import.meta.env.VITE_BASE_URL;

const Organizations = () => {
  const [donorOrgs, setDonorOrgs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const data = await api("/api/grants/donors/");
      setDonorOrgs(data.data.results);
      setLoading(false);
    };
    loadData();
  }, []);
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
              required
              placeholder="البحث عن اسم المؤسسة..."
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
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
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

        <div className="center mb-10">
          <div className="join gap-2 ">
            <button className="join-item btn">«</button>

            <button className="join-item btn border-[#BDC9C5] ">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organizations;
