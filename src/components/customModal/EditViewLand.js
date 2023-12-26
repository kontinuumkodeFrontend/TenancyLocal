import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Checkbox from "../formComponent/Checkbox";
import Postcode from "../formComponent/Postcode";
import TelInput from "../formComponent/TelInput";
import { useFormik } from "formik";
import { AGECNY_EDIT_LANDLORD, AGENCY_VIEW_LANDLORD } from "../../config/url";
import { validationSchema, inputFields } from "./AddLandlord";
import { renderInputFields } from "../formComponent/InputFields";
import { toast } from "react-toastify";
import { get, post } from "../../services/api";
import { setFieldsTouchedSingleForm } from "../../services/utils";

const EditViewLand = () => {
    const token = localStorage.getItem("token");
    let rowData = JSON.parse(sessionStorage.getItem("rowData"));
    const dispatch = useDispatch();
    const hideModalHandler = () => {
        sessionStorage.removeItem("rowData");
        sessionStorage.removeItem("currLandlord");
        dispatch(mdActions.hideModal());
    };
    const [viewData, setViewData] = useState(false);
    const [postData, setPostData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [postCode, setPostcode] = useState(null);
    const [postError, setPostError] = useState(null);
    const [checkValue, setCheckValue] = useState(false);
    const [checkError, setCheckError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState({
        phone: null,
        countryCode: null,
    });
    const [landlordExists, setLandlordExists] = useState(false);

    const handleCheckboxChange = () => {
        setCheckValue((prevCheckValue) => !prevCheckValue);
        setCheckError(null);
    };

    useEffect(() => {
        if (rowData.id) {
            const url = `${AGENCY_VIEW_LANDLORD}/${rowData.id}?token=${token}`;
            get(url, setViewData, setIsLoading);
        }
    }, []);

    console.log(viewData, "This is view data");

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            companyName: "",
            street: "",
            town: "",
            country: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values, "tHESE ARE FORM VALUES");
            const url = `${AGECNY_EDIT_LANDLORD}?token=${token}`;
            if (rowData) {
                const body = {
                    landlordData: {
                        agency_id: rowData.agencyId,
                        country: values.country,
                        country_code: phoneNumber.countryCode,
                        created_at: rowData.createdAt,
                        creator_id: rowData.creatorId,
                        display_name: values.companyName,
                        email: values.email,
                        f_name: values.firstName,
                        id: rowData.id,
                        l_name: values.lastName,
                        landlord_id: rowData.id,
                        mobile: phoneNumber.phone,
                        post_code: postCode,
                        status: "edit",
                        street: values.street,
                        town: values.town,
                        updated_at: rowData.updatedAt,
                    }
                }
                console.log(body, "This is body")
                post(url, body, null, setPostData, setIsLoading);
            }
        },
    });

    useEffect(() => {
        if (viewData && viewData?.landlord_info) {
            // set the form values after getting the data
            formik.setValues({
                firstName: viewData.landlord_info.f_name,
                lastName: viewData.landlord_info.l_name,
                email: viewData.landlord_info.email,
                companyName: viewData.landlord_info.display_name,
                street: viewData.landlord_info.street,
                town: viewData.landlord_info.town,
                country: viewData.landlord_info.country,
            });
            setPostcode(viewData.landlord_info.post_code);
            setPhoneNumber({
                phone: viewData.landlord_info.mobile,
                countryCode: viewData.landlord_info.country_code,
            })
        }
    }, [viewData])

    useEffect(() => {
        toast.dismiss();
        if (postData?.saved) {
            toast.success("Landlord edited successfully!");
            setTimeout(() => {
                dispatch(mdActions.hideModal());
            }, 2000);
            sessionStorage.removeItem("rowData");
        } else if (postData?.statusCode === 409) {
            setLandlordExists(true);
        } else if (postData?.errors && postData?.errors.email) {
            formik.setFieldError("email", postData.errors.email);
        } else if (postData?.errors) {
            toast.error("Form validation failed!");
        }
    }, [postData]);

    console.log(postData, "this is post data");

    //TODO: REMOVE THIS LATER
    // const formSubmitHandler = (e) => {
    //     e.preventDefault();
    //     function formikValid() {
    //         if (!formik.isValid) {
    //             formik.handleSubmit(e);
    //         } else {
    //             return true;
    //         }
    //     }
    //     //submit form if everything is validated(phonenumber, checkbox, postcode)
    //     if (phoneError || checkError || postError) {
    //         formikValid()
    //     }
    //     if (
    //         !phoneError &&
    //         !phoneNumber.phone &&
    //         !postError &&
    //         !postCode &&
    //         !checkValue
    //     ) {
    //         setPhoneError("Phone number is required.");
    //         setPostError("Postcode is required.");
    //         setCheckError("The checkbox field is required.");
    //         formik.handleSubmit(e);
    //     }
    //     if (!phoneError && !phoneNumber.phone) {
    //         setPhoneError("Phone number is required.");
    //         formikValid();
    //     }
    //     if (!postError && !postCode) {
    //         setPostError("Postcode is required.");
    //         formikValid();
    //     }
    //     if (!checkValue) {
    //         setCheckError("The checkbox field is required.");
    //         formikValid();
    //     }
    //     if (formikValid() && !phoneError && phoneNumber.phone && checkValue && postCode && !postError) {
    //         //form is valid
    //         formik.handleSubmit(e);
    //     }
    // };


    const formSubmitHandler = (e) => {
        toast.dismiss();
        e.preventDefault();
        formik.validateForm();
        setFieldsTouchedSingleForm(formik.values, formik);
        console.log(formik.errors, "these are formik errors");
        if (Object.keys(formik.errors).length !== 0 || phoneError || !phoneNumber.phone || postError || !Postcode || checkError || !checkValue) {
            toast.error(
                "Form submission failed. Kindly check the form for errors and resubmit."
            );
        }
        if (phoneError || checkError || postError) {
            return;
        }
        if (
            !phoneError &&
            !phoneNumber.phone &&
            !postError &&
            !postCode &&
            !checkValue
        ) {
            setPhoneError("Phone number is required.");
            setPostError("Postcode is required.");
            setCheckError("The checkbox field is required.");
        }
        if (!phoneError && !phoneNumber.phone) {
            setPhoneError("Phone number is required.");
        }
        if (!postError && !postCode) {
            setPostError("Postcode is required.");
        }
        if (!checkValue) {
            setCheckError("The checkbox field is required.");
        }
        if (formik.isValid && phoneNumber.phone && checkValue && postCode) {
            //form is valid
            formik.handleSubmit(e);
        }
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Edit and View Landlord</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <form onSubmit={formSubmitHandler}>
                    {!landlordExists && <div className="app_details position-relative">
                        <div className="mt-3" >
                            <div className="panel_form form-agency mt-4">
                                {renderInputFields(0, 3, formik, inputFields)}
                            </div>
                            <div className="d-flex flex-column gap-3 mt-3">
                                <Postcode
                                    postCode={postCode}
                                    postcodeHandler={setPostcode}
                                    error={postError}
                                    setError={setPostError}
                                    formik={formik}
                                />
                                {renderInputFields(3, 4, formik, inputFields)}
                            </div>
                            <div className="panel_form form-agency mt-4">
                                {renderInputFields(4, 6, formik, inputFields)}
                                <TelInput
                                    phoneNumber={phoneNumber}
                                    phoneHandler={setPhoneNumber}
                                    error={phoneError}
                                    setError={setPhoneError}
                                />
                                {renderInputFields(6, undefined, formik, inputFields)}
                            </div>
                            <Checkbox
                                className="mt-4 checkbox-modal"
                                id="checkbox1"
                                label="Do you agree that all information provided by you is correct."
                                changeHandler={handleCheckboxChange}
                                isChecked={checkValue}
                                checkError={checkError}
                            />
                            <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                                <button
                                    className="btn_light btn_sm"
                                    type="button"
                                    onClick={hideModalHandler}
                                >
                                    Cancel
                                </button>
                                <button className="btn_light btn_sm" type="submit">
                                    {isLoading && <span className="loader"></span>} Update
                                </button>

                            </div>
                        </div>
                    </div>}
                    {landlordExists && <>
                        <p className="text-center">There is already a landlord with this name, do you still want to create it?</p>
                        <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                            <button className="btn_light btn_sm" type="button" onClick={formik.handleSubmit}>
                                {isLoading && <span className="loader"></span>} Yes
                            </button>
                            <button
                                className="btn_light btn_sm"
                                type="button"
                                onClick={hideModalHandler}
                            >
                                No
                            </button>
                        </div>
                    </>}
                </form>
            </div>
        </div>
    );
}

export default EditViewLand