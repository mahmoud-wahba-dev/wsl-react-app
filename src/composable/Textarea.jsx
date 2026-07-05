import React from "react";

const Textarea = ({placeholder}) => {
  return (
    <textarea
      className="textarea h-24 w-full"
      placeholder={placeholder}
    ></textarea>
  );
};

export default Textarea;
