import React, { useEffect, useState } from "react";
import Dropdown from "./formComponent/Dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { renderInputFields } from "./formComponent/InputFields";
import { encryptionOptions, serverOptions } from "../helper/SelectOptions";
import { emailServerInputFields } from "../helper/InputFields";
import {
    emailValidation,
    passwordValidation,
    nameValidation,
    portValidationSchema,
} from "../validation/validation";
import { post, get } from "../services/api";
import { ADMIN_SERVER_SETTINGS } from "../config/url";
import { toast } from "react-toastify";
import { setFieldsTouchedSingleForm } from "../services/utils";

const validationSchema = Yup.object().shape({
    ...emailValidation.fields,
    ...passwordValidation.fields,
    ...nameValidation.fields,
    ...portValidationSchema.fields,
    fromName: Yup.string().required("This field is required."),
    host: Yup.string().required("This field is required"),
});

const EmailServerSetting = () => {
    const token = localStorage.getItem("token");
    const [postData, setPostData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (token) {
            const url = `${ADMIN_SERVER_SETTINGS}?token=${token}`
            get(url, setData, setIsLoading);
        }
    }, []);

    console.log(data, "his is loaded")

    const [dropOption, setDropOption] = useState({
        option1: "",
        option2: "",
    });
    const [dropError, setDropError] = useState({
        error1: "",
        error2: "",
    });

    const formik = useFormik({
        initialValues: {
            host: "",
            port: "",
            email: "",
            name: "",
            fromName: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const path = `${ADMIN_SERVER_SETTINGS}?token=${token}`;
            const body = {
                driver: dropOption.option1,
                host: values.host,
                port: values.port,
                from_name: values.fromName,
                from_address: values.email,
                encryption: dropOption.option2,
                username: values.name,
                password: values.password
            }
            post(path, body, null, setPostData, setIsLoading)
            console.log(body, "This is body")
        },
    });

    useEffect(() => {
        if (data) {
            if (data.saved) {
                const formValues = {
                    host: data.mail_server.host || "",
                    port: data.mail_server.port || "",
                    name: data.mail_server.username || "",
                    fromName: data.mail_server.from_name || "",
                    password: "",
                    email: data.mail_server.from_address || "",
                }
                setDropOption({
                    option1: data.mail_server.driver || "",
                    option2: data.mail_server.encryption || ""
                }
                )
                formik.setValues(formValues);
            }
        }
    }, [data]);

    const optionHandler1 = (data) => {
        setDropOption((prev) => ({
            ...prev,
            otpion1: data,
        }));
    };

    const optionHandler2 = (data) => {
        setDropOption((prev) => ({
            ...prev,
            otpion2: data,
        }));
    };

    const errorHanlder1 = (error) => {
        setDropError((prev) => ({
            ...prev,
            error1: error,
        }));
    };

    const errorHanlder2 = (error) => {
        setDropError((prev) => ({
            ...prev,
            error2: error,
        }));
    };


    useEffect(() => {
        toast.dismiss();
        if (!postData) {
            return;
        }
        if (postData.saved) {
            toast.success("Email server settings updated successfully!");
        } else {
            toast.error("Failed to update email server settings!");
        }
    }, [postData]);


    console.log(postData, "This is post data");


    const formSubmitHandler = (e) => {
        e.preventDefault();
        formik.validateForm();
        setFieldsTouchedSingleForm(formik.values, formik);
        if (dropError.error1 || dropError.error2) {
            return;
        }
        if (!dropError.error1 && !dropOption.option1 && !dropError.error2 && !dropOption.option2) {
            setDropError({
                error1: "This field is required.",
                error2: "This field is required.",
            });
        }
        else if (!dropError.error1 && !dropOption.option1) {
            setDropError({
                error1: "This field is required.",
                error2: "",
            });
        }
        else if (!dropError.error2 && !dropOption.option2) {
            setDropError({
                error1: "",
                error2: "This field is required.",
            });
        }
        if (formik.isValid && dropOption.option1 && dropOption.option2) {
            formik.handleSubmit(e);
        }
    };

    return (
        <form
            className="panel_form panel_center-mid mt-4"
            onSubmit={formSubmitHandler}
        >
            <Dropdown
                label="Server Driver"
                option={serverOptions}
                required={true}
                selectValue={dropOption.option1}
                selectHandler={optionHandler1}
                error={dropError.error1}
                setError={errorHanlder1}
            />
            {renderInputFields(0, 4, formik, emailServerInputFields)}
            <Dropdown
                label="Encryption"
                option={encryptionOptions}
                required={true}
                selectValue={dropOption.option2}
                selectHandler={optionHandler2}
                error={dropError.error2}
                setError={errorHanlder2}
            />
            {renderInputFields(4, undefined, formik, emailServerInputFields)}
            <div className="mx-auto mt-4">
                <button className="btn_dark btn_lg" type="submit">{isLoading && <span className="loader"></span>}Save Changes</button>
            </div>
        </form>
    );
};

export default EmailServerSetting;
