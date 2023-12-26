import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import { Container } from "react-bootstrap";
import ProfileImg from "../../components/profile/ProfileImg";
import Dropdown from "../../components/formComponent/Dropdown";
import TelInput from "../../components/formComponent/TelInput";
import { CREDIT_MODAL, DELETE_AGENCY_MODAL } from "../../components/customModal/ModalConstants";
import { renderInputFields } from "../../components/formComponent/InputFields";
import { emailValidation, companyNameValidation } from "../../validation/validation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { get, post } from "../../services/api";
import { ADMIN_EIDT_AGENCY, ADMIN_GET_AGENCY_INFO } from "../../config/url";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateActions } from "../../store/update-slice";
import { agencyStatusOptions } from "../../helper/SelectOptions";
import { agencyEditInputFields } from "../../helper/InputFields";

const validationSchema = Yup.object().shape({
  ...emailValidation.fields,
  ...companyNameValidation.fields,
  // ...creditsValidation.fields,
});

const AgencyDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState({
    phone: null,
    countryCode: null,
  });
  const [dropOption, setDropOption] = useState("");
  const [dropError, setDropError] = useState(null);

  const isDataUpdated = useSelector(state => state.update.isUpdated);

  const addCreditHandler = (e) => {
    e.preventDefault();
    dispatch(mdActions.showModal({ type: CREDIT_MODAL }));
  }
  const deleteAgencyHandler = () => {
    dispatch(mdActions.showModal({ type: DELETE_AGENCY_MODAL }));
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      companyName: "",
      address: "",
      usedCredit: "",
      availableCredit: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const url = `${ADMIN_EIDT_AGENCY}?token=${token}`;
      const body = {
        id: id,
        country_code: phoneNumber.countryCode,
        name: values.companyName,
        email: values.email,
        phone: phoneNumber.phone,
        address: values.address,
        status: dropOption,
        action: "edit",
      };
      post(url, body, null, setPostData, setIsLoading);
    },
  });

  useEffect(() => {
    toast.dismiss();
    if (postData) {
      if (postData.saved) {
        toast.success("Agency updated successfully!");
        dispatch(updateActions.setUpdation());
      } if (postData?.errors?.email) {
        formik.setFieldError("email", postData.errors.email);
      } else if (!postData.saved) {
        toast.error("Failed to update agency!");
      }
    }
  }, [postData]);

  useEffect(() => {
    const completeURL = `${ADMIN_GET_AGENCY_INFO}/${id}?token=${token}`;
    get(completeURL, setData, setIsLoading)
  }, [isDataUpdated]);

  console.log(postData, "this is a POST request")

  useEffect(() => {
    if (data && data?.agency) {
      // set the form values after getting the data
      formik.setValues({
        email: data.agency.email,
        companyName: data.agency.name,
        address: data.agency.address,
        usedCredit: data.agency.used_credit,
        availableCredit: data.agency.total_credit - data.agency.used_credit,
      });
      setPhoneNumber({
        phone: data.agency.phone,
        countryCode: data.agency.country_code,
      })
      setDropOption(data.agency.status === 1 ? "1" : "0")
    }
  }, [data])

  // console.log(data, "This is agency data...");

  const formSubmitHandler = (e) => {
    function formikValid() {
      if (!formik.isValid) {
        formik.handleSubmit(e);
      } else {
        return true;
      }
    }
    e.preventDefault();
    //submit form if everything is validated(phonenumber)
    if (phoneError) {
      formikValid()
    }
    if (!phoneError && !phoneNumber.phone) {
      setDropError("This field is required.");
      formikValid();
    }
    if (formikValid() && !phoneError && phoneNumber.phone) {
      //form is valid
      formik.handleSubmit(e);
    }
  }

  return (
    <Container className="pt-md-5 pt-4">
      <div className="panel">
        <div className="panel_center-sec">
          <ProfileImg fname={data?.agency?.name} lname="" imgURL={data?.agency?.media_logo} token={token} />
          <div className="panel_center-mid panel_inner-pt">
            <div className="d-flex justify-content-sm-end justify-content-center">
              <button className="btn_danger" onClick={deleteAgencyHandler}>Delete Agency</button>
            </div>
            <form onSubmit={formSubmitHandler}>
              <div className="panel_form mt-4">
                {renderInputFields(0, 3, formik, agencyEditInputFields)}
                <TelInput
                  phoneNumber={phoneNumber}
                  phoneHandler={setPhoneNumber}
                  error={phoneError}
                  setError={setPhoneError}
                />
                <Dropdown
                  label="Status"
                  option={agencyStatusOptions}
                  required={false}
                  error={dropError}
                  setError={setDropError}
                  selectValue={dropOption}
                  selectHandler={setDropOption}
                />
                {renderInputFields(3, undefined, formik, agencyEditInputFields)}
              </div>
              <div className="d-flex justify-content-sm-end justify-content-center mt-4">
                <button className="btn_filled btn_sm px-4" onClick={addCreditHandler}>Add Credit</button>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <button className="btn_filled btn_lg" type="submit">
                  Update Agency Information
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgencyDetail;
