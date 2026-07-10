import { Link } from "react-router-dom";

const fetchGrantRequests = () => {
  
}



const Dashboard = () => {
  const requests = [
    {
      id: 1,
      amount: "٢٥,٠٠٠",
      title: "ترميم المنازل القديمة للنسر النازحة",
      organization: "مؤسسة تراحم الخيرية",
      date: "١٠ مايو ٢٠٢٦",
      status: "تم الارسال",
      statusType: "sent",
      tags: ["الرياض", "اسكان"],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" stroke="#006153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 2,
      amount: "٨٠,٠٠٠",
      title: "تأهيل ذوي الاحتياجات الخاصة لسوق العمل",
      organization: "جمعية الكفانح بمكة",
      date: "٥ مايو ٢٠٢٦",
      status: "مساندة",
      statusType: "support",
      tags: ["التدريب", "التمكين"],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" stroke="#006153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between gap-4 mb-12">
          <div className="mt-16">
            <h1 className="font-bold text-32px text-[#0D1D2C] mb-1">
              طلباتي
            </h1>
            <p className="font-normal text-base text-[#3E4946]">
              جميع طلبات المطابقة التي قدمتها
            </p>
          </div>
          <Link className="btn btn-primary mt-2 font-medium text-14px rounded-13px">
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
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between gap-28">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 mb-1">
                    المبلغ المطلوب
                  </span>
                  <span className="text-3xl font-bold text-[#006153]">
                    {req.amount} رس
                  </span>
                </div>

                <div className="flex-1 mx-8">
                  <h3 className="text-xl font-bold text-[#0D1D2C] mb-2">
                    {req.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <span className="text-[#006153]">{req.icon}</span>
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
                    {req.statusType === "sent" && (
                      <span className="ml-1">✓</span>
                    )}
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
                  <button className="btn btn-outline border-[#6E7A76] rounded-13px h-11 font-medium text-14px text-[#3E4946]">
                    عرض النتائج
                  </button>
                  <button className="btn btn-primary rounded-13px h-11 font-medium text-14px">
                    تعديل
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
