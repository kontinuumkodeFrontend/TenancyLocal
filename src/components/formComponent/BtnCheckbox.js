import React, { useEffect, useState } from 'react'


const BtnCheckbox = (props) => {
    const [btnActive, setBtnActive] = useState(false);
    // console.log(props.name, btnActive)
    const clickHandler = () => {
        const updatedValue = !btnActive
        setBtnActive(updatedValue);
        props.changeHandler(props.name, updatedValue);
    };

    useEffect(() => {
        setBtnActive(props.defaultValue);
    }, [props.defaultValue])

    return (
        <button type='button'
            className={
                btnActive ? "btn_filled btn_sm" : "btn_stroke3 btn_sm"
            }
            onClick={() => {
                if (!props.disabled) clickHandler();
            }}
        >
            {props.label}
        </button>
    )
}

export default BtnCheckbox