import React from "react";

const RadioBtn = (props) => {
  const empHandler = () => {
    // console.log(props.value);
    if (props.clickAction) {
      props.clickAction(props.defaultValue);
    }
  };
  return (
    <div
      className={props.className ? `${props.className} radio-btn` : "radio-btn"}
    >
      <input
        type="radio"
        id={props.id}
        name={props.name}
        onChange={empHandler}
        checked={props?.checked}
        value={props.defaultValue}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default RadioBtn;
