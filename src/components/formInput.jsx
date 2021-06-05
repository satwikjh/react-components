import React, { forwardRef } from "react";
import "./formInput.css";

const FormInput = forwardRef((props, ref) => {
  const {
    type = "text",
    name,
    label,
    error,
    onKeyPress = () => {},
    ...rest
  } = props;
  return (
    <div className="m-input__outer">
      <div className={error ? "m-input m-input-error" : "m-input"}>
        <input
          {...rest}
          type={type}
          id={name}
          name={name}
          className="m-input__inner"
          ref={ref}
          placeholder={label}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
              onKeyPress(e);
            }
          }}
        />
        <label htmlFor={name} className="legend">
          {label}
        </label>
      </div>
      {error && (
        <div className="m-input-alert">
          <div className="slide">{error}</div>
        </div>
      )}
    </div>
  );
});

export default FormInput;
