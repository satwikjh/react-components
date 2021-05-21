import React from "react";

const Input = React.forwardRef((props, ref) => {
  const {
    name,
    label,
    error,
    type = "text",
    hintText,
    onKeyPress,
    ...rest
  } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        name={name}
        id={name}
        className="input"
        placeholder={hintText}
        ref={ref}
        type={type}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
            onKeyPress(e);
          }
        }}
      />
      {error && <div className="">{error}</div>}
    </div>
  );
});

export default Input;
