import { ErrorMessage } from "formik";

const ErrorMsg = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      className="text-error text-12px mt-2"
      component={"div"}
    />
  );
};

export default ErrorMsg;
