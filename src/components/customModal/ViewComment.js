import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";

const Comment = () => {
    return (
        <div className="comment-box mb-3">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia
                turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum
                ut lobortis sodales.
            </p>
            <p className="text-end mt-3">Date: 15-05-2023</p>
        </div>
    );
};

const ViewComment = (props) => {
    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">View Comment</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
            <Comment/>
            <Comment/>
            <Comment/>
            </div>
        </div>
    );
};

export default ViewComment;
