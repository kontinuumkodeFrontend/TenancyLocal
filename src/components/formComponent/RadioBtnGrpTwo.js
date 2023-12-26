import React, { useState } from "react";

const RadioBtnGrpTwo = ({handleChange,value1,value2, className, label}) => {
    const [radioBtn, setRadioBtn] = useState("");

    // console.log(radioBtn, "set");

    return (
        <div className={`${className} panel_que-btns`}>
            <p className="form-labels">{label}</p>
            <div className="btn_group">
                <div className="panel_setting d-flex flex-wrap">
                    <button
                        className={
                            radioBtn === "BTN-ONE"
                                ? "btn_filled radio_btn"
                                : "btn_stroke3 radio_btn"
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            setRadioBtn("BTN-ONE");
                            handleChange(value1, e);
                        }}
                    >
                        {value1}
                    </button>
                    <button
                        className={
                            radioBtn === "BTN-TWO"
                                ? "btn_filled radio_btn"
                                : "btn_stroke3 radio_btn"
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            setRadioBtn("BTN-TWO");
                            handleChange(value2, e);
                        }}
                    >
                        {value2}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RadioBtnGrpTwo;
