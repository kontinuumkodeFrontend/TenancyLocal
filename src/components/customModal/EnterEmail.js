import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { renderInputFields } from "../formComponent/InputFields";
import { useFormik } from 'formik';
import { multipleEmailValidationRegex } from "../../validation/validation";
import { ADMIN_EMAIL_CSV, AGENCY_LANDLORD_CSV, AGENCY_PROPERTY_CSV, AGENCY_TENANCY_CSV } from "../../config/url";
import { post } from "../../services/api";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const inputField = [{
    type: "text",
    label: "Email",
    placeholder: "Enter email address",
    name: "emails"
}]

const EnterEmail = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const authRole = localStorage.getItem("authRole");
    let url;
    const location = useLocation();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };

    if (authRole === "1" && location.pathname === "/agency/landlord") {
        url = AGENCY_LANDLORD_CSV;
    } else if (authRole === "1" && location.pathname === "/agency/properties") {
        url = AGENCY_PROPERTY_CSV;
    } else if (authRole === "1" && location.pathname === "/agency/tenancies") {
        url = AGENCY_TENANCY_CSV;
    } else if (authRole === "2") {
        url = ADMIN_EMAIL_CSV;
    }

    const formik = useFormik({
        initialValues: {
            emails: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.emails.trim()) {
                errors.emails = 'Emails are required.';
            } else if (!multipleEmailValidationRegex.test(values.emails)) {
                errors.emails = 'Invalid email format. Please use commas to separate multiple emails.';
            }
            return errors;
        },
        onSubmit: (values) => {
            const emailArray = values.emails.split(',').map((email) => email.trim());
            const path = `${url}?token=${token}`;
            const body = {
                emails: emailArray,
            }
            if (token) post(path, body, null, setData, setIsLoading);
            // console.log('Validated Email Addresses:', emailArray);
        },
    });

    useEffect(() => {
        if (data) {
            if (data.saved) {
                toast.success("The PDF has been sent successfully!");
                setTimeout(() => {
                    hideModalHandler();
                }, 1000)
            } else {
                toast.error("PDF send failed!");
            }
        }
    }, [data]);

    return (
        <div className="custom-modal bg-after" >
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Enter Your Email Address Here</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="modal_body mt-5">
                    {renderInputFields(0, undefined, formik, inputField)}
                </div>
                <div className="modal_footer d-flex mt-4 flex-wrap  justify-content-center gap-3">
                    <button className="btn_filled btn_sm" type="submit">
                        {isLoading && <span className="loader"></span>}  Send
                    </button>
                    <button className="btn_light btn_sm" type="button" onClick={hideModalHandler}>
                        Cancel
                    </button>
                </div>
            </form>
        </div >
    );
};

export default EnterEmail;
