import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";

const DeleteModal = ({data, setDelete, setIsOpen}) => {
    const dispatch =  useDispatch();

    const submitModalHandler = (e)=>{
      setDelete(e)
      setIsOpen(false)
      setTimeout(() => {
        dispatch(mdActions.hideModal());
      }, 1000);
    }
    const hideModalHandler = (e)=>{
      setDelete(e)
      setIsOpen(false)
      dispatch(mdActions.hideModal());
    }
  return (

    <div className="modal-backdrop">
      <div className="modal_wrapper modal_wrapper-3">
    <div className="custom-modal bg-after">
      <div className="modal_head">
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body">
        <h4 className="text-h4">Are you sure you want to delete {data}?</h4>
      </div>
      <div className="modal_footer d-flex flex-wrap mt-4  justify-content-center gap-3">
        <button className="btn_filled btn_sm" onClick={() => submitModalHandler(true)}>
          Yes
        </button>
        <button className="btn_light btn_sm" onClick={() => hideModalHandler(false)}>
          No
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default DeleteModal;
