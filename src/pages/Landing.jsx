import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import LandingHeader from "./LandingHeader";
import useScrollReveal from "../hooks/useScrollReveal";
import OrgCard from "../components/OrgCard";
import Loader from "../components/Loader";
import { api } from "../utils/api";
import ScrollToTop from "../components/ScrollToTop";

const features = [
  {
    title: "تقديم طلب منحة ومطابقة ذكية",
    description:
      "قدّم تفاصيل مشروعك والمنحة المطلوبة، وتحصل على نتائج مطابقة ذكية مع المؤسسات الأنسب لمجالك وأهدافك.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"
          stroke="#043464"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="m9 12 2 2 4-4" stroke="#24b0d8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "استعراض المؤسسات المانحة",
    description:
      "تصفّح المؤسسات المانحة وتعرف على مجالات تركيزها وشروطها قبل تقديم طلبك أو بعد ظهور نتائج المطابقة.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6"
          stroke="#043464"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 10h.01M15 10h.01" stroke="#24b0d8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "متابعة الطلبات والنتائج",
    description:
      "تابع طلباتك من مكان واحد، واطلع على نتائج المطابقة وتفاصيل كل طلب في أي وقت.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
          stroke="#043464"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "لوحة إحصائيات للمستخدم",
    description:
      "نظرة عامة على إجمالي طلباتك والمبالغ المطلوبة ومجالات التركيز ونشاطك الشهري في لوحة واحدة.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 19V5M4 19h16M8 17V10M12 17V7M16 17v-4"
          stroke="#043464"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 10h.01M12 7h.01M16 13h.01" stroke="#24b0d8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "إدارة متكاملة للمنصة",
    description:
      "للمشرفين: إدارة المستخدمين والمؤسسات المانحة وطلبات المنح من لوحة تحكم مركزية مع تقارير ونشاط واضح.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" stroke="#043464" strokeWidth="1.6" />
        <path
          d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5"
          stroke="#043464"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M17 4.5 19 6.5 17 8.5" stroke="#24b0d8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const steps = [
  {
    n: "١",
    title: "سجّل حسابك",
    description: "أنشئ حساباً جديداً وانتظر تفعيل المنصة للبدء بأمان.",
  },
  {
    n: "٢",
    title: "قدّم طلب المنحة",
    description: "أدخل بيانات الجمعية والمشروع والمبلغ المطلوب ومجالات التركيز.",
  },
  {
    n: "٣",
    title: "اطلع على نتائج المطابقة",
    description: "تعرّف على المؤسسات الأنسب لمشروعك بناءً على معايير المطابقة.",
  },
  {
    n: "٤",
    title: "تابع وتواصل",
    description: "راجع طلباتك ونتائجك واستكمل رحلة الربط مع الجهات المانحة.",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const { ref, className: visibleClass } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`landing-reveal ${visibleClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

const Landing = () => {
  const [search, setSearch] = useState("");
  const [fundingArea, setFundingArea] = useState("");
  const [fundingAreas, setFundingAreas] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [orgsLoading, setOrgsLoading] = useState(true);

  // Fetch funding area options once
  useEffect(() => {
    api("/api/grants/donors/funding-areas/")
      .then((res) => setFundingAreas(Array.isArray(res) ? res : res?.data ?? []))
      .catch(() => setFundingAreas([]));
  }, []);

  // Fetch orgs whenever search or filter changes
  useEffect(() => {
    const params = new URLSearchParams({ page_size: "6" });
    if (search) params.set("search", search);
    if (fundingArea) params.set("funding_area", fundingArea);

    const timer = setTimeout(async () => {
      setOrgsLoading(true);
      try {
        const data = await api(`/api/grants/donors/?${params}`);
        setOrgs(data?.data?.results || []);
      } catch {
        setOrgs([]);
      }
      setOrgsLoading(false);
    }, search ? 500 : 0);
    return () => clearTimeout(timer);
  }, [search, fundingArea]);

  return (
    <div id="top" className="min-h-screen bg-[#F8F9FF] text-[#0D1D2C]">
      <ScrollToTop />
      <LandingHeader />

      {/* Hero — one composition, brand first, full-bleed imagery */}
      <section className="relative overflow-hidden min-h-[min(92vh,880px)] flex items-center">
        <div className="landing-hero-media" aria-hidden="true">
          <img
            src="/landing/hero-partnership.jpg"
            alt=""
            className="landing-hero-photo landing-hero-photo-a"
          />
          <img
            src="/landing/hero-impact.jpg"
            alt=""
            className="landing-hero-photo landing-hero-photo-b"
          />
          <div className="landing-hero-overlay" />
          <div className="landing-hero-orb landing-hero-orb-a" />
          <div className="landing-hero-orb landing-hero-orb-b" />
          <div className="landing-hero-grid" />
        </div>

        <div className="container relative z-10 py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl landing-hero-enter">
            <p className="text-secondary font-semibold text-18px sm:text-22px tracking-wide mb-3">
              وصل
            </p>
            <h1 className="text-white font-bold text-36px sm:text-48px md:text-56px leading-tight mb-5">
              منصة الربط الذكي للمنح التنموية
            </h1>
            <p className="text-white/85 font-normal text-16px sm:text-18px leading-relaxed max-w-xl mb-10">
              اربط مشاريعك بالمؤسسات المانحة المناسبة عبر مطابقة ذكية، ومتابعة واضحة لطلباتك ونتائجك في مكان واحد.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="btn btn-lg border-0 bg-accent text-accent-content hover:bg-[#1a9fc4] font-medium text-16px landing-cta-hover"
              >
                ابدأ الآن
              </Link>
              <Link
                to="/login"
                className="btn btn-lg btn-outline border-secondary text-secondary hover:bg-secondary hover:text-primary font-medium text-16px landing-cta-hover"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 md:py-24">
        <div className="container">
          <Reveal>
            <h2 className="text-28px sm:text-36px font-bold text-primary mb-3 text-center">
              كل ما تحتاجه في منصة واحدة
            </h2>
            <p className="text-[#3E4946] text-base text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              من تقديم الطلب حتى نتائج المطابقة ومتابعة الأداء — أدوات واضحة للجمعيات والمشرفين.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="landing-feature">
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-12px bg-[#EEF4FF] flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-18px text-primary mb-2">{f.title}</h3>
                    <p className="font-normal text-14px text-[#3E4946] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-[#EEF4FF]/70">
        <div className="container">
          <Reveal>
            <h2 className="text-28px sm:text-36px font-bold text-primary mb-3 text-center">
              كيف تعمل المنصة
            </h2>
            <p className="text-[#3E4946] text-base text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              أربع خطوات بسيطة من التسجيل إلى متابعة نتائج المطابقة.
            </p>
          </Reveal>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 list-none p-0 m-0">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 100} className="relative">
                <div className="flex flex-col items-start lg:items-center text-start lg:text-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-content font-bold text-22px mb-4 shadow-md shadow-primary/20">
                    {step.n}
                  </span>
                  <h3 className="font-bold text-18px text-primary mb-2">{step.title}</h3>
                  <p className="font-normal text-14px text-[#3E4946] leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Tiers */}
      <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-[#EEF4FF]/70">
        <div className="container">
          <Reveal>
            <h2 className="text-28px sm:text-36px font-bold text-primary mb-3 text-center">
              اختر المستوى المناسب لك
            </h2>
            <p className="text-[#3E4946] text-base text-center max-w-2xl mx-auto mb-12">
              ابدأ مجاناً واستكشف المنصة، ثم انتقل إلى الباقة المميزة عندما تكون مستعداً.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

            {/* Tier 1 — Public */}
            <Reveal delay={0} className="flex">
              <div className="flex flex-col w-full rounded-16px bg-white border border-[#E2EAE8] p-8 shadow-sm">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#3B6FD4] text-12px font-semibold mb-4">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                    مجاني
                  </span>
                  <h3 className="font-bold text-22px text-[#0D1D2C] mb-1">الزائر</h3>
                  <p className="text-[#3E4946] text-14px leading-relaxed">
                    استكشف المنصة دون تسجيل — تصفّح المؤسسات وابحث بحرية.
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "تصفح المؤسسات المانحة",
                    "البحث بالاسم أو مجال التمويل",
                    "عرض تفاصيل كل مؤسسة",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-14px text-[#0D1D2C]">
                      <svg className="shrink-0 text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/organizations" className="btn btn-outline border-primary text-primary rounded-13px h-11 font-medium text-14px hover:bg-primary hover:text-white">
                  استعرض المؤسسات
                </Link>
              </div>
            </Reveal>

            {/* Tier 2 — Registered (free) */}
            <Reveal delay={100} className="flex">
              <div className="flex flex-col w-full rounded-16px bg-white border border-[#E2EAE8] p-8 shadow-sm">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7E0] text-[#795A03] text-12px font-semibold mb-4">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
                    مسجّل مجاناً
                  </span>
                  <h3 className="font-bold text-22px text-[#0D1D2C] mb-1">العضو</h3>
                  <p className="text-[#3E4946] text-14px leading-relaxed">
                    سجّل حسابك واستمتع بمطابقة ذكية محدودة لاختبار المنصة.
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "كل مزايا الزائر",
                    "تقديم طلبات المنح",
                    "مطابقة ذكية (عدد محدود)",
                    "عرض نتائج المطابقة الأساسية",
                    "متابعة طلباتك",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-14px text-[#0D1D2C]">
                      <svg className="shrink-0 text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="btn btn-outline border-primary text-primary rounded-13px h-11 font-medium text-14px hover:bg-primary hover:text-white">
                  إنشاء حساب مجاني
                </Link>
              </div>
            </Reveal>

            {/* Tier 3 — Premium */}
            <Reveal delay={200} className="flex">
              <div className="flex flex-col w-full rounded-16px bg-primary p-8 shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
                  <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white" />
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white" />
                </div>
                <div className="relative mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-12px font-semibold mb-4">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.1-2h9.8l1-5.3-3.3 3.5L12 7.1l-2.6 5.1-3.3-3.5 1 5.3z"/></svg>
                    الأكثر شيوعاً
                  </span>
                  <h3 className="font-bold text-22px text-white mb-1">المميز</h3>
                  <p className="text-white/80 text-14px leading-relaxed">
                    احصل على كامل قوة المنصة — مطابقة غير محدودة وتقارير وتفاصيل كاملة.
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1 relative">
                  {[
                    "كل مزايا العضو",
                    "مطابقة ذكية غير محدودة",
                    "أسباب التطابق والشروط الناقصة",
                    "توصيات مخصصة لكل مؤسسة",
                    "تنزيل نتائج المطابقة PDF",
                    "لوحة إحصائيات متكاملة",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-14px text-white">
                      <svg className="shrink-0 text-[#A8F0E0]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="relative btn bg-white text-primary hover:bg-white/90 border-0 rounded-13px h-11 font-medium text-14px">
                  ابدأ الآن
                </Link>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Organizations browse */}
      <section id="organizations" className="py-16 sm:py-20 md:py-24">
        <div className="container">
          <Reveal>
            <h2 className="text-28px sm:text-36px font-bold text-primary mb-3 text-center">
              استكشف المؤسسات المانحة
            </h2>
            <p className="text-[#3E4946] text-base text-center max-w-2xl mx-auto mb-10">
              تصفّح المؤسسات المانحة وابحث بالاسم أو مجال التمويل.
            </p>
          </Reveal>

          {/* Search + filter */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <label className="input flex-1 min-w-48">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </g>
              </svg>
              <input
                type="search"
                className="h-12"
                placeholder="البحث عن اسم المؤسسة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            {fundingAreas.length > 0 && (
              <select
                dir="rtl"
                className="select border-[#BDC9C5] h-12 rounded-8px min-w-48 font-normal text-14px text-[#3E4946]"
                value={fundingArea}
                onChange={(e) => setFundingArea(e.target.value)}
              >
                <option value="">جميع مجالات التمويل</option>
                {fundingAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            )}

            {fundingArea && (
              <button
                onClick={() => setFundingArea("")}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#0061531A] text-primary rounded-full text-13px font-medium hover:bg-[#00615330] transition-colors"
              >
                {fundingArea}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
          </div>

          {/* Grid */}
          {orgsLoading ? (
            <Loader />
          ) : orgs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {orgs.map((item) => (
                <OrgCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center py-16 text-gray-500">لا توجد مؤسسات مانحة</p>
          )}

          {/* View all link */}
          <div className="flex justify-center mt-4">
            <Link
              to="/organizations"
              className="btn btn-outline border-primary text-primary rounded-13px h-11 font-medium text-14px hover:bg-primary hover:text-white"
            >
              عرض جميع المؤسسات
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="cta" className="py-16 sm:py-20">
        <div className="container">
          <Reveal>
            <div className="landing-cta-band rounded-16px px-6 py-12 sm:px-10 sm:py-16 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-28px sm:text-36px font-bold text-white mb-3">
                  جاهز للربط مع الجهات المانحة؟
                </h2>
                <p className="text-white/85 text-base max-w-xl mx-auto mb-8">
                  انضم إلى وصل وابدأ رحلة المطابقة الذكية لمشاريعك التنموية اليوم.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to="/register"
                    className="btn btn-lg border-0 bg-accent text-accent-content hover:bg-[#1a9fc4] font-medium landing-cta-hover"
                  >
                    إنشاء حساب
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-lg btn-outline border-secondary text-secondary hover:bg-secondary hover:text-primary font-medium landing-cta-hover"
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
