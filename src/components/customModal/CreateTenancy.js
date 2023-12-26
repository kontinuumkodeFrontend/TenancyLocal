import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import BtnCheckbox from "../formComponent/BtnCheckbox";
import Checkbox from "../formComponent/Checkbox";
import Dropdown from "../formComponent/Dropdown";
import { ADD_APPLICANTS_MODAL } from "./ModalConstants";
import { interimOptions } from "../../helper/SelectOptions";
import RadioBtns from "../formComponent/RadioBtns";
import { renderInputFields } from "../formComponent/InputFields";
import { useFormik } from "formik";
import { restrictionArray, rentalArray } from "../../helper/SelectOptions";
import { selectedArray, setFieldsTouchedSingleForm } from "../../services/utils";
import {
  getParkStatusValue,
  parkStatusOptions,
  timeZone,
} from "../../services/utils";
import { tenancyValidationSchema } from "../../validation/validation";
import { useEffect } from "react";
import { post } from "../../services/api";
import { AGENCY_TENANCY_FIRST_STEP } from "../../config/url";
import { toast } from "react-toastify";
import { TenancyInputField } from "../../helper/InputFields";
import { tenancyActions } from "../../store/tenancy-slice";

const CreateTenancy = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [dropOption, setDropOption] = useState("");
  const [dropError, setDropError] = useState(null);
  const [checkValue, setCheckValue] = useState(false);
  const [postData, setPostData] = useState(null);
  const [checkError, setCheckError] = useState(null);
  const [isParking, setIsParking] = useState();
  const [parkError, setParkError] = useState(null);
  const [tenancyData, setTenancyData] = useState(null);
  const dispatch = useDispatch();
  const rowData = useSelector((state) => state.modal.data);
  const {
    tenancyData: createTenancyData,
    applicantData,
    propData,
  } = useSelector((state) => state.tenancy);
  // console.log(createTenancyData, applicantData, "----------");
  console.log(rowData, "This is the row data>>>>46436456.>>>>>>>>>");
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
    dispatch(tenancyActions.emptyForm());
  };

  const parkingHandler = (event) => {
    setIsParking(event.target.value);
    setParkError(null);
  };

  const [rentalPrice, setRentalPrice] = useState({
    electricity: false,
    gas: false,
    water: false,
    internet: false,
    insurance: false,
  });

  const rentalPriceHandler = (name, value) => {
    //for multiple checkboxes
    setRentalPrice({
      ...rentalPrice,
      [name]: value,
    });
  };

  const [restrictions, setRestrictions] = useState({
    pets: false,
    students: false,
    families: false,
    professionals: false,
  });

  const restrictionsHandler = (name, value) => {
    //for multiple checkboxes
    setRestrictions({
      ...restrictions,
      [name]: value,
    });
  };

  const [parkStatus, setParkStatus] = useState("Secure");

  const handleCheckboxChange = () => {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    setCheckError(null);
  };

  const parkStatusHandler = (event) => {
    setParkStatus(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      propAddress: "",
      monthlyRent: "",
      holdingAmount: "",
      totalAmount: "",
      depositAmount: "",
      parkingCost: "",
      tenancyStartDate: "",
      tenancyEndDate: "",
      applicant: "",
      bedRoom: "",
      name: "",
    },
    validationSchema: tenancyValidationSchema,
    onSubmit: (values) => {
      const url = `${AGENCY_TENANCY_FIRST_STEP}?token=${token}`;
      const body = {
        tenancyData: {
          pro_address: values.propAddress,
          parking: isParking === "Yes" ? 1 : 2,
          interism_inspection: dropOption,
          parking_cost: isParking === "Yes" ? values.parkingCost : "",
          monthly_amount: values.monthlyRent,
          deposite_amount: values.depositAmount,
          holding_amount: values.holdingAmount,
          landlord_id: rowData ? rowData.landlord_id : propData.landlordId,
          property_id: rowData ? rowData.id : propData.propId,
          t_start_date: values.tenancyStartDate,
          t_end_date: values.tenancyEndDate,
          no_applicant: values.applicant,
          applicants: applicantData,
          rentIncludeArray: selectedArray(rentalPrice, rentalArray),
          restrictionArray: selectedArray(restrictions, restrictionArray),
          parkingArray:
            isParking === "Yes" ? parkStatusOptions(parkStatus) : "1",
          total_rent: values.totalAmount,
          timezone: timeZone,
        },
      };
      setTenancyData(body.tenancyData);
      console.log(body, "This is body|||||||||||||||");
      post(url, body, null, setPostData, setIsLoading);
    },
  });

  useEffect(() => {
    if (postData) {
      console.log(postData, "this is post data");
      if (postData.saved) {
        dispatch(mdActions.showModal({ type: ADD_APPLICANTS_MODAL }));
        dispatch(tenancyActions.setTenancyData({ formData: tenancyData }));
        dispatch(
          tenancyActions.setPropData({
            data: {
              name: rowData
                ? `${rowData.landlords.f_name} ${rowData.landlords.l_name}`
                : propData.name,
              bedRoom: rowData ? rowData.bedroom : propData.bedRoom,
              propId: rowData ? rowData.id : propData.propId,
              landlordId: rowData ? rowData.landlord_id : propData.landlordId,
            },
          })
        );
      } else if (postData.statusCode === 781 || postData.statusCode === 2322) {
        toast.error(postData.reason);
        hideModalHandler();
      } else if (postData.errors.t_end_date) {
        formik.setFieldError(
          "tenancyEndDate",
          "Tenancy end date must be the end of the month"
        );
        toast.error("Form submission failed. Kindly check the form for errors and resubmit.");
      }
    }
  }, [postData]);

  useEffect(() => {
    //to automatically calculate total amount, holding amount and deposit amount
    const { monthlyRent, parkingCost } = formik.values;
    const totalAmount = Math.floor(parseInt(monthlyRent) + (isParking === "Yes" ? parseInt(parkingCost) : 0));
    // Calculate depositAmount (Total Rent x 12 / 52 x 0.5)
    const depositAmount = Math.floor((totalAmount * 12) / (52 * 0.5));
    // Calculate holdingAmount (Total Rent x 12 / 52)
    const holdingAmount = Math.floor((totalAmount * 12) / 52);

    // Update Formik values
    formik.setValues({
      ...formik.values,
      totalAmount,
      depositAmount,
      holdingAmount,
    });
  }, [
    formik.values.monthlyRent,
    formik.values.parkingCost,
    isParking
  ]);

  //TODO: REMOVE IT LATER
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
  //   if (checkError || dropError || parkError) {
  //     formikValid();
  //   }
  //   if (!checkValue && !dropError && !dropOption && !parkError && !isParking) {
  //     setCheckError("The checkbox field is required.");
  //     setDropError("This field is required.");
  //     setParkError("This field is required.");
  //     formik.handleSubmit(e);
  //     return;
  //   }
  //   if (!dropError && !dropOption) {
  //     setDropError("This field is required.");
  //     formikValid();
  //   }
  //   if (!parkError && !isParking) {
  //     setParkError("This field is required.");
  //     formikValid();
  //   }
  //   if (!checkValue) {
  //     setCheckError("The checkbox field is required.");
  //     formikValid();
  //   }
  //   if (formikValid() && checkValue && dropOption && isParking) {
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
    if (Object.keys(formik.errors).length !== 0 || dropError || parkError || checkError || !checkValue || !dropOption || !isParking) {
      toast.error(
        "Form submission failed. Kindly check the form for errors and resubmit."
      );
    }
    if (checkError || dropError || parkError) {
      return;
    }
    if (!checkValue && !dropError && !dropOption && !parkError && !isParking) {
      setCheckError("The checkbox field is required.");
      setDropError("This field is required.");
      setParkError("This field is required.");
    }
    if (!dropError && !dropOption) {
      setDropError("This field is required.");
    }
    if (!parkError && !isParking) {
      setParkError("This field is required.");
    }
    if (!checkValue) {
      setCheckError("The checkbox field is required.");
    }
    if (formik.isValid && checkValue && dropOption && isParking) {
      //form is valid
      formik.handleSubmit(e);
    }
  }; //better way to handle form errors

  useEffect(() => {
    if (rowData || createTenancyData) {
      const data = rowData || createTenancyData;
      formik.setValues({
        propAddress: rowData
          ? `${data.street}, ${data.town}, ${data.country}, ${data.post_code}`
          : data.pro_address,
        depositAmount: data.deposite_amount,
        holdingAmount: rowData ? data.holding_fee_amount : data.holding_amount,
        bedRoom: rowData ? data.bedroom : propData.bedRoom,
        monthlyRent: rowData ? data.monthly_rent : data.monthly_amount,
        parkingCost: data.parking_cost,
        totalAmount: data.total_rent,
        tenancyStartDate: rowData ? data.available_from : data.t_start_date,
        tenancyEndDate: data.t_end_date || "",
        applicant: rowData ? data.bedroom : data?.no_applicant,
        name: rowData
          ? `${rowData.landlords?.f_name} ${rowData.landlords?.l_name}`
          : propData.name,
      });

      setIsParking(data?.parkingToggle === 1 ? "Yes" : "No");
      setParkStatus(getParkStatusValue(data?.parkingArray));
      setRentalPrice({
        electricity: data?.rentIncludeArray?.includes("Electricity"),
        gas: data?.rentIncludeArray?.includes("Gas"),
        water: data?.rentIncludeArray?.includes("Water"),
        internet: data?.rentIncludeArray?.includes("Internet"),
        insurance: data?.rentIncludeArray?.includes("Insurance"),
      });
      setRestrictions({
        pets: data?.restrictionArray?.includes("No Pets"),
        students: data?.restrictionArray?.includes("No Students"),
        families: data?.restrictionArray?.includes("No Families"),
        professionals: data?.restrictionArray?.includes("No Professionals"),
      });
      setDropOption(data.interism_inspection || "");
    }
  }, [rowData, createTenancyData]);

  console.log(formik.errors, "these ARE ERRORS");

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Create a Tenancy</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <div className="app_details position-relative">
          <form className="mt-3" onSubmit={formSubmitHandler}>
            <div className="d-flex flex-column gap-3">
              {renderInputFields(0, 1, formik, TenancyInputField)}
              <Dropdown
                label="Quantity of Interim Inspection"
                option={interimOptions}
                className="flex-100"
                required={false}
                error={dropError}
                setError={setDropError}
                selectValue={dropOption}
                selectHandler={setDropOption}
              />
            </div>
            <div className="panel_form form-agency mt-4">
              {renderInputFields(1, 9, formik, TenancyInputField)}
            </div>
            <div className="panel_que-btns mt-3">
              <p className="form-labels required">
                Parking Available <span> *</span>
              </p>
              <div className="btn_group">
                <RadioBtns
                  label="Yes"
                  name="parkAva1"
                  id="park1-yes"
                  value="Yes"
                  radioOption={isParking}
                  onChange={parkingHandler}
                />
                <RadioBtns
                  label="No"
                  name="parkAva1"
                  id="park1-no"
                  value="No"
                  radioOption={isParking}
                  onChange={parkingHandler}
                />
              </div>
              {parkError && (
                <p className="error-text">This field is required.</p>
              )}
            </div>
            {isParking === "Yes" && (
              <>
                {renderInputFields(9, undefined, formik, TenancyInputField)}
                <div className="panel_que-btns mt-3">
                  <p className="form-labels required">
                    Parking Status<span> *</span>
                  </p>
                  <div className="btn_group">
                    <RadioBtns
                      label="Secure"
                      name="park1"
                      id="park1-secure"
                      value="Secure"
                      radioOption={parkStatus}
                      onChange={parkStatusHandler}
                    />
                    <RadioBtns
                      label="Off-Road"
                      name="park1"
                      id="park1-offRoad"
                      value="Off-Road"
                      radioOption={parkStatus}
                      onChange={parkStatusHandler}
                    />
                    <RadioBtns
                      label="Street"
                      name="park1"
                      id="park1-street"
                      value="Street"
                      radioOption={parkStatus}
                      onChange={parkStatusHandler}
                    />
                    <RadioBtns
                      label="Other"
                      name="park1"
                      id="park1-other"
                      value="Other"
                      radioOption={parkStatus}
                      onChange={parkStatusHandler}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="panel_que-btns mt-3">
              <p className="form-labels">Rental Price Includes</p>
              <div className="btn_group">
                <div className="panel_setting d-flex flex-wrap pe-none">
                  <BtnCheckbox
                    label="Electricity"
                    name="electricity"
                    changeHandler={rentalPriceHandler}
                    defaultValue={rentalPrice.electricity}
                  />
                  <BtnCheckbox
                    label="Gas"
                    name="gas"
                    changeHandler={rentalPriceHandler}
                    defaultValue={rentalPrice.gas}
                  />
                  <BtnCheckbox
                    label="Water"
                    name="water"
                    changeHandler={rentalPriceHandler}
                    defaultValue={rentalPrice.water}
                  />
                  <BtnCheckbox
                    label="Internet"
                    name="internet"
                    changeHandler={rentalPriceHandler}
                    defaultValue={rentalPrice.internet}
                  />
                  <BtnCheckbox
                    label="Insurance"
                    name="insurance"
                    changeHandler={rentalPriceHandler}
                    defaultValue={rentalPrice.insurance}
                  />
                </div>
              </div>
            </div>
            <div className="panel_que-btns mt-3">
              <p className="form-labels">Restrictions</p>
              <div className="btn_group">
                <div className="panel_setting d-flex flex-wrap pe-none">
                  <BtnCheckbox
                    label="No Pets"
                    name="pets"
                    changeHandler={restrictionsHandler}
                    defaultValue={restrictions.pets}
                  />
                  <BtnCheckbox
                    label="No Students"
                    name="students"
                    changeHandler={restrictionsHandler}
                    defaultValue={restrictions.students}
                  />
                  <BtnCheckbox
                    label="No Families"
                    name="families"
                    changeHandler={restrictionsHandler}
                    defaultValue={restrictions.families}
                  />
                  <BtnCheckbox
                    label="No Professionals"
                    name="professionals"
                    changeHandler={restrictionsHandler}
                    defaultValue={restrictions.professionals}
                  />
                </div>
              </div>
            </div>
            <Checkbox
              className="mt-4 checkbox-modal"
              id="checkbox1"
              label="Do you agree that all information provided by you is correct."
              changeHandler={handleCheckboxChange}
              isChecked={checkValue}
              checkError={checkError}
            />
            <div className="modal_footer mt-4 ">
              <button className="btn_light btn_sm mx-auto" type="submit">
                {isLoading && <span className="loader"></span>} Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTenancy;
