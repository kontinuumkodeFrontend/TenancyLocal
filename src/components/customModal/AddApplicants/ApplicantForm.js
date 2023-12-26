import React, { useEffect, useState } from "react";
import RadioBtns from "../../formComponent/RadioBtns";
import { applicantInputFields } from "../../formComponent/InputFields";
import TelInput from "../../formComponent/TelInput";
import { generateModifiedFields } from "../../../services/utils";
import { ApplicantInputField } from "../../../helper/InputFields";

const ApplicantForm = ({
    initialValue,
    formik,
    index,
    formHandler,
    emailError,
}) => {
    console.log(emailError, "JJJJJJJJJJJJJJJJJJJJJJ");

    const [phoneError, setPhoneError] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState({
        phone: initialValue?.phoneNumber ? initialValue?.phoneNumber : null,
        countryCode: initialValue?.countryCode ? initialValue?.countryCode : null,
    });

    const [existingApp, setExistingApp] = useState("");
    const [existingError, setExistingError] = useState(null);

    const renewAppHandler = (event) => {
        setExistingApp(event.target.value);
        setExistingError(null);
    };

    useEffect(() => {
        if (initialValue?.phoneNumber) {
            setPhoneNumber({
                phone: initialValue?.phoneNumber,
                countryCode: initialValue?.countryCode,
            });
        }
    }, [initialValue.phoneNumber]);

    useEffect(() => {
        if (initialValue?.existingApp) {
            setExistingApp(initialValue?.existingApp || "");
        }
    }, [initialValue.existingApp]);

    useEffect(() => {
        setPhoneError(initialValue.phoneError);
    }, [initialValue?.phoneError]);

    useEffect(() => {
        setExistingError(initialValue.existingAppError);
    }, [initialValue?.existingAppError]);

    useEffect(() => {
        formHandler("phoneNumber", phoneNumber.phone, index);
        formHandler("phoneError", phoneError, index);
        formHandler("countryCode", phoneNumber.countryCode, index);
    }, [phoneNumber]);

    useEffect(() => {
        formHandler("existingApp", existingApp, index);
        formHandler("existingAppError", existingError, index);
    }, [existingApp]);

    return (
        <>
            {emailError?.email && (
                <div className="ref-incomplete py-3 my-3">
                    {emailError?.code === 1
                        ? "This Applicant does not exist for renew"
                        : emailError?.code === 2
                            ? "This Applicant email has already taken"
                            : ""}
                </div>
            )}
            <div className="panel_form form-agency mt-4">
                {applicantInputFields(
                    0,
                    undefined,
                    formik,
                    generateModifiedFields(index, ApplicantInputField, "applicant")
                )}
                <TelInput
                    className="flex-100"
                    phoneNumber={phoneNumber}
                    phoneHandler={setPhoneNumber}
                    error={phoneError}
                    setError={setPhoneError}
                />
                <div className="panel_que-btns input-box flex-100 text-center">
                    <p className="form-labels">Existing Applicant?</p>
                    <div className="btn_group justify-content-center">
                        <RadioBtns
                            label="Yes"
                            name="exeApp"
                            id="exeApp-yes"
                            value="Yes"
                            radioOption={existingApp}
                            onChange={renewAppHandler}
                        />
                        <RadioBtns
                            value="No"
                            label="No"
                            name="exeApp"
                            id="exeApp-no"
                            radioOption={existingApp}
                            onChange={renewAppHandler}
                        />
                    </div>
                    {existingError && (
                        <p className="error-text">This field is required.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApplicantForm;
