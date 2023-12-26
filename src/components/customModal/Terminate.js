import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";

const Terminate = () => {
  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Terminate Application</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <h4 className="text-h4" style={{ fontWeight: '500' }}>Are you sure to terminate application?</h4>
      </div>
      <div className="modal_footer mt-4">
        <button className="btn_filled btn_sm mx-auto btn_danger" onClick={hideModalHandler}>
          Terminate Application
        </button>
      </div>
    </div>
  );
};

export default Terminate;
