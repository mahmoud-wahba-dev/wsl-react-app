import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { api } from "../utils/api";
import MatchDonorCard from "../components/MatchDonorCard";
import GrantRequestCard from "../components/GrantRequestCard";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      try {
        const data = await api("/api/grants/requests/");
        setRequests(data.data.results.map(mapRequest));
      } catch {
        setRequests([]);
      }
      setLoading(false);
    };
    loadRequests();
  }, []);

  function mapRequest(item) {
    return {
      id: item.id,
      title: item.project_title,
      organization: item.association_name,
      amount: item.requested_amount,
      date: new Date(item.created_at).toLocaleDateString("ar-SA"),
      tags: item.focus_areas,
      status: "تم الارسال",
      statusType: "sent",
      icon: null,
    };
  }

  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between gap-4 mb-12">
          <div className="mt-16">
            <h1 className="font-bold text-32px text-[#0D1D2C] mb-1">طلباتي</h1>
            <p className="font-normal text-base text-[#3E4946]">
              جميع طلبات المطابقة التي قدمتها
            </p>
          </div>
          {/* <Link
            to={"/match-request"}
            className="btn btn-primary mt-2 font-medium text-14px rounded-13px"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 6.66667H0V5H5V0H6.66667V5H11.6667V6.66667H6.66667V11.6667H5V6.66667Z"
                fill="white"
              />
            </svg>
            تقديم طلب جديد
          </Link> */}
        </div>

        <div className="flex flex-col gap-6">
          {loading ? (
            <Loader />
          ) : requests.length > 0 ? (
            requests.map((req) => <GrantRequestCard key={req.id} req={req} />)
          ) : (
            <h4 className="text-center py-20 text-gray-500">لا توجد طلبات</h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default Requests;
