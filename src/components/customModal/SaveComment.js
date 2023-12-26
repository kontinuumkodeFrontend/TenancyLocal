import React from "react";
import Input from "../formComponent/Input";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { commentAtions } from "../../store/comment-slice";

const SaveComment = () => {
    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
        //Also set comment saved in reducer
        dispatch(commentAtions.setComment());
    };
    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Save Comment</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <Input
                    type="date"
                    placeholder="Enter date"
                    label="Select Date"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                    className="flex-100"
                />
                <div className="input-box mt-3">
                    <textarea
                        name="note"
                        placeholder="Type your comment"
                        defaultValue=""
                        className="proof-note"
                    />
                </div>
            </div>
            <div className="modal_footer text-center mt-4">
                <button className="btn_filled btn_sm w-100" onClick={hideModalHandler}>
                    Save Comment
                </button>
            </div>
        </div>
    );
};

export default SaveComment;
