import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import Label from "../composable/Label";
import Input from "../composable/Input";
import Textarea from "../composable/Textarea";
import InputWithIcon from "../composable/InputWithIcon";
import ErrorMsg from "../composable/ErrorMsg";
import Toast from "../../public/services/toast";

const initialValues = {
  orgName: "",
  yearsExp: "",
  description: "",
  countery: "المملكة العربية السعودية",
  city: "",
  isLiscenced: false,
  isBankAccount: false,
  projectName: "",
  projectFields: [],
  projectIdea: "",
  objectives: "",
  operationalPlan: "",
  beneficiariesCount: "",
  expectedImpact: "",
  sustainability: "",
  durationMonths: "",
  requestedAmount: "",
};

const validationSchema = Yup.object({
  orgName: Yup.string().required("مطلوب").min(2, "اسم قصير جداً"),
  yearsExp: Yup.number("رقم غير صالح").required("مطلوب").positive(),
  description: Yup.string().required("مطلوب").min(10, "الوصف قصير جداً"),
  countery: Yup.string().required("مطلوب"),
  city: Yup.string().required("مطلوب"),
  isLiscenced: Yup.boolean().required("مطلوب"),
  isBankAccount: Yup.boolean().required("مطلوب"),
  projectName: Yup.string().required("مطلوب").min(3, "عنوان قصير جداً"),
  projectFields: Yup.array().min(1, "اختر مجالاً واحداً على الأقل"),
  projectIdea: Yup.string().required("مطلوب").min(10, "الشرح قصير جداً"),
  objectives: Yup.string().required("مطلوب").min(10, "الأهداف قصيرة جداً"),
  operationalPlan: Yup.string().required("مطلوب").min(10, "الخطة قصيرة جداً"),
  beneficiariesCount: Yup.number("رقم غير صالح").required("مطلوب").positive().integer(),
  expectedImpact: Yup.string().required("مطلوب").min(10, "الأثر قصير جداً"),
  sustainability: Yup.string().required("مطلوب").min(10, "الاستدامة قصيرة جداً"),
  durationMonths: Yup.number("رقم غير صالح").required("مطلوب").positive().integer(),
  requestedAmount: Yup.number("رقم غير صالح").required("مطلوب").positive(),
});

