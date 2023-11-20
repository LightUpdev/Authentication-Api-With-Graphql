import React from "react";

const Input = ({ inputType, required, name, onChange, value }) => {
  return (
    <>
      <input
        type={inputType}
        required={required}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
