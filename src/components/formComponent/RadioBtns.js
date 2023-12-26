import React from "react";

const RadioBtns = (props) => {
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
                onChange={(event) => {
                    if (props.disabled) return;
                    props.onChange(event);
                }}
                checked={props.radioOption === props.value}
                value={props.value}
            />
            <label htmlFor={props.id} className={props.value === props.radioOption && "label-checked"}>{props.label}</label>
        </div>
    );
};

export default RadioBtns;