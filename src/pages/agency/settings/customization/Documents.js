import React from "react";
import Input from "../../../../components/formComponent/Input";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../../store/modal-slice";
import { ADD_DOC_MODAL, EDIT_DOC_MODAL } from "../../../../components/customModal/ModalConstants";


const Documents = () => {

  const dispatch = useDispatch();

  //Modal to add new document
  const docAddModalHandler = () => {
    dispatch(mdActions.showModal({type: ADD_DOC_MODAL}));
  }

  //modal to edit document
  const docEditModalHandler = () => {
    dispatch(mdActions.showModal({type: EDIT_DOC_MODAL}));
  }

  return (
    <div className=" mt-4 px-lg-5 px-3 ">
      <div className="position-relative panel_form flex-100">
        <Input
          type="text"
          placeholder="Upload file"
          label="Document 1"
          value="file 1.img"
          disabled={true}
          prepend={false}
          className="flex-100"
        />
        <div className="fileUp-actions actions-setting">
          <button className="btn_add" onClick={docEditModalHandler}>Edit</button>
          <button className="btn_add"><a href="#" download style={{ color: 'unset', textDecoration: 'none' }}>Download</a></button>
          <button className="btn_del">Delete</button>
        </div>
      </div>
      <div className="modal_footer mt-md-5 mt-4">
        <button className="btn_filled btn_sm mx-auto" onClick={docAddModalHandler}>
          Add More Document
        </button>
      </div>
    </div>
  );
};

export default Documents;
