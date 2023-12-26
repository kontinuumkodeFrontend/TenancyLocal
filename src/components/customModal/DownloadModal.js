import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { THANKS_MODAL } from "./ModalConstants";

const DownloadModal = () => {
  const dispatch = useDispatch();

  const thanksModalHandler = () => {//Will open thanks modal
    dispatch(mdActions.showModal({type:THANKS_MODAL}));
  };

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };
  return (
    <div className="custom-modal bg-after">
      <div className="modal_head">
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-2">
        <h4 className="text-h4">Would you like to download a local copy of the form?</h4>
      </div>
      <div className="modal_footer d-flex  mt-4 justify-content-center gap-3">
        <button className="btn_filled btn_sm" onClick={thanksModalHandler}>
          Yes
        </button>
        <button className="btn_filled btn_sm" onClick={thanksModalHandler}>
          No
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
