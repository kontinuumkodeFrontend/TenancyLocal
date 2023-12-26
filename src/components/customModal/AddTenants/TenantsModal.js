import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import Close from "../../../assets/images/close.png";
import Input from "../../formComponent/Input";
import RadioBtn from "../../formComponent/RadioBtn";
import Checkbox from "../../formComponent/Checkbox";
import TelInput from "../../formComponent/TelInput";
import { ADD_TENANCY_MODAL, TENANCY_SUMMARY_MODAL } from "../ModalConstants";
import RadioBtns from "../../formComponent/RadioBtns";
import { useFormik } from "formik";
import { renderInputFields } from "../../formComponent/InputFields";
import { post } from "../../../services/api";
import { AGENCY_TENANCY_SECOND_STEP } from "../../../config/url";
import TenantForm from "./Tenants";


const TenantsModal = () => {
  const data = useSelector((state) => state.modal.data);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState();

  const totalApplicants = data?.tenancyData?.no_applicant;
  const [removeAppBtn, setRemoveAppBtn] = useState(false);

  const [checkValue, setCheckValue] = useState(false);
  const [checkError, setCheckError] = useState(null);

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  const prevHandler = () => {
    dispatch(mdActions.showModal({ type: ADD_TENANCY_MODAL }));
  };

  const removeBtnHandler = () => {

  };

  const RemoveAppBtn = () => {
    return (
      <div className="mt-5">
        <button className="btn_danger btn_sm mx-auto" onClick={removeBtnHandler}>Remove Applicant</button>
      </div>
    );
  };

  const formik = useFormik({
    initialValues: {
    },
    onSubmit: (values) => {
      const url = `${AGENCY_TENANCY_SECOND_STEP}?token=${token}`
      const body = {
        tenancyData: {
          ...data.tenancyData,
          applicants: [],
        },
      };
      console.log(body);
      // post(url, body, null, setPostData, setIsLoading);
    },
  });


  useEffect(() => {
    if (postData) {
      if (postData.saved) {

      } else if (postData.errors.app_email) {

      }
    }
  }, [postData])

  const handleCheckboxChange = () => {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    setCheckError(null);
  };


  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Add Applicants to Tenancy</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <TenantForm />
      <Checkbox
        className="mt-5 checkbox-modal"
        id="checkbox1"
        label="Do you agree that all information provided by you is correct."
        changeHandler={handleCheckboxChange}
        isChecked={checkValue}
        checkError={checkError}
      />
      <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
        <button className="btn_filled btn_sm" onClick={prevHandler}>
          Previous
        </button>
        <button className="btn_filled btn_sm" type="submit">
          Tenancy Summary
        </button>
      </div>
    </div>
  );
};

export default TenantsModal;

//This component should be deleted