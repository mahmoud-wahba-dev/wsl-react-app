import { Link } from "react-router-dom";

const RequestCard = ({ req }) => {
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
          <Link
            to={"/match-result"}
            className="btn btn-outline border-[#6E7A76] rounded-13px h-11 font-medium text-14px text-[#3E4946]"
          >
            عرض النتائج
          </Link>
          <button className="btn btn-primary rounded-13px h-11 font-medium text-14px">
            تعديل
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
