import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import Close from "../../../assets/images/close.png";
import Checkbox from "../../formComponent/Checkbox";
import { ADD_TENANCY_MODAL, TENANCY_SUMMARY_MODAL } from "../ModalConstants";
import { useFormik } from "formik";
import { post } from "../../../services/api";
import { AGENCY_TENANCY_SECOND_STEP } from "../../../config/url";
import * as Yup from "yup";
import ApplicantForm from "./ApplicantForm";
import { tenancyActions } from "../../../store/tenancy-slice";
import { toast } from "react-toastify";
import { emailPattern } from "../../../validation/validation";

const generateValidationSchema = (numberOfForms) => {
  const formShapes = {};
  for (let i = 1; i <= numberOfForms; i++) {
    formShapes[`applicant${i}`] = Yup.object().shape({
      // Dynamic validation schema for each applicant form
      [`firstName${i}`]: Yup.string()
        .max(50, "Maximum character limit is 50 characters")
        .required("This field is required."),
      [`middleName${i}`]: Yup.string().optional(),
      [`lastName${i}`]: Yup.string()
        .max(50, "Maximum character limit is 50 characters")
        .required("This field is required."),
      [`email${i}`]: Yup.string()
        .matches(emailPattern, "Invalid email address")
        .required("Email is required"),
    });
  }
  return Yup.object().shape(formShapes).defined();
};

const generateInitialValues = (formValues, totalForm) => {
  const initialValues = {};
  for (let i = 1; i <= totalForm; i++) {
    initialValues[`applicant${i}`] = {
      // Dynamic initial values for each form
      [`firstName${i}`]: formValues ? formValues[i - 1]?.app_f_name : "",
      [`middleName${i}`]: formValues ? formValues[i - 1]?.app_m_name : "",
      [`lastName${i}`]: formValues ? formValues[i - 1]?.app_l_name : "",
      [`email${i}`]: formValues ? formValues[i - 1]?.app_email : "",
    };
  }
  return initialValues;
};

