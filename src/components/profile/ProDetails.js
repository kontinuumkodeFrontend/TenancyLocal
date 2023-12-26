import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import { privacySettingVar } from "../../helper/variables";
import backIcon from "../../assets/images/back-icon.svg";
import TelInput from "../formComponent/TelInput";
import { APPLICANT_DASHBOARD } from "../../helper/constants/UserConstant";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  changePasswordValidation,
} from "../../validation/validation";
import { post } from "../../services/api";
import {
  AGECNY_UPDATE_PERSONAL_INFO,
  AGENCY_CHANGE_PASSWORD,
} from "../../config/url";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PasswordInput from "../formComponent/PasswordInput";
import { renderInputFields } from "../formComponent/InputFields";

const passInputFields = [
  {
    name: "currentPassword",
    label: "Current Password",
    placeholder: "Enter current password",
    type: "password",
    iconVisible: true,
  },
  {
    name: "password",
    label: "New Password",
    placeholder: "Enter password",
    type: "password",
    iconVisible: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "Re-enter new password",
    type: "password",
    iconVisible: true,
  },
];

const infoValidationSchema = Yup.object().shape({
  ...emailValidation.fields,
  ...firstNameValidation.fields,
  ...lastNameValidation.fields,
});

const passValidationSchema = Yup.object().shape({
  ...changePasswordValidation.fields,
});

const ProDetails = ({ info, token }) => {
  console.log(info, "this is profile information");
  const authRole = localStorage.getItem("authRole");
  let updateURL;
  const userType = useSelector((state) => state.user.userType);
  const [activeTab, setActiveTab] = useState("first");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState({
    phone: null,
    countryCode: null,
  });

  useEffect(() => {
    if (info) {
      setPhoneNumber({
        phone: info ? info?.mobile : null,
        countryCode: info ? info?.country_code : null,
      });
    }
  }, [info]);

  const infoInitialValues = {
    firstName: info ? info?.name : "",
    lastName: info ? info?.l_name : "",
    email: info ? info?.email : "",
  };

  const passInitialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues:
      activeTab === "first" ? infoInitialValues : passInitialValues,
    validationSchema:
      activeTab === "first" ? infoValidationSchema : passValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "?????????????????????");

      if (activeTab === "first") {
        if (authRole === "1") {
          updateURL = AGECNY_UPDATE_PERSONAL_INFO;
        } else {
          updateURL = "";
        }
        const url = `${updateURL}?token=${token}`;
        const personalInfobody = {
          ...info,
          name: values.firstName,
          l_name: values.lastName,
          email: values.email,
          mobile: phoneNumber.phone ? phoneNumber.phone : info.mobile,
          country_code: phoneNumber.countryCode
            ? phoneNumber.countryCode
            : info.country_code,
        };
        post(url, personalInfobody, null, setData, setIsLoading) 
      } else if (activeTab === "second") {
        if (authRole === "1") {
          updateURL = AGENCY_CHANGE_PASSWORD;
        } else {
          updateURL = "";
        }
        const url = `${updateURL}?token=${token}`;
        const passBody = {
          old_password: values.currentPassword,
          new_password: values.password,
          confirm_password: values.confirmPassword,
        };
        post(url, passBody, null, setData, setIsLoading); //change password API
      }
    },
  });

  const inputFields = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "Enter first name",
      type: "text",
      disabled: userType === APPLICANT_DASHBOARD,
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter last name",
      type: "text",
      disabled: userType === APPLICANT_DASHBOARD,
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "Enter email address",
      type: "text",
    },
  ];

  useEffect(() => {
    // console.log(data, "This is dataaaaaa");
    toast.dismiss();
    if (activeTab === "first") {
      if (data?.saved) {
        toast.success("Profile updated successfully!");
      } else if (data?.saved === false) {
        toast.error("Failed to update profile");
      }
    } else if (activeTab === "second") {
      if (data?.saved) {
        toast.success("Password updated successfully!");
      } else if (data?.saved === false) {
        toast.error(
          data?.errors?.old_password[0] || "Failed to update password"
        );
      }
    }
  }, [data]);

  const passSubmitHandler = (e) => {
    //password form submit handler
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const infoSubmitHandler = (e) => {
    e.preventDefault();
    //submit form if phone number is validated
    if (error) {
      return;
    } else if (!error && !phoneNumber.phone) {
      setError("Phone number is required");
    } else if (
      !error &&
      phoneNumber?.phone &&
      phoneNumber?.phone !== info?.mobile
    ) {
      formik.handleSubmit(e);
    } else if (
      !error &&
      phoneNumber?.phone &&
      phoneNumber?.phone === info?.mobile
    ) {
    }
  };

  return (
    <div className="panel_center-mid panel_inner-pt">
      <div className="app_details position-relative">
        <div className="back-btn">
          <Link to="/agency">
            <button>
              <img src={backIcon} alt="back-icon" />
            </button>
          </Link>
        </div>
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
        >
          <Tab eventKey="first" title="Personal Information">
            <form onSubmit={infoSubmitHandler}>
              <div className="panel_form mt-4">
                {renderInputFields(0, undefined, formik, inputFields)}
                <TelInput
                  phoneNumber={phoneNumber}
                  phoneHandler={setPhoneNumber}
                  error={error}
                  setError={setError}
                />
                <div className="mx-auto mt-4">
                  <button className="btn_dark btn_lg" type="submit">
                    {isLoading && <span className="loader"></span>} Update
                    Profile
                  </button>
                </div>
              </div>
            </form>
          </Tab>
          <Tab eventKey="second" title="Change Password">
            <form onSubmit={passSubmitHandler}>
              <div className="panel_form mt-4">
                {passInputFields.slice(0, 1).map((field) => (
                  <PasswordInput
                    key={field.name}
                    formik={formik}
                    error={formik.errors[field.name]}
                    {...field}
                  />
                ))}
              </div>
              <div className="panel_form mt-4">
                {passInputFields.slice(1).map((field) => (
                  <PasswordInput
                    key={field.name}
                    formik={formik}
                    error={formik.errors[field.name]}
                    {...field}
                  />
                ))}
              </div>
              <div className="mt-4">
                <button className="btn_dark btn_lg mx-auto" type="submit">
                  Change Password
                </button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProDetails;
