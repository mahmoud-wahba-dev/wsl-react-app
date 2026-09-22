import Toast from "../../public/services/toast";

const UpgradeBanner = () => {
  return (
    <div
      className="relative overflow-hidden rounded-16px bg-gradient-to-l from-primary to-[#009e85] p-8 text-white shadow-lg"
      dir="rtl"
    >
      {/* decorative circles */}
      <span
        className="pointer-events-none absolute -top-10 -left-10 h-52 w-52 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-white/10"
        aria-hidden="true"
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* text */}
        <div className="flex items-start gap-4">
          {/* lock icon */}
          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
            <svg
              width="20"
              height="24"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z"
                fill="white"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-bold text-18px mb-1">
              افتح تفاصيل التطابق الكاملة
            </h3>
            <p className="font-normal text-14px text-white/80 max-w-lg leading-relaxed">
              اشترك للاطلاع على أسباب التطابق، الشروط الناقصة، التوصيات،
              وبيانات التواصل مع الجهات المانحة — لجميع النتائج.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() =>
            Toast.info("هذه الخدمة قيد التنفيذ، ستكون متاحة قريباً.")
          }
          className="shrink-0 inline-flex items-center gap-2 bg-white text-primary font-semibold text-14px rounded-13px px-6 h-11 hover:bg-white/90 transition-colors shadow"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
          ترقية الاشتراك
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
