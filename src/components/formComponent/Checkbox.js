import React, { useState } from "react";

const Checkbox = (props) => {
  // const [checkValue, setCheckValue] = useState(false);

  // const handleCheckboxChange = () => {
  //   setCheckValue(!checkValue);
  // };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className={props.className ? `${props.className} custom-checkbox` : 'custom-checkbox'}>
        <div className="position-relative"><input type="checkbox" id={props.id} checked={props.isChecked} onChange={props.changeHandler} />
          <label htmlFor={props.id}></label></div>
        <span className="text_sm ms-3"><button onClick={props.changeHandler} type="button">{capitalizeFirstLetter(props.label)}</button></span>
      </div>
      {props.checkError && <p className="error-text text-center">{props.checkError}</p>}
    </>
  );
};

export default Checkbox;
