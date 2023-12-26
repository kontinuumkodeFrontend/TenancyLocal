import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";

const ThanksCredit = () => {
  const dispatch =  useDispatch();

  const hideModalHandler = ()=>{
    dispatch(mdActions.hideModal());
  }
  return (
    <div className="custom-modal bg-after">
      <div className="modal_head">
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body text-center">
      <h2 className="text-h2 text_xl">Thank You</h2>
        <h5 className="text-h5 mt-sm-5 mt-4">For Adding Credits to the Agencies</h5>
      </div>
    </div>
  );
};

export default ThanksCredit;
