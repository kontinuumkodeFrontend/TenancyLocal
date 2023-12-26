import React, { useEffect, useState } from "react";
import ProfileImg from "../profile/ProfileImg";
import TelInput from "../formComponent/TelInput";
import Workday from "./Workday";
import { renderInputFields } from "../formComponent/InputFields";
import { useFormik } from "formik";
import { superAdminInfoFields } from "../../helper/InputFields";
import * as Yup from "yup";
import {
  emailValidation,
  nameValidation,
  addressValidation,
} from "../../validation/validation";
import { ADMIN_AGENCY_INFO,ADMIN_EDIT_AGENCY_INFO} from "../../config/url";
import { get, post } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { workdayActions } from "../../store/workday-slice";
import { setFieldsTouchedSingleForm } from "../../services/utils";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  ...emailValidation.fields,
  ...nameValidation.fields,
  ...addressValidation.fields,
  facebook: Yup.string().url("Invalid URL format for Facebook").optional(),
  twitter: Yup.string().url("Invalid URL format for Twitter").optional(),
  google: Yup.string().url("Invalid URL format for Google").optional(),
});

const Information = () => {
  const token = localStorage.getItem("token");
  const workdayTimings = useSelector((state) => state.workday.scheduleTime);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [postData, setPostData] = useState();
  const [phoneError, setPhoneError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState({
    phone: null,
    countryCode: null,
  });
  const [workDayError, setWorkDayError] = useState("");

  useEffect(() => {
    if (token) {
      const url = `${ADMIN_AGENCY_INFO}?token=${token}`;
      get(url, setData, setIsLoading);
    }
  }, []);

  // console.log(data, "This is data98573496405");

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      facebook: "",
      twitter: "",
      google: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "This is body");
      const url = `${ADMIN_EDIT_AGENCY_INFO}?token=${token}`;
      const body = {
        id: 1,
        name: values.name,
        email: values.email,
        country_code: phoneNumber.countryCode,
        phone: phoneNumber.phone,
        agency_confirm_link: data.agency_information.agency_confirm_link,
        status: data.agency_information.status,
        address: values.address,
        total_credit: data.agency_information.total_credit,
        used_credit: data.agency_information.used_credit,
        isDefaultSetting: data.agency_information.isDefaultSetting,
        facebook: values.facebook,
        twitter: values.twitter,
        google_plus: values.google,
        last_login: data.agency_information.last_login,
        created_at: data.agency_information.created_at,
        updated_at: data.agency_information.updated_at,
        schedule_time: workdayTimings.map((item) => {
          if (item.isChecked) {
            return {
              day: item.day,
              opening_time: item.openingTime,
              closing_time: item.closingTime,
            };
          } else {
            return {
              day: item.day,
              opening_time: "",
              closing_time: "",
            };
          }
        }),
      };
      post(url, body, null, setPostData, setIsLoading);
    },
  });

  useEffect(() => {
    if (data && data.saved) {
      const formValues = {
        name: data.agency_information.name || "",
        address: data.agency_information.address || "",
        email: data.agency_information.email || "",
        facebook: data.agency_information.facebook || "",
        twitter: data.agency_information.twitter || "",
        google: data.agency_information.google_plus || "",
      };
      formik.setValues(formValues);
      setPhoneNumber({
        phone: data.agency_information.phone || "",
        countryCode: data.agency_information.country_code || "",
      });
      dispatch(
        workdayActions.setInitialState({
          workday: data.agency_information.schedule_time,
        })
      );
    }
  }, [data]);

  console.log("This is post data: " + postData);

  useEffect(() => {
    if (!postData) return;
    toast.dismiss();
    if (postData.saved) {
      toast.success("Agency information updated successfully.");
    } else {
      toast.error("Something went wrong!");
    }
  }, [postData]);

  // console.log(workdayTimings, "These are the updated schedules13243547568");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    //submit form if everything is validated
    formik.validateForm();
    setFieldsTouchedSingleForm(formik.values, formik);

    if (!phoneError && !phoneNumber.phone) {
      setPhoneError("This field is required.");
    }
    // Check workday timings
    let hasCheckedWorkDay = false;
    for (let i = 0; i < 7; i++) {
      let workArray = workdayTimings[i];
      if (workArray.isChecked) {
        hasCheckedWorkDay = true;

        // Check if opening and closing times are provided
        if (!workArray.openingTime || !workArray.closingTime) {
          setWorkDayError(
            "Opening and closing times are required for checked days."
          );
          return; // Stop further processing since there's an error
        }
      }
    }
    // Set error if no workday is checked
    if (!hasCheckedWorkDay) {
      setWorkDayError("This field is required.");
      return; // Stop further processing since there's an error
    }
    // Clear workday error if everything is fine
    setWorkDayError("");

    if (formik.isValid && phoneNumber.phone && !workDayError) {
      //form is valid
      formik.handleSubmit(e);
    }
  };

  return (
    <form className="mt-lg-5 mt-4" onSubmit={formSubmitHandler}>
      <ProfileImg
        fname={data?.agency_information?.name}
        lname={data?.agency_information?.l_name}
        imgURL={data?.agency_information?.media_logo}
        token={token}
        adminId={data?.agency_information?.id}
      />
      <div className="panel_form panel_center-mid mt-lg-5 mt-4">
        {renderInputFields(0, 3, formik, superAdminInfoFields)}
        <TelInput
          phoneNumber={phoneNumber}
          phoneHandler={setPhoneNumber}
          error={phoneError}
          setError={setPhoneError}
        />
        <p className="text_lg-green flex-100 text-start">
          Working Day <span style={{ color: "#ee4a4a" }}>*</span>{" "}
          {workDayError && (
            <span className="error-text text-center">{workDayError}</span>
          )}
        </p>

        <Workday />
        <p className="text_lg-green flex-100 text-start mt-3">Social Links</p>
        {renderInputFields(3, undefined, formik, superAdminInfoFields)}
      </div>
      <div className="d-flex justify-content-center mt-lg-5 mt-4">
        <button className="btn_dark btn_lg" type="submit">
          {isLoading && <span className="loader"></span>}Save Information
        </button>
      </div>
    </form>
  );
};

export default Information;
