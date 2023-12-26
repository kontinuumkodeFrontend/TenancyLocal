import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input";
import TelInput from "../formComponent/TelInput";

const EditViewApp = () => {
    const dispatch = useDispatch();

    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Edit and View Applicants</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <div className="app_details position-relative">
                    <div className="panel_form form-agency mt-4">
                        <Input
                            type="text"
                            placeholder="Enter first name"
                            label="First Name"
                            value="Sam "
                            disabled={false}
                            prepend={false}
                        />
                        <Input
                            type="text"
                            placeholder="Enter middle name"
                            label="Middle Name"
                            defaultValue=""
                            disabled={false}
                            prepend={false}
                        />
                        <Input
                            type="text"
                            placeholder="Enter last name"
                            label="Last Name"
                            value="Altman"
                            disabled={false}
                            prepend={false}
                        />
                        <Input
                            type="email"
                            placeholder="Enter email"
                            label="Email"
                            value="mark123@example.com"
                            disabled={false}
                            prepend={false}
                        />
                        <TelInput />
                        <Input
                            type="text"
                            placeholder="Enter status"
                            label="Status"
                            value="Awaiting Reference"
                            disabled={true}
                            prepend={false}
                        />
                    </div>
                </div>
            </div>
            <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                <button className="btn_filled btn_sm" onClick={hideModalHandler}>
                    Update
                </button>
                <button className="btn_filled btn_sm" onClick={hideModalHandler}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditViewApp;
