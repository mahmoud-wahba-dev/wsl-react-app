import BarChart from "../../components/BarChart";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";

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

const StatCard = ({ title, value, sub, bg = "bg-white", valueColor = "text-[#0D1D2C]", icon }) => (
  <div className={`rounded-12px ${bg} shadow-xl p-6 flex justify-between gap-4`}>
    <div>
      <div className="font-bold text-14px text-[#3E4946]">{title}</div>
      <p className={`text-3xl font-bold my-1 ${valueColor}`}>{value}</p>
      <div className="font-normal text-12px text-[#3E4946]">{sub}</div>
    </div>
    {icon && <div className="shrink-0">{icon}</div>}
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    setLoading(true);
    try {
      const res = await api("/api/admin/stats/");
      setStats(res.data);
    } catch {
      setStats(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  const users = stats?.users || {};
  const donors = stats?.donors || {};
  const requests = stats?.grant_requests || {};
  const charts = stats?.charts || {};

  const registrationsChart = (charts.registrations_by_month || []).map((item) => {
    const month = new Date(`${item.month}-01`).getMonth();
    return { x: monthNames[month], y: item.count };
  });

  const requestsChart = (charts.requests_by_month || []).map((item) => {
    const month = new Date(`${item.month}-01`).getMonth();
    return { x: monthNames[month], y: item.count };
  });

  const fmt = (n) => Number(n || 0).toLocaleString("en-US");
  const fmtAmount = (n) => Number(n || 0).toLocaleString("en-US");

  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between my-10">
          <div>
            <h1 className="text-32px text-[#0D1D2C] font-bold mb-1">
              لوحة التحكم
            </h1>
            <p className="font-normal text-base text-[#3E4946]">
              نظرة عامة على نشاط المستخدمين وطلبات المنح والمؤسسات.
            </p>
          </div>
          {stats?.generated_at && (
            <div className="font-normal text-12px text-[#3E4946] bg-white rounded-12px px-4 py-2 shadow-sm">
              آخر تحديث: {new Date(stats.generated_at).toLocaleString("ar-EG")}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : stats ? (
          <>
            {/* Top stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <StatCard
                title="إجمالي المستخدمين"
                value={fmt(users.total)}
                sub="إجمالي المسجلين في المنصة"
                valueColor="text-primary"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4 0-8 2.4-8 6v1h16v-1c0-3.6-4-6-8-6Z" fill="#043464" />
                  </svg>
                }
              />
              <StatCard
                title="الحسابات النشطة"
                value={`${users.verified_percentage ?? 0}%`}
                sub={`${users.verified ?? 0} مفعّل · ${users.unverified ?? 0} غير مفعّل`}
                bg="bg-[#FFD578]"
                valueColor="text-[#795A03]"
                icon={
                  <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6875 16.9375L15.75 9.875L13.9688 8.09375L8.6875 13.375L6.0625 10.75L4.28125 12.5312L8.6875 16.9375ZM10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 14.5417 19.0573 17.4219 17.1719 20.0156C15.2865 22.6094 12.8958 24.2708 10 25ZM10 22.375C12.1667 21.6875 13.9583 20.3125 15.375 18.25C16.7917 16.1875 17.5 13.8958 17.5 11.375V5.46875L10 2.65625L2.5 5.46875V11.375C2.5 13.8958 3.20833 16.1875 4.625 18.25C6.04167 20.3125 7.83333 21.6875 10 22.375Z" fill="#795A03" />
                  </svg>
                }
              />
              <StatCard
                title="المؤسسات النشطة"
                value={fmt(donors.total_active)}
                sub="إجمالي المؤسسات المتاحة"
                valueColor="text-primary"
                bg="bg-[#DAEAFF]"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="#043464" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
              <StatCard
                title="طلبات المنح"
                value={fmt(requests.total)}
                sub={`${fmt(requests.last_30_days)} خلال آخر 30 يوم`}
                valueColor="text-primary"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 3h10a2 2 0 0 1 2 2v16l-2-1-2 1-2-1-2 1-2-1-2 1-2 1V5a2 2 0 0 1 2-2Zm4 4v2h5V7h-5Zm-3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 4v2h5v-2h-5Zm-3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 4v2h5v-2h-5Zm-3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" fill="#043464" />
                  </svg>
                }
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="rounded-12px bg-[#FFFFFFCC] shadow-xl p-6">
                <h2 className="font-bold text-base text-[#0D1D2C] mb-4">
                  تسجيل المستخدمين حسب الشهر
                </h2>
                <BarChart data={registrationsChart} height={260} />
              </div>
              <div className="rounded-12px bg-[#FFFFFFCC] shadow-xl p-6">
                <h2 className="font-bold text-base text-[#0D1D2C] mb-4">
                  طلبات المنح حسب الشهر
                </h2>
                <BarChart data={requestsChart} height={260} />
              </div>
            </div>

            {/* Grant requests details */}
            <div className="rounded-12px bg-[#FFFFFFCC] shadow-xl p-6 mb-10">
              <h2 className="font-bold text-base text-[#0D1D2C] mb-6">
                تفاصيل طلبات المنح
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#EEF4FF] rounded-12px p-4">
                  <div className="font-normal text-12px text-[#3E4946]">طلبات مرخصة</div>
                  <div className="font-bold text-2xl text-primary my-1">{fmt(requests.licensed_count)}</div>
                </div>
                <div className="bg-[#EEF4FF] rounded-12px p-4">
                  <div className="font-normal text-12px text-[#3E4946]">لديه حساب بنكي</div>
                  <div className="font-bold text-2xl text-primary my-1">{fmt(requests.with_bank_account_count)}</div>
                </div>
                <div className="bg-[#EEF4FF] rounded-12px p-4">
                  <div className="font-normal text-12px text-[#3E4946]">إجمالي المبلغ المطلوب</div>
                  <div className="font-bold text-2xl text-primary my-1">{fmtAmount(requests.total_requested_amount)}</div>
                </div>
                <div className="bg-[#EEF4FF] rounded-12px p-4">
                  <div className="font-normal text-12px text-[#3E4946]">متوسط المبلغ المطلوب</div>
                  <div className="font-bold text-2xl text-primary my-1">{fmtAmount(requests.avg_requested_amount)}</div>
                </div>
                <div className="bg-[#EEF4FF] rounded-12px p-4">
                  <div className="font-normal text-12px text-[#3E4946]">إجمالي المستفيدين</div>
                  <div className="font-bold text-2xl text-primary my-1">{fmt(requests.total_beneficiaries)}</div>
                </div>
                <div className="bg-[#EEF4FF] rounded-12px p-4">
                  <div className="font-normal text-12px text-[#3E4946]">متوسط المدة</div>
                  <div className="font-bold text-2xl text-primary my-1">{requests.avg_duration_months ?? 0} شهر</div>
                </div>
              </div>
            </div>

            {/* Regions + top requesters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-12px bg-[#FFFFFFCC] shadow-xl p-6">
                <h2 className="font-bold text-base text-[#0D1D2C] mb-4">
                  الطلبات حسب المنطقة
                </h2>
                {(requests.by_region || []).length ? (
                  <ul className="space-y-3">
                    {requests.by_region.map((item, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span className="font-normal text-14px text-[#3E4946]">{item.region}</span>
                        <span className="badge bg-[#DAEAFF] text-primary font-bold">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-normal text-12px text-[#3E4946]">لا توجد بيانات</p>
                )}
              </div>
              <div className="rounded-12px bg-[#FFFFFFCC] shadow-xl p-6">
                <h2 className="font-bold text-base text-[#0D1D2C] mb-4">
                  الأعلى طلباً للمنح
                </h2>
                {(requests.top_requesters || []).length ? (
                  <ul className="space-y-3">
                    {requests.top_requesters.map((item, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span className="font-normal text-14px text-[#3E4946]">{item.email}</span>
                        <span className="badge bg-[#DAEAFF] text-primary font-bold">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-normal text-12px text-[#3E4946]">لا توجد بيانات</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-24 text-gray-500">
            تعذر تحميل البيانات
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
