import React from "react";
import ReqCard from "../components/ReqCard";

const MyRequests = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center  gap-4 mb-12">
          <div className="mt-16">
            <h1 className="font-bold text-32px text-[#0D1D2C] mb-1 flex items-center gap-1">
              <svg
                width="24"
                height="30"
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.425 20.325L18.9 11.85L16.7625 9.7125L10.425 16.05L7.275 12.9L5.1375 15.0375L10.425 20.325ZM12 30C8.525 29.125 5.65625 27.1312 3.39375 24.0187C1.13125 20.9062 0 17.45 0 13.65V4.5L12 0L24 4.5V13.65C24 17.45 22.8688 20.9062 20.6063 24.0187C18.3438 27.1312 15.475 29.125 12 30ZM12 26.85C14.6 26.025 16.75 24.375 18.45 21.9C20.15 19.425 21 16.675 21 13.65V6.5625L12 3.1875L3 6.5625V13.65C3 16.675 3.85 19.425 5.55 21.9C7.25 24.375 9.4 26.025 12 26.85Z"
                  fill="#006153"
                />
              </svg>
              أنسب المؤسسات المانحة لمشروعك
            </h1>

            <p className="font-normal text-base text-[#3E4946]">
              بناءً على معايير مشروعك وتوجهات المانحين، قمنا بتحليل مئات الفرص
              للوصول إلى هذه القائمة المختارة.{" "}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4  lg:gap-8 mb-6">
          <div className="lg:col-span-4">
            <div className="border border-[#BDC9C5] shadow-xl p-6 rounded-12px">
              <h4 className="font-medium text-20px text-[#0D1D2C] mb-4">
                تصفية النتائج
              </h4>
              <p className="font-medium text-14px text-[#3E4946] mb-2">
                نوع التمويل
              </p>
              <select
                defaultValue="Pick a color"
                className="select border-[#BDC9C5] mb-4"
              >
                <option disabled={true}>الكل</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
              <p className="font-medium text-14px text-[#3E4946] mb-2">
                النطاق الجغرافي
              </p>
              <div className="flex items-center gap-2 ">
                <div className="badge badge-soft bg-[#0061531A] rounded-99px px-4 font-normal text-12px text-[#006153] ">
                  الرياض
                </div>
                <div className="badge badge-soft bg-[#E4EFFF] rounded-99px px-4 font-normal text-12px text-[#006153] ">
                  جدة
                </div>

                <div className="badge badge-soft bg-[#E4EFFF] rounded-99px px-4 font-normal text-12px text-[#006153] ">
                  الدمام
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <ReqCard/>
            <ReqCard/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyRequests;
