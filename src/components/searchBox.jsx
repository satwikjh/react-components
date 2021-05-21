import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div
      className="form-control d-flex"
      onFocus={(e) => {
        e.currentTarget.classList.add("input-focus");
      }}
      onBlur={(e) => {
        e.currentTarget.classList.remove("input-focus");
      }}
    >
      <input
        type="text"
        name="query"
        className="searchBox"
        placeholder="Search.."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <i type="button" onClick={() => onChange("")} className="material-icons">
        close
      </i>
    </div>
  );
};

export default SearchBox;
