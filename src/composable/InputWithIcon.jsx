import React from "react";

const InputWithIcon = ({ type="text", placeholder, svg }) => {
  return (
    <label className="input w-full">
      {/* <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        </g>
      </svg> */}
      {svg}
      <input type={type} className="grow w-full" placeholder={placeholder} />
    </label>
  );
};

export default InputWithIcon;
