import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Label from "../composable/Label";
import Input from "../composable/Input";
import ErrorMsg from "../composable/ErrorMsg";
import Toast from "../../public/services/toast";
import Loader from "../components/Loader";

const validationSchema = Yup.object({
  first_name: Yup.string().min(2, "قصير جداً"),
  last_name: Yup.string().min(2, "قصير جداً"),
});

const Profile = () => {
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

  const handleSubmit = async (values, { setSubmitting }) => {
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
    <Formik
      initialValues={{
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <section className="py-12">
            <div className="container max-w-2xl">
              <h1 className="font-bold text-32px text-primary text-center mb-2">
                الملف الشخصي
              </h1>
              <p className="font-normal text-18px text-[#3E4946] text-center mb-12">
                إدارة معلومات حسابك الشخصي
              </p>

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
              </div>

              <div className="mt-8">
                <button type="submit" className="btn btn-primary w-full h-14" disabled={isSubmitting}>
                  {isSubmitting && <span className="loading loading-spinner loading-xl"></span>}
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
