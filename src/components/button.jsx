import React from "react";
import "./button.css";

const Button = ({ children }) => {
  return (
    <span className="btn__outer">
      <button className="btn bubble">{children}</button>
    </span>
  );
};

export default Button;
