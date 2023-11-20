import React from "react";

const Label = ({ labelName, label }) => {
  return (
    <>
      <label htmlFor={labelName}>{label}</label>
    </>
  );
};

export default Label;
