import React from "react";
const Select = ({
  name,
  label = false,
  options,
  error,
  value,
  emptyOption,
  ...rest
}) => {
  return (
    <div>
      {label !== false && <label htmlFor={name}>{label}</label>}
      <select {...rest} name={name} id={name} defaultValue={value}>
        {emptyOption && <option value="" />}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="">{error}</div>}
    </div>
  );
};

export default Select;
