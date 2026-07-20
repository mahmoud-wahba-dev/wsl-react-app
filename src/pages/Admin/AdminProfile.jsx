import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Label from "../../composable/Label";
import Input from "../../composable/Input";
import ErrorMsg from "../../composable/ErrorMsg";
import Toast from "../../../public/services/toast";
import Loader from "../../components/Loader";

const profileSchema = Yup.object({
  first_name: Yup.string().min(2, "قصير جداً"),
  last_name: Yup.string().min(2, "قصير جداً"),
});

const passwordSchema = Yup.object({
  current_password: Yup.string().required("كلمة المرور الحالية مطلوبة"),
  new_password: Yup.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").required("كلمة المرور الجديدة مطلوبة"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
});

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api("/api/auth/users/me/");
        setUserData(res.data);
      } catch {
        setUserData(null);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await api("/api/auth/users/me/", {
        method: "PATCH",
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
        }),
      });
      if (res.status === 1) {
        Toast.success("تم تحديث الملف الشخصي");
        setUserData(res.data);
      } else {
        Toast.error(res.message);
      }
    } catch {
      Toast.error("حدث خطأ أثناء التحديث");
    }
    setSubmitting(false);
  };

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await api("/api/auth/users/change-password/", {
        method: "POST",
        body: JSON.stringify({
          current_password: values.current_password,
          new_password: values.new_password,
        }),
      });
      if (res.status === 1) {
        Toast.success("تم تغيير كلمة المرور بنجاح");
        resetForm();
      } else {
        Toast.error(res.message);
      }
    } catch {
      Toast.error("حدث خطأ أثناء تغيير كلمة المرور");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <section>
        <div className="container mt-16">
          <Loader />
        </div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section>
        <div className="container mt-16 text-center py-20">
          <h2 className="font-bold text-24px text-[#0D1D2C] mb-4">خطأ في تحميل البيانات</h2>
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="font-bold text-32px text-primary text-center mb-2">الملف الشخصي</h1>
      <p className="font-normal text-18px text-[#3E4946] text-center mb-12">إدارة معلومات حسابك الشخصي</p>

      <Formik
        initialValues={{
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
        }}
        validationSchema={profileSchema}
        onSubmit={handleProfileSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="bg-white rounded-12px border border-[#BDC9C54D] p-8 shadow-xl drop-shadow-xl">
              <div className="flex items-center gap-2 font-medium text-20px text-primary mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                المعلومات الأساسية
              </div>
              <div className="divider"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label text="البريد الإلكتروني" />
                  <Field
                    name="email"
                    value={userData.email}
                    disabled
                    className="input w-full opacity-60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label text="الاسم الأول" />
                  <Input name="first_name" placeholder="أدخل اسمك الأول" />
                  <ErrorMsg name="first_name" />
                </div>
                <div>
                  <Label text="الاسم الأخير" />
                  <Input name="last_name" placeholder="أدخل اسمك الأخير" />
                  <ErrorMsg name="last_name" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full h-14 mt-6" disabled={isSubmitting}>
                {isSubmitting && <span className="loading loading-spinner loading-xl"></span>}
                حفظ التغييرات
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* <Formik
        initialValues={{
          current_password: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={passwordSchema}
        onSubmit={handlePasswordSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8">
            <div className="bg-white rounded-12px border border-[#BDC9C54D] p-8 shadow-xl drop-shadow-xl">
              <div className="flex items-center gap-2 font-medium text-20px text-primary mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                تغيير كلمة المرور
              </div>
              <div className="divider"></div>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label text="كلمة المرور الحالية" />
                  <Field name="current_password" type="password" placeholder="أدخل كلمة المرور الحالية" className="input w-full" />
                  <ErrorMsg name="current_password" />
                </div>
                <div>
                  <Label text="كلمة المرور الجديدة" />
                  <Field name="new_password" type="password" placeholder="أدخل كلمة المرور الجديدة" className="input w-full" />
                  <ErrorMsg name="new_password" />
                </div>
                <div>
                  <Label text="تأكيد كلمة المرور الجديدة" />
                  <Field name="confirm_password" type="password" placeholder="أعد إدخال كلمة المرور الجديدة" className="input w-full" />
                  <ErrorMsg name="confirm_password" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full h-14 mt-6" disabled={isSubmitting}>
                {isSubmitting && <span className="loading loading-spinner loading-xl"></span>}
                تغيير كلمة المرور
              </button>
            </div>
          </Form>
        )}
      </Formik> */}
    </div>
  );
};

export default AdminProfile;