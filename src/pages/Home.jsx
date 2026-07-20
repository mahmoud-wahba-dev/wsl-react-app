import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import BarChart from "../components/BarChart";
import useAuth from "../hooks/useAuth";

const monthNames = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api("/api/me/stats/");
        setStats(data.data);
      } catch {
        setStats(null);
      }
      setLoading(false);
    };
    load();
  }, []);

  const chartData = (stats?.requests_chart || []).map((item) => {
    const month = new Date(item.month + "-01").getMonth();
    return { x: monthNames[month], y: item.count };
  });

  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between my-10">
          <div>
            <h1 className="text-32px text-[#0D1D2C] font-bold mb-1">
              مرحباً {user?.full_name || "مرحباً"}
            </h1>
            <p className="font-normal text-base text-[#3E4946]">
              نظرة عامة على طلباتك وإحصائياتك
            </p>
          </div>
    
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="md:col-span-3 h-32 rounded-12px bg-gray-100 animate-pulse shadow-xl p-6"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
              <div className="md:col-span-6 h-fit min-h-32 rounded-12px bg-[#006153] shadow-xl p-6">
                <div className="font-bold text-14px text-white/80">إجمالي الطلبات</div>
                <p className="text-3xl font-bold my-1 text-white">{stats?.total_requests || 0}</p>
                <div className="font-normal text-12px text-white/60">عدد طلبات المطابقة المقدمة</div>
              </div>

              <div className="md:col-span-6 h-fit min-h-32 rounded-12px bg-[#FFD578] shadow-xl p-6">
                <div className="font-bold text-14px text-[#795A03]">إجمالي المبلغ المطلوب</div>
                <p className="text-3xl font-bold my-1 text-[#795A03]">
                  {(stats?.total_requested_amount || 0).toLocaleString()}
                </p>
                <div className="font-normal text-12px text-[#795A03]">ريال سعودي</div>
              </div>


            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
              <div className="lg:col-span-7 rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">الطلبات خلال الشهر</h3>
                {chartData.length > 0 ? (
                  <BarChart data={chartData} height={250} />
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-400">
                    لا توجد طلبات بعد
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">مجالات التركيز</h3>
                {stats?.focus_areas?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {stats.focus_areas.map((area, i) => (
                      <div
                        key={i}
                        className="badge badge-soft py-2 bg-[#0061531A] rounded-99px px-4 font-normal text-13px text-[#006153]"
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">لم يتم تحديد مجالات تركيز بعد</p>
                )}
              </div>
            </div>

            {stats?.latest_request && (
              <div className="rounded-12px bg-white shadow-xl p-6 mb-10">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">آخر طلب</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-16px text-[#0D1D2C] mb-1">
                      {stats.latest_request.project_title}
                    </p>
                    <p className="font-normal text-14px text-[#3E4946] mb-1">
                      {stats.latest_request.association_name}
                    </p>
                    <p className="font-normal text-12px text-[#3E4946]">
                      {new Date(stats.latest_request.created_at).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                  <Link
                    to={`/match-result/${stats.latest_request.id}`}
                    className="btn btn-primary font-medium text-14px"
                  >
                    عرض النتائج
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
