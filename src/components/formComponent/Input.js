import React from "react";

const PoundSign = () => {
  return (
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon">
        &#163;
      </span>
    </div>
  );
};

const Input = (props) => {
  return (
    <div
      className={props.className ? `${props.className} input-box` : "input-box"}
    >
      <label className="form-labels">{props.label}</label>
      <div className="position-relative">
        {props.prepend && props.value.length >= 1 && <PoundSign />}
        <input
          className={
            props.prepend && props.value.length >= 1
              ? "pound_prefix"
              : ""
          }
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default Input;
