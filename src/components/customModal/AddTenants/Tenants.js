import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import TelInput from "../../formComponent/TelInput";
import { ADD_TENANCY_MODAL, TENANCY_SUMMARY_MODAL } from "../ModalConstants";
import RadioBtns from "../../formComponent/RadioBtns";
import { useFormik } from "formik";
import { renderInputFields } from "../../formComponent/InputFields";
import { post } from "../../../services/api";
import { ApplicantInputField } from "../../../helper/InputFields";
import { emailValidation, firstNameValidation, lastNameValidation, } from "../../../validation/validation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  ...emailValidation.fields,
  ...firstNameValidation.fields,
  ...lastNameValidation.fields,
  middleName: Yup.string().optional(),
});
const TenantForm = () => {
  const tenancyData = useSelector((state) => state.modal.data);
  const dispatch = useDispatch();
  const [totalApplicants, setTotalApplicants] = useState(2);
  const [counter, setCounter] = useState([1]);
  const [removeAppBtn, setRemoveAppBtn] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState({
    phone: null,
    countryCode: null,
  });
  const [existingApp, setExistingApp] = useState(null);
  const [existingError, setExistingError] = useState(null);

  const renewAppHandler = (event) => {
    setExistingApp(event.target.value);
    setExistingError(null);
  };

  useEffect(() => {
    if (tenancyData) {
      setTotalApplicants(tenancyData?.no_applicant);
    }
  }, [tenancyData]);

  console.log(tenancyData, totalApplicants, "this is modal data");

  const summaryHandler = () => {
    dispatch(mdActions.showModal({ type: TENANCY_SUMMARY_MODAL }));
  };

  const addBtnHandler = () => {
    setRemoveAppBtn(true);
    setCounter((prevCounter) => [...prevCounter, 1]);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
        app_f_name: values.firstName,
        app_m_name: values.middleName,
        app_l_name: values.lastName,
        app_email: values.email,
        app_mobile: phoneNumber.phone,
        country_code: phoneNumber.countryCode,
        app_renew_tenant: existingApp === "Yes" ? 1 : 2,
      };
      console.log(body);
    },
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    function formikValid() {
      if (!formik.isValid) {
        formik.handleSubmit(e);
      } else {
        return true;
      }
    }
    if (phoneError || existingError) {
      formikValid();
    }
    if (!existingError && !existingApp && !phoneError && !phoneNumber.phone) {
      setExistingError("This field is required.");
      setPhoneError("This field is required.");
      formik.handleSubmit(e);
      return;
    }
    if (!phoneError && !phoneNumber.phone) {
      setPhoneError("This field is required.");
      formikValid();
    }
    if (formikValid() && phoneNumber.phone && existingApp) {
      formik.handleSubmit(e);
    }
  };

  return (
    <>
      <form>
        <div className="modal_body mt-5">
          <div className="app_details position-relative">
            <div className="panel_form form-agency mt-4">
              {renderInputFields(0, undefined, formik, ApplicantInputField)}
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
                {existingError && <p className="error-text">This field is required.</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-5">
        <button
          className="btn_filled btn_sm mx-auto"
          onClick={formSubmitHandler}
        >
          Add New Applicant
        </button>
      </div>
    </>
  );
};

export default TenantForm;


//This component should be deleted