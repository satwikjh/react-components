import React from "react";
import { formatNumber } from "./numbers";

const NumberField = React.forwardRef((props, ref) => {
  const {
    name,
    label,
    value,
    error,
    readOnly = false,
    precision,
    onChange,
    onBlur,
    formatType,
    hintText,
  } = props;

  const [isEditing, setIsEditing] = React.useState(false);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      return;
    }
    if (e.key === "-") {
      if (value.indexOf("-") !== -1) {
        e.preventDefault();
        return;
      }
      console.log(e.target.selectionStart);
      // if (e.selectionStart !== ) e.preventDefault();
      return;
    }

    const regexp = /[0-9]|\.|-/;
    const dotIndex = value.indexOf(".");
    if (!regexp.test(e.key)) e.preventDefault();
    if (e.key === "." && dotIndex !== -1) e.preventDefault();
    if (precision && dotIndex !== -1 && value.length - dotIndex > precision)
      e.preventDefault();
  };

  const handleChange = (e) => {
    if (e.target.value === "00") e.target.value = "0";
    if (e.target.value === ".") e.target.value = "0.";
    if (
      e.target.value.length > 1 &&
      !e.target.value.startsWith("0.") &&
      e.target.value.startsWith("0")
    )
      e.target.value = e.target.value.slice(1);
    onChange(e);
  };

  const handleBlur = () => {
    setIsEditing(false);
    try {
      onBlur();
    } catch (e) {}
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        placeholder={hintText}
        className="input"
        id={name}
        autoComplete="off"
        type="text"
        name={name?.split(",")[0]}
        value={isEditing ? value : formatNumber(value, formatType, precision)}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={onKeyPress}
        onFocus={() => {
          setIsEditing(true);
        }}
        ref={ref}
        readOnly={readOnly}
      />
      {error && <div className="">{error}</div>}
    </div>
  );
});

export default NumberField;
