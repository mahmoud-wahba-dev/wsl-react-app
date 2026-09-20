import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadPdf } from "../utils/api";
import Toast from "../../public/services/toast";

const GrantRequestCard = ({ req }) => {
  const navigate = useNavigate();
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleMatch = () => navigate(`/match-result/${req.id}`);

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      await downloadPdf(
        `/api/grants/requests/${req.id}/match/pdf/`,
        `match_results_${req.id}.pdf`
      );
    } catch (err) {
      const msg = err?.message || err?.detail;
      Toast.error(msg || "تعذّر تنزيل الملف. حاول مرة أخرى.");
    }
    setPdfLoading(false);
  };

  return (
    <div
      dir="rtl"
      className="border border-[#BDC9C5] p-6 rounded-12px bg-white border-r-[6px] border-r-primary"
    >
      {/* Top row: title + meta on the right, status badge on the left */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        {/* Title & meta */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-20px text-[#0D1D2C] mb-1 truncate">
            {req.title}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            {req.organization && (
              <span className="flex items-center gap-1 font-medium text-14px text-[#3E4946]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V20H4Z"
                    fill="#3E4946"
                  />
                </svg>
                {req.organization}
              </span>
            )}
            <span className="flex items-center gap-1 font-normal text-14px text-[#6E7A76]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM7 11H12V16H7V11Z"
                  fill="#6E7A76"
                />
              </svg>
              {req.date}
            </span>
          </div>
        </div>

        {/* Amount + status */}
        <div className="flex flex-col items-start gap-2 shrink-0">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-13px font-medium ${
              req.statusType === "sent"
                ? "bg-[#E6F4F1] text-primary"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {req.statusType === "sent" && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {req.status}
          </span>
          <div className="text-start">
            <span className="block text-12px text-[#6E7A76] mb-0.5">
              المبلغ المطلوب
            </span>
            <span className="font-bold text-20px text-primary leading-none">
              {req.amount}{" "}
              <span className="font-medium text-14px text-[#3E4946]">ر.س</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {req.tags?.length > 0 && (
        <div className="flex items-center flex-wrap gap-2 mb-4">
          {req.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-0.5 bg-[#0061531A] text-primary rounded-full text-12px font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-[#E5EBEA] mb-4" />

      {/* Actions */}
      <div className="flex items-center justify-start gap-3 flex-wrap">
        <button
          onClick={handleMatch}
          className="btn btn-primary rounded-13px h-11 font-medium text-14px"
        >
          ابحث عن نتائج مطابقة جديدة
        </button>
        {req.hasMatchResults && (
          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="btn btn-outline border-primary rounded-13px h-11 font-medium text-14px text-primary flex items-center gap-2"
            aria-label="تنزيل نتائج المطابقة بصيغة PDF"
          >
            {pdfLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                  fill="currentColor"
                />
              </svg>
            )}
            تحميل آخر النتائج
          </button>
        )}
      </div>
    </div>
  );
};

export default GrantRequestCard;
