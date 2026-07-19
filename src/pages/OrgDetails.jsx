import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Loader from "../components/Loader";
import orgImg from "../assets/imgs/org.jpg";

const methodLabels = {
  individual: "مباشر",
  partners: "عبر شركاء",
  both: "مباشر + شركاء",
};

const OrgDetails = () => {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api(`/api/grants/donors/${id}/`);
        setOrg(data.data);
      } catch {
        setOrg(null);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <section>
        <div className="container mt-16">
          <Loader />
        </div>
      </section>
    );
  }

  if (!org) {
    return (
      <section>
        <div className="container mt-16 text-center py-20">
          <h2 className="font-bold text-24px text-[#0D1D2C] mb-4">
            المؤسسة غير موجودة
          </h2>
          <Link to="/organizations" className="btn btn-primary">
            العودة للمؤسسات
          </Link>
        </div>
      </section>
    );
  }

  const logoSrc = org.logo ?? orgImg;
  const loc = org.location || "السعودية";

  return (
    <section>
      <div className="container mt-10 mb-20">
        <Link
          to="/organizations"
          className="inline-flex items-center gap-2 text-14px text-[#3E4946] hover:text-primary mb-8 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          العودة للمؤسسات
        </Link>

        {/* Header */}
        <div className="flex items-start gap-6 mb-10">
          <div className="size-24 bg-[#E4EFFF] rounded-12px flex items-center justify-center shrink-0">
            <img src={logoSrc} className="size-20 object-contain" alt={org.name} />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-32px text-[#0D1D2C] mb-2">{org.name}</h1>
            <div className="flex items-center gap-4 flex-wrap mb-3">
              <span className="flex items-center gap-1 font-normal text-14px text-[#3E4946]">
                <svg width="14" height="14" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 7.5C6.4125 7.5 6.76562 7.35312 7.05937 7.05937C7.35312 6.76562 7.5 6.4125 7.5 6C7.5 5.5875 7.35312 5.23438 7.05937 4.94063C6.76562 4.64688 6.4125 4.5 6 4.5C5.5875 4.5 5.23438 4.64688 4.94063 4.94063C4.64688 5.23438 4.5 5.5875 4.5 6C4.5 6.4125 4.64688 6.76562 4.94063 7.05937C5.23438 7.35312 5.5875 7.5 6 7.5ZM6 13.0125C7.525 11.6125 8.65625 10.3406 9.39375 9.19687C10.1313 8.05312 10.5 7.0375 10.5 6.15C10.5 4.7875 10.0656 3.67188 9.19687 2.80312C8.32812 1.93437 7.2625 1.5 6 1.5C4.7375 1.5 3.67188 1.93437 2.80312 2.80312C1.93437 3.67188 1.5 4.7875 1.5 6.15C1.5 7.0375 1.86875 8.05312 2.60625 9.19687C3.34375 10.3406 4.475 11.6125 6 13.0125ZM6 15C3.9875 13.2875 2.48438 11.6969 1.49063 10.2281C0.496875 8.75937 0 7.4 0 6.15C0 4.275 0.603125 2.78125 1.80938 1.66875C3.01562 0.55625 4.4125 0 6 0C7.5875 0 8.98438 0.55625 10.1906 1.66875C11.3969 2.78125 12 4.275 12 6.15C12 7.4 11.5031 8.75937 10.5094 10.2281C9.51562 11.6969 8.0125 13.2875 6 15Z" fill="#3E4946"/>
                </svg>
                {loc}
              </span>
              {org.website && (
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-normal text-14px text-primary hover:underline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  زيارة الموقع
                </a>
              )}
            </div>
            <p className="font-normal text-base text-[#3E4946] leading-relaxed">
              {org.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Right column - main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Policy */}
            <div className="rounded-12px bg-white shadow-xl p-6">
              <h3 className="font-bold text-18px text-[#0D1D2C] mb-3">السياسة</h3>
              <p className="font-normal text-14px text-[#3E4946] leading-relaxed">
                {org.policy_text}
              </p>
            </div>

            {/* Funding areas */}
            {org.funding_areas?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">مجالات التمويل</h3>
                <div className="flex flex-wrap gap-2">
                  {org.funding_areas.map((area, i) => (
                    <div
                      key={i}
                      className="badge badge-soft py-2 bg-[#0061531A] rounded-99px px-4 font-normal text-13px text-[#006153]"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility criteria */}
            {org.eligibility_criteria?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">شروط الأهلية</h3>
                <ul className="space-y-2">
                  {org.eligibility_criteria.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-normal text-14px text-[#3E4946]">
                      <svg className="size-5 mt-0.5 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required documents */}
            {org.required_documents?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">المستندات المطلوبة</h3>
                <ul className="space-y-2">
                  {org.required_documents.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-normal text-14px text-[#3E4946]">
                      <svg className="size-5 mt-0.5 shrink-0 text-[#795A03]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Evaluation criteria */}
            {org.evaluation_criteria?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">معايير التقييم</h3>
                <ul className="space-y-2">
                  {org.evaluation_criteria.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-normal text-14px text-[#3E4946]">
                      <svg className="size-5 mt-0.5 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Priority factors */}
            {org.priority_factors?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">عوامل الأولوية</h3>
                <ul className="space-y-2">
                  {org.priority_factors.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-normal text-14px text-[#3E4946]">
                      <svg className="size-5 mt-0.5 shrink-0 text-error" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Left column - sidebar */}
          <div className="space-y-6">
            {/* Apply button */}
            {org.accepting_applications && (
              <div className="rounded-12px bg-primary text-white p-6 text-center">
                <h3 className="font-bold text-18px mb-2">المنصة مفتوحة للتقديم</h3>
                <p className="font-normal text-13px text-white/80 mb-4">
                  يمكنك تقديم مشروعك الآن
                </p>
                <Link to="/match-request" className="btn bg-white text-primary border-none hover:bg-white/90 font-medium text-14px">
                  قدّم مشروعك
                </Link>
              </div>
            )}

            {/* Quick info */}
            <div className="rounded-12px bg-white shadow-xl p-6">
              <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">معلومات سريعة</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-normal text-14px text-[#3E4946]">رقم الترخيص</span>
                  <span className="font-medium text-14px text-[#0D1D2C]">{org.license_number || "—"}</span>
                </div>
                <div className="border-t border-[#BDC9C5]"></div>
                <div className="flex items-center justify-between">
                  <span className="font-normal text-14px text-[#3E4946]">طريقة العمل</span>
                  <span className="font-medium text-14px text-[#0D1D2C]">{methodLabels[org.methodology] || org.methodology}</span>
                </div>
                <div className="border-t border-[#BDC9C5]"></div>
                <div className="flex items-center justify-between">
                  <span className="font-normal text-14px text-[#3E4946]">عدد مرات التمويل بالسنة</span>
                  <span className="font-medium text-14px text-[#0D1D2C]">{org.funding_frequency_per_year || "غير محدد"}</span>
                </div>
                <div className="border-t border-[#BDC9C5]"></div>
                <div className="flex items-center justify-between">
                  <span className="font-normal text-14px text-[#3E4946]">الحد الأدنى للمنحة</span>
                  <span className="font-medium text-14px text-[#0D1D2C]">{org.min_grant_amount ? `${org.min_grant_amount.toLocaleString()} ر.س` : "—"}</span>
                </div>
                <div className="border-t border-[#BDC9C5]"></div>
                <div className="flex items-center justify-between">
                  <span className="font-normal text-14px text-[#3E4946]">الحد الأقصى للمنحة</span>
                  <span className="font-medium text-14px text-[#0D1D2C]">{org.max_grant_amount ? `${org.max_grant_amount.toLocaleString()} ر.س` : "—"}</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="rounded-12px bg-white shadow-xl p-6">
              <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">المتطلبات</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`size-5 rounded-full flex items-center justify-center ${org.requires_license ? "bg-primary" : "bg-gray-200"}`}>
                    {org.requires_license && (
                      <svg className="size-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-normal text-14px text-[#3E4946]">يتطلب ترخيص رسمي</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`size-5 rounded-full flex items-center justify-center ${org.requires_bank_account ? "bg-primary" : "bg-gray-200"}`}>
                    {org.requires_bank_account && (
                      <svg className="size-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-normal text-14px text-[#3E4946]">يتطلب حساب بنكي</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`size-5 rounded-full flex items-center justify-center ${org.works_through_partners ? "bg-primary" : "bg-gray-200"}`}>
                    {org.works_through_partners && (
                      <svg className="size-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-normal text-14px text-[#3E4946]">يعمل عبر شركاء</span>
                </div>
              </div>
            </div>

            {/* Target regions */}
            {org.target_regions?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">المناطق المستهدفة</h3>
                <div className="flex flex-wrap gap-2">
                  {org.target_regions.map((region, i) => (
                    <div
                      key={i}
                      className="badge badge-soft py-2 bg-[#E4EFFF] rounded-99px px-4 font-normal text-13px text-[#0D1D2C]"
                    >
                      {region}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exclusions */}
            {org.exclusions?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">الاستبعادات</h3>
                <ul className="space-y-2">
                  {org.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-normal text-14px text-[#3E4946]">
                      <svg className="size-5 mt-0.5 shrink-0 text-error" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgDetails;
