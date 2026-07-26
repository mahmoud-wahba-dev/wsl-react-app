import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8F9FF]">
      <div className="container max-w-lg text-center px-4">
        <div className="mb-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="120" height="120" rx="60" fill="#0061531A" />
            <path
              d="M60 30C48.954 30 40 38.954 40 50v10H30v30h60V50c0-11.046-8.954-20-20-20zm-8 20a8 8 0 1116 0v10H52V50zm28 30H40V60h40v20z"
              fill="#006153"
            />
          </svg>
        </div>
        <h1 className="font-bold text-64px text-primary mb-2">404</h1>
        <p className="font-bold text-24px text-[#0D1D2C] mb-3">الصفحة غير موجودة</p>
        <p className="font-normal text-base text-[#3E4946] mb-10">
          عذراً، الصفحة التي تبحث عنها غير متوفرة أو قد تم نقلها
        </p>
        <Link
          to="/"
          className="btn btn-primary btn-lg font-medium text-14px px-8 h-14"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </section>
  );
};

export default NotFound;