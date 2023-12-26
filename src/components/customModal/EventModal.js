import React from 'react'
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";

const EventModal = () => {
    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };
    return (
        <div className="custom-modal bg-after event-modal">
            <div className="modal_head border-after d-flex mb-4">
                <h5 className="text-h5">Event Details</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <div className="d-flex flex-column gap-3">
                    <div className="tenancy-info">
                        <p className="text_lg">Event Type :</p>
                        <p className="text_lg fw-500">Chase email</p>
                    </div>
                    <div className="tenancy-info">
                        <p className="text_lg">Created By :</p>
                        <p className="text_lg fw-500">Sent by System</p>
                    </div>
                    <div className="tenancy-info">
                        <p className="text_lg">Description :</p>
                        <p className="text_lg fw-500">Chase email sent to applicants and references</p>
                    </div>
                    <div className="tenancy-info">
                        <p className="text_lg">Date :</p>
                        <p className="text_lg fw-500">23/06/2023</p>
                    </div>
                    <div className="tenancy-info">
                        <p className="text_lg">Details :</p>
                        <p className="text_lg fw-500">
                            Date: 23/06/2023
                            <br/>
                            <br />
                            Dear Stweta
                            <br/>
                            <br/>
                            This Email is a  Chasing email to you for this Applicant tweta.
                            This Applicant live in this tenancy 564758769_2024-06-25.
                            <br/>
                            Please let us know if you have any queries.
                            Have a nice day!. :)
                            <br/>
                            <br/>
                            Sincerely,  <br/>
                            Harman Agency
                        </p>
                    </div>
                    <div className="tenancy-info">
                        <p className="text_lg">Applicants :</p>
                        <p className="text_lg fw-500">teem@yopmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventModal