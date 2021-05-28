import React, { forwardRef } from "react";
import "./formInput.css";

const FormInput = forwardRef((props, ref) => {
  const { type, name, label, error, onKeyPress = () => {}, ...rest } = props;
  return (
    <div className="input__outer">
      <div className={error ? "input input-error" : "input"}>
        <span className="legend">{label}</span>
        <input
          {...rest}
          type={type}
          id={name}
          className="input__inner"
          placeholder={label}
          ref={ref}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
              onKeyPress(e);
            }
          }}
        />
      </div>
      {error && <div className="input-alert">{error}</div>}
    </div>
  );
});

export default FormInput;
