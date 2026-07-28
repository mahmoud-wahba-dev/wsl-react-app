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
};

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
        }),
      });

      if (res.status === 1) {
        Toast.success("تم إضافة المانح بنجاح");
        return res.data;
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
      <DonorForm
        initialValues={donorInitialValues}
        onSubmit={handleSubmit}
        onSuccess={() => navigate("/admin/donors")}
        submitLabel="إضافة المانح"
      />
    </div>
  );
};

export default CreateDonor;