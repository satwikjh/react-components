import React, { Component } from "react";

class Autocomplete extends Component {
  state = {
    activeSuggestion: -1,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
    showChild: false,
    isEditing: false,
  };

  liRef = React.createRef();

  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    if (suggestions) {
      const filteredSuggestions = suggestions.filter((sug) =>
        sug.name.toLowerCase().includes(userInput.toLowerCase())
      );
      const showSuggestions = filteredSuggestions.length ? true : false;
      this.setState({
        filteredSuggestions,
        showSuggestions,
        userInput: e.currentTarget.value,
        activeSuggestion: 0,
      });
    } else {
      this.setState({
        userInput: e.currentTarget.value,
      });
    }
  };

  onClick = ({ target }) => {
    this.setState({
      activeSuggestion: -1,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    });
    this.props.onSelect(target.value);
  };

  onKeyDown = (e) => {
    const { filteredSuggestions, userInput } = this.state;
    const { onSelect, onNotFound } = this.props;
    let { activeSuggestion } = this.state;

    switch (e.keyCode) {
      case 13:
        if (filteredSuggestions.length > 0) {
          activeSuggestion = activeSuggestion === -1 ? 0 : activeSuggestion;
          onSelect(filteredSuggestions[activeSuggestion].id);
          this.setState({
            activeSuggestion,
            showSuggestions: false,
          });
        } else onNotFound(userInput);

        e.currentTarget.blur();
        this.handleBlur();
        break;

      case 27:
        this.setState({
          userInput: "",
          activeSuggestion: -1,
          showSuggestions: false,
        });
        e.currentTarget.blur();
        break;

      case 38:
        activeSuggestion = activeSuggestion > 0 ? activeSuggestion - 1 : 0;
        this.setState({ activeSuggestion, showSuggestions: true });
        break;

      case 40:
        try {
          this.liRef.current.focus();
        } catch (e) {}
        activeSuggestion =
          activeSuggestion === filteredSuggestions.length - 1
            ? filteredSuggestions.length - 1
            : activeSuggestion + 1;
        this.setState({ activeSuggestion, showSuggestions: true });
        break;

      default:
        break;
    }
  };

  toggleChild = () => {
    this.setState({ showChild: !this.state.showChild });
    this.props.onButtonClick();
  };

  handleBlur = () => {
    this.setState({ isEditing: false });
  };

  handleFocus = () => {
    this.setState({ userInput: "", isEditing: true });
  };

  clearInput = () => {
    this.setState({ userInput: "" });
    this.props.onSelect("");
  };

  render() {
    const {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput,
      isEditing,
    } = this.state;
    const {
      label,
      name,
      curRef,
      hintText,
      showChild,
      showAddButton,
      children,
      showClearButton = false,
      selectedValue,
      onButtonClick,
    } = this.props;

    const suggestionsListComponent = (
      <ul
        ref={this.liRef}
        tabIndex="0"
        className="list-group scroll ddwidth"
        onMouseLeave={this.onMouseLeave}
        onKeyDown={this.onKeyDown}
      >
        {filteredSuggestions.map((sug, index) => (
          <li
            className={`list-group-item pointer ${
              index === activeSuggestion ? "list-group-item active" : ""
            }`}
            key={sug.id}
            onMouseDown={this.onClick}
            onMouseEnter={() => this.setState({ activeSuggestion: index })}
            value={sug.id}
          >
            {sug.name}
          </li>
        ))}
      </ul>
    );

    return (
      <div className="position-relative">
        {label && <label htmlFor={name}>{label}</label>}

        <div className="input-group">
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
              id={name}
              name={name}
              placeholder={hintText}
              className="searchBox"
              value={isEditing ? userInput : selectedValue}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref={curRef}
              autoComplete="off"
            />
            {showClearButton && (
              <i
                type="button"
                onClick={this.clearInput}
                className="material-icons"
              >
                close
              </i>
            )}
          </div>
          {showAddButton && (
            <div className="input-group-append" style={{ zIndex: "0" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onButtonClick}
              >
                {showChild ? "-" : "+"}
              </button>
            </div>
          )}
        </div>
        {showChild && children}
        {!showChild && showSuggestions && suggestionsListComponent}
      </div>
    );
  }
}

export default Autocomplete;
