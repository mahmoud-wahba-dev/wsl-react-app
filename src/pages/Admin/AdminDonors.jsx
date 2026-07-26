import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { api } from "../../utils/api";
import Label from "../../composable/Label";
import Input from "../../composable/Input";
import Textarea from "../../composable/Textarea";
import ErrorMsg from "../../composable/ErrorMsg";
import TagInput from "../../composable/TagInput";
import Toast from "../../../public/services/toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const validationSchema = Yup.object({
  name: Yup.string().required("مطلوب").min(3, "قصير جداً"),
  description: Yup.string().required("مطلوب").min(10, "قصير جداً"),
  website: Yup.string().url("رابط غير صالح"),
  facebook_url: Yup.string().url("رابط غير صالح"),
  twitter_url: Yup.string().url("رابط غير صالح"),
  funding_areas: Yup.array().min(1, "أضف مجال تمويل واحد على الأقل"),
  funding_areas_note: Yup.string(),
  acceptance_requirements: Yup.array().min(1, "أضف شرط قبول واحد على الأقل"),
  acceptance_requirements_note: Yup.string(),
  submission_periods: Yup.string(),
});

const initialValues = {
  name: "",
  description: "",
  website: "",
  facebook_url: "",
  twitter_url: "",
  funding_areas: [],
  funding_areas_note: "",
  acceptance_requirements: [],
  acceptance_requirements_note: "",
  submission_periods: "",
};

const AdminDonors = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoInputKey, setLogoInputKey] = useState(0);

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const res = await api("/api/grants/donors/", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          website: values.website || undefined,
          facebook_url: values.facebook_url || undefined,
          twitter_url: values.twitter_url || undefined,
          funding_areas: values.funding_areas,
          funding_areas_note: values.funding_areas_note || undefined,
          acceptance_requirements: values.acceptance_requirements,
          acceptance_requirements_note:
            values.acceptance_requirements_note || undefined,
          submission_periods: values.submission_periods || undefined,
        }),
      });

      if (res.status === 1) {
        if (logoFile) {
          try {
            const token = Cookies.get("access_token");
            const formData = new FormData();
            formData.append("logo", logoFile);
            await fetch(`${baseURL}/api/grants/donors/${res.data.id}/`, {
              method: "PATCH",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            });
          } catch {
            Toast.error("تم الإضافة لكن فشل رفع الشعار");
          }
        }
        Toast.success("تم إضافة المانح بنجاح");
        resetForm();
        setLogoFile(null);
        setLogoPreview(null);
        setLogoInputKey((k) => k + 1);
      } else if (res.errors?.length) {
        const fieldErrors = {};
        res.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
        Toast.error(res.message);
      } else {
        Toast.error(res.message);
      }
    } catch {
      Toast.error("حدث خطأ أثناء الإضافة");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-32px font-bold text-[#0D1D2C] mb-1">إضافة مانح جديد</h1>
      <p className="font-normal text-base text-[#3E4946] mb-8">
        إضافة مؤسسة مانحة جديدة إلى المنصة
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="bg-white rounded-12px border border-[#BDC9C54D] p-8 shadow-xl drop-shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label text="اسم المؤسسة" />
                  <Input name="name" placeholder="الاسم الرسمي للمؤسسة" />
                  <ErrorMsg name="name" />
                </div>
                <div className="md:col-span-2">
                  <Label text="الوصف" />
                  <Textarea name="description" placeholder="وصف مختصر عن المؤسسة..." />
                  <ErrorMsg name="description" />
                </div>
                <div>
                  <Label text="الموقع الإلكتروني" />
                  <Input name="website" placeholder="https://" />
                  <ErrorMsg name="website" />
                </div>
                <div>
                  <Label text="رابط فيسبوك" />
                  <Input name="facebook_url" placeholder="https://facebook.com/..." />
                  <ErrorMsg name="facebook_url" />
                </div>
                <div>
                  <Label text="رابط تويتر" />
                  <Input name="twitter_url" placeholder="https://x.com/..." />
                  <ErrorMsg name="twitter_url" />
                </div>
                <div>
                  <Label text="ملاحظة مجالات التمويل" />
                  <Field name="funding_areas_note" as="input" placeholder="أي ملاحظات إضافية..." className="input w-full" />
                  <ErrorMsg name="funding_areas_note" />
                </div>
                <div className="md:col-span-2">
                  <Label text="مجالات التمويل" />
                  <TagInput
                    name="funding_areas"
                    value={values.funding_areas}
                    setFieldValue={setFieldValue}
                    placeholder="اكتب المجال ثم اضغط Enter"
                  />
                  <ErrorMsg name="funding_areas" />
                </div>
                <div className="md:col-span-2">
                  <Label text="متطلبات القبول" />
                  <TagInput
                    name="acceptance_requirements"
                    value={values.acceptance_requirements}
                    setFieldValue={setFieldValue}
                    placeholder="اكتب الشرط ثم اضغط Enter"
                  />
                  <ErrorMsg name="acceptance_requirements" />
                </div>
                <div className="md:col-span-2">
                  <Label text="ملاحظة متطلبات القبول" />
                  <Field name="acceptance_requirements_note" as="input" placeholder="أي ملاحظات إضافية..." className="input w-full" />
                  <ErrorMsg name="acceptance_requirements_note" />
                </div>
                <div className="md:col-span-2">
                  <Label text="فترات التقديم" />
                  <Textarea name="submission_periods" placeholder="فترات استقبال الطلبات..." />
                  <ErrorMsg name="submission_periods" />
                </div>
                <div className="md:col-span-2">
                  <Label text="شعار المؤسسة" />
                  <div className="flex items-center gap-4">
                    {logoPreview && (
                      <img src={logoPreview} className="size-20 object-contain rounded-8px border" alt="logo preview" />
                    )}
                    <input
                      key={logoInputKey}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setLogoFile(file);
                          setLogoPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="file-input file-input-ghost w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button type="submit" className="btn btn-primary w-full h-14" disabled={isSubmitting}>
                {isSubmitting && <span className="loading loading-spinner loading-xl"></span>}
                إضافة المانح
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminDonors;