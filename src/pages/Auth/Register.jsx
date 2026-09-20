import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorMsg from "../../composable/ErrorMsg";
import PasswordToggleIcon from "../../composable/PasswordToggleIcon";
import { useState } from "react";
import Toast from "../../../public/services/toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialValues = {
  // Step 1
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  rePassword: "",
  terms: false,
  // Step 2
  associationName: "",
  associationDescription: "",
  region: "",
  yearsOfExperience: "",
  isLicensed: false,
  hasBankAccount: false,
};

const step1Schema = Yup.object({
  email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
  firstName: Yup.string().required("الاسم الأول مطلوب"),
  lastName: Yup.string().required("اسم العائلة مطلوب"),
  password: Yup.string().min(5, "كلمة المرور قصيرة جداً").required("كلمة المرور مطلوبة"),
  rePassword: Yup.string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة"),
  terms: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط والأحكام"),
});

const step2Schema = Yup.object({
  associationName: Yup.string().required("اسم الجمعية مطلوب"),
  associationDescription: Yup.string().required("وصف الجمعية مطلوب"),
  region: Yup.string().required("المنطقة مطلوبة"),
  yearsOfExperience: Yup.number()
    .typeError("يجب أن تكون رقماً")
    .required("سنوات الخبرة مطلوبة")
    .min(0, "لا يمكن أن تكون سالبة")
    .integer("يجب أن تكون رقماً صحيحاً"),
});

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${baseURL}/api/auth/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          re_password: values.rePassword,
          first_name: values.firstName,
          last_name: values.lastName,
          organization: {
            association_name: values.associationName,
            association_description: values.associationDescription,
            is_licensed: values.isLicensed,
            has_bank_account: values.hasBankAccount,
            years_of_experience: Number(values.yearsOfExperience),
            region: values.region,
          },
        }),
      });
      const data = await response.json();

      if (data.status == 1) {
        Toast.success("تم إنشاء الحساب بنجاح");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        Toast.error(data.message);
        (data.errors || []).forEach((e) => e?.message && Toast.error(e.message));
      }
    } catch {
      Toast.error("حدث خطأ، حاول مرة أخرى");
    }
    setSubmitting(false);
  };

  return (
    <section className="bg-[#F6F8F9] flex justify-center flex-col gap-4 items-center min-h-[70vh] py-12">
      <div className="bg-white p-10 shadow-xl border border-[#BDC9C54D] rounded-16px w-lg max-w-[90vw]">

        {/* Header */}
        <p className="font-medium text-20px text-[#0D1D2C] mb-1">إنشاء حساب جديد</p>
        <p className="font-medium text-14px mb-6 text-[#3E4946]">
          انضم إلى منصة وصل وابدأ رحلتك التمويلية اليوم
        </p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8" dir="rtl">
          {/* Step 1 */}
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-13px font-bold shrink-0 transition-colors ${step >= 1 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}>
              {step > 1 ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : "١"}
            </div>
            <span className={`text-13px font-medium ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
              بيانات الحساب
            </span>
          </div>

          {/* Connector */}
          <div className={`flex-1 h-0.5 mx-2 rounded transition-colors ${step >= 2 ? "bg-primary" : "bg-gray-200"}`} />

          {/* Step 2 */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <span className={`text-13px font-medium ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
              بيانات الجمعية
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-13px font-bold shrink-0 transition-colors ${step >= 2 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}>
              ٢
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={step === 1 ? step1Schema : step2Schema}
          onSubmit={step === 1 ? (_, { setSubmitting }) => { setSubmitting(false); setStep(2); } : handleSubmit}
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="label font-medium text-14px text-[#0D1D2C] mb-2">
                      البريد الإلكتروني
                    </label>
                    <label className="input w-full h-12">
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V4V14V4Z" fill="#BDC9C5"/>
                      </svg>
                      <Field placeholder="example@wasl.sa" name="email" type="email" className="grow" />
                    </label>
                    <ErrorMsg name="email" />
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="label font-medium text-14px text-[#0D1D2C] mb-2">الاسم الأول</label>
                      <label className="input w-full h-12">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 10C8.9 10 7.95833 9.60833 7.175 8.825C6.39167 8.04167 6 7.1 6 6C6 4.9 6.39167 3.95833 7.175 3.175C7.95833 2.39167 8.9 2 10 2C11.1 2 12.0417 2.39167 12.825 3.175C13.6083 3.95833 14 4.9 14 6C14 7.1 13.6083 8.04167 12.825 8.825C12.0417 9.60833 11.1 10 10 10ZM2 18V15.2C2 14.6333 2.14583 14.1125 2.4375 13.6375C2.72917 13.1625 3.11667 12.8 3.6 12.55C4.63333 12.0333 5.68333 11.6458 6.75 11.3875C7.81667 11.1292 8.9 11 10 11C11.1 11 12.1833 11.1292 13.25 11.3875C14.3167 11.6458 15.3667 12.0333 16.4 12.55C16.8833 12.8 17.2708 13.1625 17.5625 13.6375C17.8542 14.1125 18 14.6333 18 15.2V18H2Z" fill="#BDC9C5"/>
                        </svg>
                        <Field placeholder="محمد" name="firstName" type="text" className="grow" />
                      </label>
                      <ErrorMsg name="firstName" />
                    </div>
                    <div>
                      <label className="label font-medium text-14px text-[#0D1D2C] mb-2">اسم العائلة</label>
                      <label className="input w-full h-12">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 10C8.9 10 7.95833 9.60833 7.175 8.825C6.39167 8.04167 6 7.1 6 6C6 4.9 6.39167 3.95833 7.175 3.175C7.95833 2.39167 8.9 2 10 2C11.1 2 12.0417 2.39167 12.825 3.175C13.6083 3.95833 14 4.9 14 6C14 7.1 13.6083 8.04167 12.825 8.825C12.0417 9.60833 11.1 10 10 10ZM2 18V15.2C2 14.6333 2.14583 14.1125 2.4375 13.6375C2.72917 13.1625 3.11667 12.8 3.6 12.55C4.63333 12.0333 5.68333 11.6458 6.75 11.3875C7.81667 11.1292 8.9 11 10 11C11.1 11 12.1833 11.1292 13.25 11.3875C14.3167 11.6458 15.3667 12.0333 16.4 12.55C16.8833 12.8 17.2708 13.1625 17.5625 13.6375C17.8542 14.1125 18 14.6333 18 15.2V18H2Z" fill="#BDC9C5"/>
                        </svg>
                        <Field placeholder="العتيبي" name="lastName" type="text" className="grow" />
                      </label>
                      <ErrorMsg name="lastName" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="label font-medium text-14px text-[#0D1D2C] mb-2">كلمة المرور</label>
                    <label className="input w-full h-12">
                      <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z" fill="#BDC9C5"/>
                      </svg>
                      <Field placeholder="•••••••" name="password" type={showPassword ? "text" : "password"} className="grow" />
                      <span className="cursor-pointer" onClick={() => setShowPassword((v) => !v)}>
                        <PasswordToggleIcon visible={showPassword} />
                      </span>
                    </label>
                    <ErrorMsg name="password" />
                  </div>

                  {/* Confirm password */}
                  <div className="mb-4">
                    <label className="label font-medium text-14px text-[#0D1D2C] mb-2">تأكيد كلمة المرور</label>
                    <label className="input w-full h-12">
                      <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z" fill="#BDC9C5"/>
                      </svg>
                      <Field placeholder="•••••••" name="rePassword" type={showRePassword ? "text" : "password"} className="grow" />
                      <span className="cursor-pointer" onClick={() => setShowRePassword((v) => !v)}>
                        <PasswordToggleIcon visible={showRePassword} />
                      </span>
                    </label>
                    <ErrorMsg name="rePassword" />
                  </div>

                  {/* Terms */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <Field name="terms" type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                      <span className="font-normal text-13px text-[#3E4946]">أوافق على</span>
                      <Link className="font-normal text-13px text-primary link-hover">الشروط والأحكام</Link>
                      <Link className="font-normal text-13px text-primary link-hover">سياسة الخصوصية</Link>
                    </div>
                    <ErrorMsg name="terms" />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block h-12 rounded-8px font-medium text-14px">
                    التالي
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                </>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <>
                  {/* Association name */}
                  <div className="mb-3">
                    <label className="label font-medium text-14px text-[#0D1D2C] mb-2">اسم الجمعية</label>
                    <label className="input w-full h-12">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 18V4L10 0L18 4V18H12V12H8V18H2Z" fill="#BDC9C5"/>
                      </svg>
                      <Field placeholder="جمعية البر الخيرية" name="associationName" type="text" className="grow" />
                    </label>
                    <ErrorMsg name="associationName" />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="label font-medium text-14px text-[#0D1D2C] mb-2">وصف الجمعية</label>
                    <Field
                      as="textarea"
                      placeholder="جمعية خيرية متخصصة في التنمية الاجتماعية..."
                      name="associationDescription"
                      className="textarea h-24 w-full"
                    />
                    <ErrorMsg name="associationDescription" />
                  </div>

                  {/* Region + Years */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="label font-medium text-14px text-[#0D1D2C] mb-2">المنطقة</label>
                      <label className="input w-full h-12">
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z" fill="#BDC9C5"/>
                        </svg>
                        <Field placeholder="الرياض" name="region" type="text" className="grow" />
                      </label>
                      <ErrorMsg name="region" />
                    </div>
                    <div>
                      <label className="label font-medium text-14px text-[#0D1D2C] mb-2">سنوات الخبرة</label>
                      <label className="input w-full h-12">
                        <Field placeholder="5" name="yearsOfExperience" type="number" min="0" className="grow" />
                      </label>
                      <ErrorMsg name="yearsOfExperience" />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="grid grid-cols-2 gap-3 mb-6 mt-1">
                    <label className="flex items-center gap-2 border border-[#BDC9C54D] rounded-8px px-3 h-12 cursor-pointer font-normal text-13px text-[#3E4946]">
                      <Field name="isLicensed" type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                      الجمعية مرخصة
                    </label>
                    <label className="flex items-center gap-2 border border-[#BDC9C54D] rounded-8px px-3 h-12 cursor-pointer font-normal text-13px text-[#3E4946]">
                      <Field name="hasBankAccount" type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                      تمتلك حساب بنكي
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-outline border-[#BDC9C5] text-[#3E4946] rounded-8px h-12 font-medium text-14px flex-1"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                      السابق
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary rounded-8px h-12 font-medium text-14px flex-[2]"
                    >
                      {isSubmitting ? (
                        <span className="loading loading-spinner loading-sm" />
                      ) : "إنشاء الحساب"}
                    </button>
                  </div>
                </>
              )}

            </Form>
          )}
        </Formik>

        <p className="text-center font-normal text-base text-[#3E4946] mt-6">
          لديك حساب بالفعل؟
          <Link to="/login" className="font-normal text-base text-primary px-2 link-hover">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
