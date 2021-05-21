import React, { Component } from "react";
import Input from "./input";
import Radio from "./radio";
import Select from "./select";
// import Joi from "joi";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    let data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
    this.validateProperty(name);
  };

  validateProperty = (name, value) => {
    let { errors } = this.state;
    const { error } = this.schema[name].validate(value);
    errors[name] = error ? error.message : "";
    this.setState({ errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { data, errors } = this.state;
    for (let name in this.schema) {
      const { error } = this.schema[name].validate(data[name]);
      errors[name] = error ? error.message : "";
    }
    this.setState({ errors });
    try {
      this.doSubmit();
    } catch {}
  };

  renderButton(label, type = "submit") {
    return (
      <button
        type={type}
        // disabled={this.validate()}
        className="btn btn-primary"
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  }

  renderInput = (name, label, { ...rest } = {}) => {
    const { data, errors } = this.state;
    return (
      <Input
        {...rest}
        name={name}
        hintText={label}
        value={data[name]}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        error={errors[name]}
      />
    );
  };

  renderSelect(name, label, options, { ...rest } = {}) {
    const { data, errors } = this.state;
    return (
      <Select
        {...rest}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      />
    );
  }
  renderRadio(name, label, options, { ...rest } = {}) {
    const { data } = this.state;
    return (
      <Radio
        {...rest}
        label={label}
        name={name}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
