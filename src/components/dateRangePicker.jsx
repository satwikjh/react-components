import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateField = React.forwardRef(({ value, name, label, ...rest }, ref) => (
  <div>
    <input
      {...rest}
      type="text"
      name={name}
      value={value}
      className="searchBox"
      placeholder={label}
    />
  </div>
));

const DateRangePicker = ({
  fromDate,
  toDate,
  handleChange,
  handleDateReset,
  label,
}) => {
  return (
    <div>
      {label && <label htmlFor="dateRangePicker">{label}</label>}
      <div
        id="dateRangePicker"
        className="form-control d-flex"
        // onFocus={(e) => {
        //   e.currentTarget.classList.add("input-focus");
        // }}
        // onBlur={(e) => {
        //   e.currentTarget.classList.remove("input-focus");
        // }}
      >
        <div className="flex-grow-1">
          <DatePicker
            selected={fromDate}
            customInput={
              <DateField name="fromDate" value={fromDate} label="From Date" />
            }
            onChange={(date) =>
              handleChange(new Date(date.setHours(0, 0, 0, 0)), "fromDate")
            }
            dateFormat={["dd-MM-yyyy", "dd/MM/yyyy"]}
            showYearDropdown
            showMonthDropdown
            todayButton
          />
        </div>
        <div className="vl"></div>
        <div className="flex-grow-1">
          <DatePicker
            selected={toDate}
            customInput={
              <DateField name="toDate" value={toDate} label="To Date" />
            }
            onChange={(date) =>
              handleChange(new Date(date.setHours(23, 59, 59, 999)), "toDate")
            }
            dateFormat={["dd-MM-yyyy", "dd/MM/yyyy"]}
            showYearDropdown
            showMonthDropdown
            todayButton
          />
        </div>
        <div className="flex-shrink-1">
          <i type="button" onClick={handleDateReset} className="material-icons">
            close
          </i>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
