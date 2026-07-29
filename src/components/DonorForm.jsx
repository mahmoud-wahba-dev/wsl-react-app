import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { api } from "../utils/api";
import Label from "../composable/Label";
import Input from "../composable/Input";
import Textarea from "../composable/Textarea";
import ErrorMsg from "../composable/ErrorMsg";
import TagInput from "../composable/TagInput";
import Toast from "../../public/services/toast";

const baseURL = import.meta.env.VITE_BASE_URL;

const contactTypes = [
  { value: "mobile", label: "جوال" },
  { value: "fax", label: "فاكس" },
  { value: "email", label: "بريد إلكتروني" },
];

export const donorValidationSchema = Yup.object({
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

export const donorInitialValues = {
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

const DonorForm = ({ initialValues, onSubmit, onSuccess, submitLabel }) => {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoInputKey, setLogoInputKey] = useState(0);

  const [locationCity, setLocationCity] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [contactType, setContactType] = useState("mobile");
  const [contactValue, setContactValue] = useState("");

  const handleSubmit = async (values, formikHelpers) => {
    const donor = await onSubmit(values, formikHelpers);
    if (donor && logoFile) {
      try {
        const token = Cookies.get("access_token");
        const formData = new FormData();
        formData.append("logo", logoFile);
        await fetch(`${baseURL}/api/grants/donors/${donor.id}/`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } catch {
        Toast.error("تم الإضافة لكن فشل رفع الشعار");
      }
    }
    if (donor && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={donorValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, values, setFieldValue }) => {
        const addLocation = () => {
          const trimmed = locationCity.trim();
          if (!trimmed) return;
          setFieldValue("locations", [
            ...values.locations,
            { city: trimmed, address: locationAddress.trim() },
          ]);
          setLocationCity("");
          setLocationAddress("");
        };

        const removeLocation = (idx) => {
          setFieldValue(
            "locations",
            values.locations.filter((_, i) => i !== idx)
          );
        };

        const addContact = () => {
          const trimmed = contactValue.trim();
          if (!trimmed) return;
          setFieldValue("contacts", [
            ...values.contacts,
            { contact_type: contactType, value: trimmed },
          ]);
          setContactType("mobile");
          setContactValue("");
        };

        const removeContact = (idx) => {
          setFieldValue(
            "contacts",
            values.contacts.filter((_, i) => i !== idx)
          );
        };

        return (
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
                <div>
                  <Label text="ملاحظة مجالات التمويل" />
                  <Field name="funding_areas_note" as="input" placeholder="أي ملاحظات إضافية..." className="input w-full" />
                  <ErrorMsg name="funding_areas_note" />
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

                {/* Locations */}
                <div className="md:col-span-2">
                  <Label text="المواقع" />
                  {values.locations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {values.locations.map((loc, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 bg-[#E4EFFF] rounded-8px px-3 py-2 font-normal text-13px text-[#0D1D2C]"
                        >
                          <span className="font-medium">{loc.city}</span>
                          {loc.address && (
                            <span className="text-[#3E4946]">— {loc.address}</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeLocation(idx)}
                            className="size-4 flex items-center justify-center rounded-full hover:bg-[#00615333] transition-colors text-xs leading-none text-error"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <input
                      value={locationCity}
                      onChange={(e) => setLocationCity(e.target.value)}
                      placeholder="المدينة"
                      className="input w-1/3"
                    />
                    <input
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      placeholder="العنوان (اختياري)"
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={addLocation}
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      إضافة
                    </button>
                  </div>
                  <ErrorMsg name="locations" />
                </div>

                {/* Contacts */}
                <div className="md:col-span-2">
                  <Label text="جهات الاتصال" />
                  {values.contacts.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {values.contacts.map((c, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 bg-[#EEF4FF] rounded-8px px-3 py-2 font-normal text-13px text-[#0D1D2C]"
                        >
                          <span className="font-medium">
                            {contactTypes.find((t) => t.value === c.contact_type)?.label || c.contact_type}
                          </span>
                          <span className="text-[#3E4946]">{c.value}</span>
                          <button
                            type="button"
                            onClick={() => removeContact(idx)}
                            className="size-4 flex items-center justify-center rounded-full hover:bg-[#00615333] transition-colors text-xs leading-none text-error"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <select
                      value={contactType}
                      onChange={(e) => setContactType(e.target.value)}
                      className="select select-bordered w-1/3"
                    >
                      {contactTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <input
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder="القيمة"
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={addContact}
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      إضافة
                    </button>
                  </div>
                  <ErrorMsg name="contacts" />
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
            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full h-14" disabled={isSubmitting}>
                {isSubmitting && <span className="loading loading-spinner loading-xl"></span>}
                {submitLabel}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DonorForm;