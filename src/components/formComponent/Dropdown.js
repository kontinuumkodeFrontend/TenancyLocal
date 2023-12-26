import React from "react";

const Dropdown = (props) => {

  const selectHandler = (e) => {
    console.log(e.target.value);
    props.selectHandler(e.target.value);
    if (props.setError) {
      props.setError("");
    }
  }

  return (
    <div
      className={`
     input-box
    ${props.error ? "input-err" : ""}
    ${props.className || ""}`}
    >
      {props.label && <label className="form-labels required">{props.label}<span>{" "}*</span></label>}
      <select value={props.selectValue || props.option[0].value} onChange={selectHandler}>
        {props?.option?.map((option, index) => {
          return (
            <option
              key={index}
              value={option.value}
              disabled={index === 0}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      {props.error && <p className="error-text">{props.error}</p>}
    </div>
  );
};

export default Dropdown;
