import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import { editPropActions } from "../../store/edit-property-slice";

const ModalBackdrop = () => {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(editPropActions.emptyFiles());
    dispatch(mdActions.hideModal());
  };

  return <div className="modal-backdrop" onClick={hideModalHandler}></div>;
};

export default ModalBackdrop;
