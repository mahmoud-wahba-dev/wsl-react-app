import { useField } from "formik";

const InputWithIcon = ({ name, type = "text", placeholder, svg }) => {
  const [field, meta] = useField(name);
  return (
    <label className={`input w-full ${meta.touched && meta.error ? "input-error" : ""}`}>
      {svg}
      <input {...field} type={type} className="grow w-full" placeholder={placeholder} />
    </label>
  );
};

export default InputWithIcon;
