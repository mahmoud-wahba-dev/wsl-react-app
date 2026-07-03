import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <section className="bg-[#F6F8F9] flex justify-center flex-col gap-4 items-center h-full min-h-[70vh] py-12">
   
      <fieldset className="bg-white p-10 fieldset shadow-xl border-[#BDC9C54D] rounded-16px w-md border ">
        <p className="font-medium text-20px text-[#0D1D2C] mb-2">
نسيت كلمه المرور        </p>
        <p className="font-medium text-14px mb-8 text-[#3E4946] ">
          أدخل بياناتك  لاستعاده حسابك في وصل
        </p>
        <label className="label font-medium text-14px text-[#0D1D2C] mb-2">
          البريد الإلكتروني
        </label>
        <label class="input w-full h-12 mb-4 ">
          <input type="text" class="grow " placeholder="example@wasl.sa" />

          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V4V14V4Z"
              fill="#BDC9C5"
            />
          </svg>
        </label>



        <button className="btn btn-primary h-14 rounded-8px font-medium text-12px  ">
    ارسال
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18V16H16V2H9V0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H9ZM7 14L5.625 12.55L8.175 10H0V8H8.175L5.625 5.45L7 4L12 9L7 14Z"
              fill="white"
            />
          </svg>
        </button>

        <div className="divider font-stretch-condensed text-12px text-[#3E4946] my-3">
          أو
        </div>
        <p className="text-center font-normal text-base text-[#3E4946]">
           لديك حساب؟
          <Link to={"/login"} className="font-normal text-base text-primary px-2 link-hover">تسجيل الدخول</Link>
        </p>
      </fieldset>
    </section>
  );
};

export default ResetPassword;