const MatchRequest = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await api("/api/grants/requests/", {
        method: "POST",
        body: JSON.stringify({
          association_name: values.orgName,
          years_of_experience: Number(values.yearsExp),
          description: values.description,
          country: values.countery,
          city: values.city,
          is_licensed: values.isLiscenced,
          has_bank_account: values.isBankAccount,
          project_title: values.projectName,
          focus_areas: values.projectFields,
          project_idea: values.projectIdea,
          objectives: values.objectives,
          operational_plan: values.operationalPlan,
          beneficiaries_count: Number(values.beneficiariesCount),
          expected_impact: values.expectedImpact,
          sustainability: values.sustainability,
          duration_months: Number(values.durationMonths),
          requested_amount: Number(values.requestedAmount),
        }),
      });
      if (data.status === 1) {
        Toast.success("تم تقديم الطلب بنجاح");
        navigate("/");
      } else {
        Toast.error(data.message);
      }
    } catch {
      Toast.error("حدث خطأ");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
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
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 18V0H10V4H20V18H0ZM2 16H8V14H2V16ZM2 12H8V10H2V12ZM2 8H8V6H2V8ZM2 4H8V2H2V4ZM10 16H18V6H10V16ZM12 10V8H16V10H12ZM12 14V12H16V14H12Z" fill="#006153"/>
                  </svg>
                  بيانات الجهة
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label text="اسم الجمعية / المؤسسة" />
                    <Input name="orgName" placeholder="أدخل الاسم الرسمي للجهة" />
                    <ErrorMsg name="orgName" />
                  </div>
                  <div>
                    <Label text="سنوات الخبرة" />
                    <Input name="yearsExp" placeholder="مثال 5" />
                    <ErrorMsg name="yearsExp" />
                  </div>
                  <div className="md:col-span-2">
                    <Label text="وصف مختصر للجهة" />
                    <Textarea name="description" placeholder="نبذة عن رؤية وأهداف الجهة..." />
                    <ErrorMsg name="description" />
                  </div>
                  <div>
                    <Label text="الدولة" />
                    <Field as="select" name="countery" className="select select-ghost w-full">
                      <option>المملكة العربية السعودية</option>
                    </Field>
                    <ErrorMsg name="countery" />
                  </div>
                  <div>
                    <Label text="المنطقة / المدينة" />
                    <Input name="city" placeholder="مثال: الرياض" />
                    <ErrorMsg name="city" />
                  </div>
                  <div className="flex items-center justify-between bg-[#EEF4FF] rounded-8px p-4">
                    <p className="font-normal text-base text-[#0D1D2C]">الجهة مرخّصة رسمياً؟</p>
                    <Field type="checkbox" name="isLiscenced" className="toggle toggle-sm toggle-primary" />
                  </div>
                  <div className="flex items-center justify-between bg-[#EEF4FF] rounded-8px p-4">
                    <p className="font-normal text-base text-[#0D1D2C]">يوجد حساب بنكي رسمي؟</p>
                    <Field type="checkbox" name="isBankAccount" className="toggle toggle-sm toggle-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-12px border border-[#BDC9C54D] p-8 shadow-xl drop-shadow-xl">
                <div className="flex items-center gap-2 font-medium text-20px text-primary mb-5">
                  <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 20C6.95 20 6.47917 19.8042 6.0875 19.4125C5.69583 19.0208 5.5 18.55 5.5 18H9.5C9.5 18.55 9.30417 19.0208 8.9125 19.4125C8.52083 19.8042 8.05 20 7.5 20ZM3.5 17V15H11.5V17H3.5ZM3.75 14C2.6 13.3167 1.6875 12.4 1.0125 11.25C0.3375 10.1 0 8.85 0 7.5C0 5.41667 0.729167 3.64583 2.1875 2.1875C3.64583 0.729167 5.41667 0 7.5 0C9.58333 0 11.3542 0.729167 12.8125 2.1875C14.2708 3.64583 15 5.41667 15 7.5C15 8.85 14.6625 10.1 13.9875 11.25C13.3125 12.4 12.4 13.3167 11.25 14H3.75Z" fill="#006153"/>
                  </svg>
                  بيانات المشروع
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label text="عنوان المشروع" />
                    <Input name="projectName" placeholder="عنوان جذاب يعبر عن جوهر المبادرة" />
                    <ErrorMsg name="projectName" />
                  </div>
                  <div className="md:col-span-2">
                    <Label text="مجالات المشروع (اختر ما ينطبق)" />
                    <div className="filter">
                      <Field type="checkbox" name="projectFields" value="التعليم" className="btn" aria-label="التعليم" />
                      <Field type="checkbox" name="projectFields" value="الإغاثة" className="btn" aria-label="الإغاثة" />
                      <Field type="checkbox" name="projectFields" value="الصحة" className="btn" aria-label="الصحة" />
                      <button type="button" className="btn btn-square" onClick={() => setFieldValue("projectFields", [])}>×</button>
                    </div>
                    <ErrorMsg name="projectFields" />
                  </div>
                  <div className="md:col-span-2">
                    <Label text="فكرة المشروع" />
                    <Textarea name="projectIdea" placeholder="اشرح المشكلة والحل المقترح..." />
                    <ErrorMsg name="projectIdea" />
                  </div>
                  <div>
                    <Label text="الأهداف الاستراتيجية" />
                    <Textarea name="objectives" placeholder="ما الذي تسعى لتحقيقه؟" />
                    <ErrorMsg name="objectives" />
                  </div>
                  <div>
                    <Label text="الخطة التشغيلية" />
                    <Textarea name="operationalPlan" placeholder="خطوات التنفيذ والجدول الزمني..." />
                    <ErrorMsg name="operationalPlan" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      <div>
                        <Label text="عدد المستفيدين" />
                        <InputWithIcon name="beneficiariesCount" placeholder="100" />
                        <ErrorMsg name="beneficiariesCount" />
                      </div>
                      <div>
                        <Label text="المدة (بالأشهر)" />
                        <InputWithIcon name="durationMonths" placeholder="12" />
                        <ErrorMsg name="durationMonths" />
                      </div>
                      <div>
                        <Label text="المبلغ المطلوب (SAR)" />
                        <InputWithIcon name="requestedAmount" placeholder="50,000" />
                        <ErrorMsg name="requestedAmount" />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label text="الأثر المتوقع" />
                    <Textarea name="expectedImpact" placeholder="التغيير الإيجابي الملموس بعد التنفيذ..." />
                    <ErrorMsg name="expectedImpact" />
                  </div>
                  <div className="md:col-span-2">
                    <Label text="الاستدامة" />
                    <Textarea name="sustainability" placeholder="كيف سيستمر أثر المشروع مستقبلاً؟" />
                    <ErrorMsg name="sustainability" />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between gap-4">
                <button type="submit" className="btn btn-primary grow h-14" disabled={isSubmitting}>
                  {isSubmitting && <span className="loading loading-spinner loading-xl"></span>}
                  إرسال وبدء المطابقة
                </button>
                {/* <button type="reset" className="btn btn-outline btn-secondary w-[25%] h-14">
                  حفظ كمسودة
                </button> */}
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default MatchRequest;