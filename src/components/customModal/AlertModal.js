import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { SAVE_COMMENT_MODAL } from "./ModalConstants";

const AlertModal = () => {
    const dispatch = useDispatch();

    const hideModalHandler = (e) => {
        e.preventDefault();
        dispatch(mdActions.hideModal());
    };
    const saveCommentHandler = () => {
        dispatch(mdActions.showModal({type: SAVE_COMMENT_MODAL}));
    }
    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Alert</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <h4 className="text-h4" style={{ fontWeight: '500' }}>Would you like to mark this done? </h4>
            </div>
            <div className="modal_footer text-center mt-4 d-flex justify-content-center gap-3">
                <button className="btn_filled btn_sm" onClick={saveCommentHandler}>
                    Yes
                </button>
                <button className="btn_light btn_sm" onClick={hideModalHandler}>
                    No
                </button>
            </div>
        </div>
    );
};

export default AlertModal;
