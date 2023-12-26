import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";

const ContactModal = () => {
    const dispatch = useDispatch();

    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };
    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Successful</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <h4 className="text-h4 text-center" style={{ fontWeight: "400" }}>
                    Your request is successfully submmited we will contact you as soon as
                    possible.
                </h4>
                <h5 className="text-h5 text_xl text-center mt-sm-4 mt-3">Thank You!</h5>
            </div>
        </div>
    );
};

export default ContactModal;
