import React from "react";

const CheckBox = ({
  name,
  checked,
  onChange,
  label,
  disabled,
  reverse,
  ...rest
}) => {
  return (
    <div>
      {reverse ? (
        <label className="" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <input
        {...rest}
        id={name}
        checked={checked}
        type="checkbox"
        onChange={onChange}
        disabled={disabled}
      />
      {label && !reverse ? (
        <label className="" htmlFor={name}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default CheckBox;
