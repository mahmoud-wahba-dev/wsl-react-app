import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DonorForm from "../../../components/DonorForm";
import { api } from "../../../utils/api";
import Toast from "../../../../public/services/toast";
import Loader from "../../../components/Loader";

const formatApiError = (message) =>
  message
    .replace(/\{|\}/g, "")
    .replace(/\[ErrorDetail\(string=['"]([^'"]+)['"].*\)\]/g, "$1")
    .trim();

const EditDonor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api(`/api/grants/donors/${id}/`);
        setDonor(res.data);
      } catch {
        Toast.error("فشل تحميل بيانات المانح");
        navigate("/admin/donors");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await api(`/api/grants/donors/${id}/`, {
        method: "PATCH",
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
          is_active: donor.is_active,
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
      const message = errData?.message || "حدث خطأ أثناء التحديث";
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

  if (loading) {
    return (
      <div className="mt-16">
        <Loader />
      </div>
    );
  }

  if (!donor) return null;

  return (
    <div>
      <h1 className="text-32px font-bold text-[#0D1D2C] mb-1">تعديل المانح</h1>
      <p className="font-normal text-base text-[#3E4946] mb-8">
        {donor.name}
      </p>
      <DonorForm
        initialValues={{
          name: donor.name || "",
          description: donor.description || "",
          website: donor.website || "",
          facebook_url: donor.facebook_url || "",
          twitter_url: donor.twitter_url || "",
          funding_areas: donor.funding_areas || [],
          funding_areas_note: donor.funding_areas_note || "",
          acceptance_requirements: donor.acceptance_requirements || [],
          acceptance_requirements_note: donor.acceptance_requirements_note || "",
          submission_periods: donor.submission_periods || "",
          locations: donor.locations || [],
          contacts: donor.contacts || [],
        }}
        onSubmit={handleSubmit}
        onSuccess={() => {
          Toast.success("تم تحديث المانح بنجاح");
          navigate("/admin/donors");
        }}
        submitLabel="تحديث المانح"
        logoUrl={donor.logo}
      />
    </div>
  );
};

export default EditDonor;