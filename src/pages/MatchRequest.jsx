import Label from "../composable/Label";
import Input from "../composable/Input";
import Textarea from "../composable/Textarea";
import InputWithIcon from "../composable/InputWithIcon";

const MatchRequest = () => {
  return (
    <section className="py-12">
      <div className="container">
        <h1 className="font-bold text-32px text-primary text-center mb-2">
          تقديم طلب مطابقة
        </h1>
        <p className="font-normal text-18px text-[#3E4946] text-center mb-12">
          أكمل البيانات التالية لبدء عملية الربط الذكي مع المانحين
        </p>
        <div className="bg-white rounded-12px border border-[#BDC9C54D] p-8 shadow-xl drop-shadow-xl mb-8">
          <div className="flex items-center gap-2 font-medium text-20px text-primary mb-5">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18V0H10V4H20V18H0ZM2 16H8V14H2V16ZM2 12H8V10H2V12ZM2 8H8V6H2V8ZM2 4H8V2H2V4ZM10 16H18V6H10V16ZM12 10V8H16V10H12ZM12 14V12H16V14H12Z"
                fill="#006153"
              />
            </svg>
            بيانات الجهة
          </div>
          <div className="divider "></div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <div className="">
              <label
                htmlFor=""
                className="font-bold text-14px mb-2 text-[#0D1D2C] block"
              >
                اسم الجمعية / المؤسسة
              </label>
              <input
                type="text"
                placeholder="أدخل الاسم الرسمي للجهة"
                className="input border-[#BDC9C5] grow w-full"
              />
            </div>
            <div className="">
              <label
                htmlFor=""
                className="font-bold text-14px mb-2 text-[#0D1D2C] block"
              >
                سنوات الخبرة
              </label>
              <input
                type="text"
                placeholder="مثال 5"
                className="input border-[#BDC9C5] grow w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor=""
                className="font-bold text-14px mb-2 text-[#0D1D2C] block"
              >
                وصف مختصر للجهة
              </label>
              <textarea
                className="textarea h-24 w-full"
                placeholder="نبذة عن رؤية وأهداف الجهة..."
              ></textarea>
            </div>
            <div className="">
              <Label text={"الدولة"} />
              <select
                defaultValue="المملكة العربية السعودية"
                className="select select-ghost w-full"
              >
                <option disabled={true}>المملكة العربية السعودية</option>
                <option>Inter</option>
                <option>Poppins</option>
                <option>Raleway</option>
              </select>{" "}
            </div>
            <div>
              <Label text={"المنطقة / المدينة"} />
              <Input placeholder={"مثال: الرياض"} />
            </div>

            <div className="flex items-center justify-between bg-[#EEF4FF] rounded-8px p-4">
              <p className="font-normal text-base text-[#0D1D2C]">
                الجهة مرخّصة رسمياً؟
              </p>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-sm toggle-primary"
              />
            </div>
            <div className="flex items-center justify-between bg-[#EEF4FF] rounded-8px p-4">
              <p className="font-normal text-base text-[#0D1D2C]">
                يوجد حساب بنكي رسمي؟
              </p>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-sm toggle-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-12px border border-[#BDC9C54D] p-8 shadow-xl drop-shadow-xl">
          <div className="flex items-center gap-2 font-medium text-20px text-primary mb-5">
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 20C6.95 20 6.47917 19.8042 6.0875 19.4125C5.69583 19.0208 5.5 18.55 5.5 18H9.5C9.5 18.55 9.30417 19.0208 8.9125 19.4125C8.52083 19.8042 8.05 20 7.5 20ZM3.5 17V15H11.5V17H3.5ZM3.75 14C2.6 13.3167 1.6875 12.4 1.0125 11.25C0.3375 10.1 0 8.85 0 7.5C0 5.41667 0.729167 3.64583 2.1875 2.1875C3.64583 0.729167 5.41667 0 7.5 0C9.58333 0 11.3542 0.729167 12.8125 2.1875C14.2708 3.64583 15 5.41667 15 7.5C15 8.85 14.6625 10.1 13.9875 11.25C13.3125 12.4 12.4 13.3167 11.25 14H3.75Z"
                fill="#006153"
              />
            </svg>
            بيانات المشروع
          </div>
          <div className="divider "></div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <div className="md:col-span-2">
              <Label text={"عنوان المشروع"} />
              <Input placeholder={"عنوان جذاب يعبر عن جوهر المبادرة"} />
            </div>

            <div className="md:col-span-2">
              <Label text={"مجالات المشروع (اختر ما ينطبق)"} />
              <form className="filter">
                <input
                  className="btn"
                  type="checkbox"
                  name="frameworks"
                  aria-label="التعليم"
                />
                <input
                  className="btn"
                  type="checkbox"
                  name="frameworks"
                  aria-label="الإغاثة"
                />
                <input
                  className="btn"
                  type="checkbox"
                  name="frameworks"
                  aria-label="الصحة"
                />
                <input className="btn btn-square" type="reset" value="×" />
              </form>
            </div>
            <div className="md:col-span-2">
              <Label text={"فكرة المشروع"} />
              <Textarea placeholder={"اشرح المشكلة والحل المقترح..."} />
            </div>
            <div>
              <Label text={"الأهداف الاستراتيجية"} />
              <Textarea placeholder={"ما الذي تسعى لتحقيقه؟"} />
            </div>

            <div>
              <Label text={"الخطة التشغيلية"} />
              <Textarea placeholder={"خطوات التنفيذ والجدول الزمني..."} />
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div>
                  <Label text={"عدد المستفيدين"} />
                  <InputWithIcon placeholder={"100"} />
                </div>
                <div>
                  <Label text={"المدة (بالأشهر)"} />
                  <InputWithIcon placeholder={"12"} />
                </div>
                <div>
                  <Label text={"المبلغ المطلوب (SAR)"} />
                  <InputWithIcon placeholder={"50,000"} />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Label text={"الأثر المتوقع"} />
              <Textarea
                placeholder={"التغيير الإيجابي الملموس بعد التنفيذ..."}
              />
            </div>
            <div className="md:col-span-2">
              <Label text={"الاستدامة"} />
              <Textarea placeholder={"كيف سيستمر أثر المشروع مستقبلاً؟"} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <button className="btn btn-primary grow h-14">
            إرسال وبدء المطابقة
          </button>
          <button className="btn btn-outline btn-secondary w-[25%] h-14">حفظ كمسودة</button>
        </div>
      </div>
    </section>
  );
};

export default MatchRequest;
