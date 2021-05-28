import React from "react";
import "./button.css";

const Button = ({ children, label }) => {
  return (
    <span className="btn__outer">
      <button className="btn bubble">
        {children}
        {label}
        <span className="btn__inner"></span>
      </button>
    </span>
  );
};

export default Button;
