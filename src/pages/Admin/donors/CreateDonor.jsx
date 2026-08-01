import { useNavigate } from "react-router-dom";
import DonorForm from "../../../components/DonorForm";
import { api } from "../../../utils/api";
import Toast from "../../../../public/services/toast";

const donorInitialValues = {
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
  locations: [],
  contacts: [],
};

const formatApiError = (message) =>
  message
    .replace(/\{|\}/g, "")
    .replace(/\[ErrorDetail\(string=['"]([^'"]+)['"].*\)\]/g, "$1")
    .trim();

const CreateDonor = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
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
          is_active: true,
          locations: values.locations,
          contacts: values.contacts,
        }),
      });

      if (res.status === 1) {
        return res.data;
      } else {
        Toast.error(res.message || "حدث خطأ");
      }
    } catch (error) {
      const errData = error?.response || error;
      const message = errData?.message || "حدث خطأ أثناء الإضافة";
      if (errData?.errors?.length) {
        const fieldErrors = {};
        errData.errors.forEach((err) => {
          const msg = formatApiError(err.message);
          fieldErrors[err.field] = fieldErrors[err.field]
            ? `${fieldErrors[err.field]}\n${msg}`
            : msg;
        });
        setErrors(fieldErrors);
      }
      Toast.error(message);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-32px font-bold text-[#0D1D2C] mb-1">إضافة مانح جديد</h1>
      <p className="font-normal text-base text-[#3E4946] mb-8">
        إضافة مؤسسة مانحة جديدة إلى المنصة
      </p>
      <DonorForm
        initialValues={donorInitialValues}
        onSubmit={handleSubmit}
        onSuccess={() => {
          Toast.success("تم إضافة المانح بنجاح");
          navigate("/admin/donors");
        }}
        submitLabel="إضافة المانح"
      />
    </div>
  );
};

export default CreateDonor;