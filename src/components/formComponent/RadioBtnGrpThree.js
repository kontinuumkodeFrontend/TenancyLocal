import React, { useState } from "react";

const RadioBtnGrpThree = (props) => {
    const [radioBtn, setRadioBtn] = useState(""); 


    return (
        <div className="panel_que-btns">
            <p className="form-labels">{props.label}</p>
            <div className="btn_group">
                <div className="panel_setting d-flex flex-wrap">
                    <button
                        className={
                            radioBtn === "BTN-ONE"
                                ? "btn_filled radio_btn radio-btn-md"
                                : "btn_stroke3 radio_btn radio-btn-md"
                        }
                        onClick={() => {
                            setRadioBtn("BTN-ONE");
                        }}
                    >
                        {props.value1}
                    </button>
                    <button
                        className={
                            radioBtn === "BTN-TWO"
                                ? "btn_filled radio_btn radio-btn-lg"
                                : "btn_stroke3 radio_btn radio-btn-lg"
                        }
                        onClick={() => {
                            setRadioBtn("BTN-TWO");
                        }}
                    >
                        {props.value2}
                    </button>
                    <button
                        className={
                            radioBtn === "BTN-THREE"
                                ? "btn_filled radio_btn radio-btn-xl"
                                : "btn_stroke3 radio_btn radio-btn-xl"
                        }
                        onClick={() => {
                            setRadioBtn("BTN-THREE");
                        }}
                    >
                        {props.value3}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RadioBtnGrpThree;
