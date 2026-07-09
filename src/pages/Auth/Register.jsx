import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorMsg from "../../composable/ErrorMsg";
import PasswordToggleIcon from "../../composable/PasswordToggleIcon";
import { useEffect, useState } from "react";
import Toast from "../../../public/services/toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialValues = {
  email: "",
  password: "",
  rePassword: "",
  terms: false,
};
const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(5),
  rePassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
  terms: Yup.boolean().oneOf([true], "Terms is required to accept"),
});

const Register = () => {
  const [userData, setUserData] = useState("");
  const [errorMsgArr, setErrorMsgArr] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values, "values");
    try {
      const response = await fetch(`${baseURL}/api/auth/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          re_password: values.rePassword,
        }),
      });
      const data = await response.json();

      if (data.status == 1) {
        console.log("succcess", data.data);
        setUserData(data.data);
        console.log(userData);
        Toast.success("نجاح, تم انشاء الحساب");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        Toast.error(data.message);
        setErrorMsgArr(data.errors);
        console.log(errorMsgArr, "errorMsgArr");

        // console.log(data.errors.message, "data errors");
      }
    } catch (error) {
      Toast.error("خطأ");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };
  useEffect(() => {
    console.log(errorMsgArr, "err msg arr");

    errorMsgArr.map((errItem) => Toast.error(errItem.message));
  }, [errorMsgArr]);
  return (
    <section className="bg-[#F6F8F9] flex justify-center flex-col gap-4 items-center h-full min-h-[70vh] py-12">
      <fieldset className="bg-white p-10 fieldset shadow-xl border-[#BDC9C54D] rounded-16px w-md border ">
        <p className="font-medium text-20px text-[#0D1D2C] mb-2">
          إنشاء حساب جديد{" "}
        </p>
        <p className="font-medium text-14px mb-8 text-[#3E4946] ">
          انضم إلى منصة وصل وابدأ رحلتك التمويلية اليوم{" "}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label className="label font-medium text-14px text-[#0D1D2C] mb-2">
                  البريد الإلكتروني
                </label>
                <label className="input w-full h-12">
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

                  <Field
                    placeholder="example@wasl.sa"
                    name="email"
                    type="email"
                    className="grow"
                  />
                </label>
                <ErrorMsg name={"email"} />
              </div>

              <div className="mb-2">
                <label className="label font-medium text-14px text-[#0D1D2C] my-3">
                  كلمة المرور
                </label>
                <label className="input w-full h-12 ">
                  <svg
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM2 19H14V9H2V19ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7ZM2 19V9V19Z"
                      fill="#BDC9C5"
                    />
                  </svg>
                  <Field
                    placeholder="•••••••"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="grow "
                  />
                  <span
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <PasswordToggleIcon visible={showPassword} />
                  </span>
                </label>
                <ErrorMsg name={"password"} />
              </div>

              <div className="mb-2">
                <label className="label font-medium text-14px text-[#0D1D2C] mb-3">
                  تأكيد كلمة المرور{" "}
                </label>
                <label className="input w-full h-12 ">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4119 19.724C9.0629 19.724 7.78558 19.4651 6.57989 18.9473C5.3742 18.4296 4.31603 17.7269 3.40539 16.8393C2.49474 15.9518 1.76113 14.908 1.20455 13.7082C0.647965 12.5083 0.344304 11.2262 0.293563 9.86199H2.24386C2.28421 10.9468 2.52542 11.97 2.9675 12.9315C3.40957 13.8931 3.9974 14.7313 4.73097 15.4463C5.46455 16.1613 6.31452 16.7284 7.28088 17.1475C8.24724 17.5667 9.26675 17.7762 10.3394 17.7762C12.5172 17.7762 14.3335 17.0119 15.7881 15.4833C17.2427 13.9547 17.9291 12.0892 17.8472 9.88664C17.7652 7.68413 16.9401 5.81857 15.3718 4.28997C13.8034 2.76136 11.9304 1.99705 9.75253 1.99705C8.30605 1.99705 7.00696 2.35455 5.85525 3.06954C4.70354 3.78454 3.80839 4.73376 3.1698 5.91719H5.99773L6.0711 7.88959H0.220202L0.000118814 1.9724H1.95042L2.02378 3.9448C2.87304 2.74492 3.95885 1.78749 5.28121 1.07249C6.60357 0.357497 8.06925 0 9.67825 0C11.0272 0 12.3045 0.258877 13.5102 0.776632C14.7159 1.29439 15.7741 1.99705 16.6847 2.88463C17.5954 3.77221 18.329 4.81594 18.8856 6.01581C19.4421 7.21569 19.7458 8.49775 19.7965 9.86199C19.8473 11.2262 19.639 12.5083 19.1717 13.7082C18.7043 14.908 18.0484 15.9518 17.2037 16.8393C16.3591 17.7269 15.3532 18.4296 14.1861 18.9473C13.0189 19.4651 11.7608 19.724 10.4119 19.724ZM8.24148 13.8068C7.96518 13.8068 7.73007 13.7123 7.53614 13.5233C7.3422 13.3342 7.24004 13.1 7.22965 12.8206L7.11961 9.86199C7.10921 9.58257 7.19395 9.34835 7.37383 9.15932C7.5537 8.9703 7.78178 8.87579 8.05807 8.87579L8.02139 7.88959C8.00122 7.34718 8.17492 6.88285 8.54248 6.49659C8.91005 6.11032 9.362 5.91719 9.89833 5.91719C10.4347 5.91719 10.901 6.11032 11.2973 6.49659C11.6936 6.88285 11.9018 7.34718 11.922 7.88959L11.9587 8.87579C12.235 8.87579 12.4701 8.9703 12.664 9.15932C12.8579 9.34835 12.9601 9.58257 12.9705 9.86199L13.0805 12.8206C13.0909 13.1 13.0062 13.3342 12.8263 13.5233C12.6464 13.7123 12.4184 13.8068 12.1421 13.8068H8.24148ZM9.03322 8.87579H10.9835L10.9468 7.88959C10.9364 7.61017 10.8343 7.37595 10.6403 7.18693C10.4464 6.9979 10.2113 6.90339 9.93501 6.90339C9.65872 6.90339 9.43064 6.9979 9.25076 7.18693C9.07089 7.37595 8.98615 7.61017 8.99654 7.88959L9.03322 8.87579Z"
                      fill="#BDC9C5"
                    />
                  </svg>
                  <Field
                    placeholder="•••••••"
                    name="rePassword"
                    type={showRePassword ? "text" : "password"}
                    className="grow"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={toggleRePasswordVisibility}
                  >
                    <PasswordToggleIcon visible={showRePassword} />
                  </span>
                </label>
                <ErrorMsg name={"rePassword"} />
              </div>

              <div className="">
                <div className="flex items-center gap-1">
                  <label className="label font-normal text-12px text-[#3E4946]">
                    <Field name="terms" type="checkbox" className="checkbox" />
                    {/* <input type="checkbox" defaultChecked className="checkbox" /> */}
                    أوافق على
                  </label>
                  <Link className="font-normal text-12px text-primary link-hover">
                    الشروط والأحكام
                  </Link>

                  <Link className="font-normal text-12px text-primary link-hover">
                    سياسة الخصوصية
                  </Link>
                </div>
                <ErrorMsg name={"terms"} />
              </div>
              <button
                className="btn btn-primary btn-block h-14 rounded-8px font-medium text-12px  mt-6"
                disabled={isSubmitting}
                type="submit"
              >
                إنشاء الحساب
                {isSubmitting ? (
                  <span className="loading loading-infinity text-primary loading-xl"></span>
                ) : (
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4624 9.86199L16.3524 6.90339H13.4269L13.3536 4.931H16.279L16.169 1.9724H18.1193L18.2293 4.931H21.1547L21.2281 6.90339H18.3027L18.4127 9.86199H16.4624ZM7.6127 7.88959C6.54004 7.88959 5.60741 7.50333 4.81481 6.73081C4.02221 5.95829 3.60573 5.02961 3.56538 3.9448C3.52504 2.85998 3.87243 1.93131 4.60756 1.15878C5.3427 0.386261 6.24659 0 7.31926 0C8.39192 0 9.32455 0.386261 10.1172 1.15878C10.9098 1.93131 11.3262 2.85998 11.3666 3.9448C11.4069 5.02961 11.0595 5.95829 10.3244 6.73081C9.58926 7.50333 8.68537 7.88959 7.6127 7.88959ZM0.104954 15.7792L0.00224901 13.0178C-0.0185366 12.459 0.104568 11.9453 0.371563 11.4769C0.638559 11.0084 1.00313 10.6509 1.46528 10.4044C2.45399 9.89486 3.46368 9.51271 4.49436 9.25794C5.52505 9.00318 6.57672 8.87579 7.64938 8.87579C8.72205 8.87579 9.7832 9.00318 10.8328 9.25794C11.8825 9.51271 12.9206 9.89486 13.9472 10.4044C14.4277 10.6509 14.8188 11.0084 15.1207 11.4769C15.4225 11.9453 15.5838 12.459 15.6046 13.0178L15.7073 15.7792H0.104954ZM1.98189 13.8068H13.6837L13.6543 13.0178C13.6476 12.837 13.5968 12.6727 13.5019 12.5247C13.407 12.3768 13.2849 12.2617 13.1356 12.1796C12.2414 11.7358 11.3433 11.4029 10.4412 11.181C9.53902 10.9591 8.63288 10.8482 7.72274 10.8482C6.8126 10.8482 5.91472 10.9591 5.02908 11.181C4.14345 11.4029 3.27007 11.7358 2.40894 12.1796C2.26573 12.2617 2.15218 12.3768 2.06829 12.5247C1.9844 12.6727 1.94582 12.837 1.95255 13.0178L1.98189 13.8068ZM7.53934 5.91719C8.07567 5.91719 8.52762 5.72406 8.89519 5.3378C9.26276 4.95154 9.43645 4.48721 9.41628 3.9448C9.3961 3.40239 9.18787 2.93805 8.79157 2.55179C8.39527 2.16553 7.92895 1.9724 7.39262 1.9724C6.85629 1.9724 6.40434 2.16553 6.03677 2.55179C5.6692 2.93805 5.49551 3.40239 5.51568 3.9448C5.53586 4.48721 5.74409 4.95154 6.14039 5.3378C6.53669 5.72406 7.00301 5.91719 7.53934 5.91719Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* <div className="divider font-stretch-condensed text-12px text-[#3E4946] mb-8">
          أو
        </div> */}
        <p
         
          className="text-center font-normal text-base text-[#3E4946] mt-4"
        >
          لديك حساب بالفعل؟
          <Link
            to={"/login"}
            className="font-normal text-base text-primary px-2 link-hover"
          >
            تسجيل الدخول
          </Link>
        </p>
      </fieldset>
    </section>
  );
};

export default Register;
