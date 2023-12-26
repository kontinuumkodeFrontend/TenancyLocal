import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { THANKS_CREDIT_MODAL } from "./ModalConstants";
import { renderInputFields } from "../formComponent/InputFields";
import { creditValidation } from "../../validation/validation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { ADMIN_ADD_CREDIT } from "../../config/url";
import { post } from "../../services/api";
import { toast } from "react-toastify";
import { updateActions } from "../../store/update-slice";

const inputField = [
  {
    name: "credit",
    type: "number",
    placeholder: "Enter Credit",
    label: "Credit",
  },
];

const validationSchema = Yup.object().shape({
  ...creditValidation.fields
});

const CreditModal = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  const formik = useFormik({
    initialValues: {
      credit: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const url = `${ADMIN_ADD_CREDIT}?token=${token}`
      const body = {
        id,
        credit: values.credit,
      }
      post(url, body, null, setData, setIsloading)
    }
  });

  console.log(data);

  useEffect(() => {
    toast.dismiss();
    if (data?.saved) {
      toast.success("Credit added successfully!");
      dispatch(mdActions.showModal({type: THANKS_CREDIT_MODAL}));
      dispatch(updateActions.setUpdation());
    }else if(data && !data?.saved){
      toast.error("Failed to add credit!");
    }
  }, [data]);

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Add Credits</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        {renderInputFields(0, undefined, formik, inputField)}
      </div>
      <div className="modal_footer d-flex mt-4 flex-wrap  justify-content-center gap-3">
        <button className="btn_filled btn_sm" type="submit" onClick={formik.handleSubmit}>
          {isLoading && <span className="loader"></span>} Add Credit
        </button>
        <button className="btn_light btn_sm" type="button" onClick={hideModalHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreditModal;
