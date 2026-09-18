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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-start justify-between gap-28">
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500 mb-1">المبلغ المطلوب</span>
          <span className="text-3xl font-bold text-[#006153]">
            {req.amount} رس
          </span>
        </div>

        <div className="flex-1 mx-8">
          <h3 className="text-xl font-bold text-[#0D1D2C] mb-2">{req.title}</h3>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            {req.icon && <span className="text-[#006153]">{req.icon}</span>}
            <span className="font-medium">{req.organization}</span>
          </div>
          <p className="text-sm text-gray-500">{req.date}</p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              req.statusType === "sent"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {req.statusType === "sent" && <span className="ml-1">✓</span>}
            {req.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          {req.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {req.hasMatchResults && (
            <button
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              className="btn btn-outline border-primary rounded-13px h-11 font-medium text-14px text-primary flex items-center gap-2"
              aria-label="تنزيل نتائج المطابقة بصيغة PDF"
            >
              {pdfLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
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
          <button
            onClick={handleMatch}
            className="btn btn-outline border-[#6E7A76] rounded-13px h-11 font-medium text-14px text-[#3E4946]"
          >
            عرض النتائج
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrantRequestCard;