const AddApplicants = () => {
  const {
    tenancyData: createTenancyData,
    applicantData,
    appForm,
  } = useSelector((state) => state.tenancy);
  // console.log(createTenancyData, applicantData, "This is tenancy data");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState();
  const [formError, setFormError] = useState("");
  const totalApplicants = createTenancyData?.no_applicant;
  const [removeAppBtn, setRemoveAppBtn] = useState(
    appForm.length > 1 ? true : false
  );
  const [checkValue, setCheckValue] = useState(false);
  const [checkError, setCheckError] = useState(null);
  const [appData, setAppData] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [emails, getEmail] = useState(null);

  const generateInitialState = (initialValues) => {
    // console.log(
    //   initialValues,
    //   initialValues?.length,
    //   "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{"
    // );
    // Generating initial values for custom fields
    if (Array.isArray(initialValues)) {
      // console.log("rendor initial values");
      const newState = initialValues.map((initialValue) => {
        // console.log(initialValue, "33333333333333333333333");
        return {
          existingApp:
            initialValue.app_renew_tenant === "1"
              ? "Yes"
              : initialValue.app_renew_tenant === "0"
                ? "No"
                : "",
          existingAppError: "",
          phoneNumber: initialValue.app_mobile || "",
          countryCode: initialValue.country_code || "",
          phoneError: "",
        };
      });
      // console.log(newState, "343534543534543");
      return newState;
    } else if (initialValues === null || initialValues === undefined) {
      // If null or undefined is passed, generate initial state based on a number
      // console.log("rendor initial values ");
      return Array.from({ length: totalApplicants }, (_, index) => ({
        existingApp: "",
        existingAppError: "",
        phoneNumber: "",
        countryCode: "",
        phoneError: "",
      }));
    }
  };

  const [customData, setCustomData] = useState(
    generateInitialState(applicantData.length > 0 ? applicantData : null)
  );

  useEffect(() => {
    //To handle case when the no. of applicants in tenancy Modal is increased or decreased
    if (applicantData.length > totalApplicants) {
      dispatch(
        tenancyActions.editAppFormData({
          type: "APP_DECREMENT",
          totalApp: totalApplicants,
        })
      );
    } else if (
      applicantData.length < totalApplicants &&
      applicantData.length !== 0
    ) {
      dispatch(
        tenancyActions.editAppFormData({
          type: "APP_INCREMENT",
          totalApp: totalApplicants,
        })
      );
    }
  }, [totalApplicants]);

  useEffect(() => {
    if (applicantData.length > 0) {
      // console.log("applicantData: 2435476899999", applicantData);
      const newData = generateInitialState(applicantData);
      setCustomData(newData);
    } else {
      // console.log("applicantData: 1224354645", applicantData);
      const newData = generateInitialState(null);
      setCustomData(newData);
    }
  }, [applicantData]);

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
    dispatch(tenancyActions.emptyForm());
  };

  const prevHandler = () => {
    dispatch(mdActions.showModal({ type: ADD_TENANCY_MODAL }));
  };

  const handleDeleteForm = (index) => {
    // Copy values is the current Formik values
    const updatedValues = { ...formik.values };
    formik.resetForm();
    const formikReEval = {};

    for (let i = 1, j = 1; i < totalApplicants; i++, j++) {
      if (j === index) {
        // Skip the values at the deleted form
        j++;
      }
      formikReEval[`applicant${i}`] = {
        [`firstName${i}`]: updatedValues[`applicant${j}`][`firstName${j}`],
        [`middleName${i}`]: updatedValues[`applicant${j}`][`middleName${j}`],
        [`lastName${i}`]: updatedValues[`applicant${j}`][`lastName${j}`],
        [`email${i}`]: updatedValues[`applicant${j}`][`email${j}`],
      };
    }
    //for last applicant set input fields as empty string
    formikReEval[`applicant${totalApplicants}`] = {
      [`firstName${totalApplicants}`]: "",
      [`middleName${totalApplicants}`]: "",
      [`lastName${totalApplicants}`]: "",
      [`email${totalApplicants}`]: "",
    };

    console.log("formik updated", formikReEval);
    formik.setValues(formikReEval);

    // Update custom data object keys and values
    const formCustomData = [...customData];
    console.log(formCustomData, "this is a custom data object 1");
    const updatedCustomData = [];
    // If you want to re-index the remaining forms
    for (let i = 0, j = 0; i < totalApplicants - 1; i++, j++) {
      // Skip the values at the deleted form
      if (j === index - 1) {
        j++;
      }
      if (formCustomData[j]) {
        updatedCustomData.push({
          existingApp: formCustomData[j].existingApp,
          existingAppError: formCustomData[j].existingAppError,
          phoneNumber: formCustomData[j].phoneNumber,
          countryCode: formCustomData[j].countryCode,
          phoneError: formCustomData[j].phoneError,
        });
      }
    }
    // Append a new form at the end
    updatedCustomData.push({
      existingApp: "",
      existingAppError: "",
      phoneNumber: "",
      countryCode: "",
      phoneError: "",
    });
    // Update the state with the modified data
    setCustomData(updatedCustomData);
  };

  useEffect(() => {
    if (appForm.length === 1) {
      setRemoveAppBtn(false);
    }
  }, [appForm]);

  const addBtnHandler = (e) => {
    e.preventDefault();
    setRemoveAppBtn(true);
    dispatch(tenancyActions.setAppForm({ type: "ADD" }));
  };

  const removeBtnHandler = (num) => {
    dispatch(tenancyActions.setAppForm({ type: "REMOVE" }));
    handleDeleteForm(num);
    setEmailError([]);
    getEmail([]);
  };

  const handleFormStateChange = (key, value, index) => {
    //function to update the custom fields of each property form
    // console.log(key, value, index, "}}}}}++++++++++++");
    if (customData) {
      setCustomData((prevData) => {
        // Create a copy of the previous state
        const updatedData = [...prevData];
        // Update the specific key in the specified index
        updatedData[index] = {
          ...updatedData[index],
          [key]: value,
        };
        return updatedData;
      });
    }
  };

  const formik = useFormik({
    initialValues: generateInitialValues(applicantData, totalApplicants),
    validationSchema: generateValidationSchema(totalApplicants),
    onSubmit: (values) => {
      const url = `${AGENCY_TENANCY_SECOND_STEP}?token=${token}`;
      //Adding custom fields and formik fields in property form data
      const transformedData = Object.entries(values).map(
        ([key, value], index) => {
          const appData = customData[index];
          return {
            app_f_name: value[`firstName${index + 1}`],
            app_m_name: value[`middleName${index + 1}`],
            app_l_name: value[`lastName${index + 1}`],
            app_email: value[`email${index + 1}`],
            app_mobile: appData?.phoneNumber,
            country_code: appData?.countryCode,
            app_renew_tenant: appData?.existingApp === "Yes" ? "1" : "0",
          };
        }
      );
      // console.log(transformedData, "this is transformed");
      const body = {
        tenancyData: {
          ...createTenancyData,
          applicants: transformedData,
        },
      };
      // console.log(body);
      post(url, body, null, setPostData, setIsLoading);
      setAppData(transformedData);
    },
  });

  const handleCheckboxChange = () => {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    setCheckError(null);
  };

  const setAllFieldsTouched = (values, fieldPrefix = "") => {
    //function to set fields in form touched for handling ui errors
    Object.keys(values).forEach((fieldName) => {
      const fullPath = fieldPrefix
        ? `${fieldPrefix}.${fieldName}`
        : fieldName;

      if (
        typeof values[fieldName] === "object" &&
        !Array.isArray(values[fieldName])
      ) {
        // If the field is an object, recursively set its fields as touched
        setAllFieldsTouched(values[fieldName], fullPath);
      } else {
        // Set the field as touched
        formik.setFieldTouched(fullPath, true);
      }
    });
  };

  const customError = () => {
    //fuction to check any custom error in the form
    for (let index = 0; index < totalApplicants; index++) {
      const data = customData[index];
      if (data.phoneError || data.existingAppError) {
        //then prevent the form from submitting
        return false;
      }
    }
    return true;
  }

  const handleFormSubmit = (e) => {
    //handle the form submission
    toast.dismiss();
    e.preventDefault();
    //to handle formik touch and error states
    formik.validateForm();
    setAllFieldsTouched(formik.values);
    console.log(formik.errors, "these are formik errors");
    if (Object.keys(formik.errors).length !== 0 || (formError && appForm.length !== totalApplicants) || !customError() || checkError || !checkValue) {
      toast.error(
        "Form submission failed. Kindly check the form for errors and resubmit."
      );
    }
    if (!checkValue) {
      setCheckError("The checkbox field is required.");
    }
    if (formik.errors && appForm.length < totalApplicants) {
      setFormError("Fill all applicants form.");
    } else if (formik.errors && appForm.length === totalApplicants) {
      setFormError("");
    }
    for (let index = 0; index < totalApplicants; index++) {
      const data = customData[index];
      if (!data.phoneError && !data.phoneNumber) {
        handlePhoneError(index);
      }
      if (!data.existingAppError && !data.existingApp) {
        handleExistingAppError(index);
      }
    }
    if (!Object.keys(formik.errors).length && checkValue && customError() && !formError) {
      //incase of no errors submit the form
      formik.handleSubmit(e);
    }
  };

  const handlePhoneError = (index) => {
    //to set the error state for phone number
    setCustomData((state) =>
      state.map((item, i) =>
        i === index ? { ...item, phoneError: "This field is required." } : item
      )
    );
  };

  const handleExistingAppError = (index) => {
    //to set the error state for existing applicants
    setCustomData((state) =>
      state.map((item, i) =>
        i === index
          ? { ...item, existingAppError: "This field is required." }
          : item
      )
    );
  };

  useEffect(() => {
    if (postData) {
      if (postData.saved === false && postData.statusCode === 123) {
        toast.error(postData.reason);
      } else if (postData.saved === false && postData.errors.length > 0) {
        //if applicant does not exist for renew
        const emailsArray = [];
        const errorEmails = [];
        //get all emails
        for (let i = 1; i <= totalApplicants; i++) {
          const email = formik.values[`applicant${i}`]?.[`email${i}`];
          if (email) {
            emailsArray.push(email);
          }
        }
        //get emails with error
        for (let i = 0; i < postData.errors.length; i++) {
          let email = postData.errors[i].app_email;
          let errorCode = postData.errors[i].code;
          if (email) {
            errorEmails.push({ email: email, code: errorCode });
          }
        }
        setEmailError(errorEmails);
        getEmail(emailsArray);
      } else if (postData.saved === false && postData.statusCode === 2322) {
        toast.error(
          "You can not create a new tenancy from property where property status is Hold and Not available to let."
        );
      } else if (postData.saved) {
        dispatch(mdActions.showModal({ type: TENANCY_SUMMARY_MODAL }));
        dispatch(tenancyActions.setApplicantData({ appData: appData }));
      }
    }
  }, [postData]);

  console.log(formik, customData, "7777777777777777777");

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Add Applicants to Tenancy</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="modal_body mt-5">
          <div className="app_details position-relative">
            {appForm.map((value, index) => {
              return (
                <React.Fragment key={index}>
                  <ApplicantForm
                    initialValue={customData[index]}
                    index={index}
                    formik={formik}
                    formHandler={handleFormStateChange}
                    emailError={
                      emailError?.length > 0
                        ? emailError.find(
                          (obj) => obj.email === emails[index]
                        ) || null
                        : null
                    }
                  />
                  {removeAppBtn && totalApplicants !== 1 && (
                    <div className="mt-4">
                      <button
                        className="btn_danger btn_sm mx-auto"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeBtnHandler(index + 1);
                        }}
                      >
                        Remove Applicant
                      </button>
                    </div>
                  )}
                  {totalApplicants > 1 &&
                    index === appForm.length - 1 &&
                    index + 1 !== totalApplicants && (
                      <div className="mt-4">
                        <button
                          className="btn_filled btn_sm mx-auto"
                          type="button"
                          onClick={addBtnHandler}
                        >
                          Add New Applicant
                        </button>
                      </div>
                    )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {formError && appForm.length < totalApplicants && (
          <p className="error-text text-center mt-3">{formError}</p>
        )}
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
            className="btn_filled btn_sm"
            onClick={prevHandler}
            type="button"
          >
            Previous
          </button>
          <button className="btn_filled btn_sm" type="submit">
            {isLoading && <span className="loader"></span>} Tenancy Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApplicants;
