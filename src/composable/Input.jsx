import { useField } from "formik";

const Input = ({ name, placeholder }) => {
  const [field, meta] = useField(name);
  return (
    <input
      {...field}
      placeholder={placeholder}
      className={`input w-full ${meta.touched && meta.error ? "input-error" : ""}`}
    />
  );
};

export default Input;
