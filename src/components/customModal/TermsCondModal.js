import React from "react";
import Close from "../../assets/images/close.png";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import { DOWNLOAD_MODAL } from "./ModalConstants";

const TermsCondModal = () => {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  const downloadModalHandler = (e) => {//Will open download modal 
    e.preventDefault();
    dispatch(mdActions.showModal({type: DOWNLOAD_MODAL}));
  };

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head">
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body">
        <h4 className="text-h4">Terms & Conditions</h4>
        <p className="para1 mt-4">
          Lorem Ipsum was originally taken from a Latin text by the Roman
          philosopher Cicero. But it has gone through significant changes over
          the centuries, with words being taken out, shortened, and added in.
          The word ‘lorem’, for example, isn’t a real Latin word, it’s a
          shortened version of the word ‘dolorem’, meaning pain. Lorem Ipsum was
          originally taken from a Latin text by the Roman philosopher Cicero.
        </p>
      </div>
      <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
        <button className="btn_filled btn_sm" onClick={downloadModalHandler}>
          Accept
        </button>
        <button className="btn_filled btn_sm" onClick={downloadModalHandler}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default TermsCondModal;
