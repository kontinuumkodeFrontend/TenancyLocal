import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import {agreeActions } from "../../store/agreement-slice";
import Close from "../../assets/images/close.png";

const GenerateAgreement = () => {

    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
        //Also generate the agreement
        dispatch(agreeActions.showAgreement());
    };

    return (
        <div className="custom-modal bg-after event-modal">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Generate Agreement</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <h4 className="text-h4" style={{ fontWeight: '400' }}>Do You Want To Generate Agreement ?</h4>
            </div>
            <div className="modal_footer text-center mt-4">
                <button className="btn_filled btn_sm" onClick={hideModalHandler}>
                    Generate
                </button>
            </div>
        </div>
    );
};

export default GenerateAgreement;
