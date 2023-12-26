import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
    emailValidation,
} from "../../validation/validation";
import { post } from "../../services/api";
import { AGENCY_FORGOT_PASS } from "../../config/url";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
    ...emailValidation.fields,
});

const ForgotPass = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [url, setURL] = useState(null);
    const location = useLocation();
    console.log(location.pathname);

    useEffect(() => {
        if (location.pathname === "/login") {
            setURL(AGENCY_FORGOT_PASS);
        } else if (location.pathname === "/applicant/login") {
            setURL();
        }
    }, []);


    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema,
        onSubmit: (values) => {
            const body = {
                email: values.email
            };
            post(url, body,null, setData, setIsLoading);
        },
    });

    useEffect(() => {
        if (data) {
            if (data.saved) {
                toast.info("Please check your email for reset password!");
                setTimeout(() => {
                    props.authContent("");
                }, 4000)
            } else {

            }
        }
    }, [data]);

    return (
        <React.Fragment>
            <div className="mt-lg-4 mt-3">
                <p className="text_lg-green text-center">Reset Your Password</p>
                <p className="text_sm mt-2">
                    We will send you email that will allow you to reset your password.
                </p>
            </div>
            <div className="mt-4">
                <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column gap-4">
                        <div
                            className={
                                formik.errors.email && formik.touched.email
                                    ? "input-box input-err"
                                    : "input-box"
                            }
                        >
                            <label className="form-labels">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="error-text">{formik.errors.email}</p>
                            )}
                        </div>
                    </div>
                    <button
                        className="btn_dark btn_lg w-100 mt-5"
                        type="submit"
                    >
                        {isLoading && <span className="loader"></span>}   Reset Password
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default ForgotPass;
