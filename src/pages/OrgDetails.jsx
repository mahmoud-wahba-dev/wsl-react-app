import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Loader from "../components/Loader";
import orgImg from "../assets/imgs/org.jpg";

const contactTypeLabels = {
  mobile: "جوال",
  phone: "هاتف",
  fax: "فاكس",
  email: "بريد إلكتروني",
};

const OrgDetails = () => {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api(`/api/grants/donors/${id}/`);
        setOrg(res.data);
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
  const firstLocation = org.locations?.[0];

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
              {firstLocation && (
                <span className="flex items-center gap-1 font-normal text-14px text-[#3E4946]">
                  <svg width="14" height="14" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 7.5C6.4125 7.5 6.76562 7.35312 7.05937 7.05937C7.35312 6.76562 7.5 6.4125 7.5 6C7.5 5.5875 7.35312 5.23438 7.05937 4.94063C6.76562 4.64688 6.4125 4.5 6 4.5C5.5875 4.5 5.23438 4.64688 4.94063 4.94063C4.64688 5.23438 4.5 5.5875 4.5 6C4.5 6.4125 4.64688 6.76562 4.94063 7.05937C5.23438 7.35312 5.5875 7.5 6 7.5ZM6 13.0125C7.525 11.6125 8.65625 10.3406 9.39375 9.19687C10.1313 8.05312 10.5 7.0375 10.5 6.15C10.5 4.7875 10.0656 3.67188 9.19687 2.80312C8.32812 1.93437 7.2625 1.5 6 1.5C4.7375 1.5 3.67188 1.93437 2.80312 2.80312C1.93437 3.67188 1.5 4.7875 1.5 6.15C1.5 7.0375 1.86875 8.05312 2.60625 9.19687C3.34375 10.3406 4.475 11.6125 6 13.0125ZM6 15C3.9875 13.2875 2.48438 11.6969 1.49063 10.2281C0.496875 8.75937 0 7.4 0 6.15C0 4.275 0.603125 2.78125 1.80938 1.66875C3.01562 0.55625 4.4125 0 6 0C7.5875 0 8.98438 0.55625 10.1906 1.66875C11.3969 2.78125 12 4.275 12 6.15C12 7.4 11.5031 8.75937 10.5094 10.2281C9.51562 11.6969 8.0125 13.2875 6 15Z" fill="#3E4946"/>
                  </svg>
                  {firstLocation.city}
                </span>
              )}
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
              {org.twitter_url && (
                <a
                  href={org.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-normal text-14px text-primary hover:underline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  تويتر
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
            {/* Submission periods */}
            {org.submission_periods && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-3">فترات التقديم</h3>
                <p className="font-normal text-14px text-[#3E4946] leading-relaxed">
                  {org.submission_periods}
                </p>
              </div>
            )}

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
                {org.funding_areas_note && (
                  <p className="font-normal text-13px text-[#3E4946] mt-3">{org.funding_areas_note}</p>
                )}
              </div>
            )}

            {/* Acceptance requirements */}
            {org.acceptance_requirements?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">متطلبات القبول</h3>
                <ul className="space-y-2">
                  {org.acceptance_requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-normal text-14px text-[#3E4946]">
                      <svg className="size-5 mt-0.5 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                {org.acceptance_requirements_note && (
                  <p className="font-normal text-13px text-[#3E4946] mt-3">{org.acceptance_requirements_note}</p>
                )}
              </div>
            )}

            {/* Contacts */}
            {org.contacts?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">معلومات الاتصال</h3>
                <div className="space-y-3">
                  {org.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-2">
                      <span className="font-medium text-14px text-[#0D1D2C] min-w-20">
                        {contactTypeLabels[contact.contact_type] || contact.contact_type}
                      </span>
                      <span className="font-normal text-14px text-[#3E4946]">{contact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Left column - sidebar */}
          <div className="space-y-6">
            {/* Locations */}
            {org.locations?.length > 0 && (
              <div className="rounded-12px bg-white shadow-xl p-6">
                <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">المواقع</h3>
                <div className="space-y-4">
                  {org.locations.map((loc) => (
                    <div key={loc.id}>
                      <p className="font-medium text-14px text-[#0D1D2C]">{loc.city}</p>
                      {loc.address && (
                        <p className="font-normal text-13px text-[#3E4946] mt-1">{loc.address}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick info */}
            <div className="rounded-12px bg-white shadow-xl p-6">
              <h3 className="font-bold text-18px text-[#0D1D2C] mb-4">معلومات سريعة</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`size-5 rounded-full flex items-center justify-center ${org.is_active ? "bg-primary" : "bg-gray-200"}`}>
                    {org.is_active && (
                      <svg className="size-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-normal text-14px text-[#3E4946]">
                    {org.is_active ? "نشط" : "غير نشط"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgDetails;