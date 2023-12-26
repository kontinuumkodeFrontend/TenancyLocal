import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Background from "../../assets/images/bg1.png";
import ThanksImg from "../../assets/images/thanks-img.png";

const ThanksModal = () => {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  return (
    <div
      className="custom-modal bg-img"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="modal_head">
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body text-center">
        <div className="thanks_img">
          <img src={ThanksImg} alt="img" />
        </div>
        <h6 className="text-h6">Thank you for using</h6>
        <h2 className="text-h2 mt-sm-4 mt-3 text_xl">TENANCY HIVE!</h2>
      </div>
    </div>
  );
};

export default ThanksModal;
