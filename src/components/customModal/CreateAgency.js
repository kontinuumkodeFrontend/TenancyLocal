import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Dropdown from "../formComponent/Dropdown";
import FileUpload from "../formComponent/FileUpload";
import TelInput from "../formComponent/TelInput";
import Checkbox from "../formComponent/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  emailValidation,
  companyNameValidation,
  confirmPasswordValidation,
} from "../../validation/validation";
import { renderInputFields } from "../formComponent/InputFields";
import { ADMIN_CREATE_AGENCIES } from "../../config/url";
import { post } from "../../services/api";
import { toast } from "react-toastify";
import { updateActions } from "../../store/update-slice";
import { fileBase64, setFieldsTouchedSingleForm } from "../../services/utils";
import { agencyStatusOptions } from "../../helper/SelectOptions";
import { agencyInputFields } from "../../helper/InputFields";

const validationSchema = Yup.object().shape({
  ...emailValidation.fields,
  ...companyNameValidation.fields,
  ...confirmPasswordValidation.fields,
});

const CreateAgency = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [checkError, setCheckError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState({
    phone: null,
    countryCode: null,
  });
  const [file, setFile] = useState(null);
  const [mediaLogo, setMediaLogo] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [dropOption, setDropOption] = useState("");
  const [dropError, setDropError] = useState(null);

  useEffect(() => {
    fileBase64(file)
      .then((base64String) => {
        setMediaLogo(base64String);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [file]);


  const handleCheckboxChange = () => {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    setCheckError(null);
  };

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      companyName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const url = `${ADMIN_CREATE_AGENCIES}?token=${token}`;
      const body = {
        country_code: phoneNumber.countryCode,
        name: values.companyName,
        email: values.email,
        phone: phoneNumber.phone,
        status: dropOption,
        password: values.password,
        password_confirmation: values.confirmPassword,
        action: "new",
        media_logo: mediaLogo
      };
      console.log(body, "This is body")
      post(url, body, null, setPostData, setIsLoading);
    },
  });

  useEffect(() => {
    if (!postData) {
      return;
    }
    if (postData.saved) {
      toast.success("Agency created successfully!");
      dispatch(updateActions.setUpdation());
      setTimeout(() => {
        dispatch(mdActions.hideModal());
      }, 2000);
    } else if (postData.errors) {
      if (postData.errors.email) {
        formik.setFieldError("email", postData.errors.email);
      } else {
        setFileError("Form validation failed!");
      }
    }
  }, [postData]);

  // console.log(postData, "This is post data");

  //TODO: REMOVE THIS LATER
  // const formSubmitHandler = (e) => {
  //   function formikValid() {
  //     if (!formik.isValid) {
  //       formik.handleSubmit(e);
  //     } else {
  //       return true;
  //     }
  //   }
  //   e.preventDefault();
  //   //submit form if everything is validated(phonenumber, checkbox)
  //   if (phoneError || checkError || fileError || dropError) {
  //     formikValid()
  //   }
  //   if (!phoneError && !phoneNumber.phone && !checkValue && !dropError && !dropOption) {
  //     setPhoneError("Phone number is required.");
  //     setCheckError("The checkbox field is required.");
  //     setDropError("This field is required.");
  //     formik.handleSubmit(e);
  //   }
  //   if (!dropError && !dropOption) {
  //     setDropError("This field is required.");
  //     formikValid();
  //   }
  //   if (!phoneError && !phoneNumber.phone) {
  //     setPhoneError("Phone number is required.");
  //     formikValid();
  //   } if (!checkValue) {
  //     setCheckError("The checkbox field is required.");
  //     formikValid();
  //   }
  //   if (formikValid() && !phoneError && phoneNumber.phone && checkValue && dropOption && !dropError) {
  //     //form is valid
  //     formik.handleSubmit(e);
  //   }
  // };

  const formSubmitHandler = (e) => {
    toast.dismiss();
    e.preventDefault();
    formik.validateForm();
    setFieldsTouchedSingleForm(formik.values, formik);
    // console.log(formik.errors, "these are formik errors");
    if (Object.keys(formik.errors).length !== 0 || dropError || fileError || checkError || !checkValue || !dropOption || phoneError || !phoneNumber.phone) {
      toast.error(
        "Form submission failed. Kindly check the form for errors and resubmit."
      );
    }
    if (phoneError || checkError || fileError || dropError) {
      return;
    }
    if (!phoneError && !phoneNumber.phone && !checkValue && !dropError && !dropOption) {
      setPhoneError("Phone number is required.");
      setCheckError("The checkbox field is required.");
      setDropError("This field is required.");
    }
    if (!dropError && !dropOption) {
      setDropError("This field is required.");
    }
    if (!phoneError && !phoneNumber.phone) {
      setPhoneError("Phone number is required.");
    } if (!checkValue) {
      setCheckError("The checkbox field is required.");
    }
    if (formik.isValid && !phoneError && phoneNumber.phone && checkValue && dropOption && !dropError) {
      //form is valid
      formik.handleSubmit(e);
    }
  }; //better way to handle form errors

  return (
    <div className="custom-modal custom-modal-p6 bg-after">
      <div className="modal_head d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-h5">Create an Agency</h5>
        <button onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body">
        <form onSubmit={formSubmitHandler}>
          <div className="panel_form w-100">
            {renderInputFields(0, 2, formik, agencyInputFields)}
            <Dropdown
              label="Status"
              option={agencyStatusOptions}
              className="flex-100"
              required={false}
              error={dropError}
              setError={setDropError}
              selectValue={dropOption}
              selectHandler={setDropOption}
            />
            <FileUpload
              className="flex-100"
              fileId="agency-pro"
              label="Upload Agency Profile Picture"
              text="Upload file with PNG, JPG format and size less than 2 MB."
              required={false}
              error={fileError}
              setError={setFileError}
              file={file}
              fileHandler={setFile}
              accept="image/jpeg, image/png"
            />
            <TelInput
              className="flex-100"
              phoneNumber={phoneNumber}
              phoneHandler={setPhoneNumber}
              error={phoneError}
              setError={setPhoneError}
            />
            {renderInputFields(2, undefined, formik, agencyInputFields)}
          </div>
          <Checkbox
            className="mt-sm-5 mt-4 checkbox-modal"
            id="checkbox1"
            label="Do you agree that all information provided by you is correct."
            changeHandler={handleCheckboxChange}
            isChecked={checkValue}
            checkError={checkError}
          />
          <div className="modal_footer d-flex flex-wrap mt-4  justify-content-center gap-3">
            <button className="btn_light" type="submit">
              {isLoading && <span className="loader loader-green"></span>} Create
            </button>
            <button
              className="btn_light"
              onClick={hideModalHandler}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgency;
