import { useField } from "formik";

const Textarea = ({ name, placeholder }) => {
  const [field, meta] = useField(name);
  return (
    <textarea
      {...field}
      placeholder={placeholder}
      className={`textarea h-24 w-full ${meta.touched && meta.error ? "textarea-error" : ""}`}
    />
  );
};

export default Textarea;
