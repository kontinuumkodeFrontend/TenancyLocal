import React, { useState } from "react";
import PersonalDetail from "./PersonalDetail";
import PrevLandlord from "./PrevLandlord";
import Guarantor from "./Guarantor";
import Employment from "./Employment";
import PrevAddress from "./PrevAddress";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../../store/modal-slice";
import { ADD_TENANTS_MODAL } from "../../../../components/customModal/ModalConstants";


const AppContent = () => {
    const dispatch = useDispatch();
    const [appBtn, setAppBtn] = useState("PERSONAL-DETAILS"); //initialy setting personal details tab as default
    const addApplicantHandler = () => {
        //show Add Applicants to Tenancy modal
        dispatch(mdActions.showModal({ type: ADD_TENANTS_MODAL }));
    }
    return (
        <div className="mt-4">
            <div className="panel_setting d-flex gap-md-4 gap-3 px-xl-5 px-3 flex-wrap">
                <button
                    className={
                        appBtn === "PERSONAL-DETAILS"
                            ? "btn_filled btn_sm"
                            : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setAppBtn("PERSONAL-DETAILS");
                    }}
                >
                    Personal Details
                </button>
                <button
                    className={
                        appBtn === "PREVIOUS-LANDLORD"
                            ? "btn_filled btn_sm"
                            : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setAppBtn("PREVIOUS-LANDLORD");
                    }}
                >
                    Previous Landlord
                </button>
                <button
                    className={
                        appBtn === "GUARANTOR" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setAppBtn("GUARANTOR");
                    }}
                >
                    Guarantor
                </button>
                <button
                    className={
                        appBtn === "EMPLOYMENT" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setAppBtn("EMPLOYMENT");
                    }}
                >
                    Employment
                </button>
                <button
                    className={
                        appBtn === "PREV-ADDRESS"
                            ? "btn_filled btn_sm"
                            : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setAppBtn("PREV-ADDRESS");
                    }}
                >
                    Forwarding Address
                </button>
                <button
                    className={
                        appBtn === "PREV-ADDRESS"
                            ? "btn_light2 btn_sm pe-none"
                            : "btn_light2 btn_sm pe-none"
                    }
                    onClick={() => {
                        setAppBtn("PREV-ADDRESS");
                    }}
                >
                    Quarterly
                </button>
                <button
                    className={
                        appBtn === "PREV-ADDRESS"
                            ? "btn_light2 btn_sm pe-none"
                            : "btn_light2 btn_sm pe-none"
                    }
                    onClick={() => {
                        setAppBtn("PREV-ADDRESS");
                    }}
                >
                    Full Terms Payment
                </button>
            </div>
            {appBtn === 'PERSONAL-DETAILS' && <PersonalDetail />}
            {appBtn === 'PREVIOUS-LANDLORD' && <PrevLandlord />}
            {appBtn === 'GUARANTOR' && <Guarantor />}
            {appBtn === 'EMPLOYMENT' && <Employment />}
            {appBtn === 'PREV-ADDRESS' && <PrevAddress />}
        </div>
    );
};

export default AppContent;
