import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between gap-4 mb-12">
          <div className="mt-16">
            <h1 className="font-bold text-32px text-[#0D1D2C] mb-1">
              لوحة الإدارة
            </h1>

            <p className="font-normal text-base text-[#3E4946]">
              إدارة التحقق من الجمعيات والمؤسسات المانحة
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
            إضافة مؤسسة
          </Link>
        </div>

        <div>
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-border">
            <input
              type="radio"
              name="my_tabs_2"
              className="tab mb-10 font-medium text-20px text-[#3E4946] "
              aria-label="الجمعيات بانتظار التحقق"
              defaultChecked
            />
            <div className="tab-content ">
              <div className="flex justify-between items-center border-[#00000000] bg-white p-10 shadow-xl mb-6 rounded-16px">
                <div className="flex items-center gap-6">
                  <div className="size-16 center bg-[#DAEAFF] rounded-full">
                    <svg
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 24V0H13.3333V5.33333H26.6667V24H0ZM2.66667 21.3333H10.6667V18.6667H2.66667V21.3333ZM2.66667 16H10.6667V13.3333H2.66667V16ZM2.66667 10.6667H10.6667V8H2.66667V10.6667ZM2.66667 5.33333H10.6667V2.66667H2.66667V5.33333ZM13.3333 21.3333H24V8H13.3333V21.3333ZM16 13.3333V10.6667H21.3333V13.3333H16ZM16 18.6667V16H21.3333V18.6667H16Z"
                        fill="#006153"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6 className="font-medium text-20px text-[#0D1D2C] mb-1">
                      جمعية البر الأهلية
                    </h6>
                    <p className="font-normal text-base text-[#3E4946] mb-1">
                      الرياض، حي المروج • تم التسجيل: ٢٠ يونيو ٢٠٢٤
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="badge badge-soft bg-[#FFDF9D] rounded-99px px-4 font-normal text-12px text-[#251A00] py-4">
                        بانتظار المراجعة
                      </div>
                      <div className="badge badge-soft bg-[#E4EFFF] rounded-99px px-4 font-normal text-12px text-[#3E4946] py-4">
                        وثائق مكتملة
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="btn btn-outline border-[#6E7A76] rounded-13px h-11 font-medium text-14px text-[#3E4946]">
                    عرض الوثائق
                  </button>
                  <button className="btn  btn-primary  rounded-13px h-11 font-medium text-14px ">
                    تفعيل
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center border-[#00000000] bg-white p-10 shadow-xl mb-6 rounded-16px">
                <div className="flex items-center gap-6">
                  <div className="size-16 center bg-[#DAEAFF] rounded-full">
                    <svg
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 24V0H13.3333V5.33333H26.6667V24H0ZM2.66667 21.3333H10.6667V18.6667H2.66667V21.3333ZM2.66667 16H10.6667V13.3333H2.66667V16ZM2.66667 10.6667H10.6667V8H2.66667V10.6667ZM2.66667 5.33333H10.6667V2.66667H2.66667V5.33333ZM13.3333 21.3333H24V8H13.3333V21.3333ZM16 13.3333V10.6667H21.3333V13.3333H16ZM16 18.6667V16H21.3333V18.6667H16Z"
                        fill="#006153"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6 className="font-medium text-20px text-[#0D1D2C] mb-1">
                      جمعية البر الأهلية
                    </h6>
                    <p className="font-normal text-base text-[#3E4946] mb-1">
                      الرياض، حي المروج • تم التسجيل: ٢٠ يونيو ٢٠٢٤
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="badge badge-soft bg-[#FFDF9D] rounded-99px px-4 font-normal text-12px text-[#251A00] py-4">
                        بانتظار المراجعة
                      </div>
                      <div className="badge badge-soft bg-[#E4EFFF] rounded-99px px-4 font-normal text-12px text-[#3E4946] py-4">
                        وثائق مكتملة
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="btn btn-outline border-[#6E7A76] rounded-13px h-11 font-medium text-14px text-[#3E4946]">
                    عرض الوثائق
                  </button>
                  <button className="btn  btn-primary  rounded-13px h-11 font-medium text-14px ">
                    تفعيل
                  </button>
                </div>
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              className="tab mb-10 font-medium text-20px text-[#3E4946] "
              aria-label="المؤسسات المانحة"
            />
            <div className="tab-content ">
               <div className="flex justify-between items-center border-[#00000000] bg-white p-10 shadow-xl mb-6 rounded-16px">
                <div className="flex items-center gap-6">
                  <div className="size-16 center bg-[#DAEAFF] rounded-full">
                    <svg
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 24V0H13.3333V5.33333H26.6667V24H0ZM2.66667 21.3333H10.6667V18.6667H2.66667V21.3333ZM2.66667 16H10.6667V13.3333H2.66667V16ZM2.66667 10.6667H10.6667V8H2.66667V10.6667ZM2.66667 5.33333H10.6667V2.66667H2.66667V5.33333ZM13.3333 21.3333H24V8H13.3333V21.3333ZM16 13.3333V10.6667H21.3333V13.3333H16ZM16 18.6667V16H21.3333V18.6667H16Z"
                        fill="#006153"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6 className="font-medium text-20px text-[#0D1D2C] mb-1">
                      جمعية البر الأهلية
                    </h6>
                    <p className="font-normal text-base text-[#3E4946] mb-1">
                      الرياض، حي المروج • تم التسجيل: ٢٠ يونيو ٢٠٢٤
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="badge badge-soft bg-[#FFDF9D] rounded-99px px-4 font-normal text-12px text-[#251A00] py-4">
                        بانتظار المراجعة
                      </div>
                      <div className="badge badge-soft bg-[#E4EFFF] rounded-99px px-4 font-normal text-12px text-[#3E4946] py-4">
                        وثائق مكتملة
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="btn btn-outline border-[#6E7A76] rounded-13px h-11 font-medium text-14px text-[#3E4946]">
                    عرض الوثائق
                  </button>
                  <button className="btn  btn-primary  rounded-13px h-11 font-medium text-14px ">
                    تفعيل
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
