import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";


const ReviewAgreement = () => {
    const sigRef = useRef();
    const [signature, setSignature] = useState(null);
    const handleSignatureEnd = () => {
        setSignature(sigRef.current.toDataURL());
    };
    const clearSignature = () => {
        sigRef.current.clear();
        setSignature(null);
    };
    useEffect(() => {
        console.log(signature);
    }, [signature]);

    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };
    return (
        <div className="custom-modal bg-after event-modal">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Review Tenancy Agreement</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <SignatureCanvas
                    penColor="black"
                    canvasProps={{ className: "signature-review" }}
                    ref={sigRef}
                    onEnd={handleSignatureEnd}
                />
            </div>
            <div className="modal_footer d-flex gap-3 flex-wrap justify-content-center mt-4">
                    <button onClick={clearSignature} className="btn_filled btn_md">
                        Clear Signature
                    </button>
                    <button className="btn_filled btn_md" onClick={hideModalHandler}>Review</button>
            </div>
        </div>
    );
}

export default ReviewAgreement