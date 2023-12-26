import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import { updateActions } from "../../store/update-slice";
import Close from "../../assets/images/close.png";
import Checkbox from "../formComponent/Checkbox";
import Postcode from "../formComponent/Postcode";
import TelInput from "../formComponent/TelInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { renderInputFields } from "../formComponent/InputFields";
import {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  companyNameValidation,
  streetValidation,
  countryValidation,
  townValidation,
} from "../../validation/validation";
import { post } from "../../services/api";
import { AGECNY_CREATE_LANDLORD } from "../../config/url";
import { toast } from "react-toastify";
import { setFieldsTouchedSingleForm } from "../../services/utils";

export const validationSchema = Yup.object().shape({
  ...firstNameValidation.fields,
  ...lastNameValidation.fields,
  ...emailValidation.fields,
  ...companyNameValidation.fields,
  ...countryValidation.fields,
  ...townValidation.fields,
  ...streetValidation.fields,
});

export const inputFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
    type: "text",
    required: true,
  },
  {
    name: "companyName",
    label: "Company Display Name",
    placeholder: "Enter company display name",
    className: "flex-100",
    type: "text",
    required: true,
  },
  {
    name: "street",
    label: "Street",
    placeholder: "Enter street name",
    className: "flex-100",
    type: "text",
    required: true,
  },
  {
    name: "town",
    label: "Town",
    placeholder: "Enter town name",
    type: "text",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Enter country name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    type: "email",
    required: true,
  },
];

const AddLandlord = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postCode, setPostcode] = useState();
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
      const url = `${AGECNY_CREATE_LANDLORD}?token=${token}`;
      const body = {
        landlordData: {
          continue: landlordExists ? 1 : 0,
          country: values.country,
          country_code: phoneNumber.countryCode,
          display_name: values.companyName,
          email: values.email,
          f_name: values.firstName,
          l_name: values.lastName,
          mobile: phoneNumber.phone,
          post_code: postCode,
          status: "new",
          street: values.street,
          town: values.town,
        },
      };
      // console.log(body, "This is body")
      post(url, body, null, setPostData, setIsLoading);
    },
  });

  useEffect(() => {
    if (!postData) {
      return;
    }
    if (postData?.saved) {
      toast.success("Landlord created successfully!");
      setTimeout(() => {
        dispatch(mdActions.hideModal());
      }, 2000);
      dispatch(updateActions.setUpdation());
    } else if (postData?.statusCode === 409) {
      setLandlordExists(true);
    } else if (postData?.errors && postData?.errors.email) {
      formik.setFieldError("email", postData.errors.email);
    } else if (postData?.errors) {
      toast.error("Form validation failed!");
    }
  }, [postData]);

  console.log(postData, formik.validationSchema, "this is post dataaaasasa");

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
    if (
      Object.keys(formik.errors).length !== 0 ||
      phoneError ||
      postError ||
      checkError ||
      !checkValue ||
      !postCode ||
      !phoneNumber.phone
    ) {
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
    if (
      formik.isValid &&
      !phoneError &&
      phoneNumber.phone &&
      checkValue &&
      postCode &&
      !postError
    ) {
      //form is valid
      formik.handleSubmit(e);
    }
  }; //better way to handle form errors

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Add Landlord</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <form onSubmit={formSubmitHandler}>
          {!landlordExists && (
            <div className="app_details position-relative">
              <div className="mt-3">
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
                    {isLoading && <span className="loader"></span>} Create
                    Landlord
                  </button>
                </div>
              </div>
            </div>
          )}
          {landlordExists && (
            <>
              <p className="text-center">
                There is already a landlord with this name, do you still want to
                create it?
              </p>
              <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                <button
                  className="btn_light btn_sm"
                  type="button"
                  onClick={formik.handleSubmit}
                >
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
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddLandlord;
