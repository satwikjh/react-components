import React from "react";

const Radio = ({ name, value, options, onChange, label, verticle }) => {
  let style = verticle && { display: "block" };
  return (
    <div>
      {label && <div className="">{label}</div>}
      {options.map((o, i) => (
        <span key={i} style={style}>
          <input
            id={o.id}
            type="radio"
            name={name}
            value={o.id}
            checked={o.id.toString() === value.toString()}
            onChange={onChange}
          />
          <label className="" htmlFor={o.id}>
            {o.name}
          </label>
        </span>
      ))}
    </div>
  );
};

export default Radio;
