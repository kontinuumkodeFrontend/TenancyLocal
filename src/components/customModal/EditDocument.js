import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input"
import EditFileUpload from "../formComponent/EditFileUpload";

const EditDocument = () => {

    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Update Document</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <div className="app_details position-relative">
                    <div className="mt-3">
                        <div className="panel_form form-agency mt-4">
                            <Input
                                type="text"
                                placeholder="Enter document name"
                                label="Document Title"
                                value="Income Proof"
                                disabled={false}
                                prepend={false}
                                className='flex-100'
                            />
                            <EditFileUpload
                                fileId="file2"
                                className="flex-100"
                                label="Document"
                                text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                            />
                        </div>
                        <div className="modal_footer mt-4">
                            <button className="btn_filled btn_sm mx-auto" onClick={hideModalHandler}>
                                Update Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDocument;
