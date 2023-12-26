import React from "react";
import Signature from "./formComponent/Signature";
import { useDispatch } from "react-redux";
import { mdActions } from "../store/modal-slice";
import Checkbox from "./formComponent/Checkbox";

const PanelBottom = (props) => {
  const dispatch = useDispatch();
  const modalHandler = () => {
    dispatch(mdActions.showModal({ type: props.modalType }));
  };
  return (
    <div className="panel_center-bottom panel-inner-pt text-center">
      <Signature label={props.label} />
      <Checkbox className="mt-sm-5 mt-4"
        id="checkbox1"
        label={props.checkLabel}
      />
      <button className="btn_dark btn_xl mx-auto mt-4" onClick={modalHandler}>
        Submit
      </button>
    </div>
  );
};

export default PanelBottom;
