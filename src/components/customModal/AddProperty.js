import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import RadioBtns from "../formComponent/RadioBtns";
import BtnCheckbox from "../formComponent/BtnCheckbox";
import Checkbox from "../formComponent/Checkbox";
import Dropdown from "../formComponent/Dropdown";
import Postcode from "../formComponent/Postcode";
import FileUpload from "../formComponent/FileUpload";
import { DUPLICATE_PROP_MODAL } from "./ModalConstants";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  streetValidation,
  countryValidation,
  townValidation,
  addPropValidation,
} from "../../validation/validation";
import {
  fileBase64,
  getParkStatusValue,
  parkStatusOptions,
  setFieldsTouchedSingleForm,
} from "../../services/utils";
import { renderInputFields } from "../formComponent/InputFields";
import { AGECNY_ADD_PROPERTY_STEP_FIRST } from "../../config/url";
import { post } from "../../services/api";
import { toast } from "react-toastify";
import { propertyStatusOptions } from "../../helper/SelectOptions";
import { propInputFields } from "../../helper/InputFields";
import { fileType, selectedArray } from "../../services/utils";
import { rentalArray, restrictionArray } from "../../helper/SelectOptions";
import { ViewDownload } from "../formComponent/ViewDownload";
import { propertyActions } from "../../store/multiple-property-slice";

export const propValidationSchema = Yup.object().shape({
  ...countryValidation.fields,
  ...townValidation.fields,
  ...streetValidation.fields,
  ...addPropValidation.fields,
});

const AddProperty = () => {
  const dispatch = useDispatch();
  const { id, name } = JSON.parse(sessionStorage.getItem("currLandlord"));

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
    dispatch(propertyActions.emptyForm());
    sessionStorage.removeItem("currLandlord");
  };

  const [mediaFiles, setMediaFiles] = useState({
    gasCerti: null,
    epcCerti: null,
    eicrCerti: null,
    hmoCerti: null,
    fireCerti: null,
  });

  const multiFormFiles = useSelector((state) => state.property.files);
  const multiFormData = useSelector((state) => state.property.propFormData);

  // console.log(
  //   multiFormData,
  //   multiFormFiles,
  //   "This one should be updated 13147274982324234"
  // );
  const token = localStorage.getItem("token");
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [checkError, setCheckError] = useState(null);
  const [postCode, setPostcode] = useState();
  const [postError, setPostError] = useState(null);
  const [dropOption, setDropOption] = useState("");
  const [dropError, setDropError] = useState(null);
  const [isParking, setIsParking] = useState(null);
  const [parkError, setParkError] = useState(null);
  const [propertiesArray, setPropertiesArray] = useState([]);
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
  const [isGas, setIsGas] = useState(false);
  const [hmo, setHmo] = useState(false);
  const [fire, setFire] = useState(false);

  const [gasFile, setGasFile] = useState(null);
  const [gasFileError, setGasFileError] = useState(null);

  const [epcFile, setEpcFile] = useState(null);
  const [epcFileError, setEpcFileError] = useState(null);

  const [eicrFile, setEicrFile] = useState(null);
  const [eicrFileError, setEicrFileError] = useState(null);

  const [hmoFile, setHmoFile] = useState(null);
  const [hmoFileError, setHmoFileError] = useState(null);

  const [fireFile, setFireFile] = useState(null);
  const [fireFileError, setFireFileError] = useState(null);

  const handleCheckboxChange = () => {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    setCheckError(null);
  };

  const parkingHandler = (event) => {
    setIsParking(event.target.value);
    setParkError(null);
    formik.setFieldValue("parkingCost", "0.00");
  };

  const parkStatusHandler = (event) => {
    setParkStatus(event.target.value);
  };

  const gasHandler = (event) => {
    setIsGas(event.target.value);
  };

  const hmoHandler = (event) => {
    setHmo(event.target.value);
  };

  const fireHandler = (event) => {
    setFire(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      propRef: "",
      street: "",
      town: "",
      country: "",
      bedRoom: "",
      availableFrom: null,
      epcDate: null,
      eicrDate: null,
      hmoDate: null,
      fireDate: null,
      monthlyRent: "",
      holdingAmount: "",
      totalAmount: "",
      depositAmount: "",
      name: name || "",
      parkingCost: "",
      gasDate: null,
    },
    validationSchema: propValidationSchema,
    onSubmit: (values) => {
      const url = `${AGECNY_ADD_PROPERTY_STEP_FIRST}?token=${token}`;
      const body = {
        propertyData: {
          available_from: values.availableFrom,
          bedroom: values.bedRoom,
          country: values.country,
          deposite_amount: values.depositAmount,
          electric_certificate: mediaFiles.eicrCerti || null,
          electric_expiry_date: values.eicrDate,
          epc_certificate: mediaFiles.epcCerti || null,
          epc_expiry_date: values.epcDate,
          gas_certificate: isGas === "Yes" ? mediaFiles.gasCerti : null,
          gas_expiry_date: isGas === "Yes" ? values.gasDate : "",
          hasGas: isGas === "Yes" ? 1 : isGas === "No" ? 2 : null,
          holding_fee_amount: values.holdingAmount,
          landlord_id: id,
          monthly_rent: values.monthlyRent,
          parking_cost: values.parkingCost || 0.00,
          parkingArray:
            isParking === "Yes" ? parkStatusOptions(parkStatus) : "1",
          parkingToggle: isParking === "Yes" ? 1 : 2,
          post_code: postCode,
          property_ref: values.propRef,
          rent_include: "",
          rentIncludeArray: selectedArray(rentalPrice, rentalArray),
          restriction: "",
          restrictionArray: selectedArray(restrictions, restrictionArray),
          status: dropOption,
          street: values.street,
          total_rent: values.totalAmount,
          town: values.town,
          hmo: hmo === "Yes" ? 1 : hmo === "No" ? 2 : null,
          hmo_expiry_date: hmo === "Yes" ? values.hmoDate : "",
          hmo_certificate: hmo === "Yes" ? mediaFiles.hmoCerti : null,
          fire_alarm: fire === "Yes" ? 1 : fire === "No" ? 2 : null,
          fire_alarm_expiry_date: fire === "Yes" ? values.fireDate : "",
          fire_alarm_certificate: fire === "Yes" ? mediaFiles.fireCerti : null,
        },
      };
      setPropertiesArray(body.propertyData);
      // console.log(body, "This is body|||||||||||||||");
      post(url, body, null, setPostData, setIsLoading);
    },
  });

  useEffect(() => {
    //to automatically calculate total amount, holding amount and deposit amount
    const { monthlyRent, parkingCost } = formik.values;
    const totalAmount = Math.floor(
      parseInt(monthlyRent) + (isParking === "Yes" ? parseInt(parkingCost) : 0)
    );
    // Calculate depositAmount (Total Rent x 12 / 52 x 5, round down)
    const depositAmount = Math.floor((totalAmount * 12) / (52 * 0.5));

    // Calculate holdingAmount (Total Rent x 12 / 52, round down)
    const holdingAmount = Math.floor((totalAmount * 12) / 52);

    // Update Formik values
    formik.setValues({
      ...formik.values,
      totalAmount,
      depositAmount,
      holdingAmount,
    });
  }, [formik.values.monthlyRent, formik.values.parkingCost, isParking]);

  useEffect(() => {
    //initialize the form with previous form values if exists
    if (multiFormFiles.length > 0 && multiFormData.length > 0) {
      let lastIndex = multiFormData.length - 1;
      const formData = multiFormData[lastIndex];
      const fieldValues = {
        propRef: formData?.property_ref,
        street: formData?.street,
        town: formData?.town,
        country: formData?.country,
        bedRoom: formData?.bedroom,
        availableFrom: formData?.available_from,
        epcDate: formData?.epc_expiry_date,
        eicrDate: formData?.electric_expiry_date,
        hmoDate: formData?.hmo_expiry_date,
        fireDate: formData?.fire_alarm_expiry_date,
        gasDate: formData?.gas_expiry_date,
        holdingAmount: formData?.holding_fee_amount,
        monthlyRent: formData?.monthly_rent,
        totalAmount: formData?.total_rent,
        depositAmount: formData?.deposite_amount,
        parkingCost: formData?.parking_cost,
      };
      formik.setValues(fieldValues);
      setPostcode(formData.post_code);
      setDropOption(formData.status);
      setIsParking(
        formData.parkingToggle === 1
          ? "Yes"
          : formData.parkingToggle === 2
            ? "No"
            : ""
      );
      setParkStatus(getParkStatusValue(parseInt(formData.parkingArray), 10));
      setRentalPrice({
        electricity: formData.rentIncludeArray.includes("Electricity"),
        gas: formData.rentIncludeArray.includes("Gas"),
        water: formData.rentIncludeArray.includes("Water"),
        internet: formData.rentIncludeArray.includes("Internet"),
        insurance: formData.rentIncludeArray.includes("Insurance"),
      });
      setRestrictions({
        pets: formData.restrictionArray.includes("No Pets"),
        students: formData.restrictionArray.includes("No Students"),
        families: formData.restrictionArray.includes("No Families"),
        professionals: formData.restrictionArray.includes("No Professionals"),
      });
      setIsGas(
        formData.hasGas === 1 ? "Yes" : formData.hasGas === 2 ? "No" : ""
      );
      setHmo(formData.hmo === 1 ? "Yes" : formData.hmo === 2 ? "No" : "");
      setFire(
        formData.fire_alarm === 1
          ? "Yes"
          : formData.fire_alarm === 2
            ? "No"
            : ""
      );
      //set the files initial vlaue to file type
      setGasFile(formData.gasCerti ? formData.gasCerti : null);
      setEpcFile(formData.epcCerti ? formData.epcCerti : null);
      setEicrFile(formData.eicrCerti ? formData.eicrCerti : null);
      setHmoFile(formData.hmoCerti ? formData.hmoCerti : null);
      setFireFile(formData.fireCerti ? formData.fireCerti : null);
    }
  }, []);

  useEffect(() => {
    toast.dismiss();
    if (postData) {
      if (postData.saved) {
        //add this property to properties array(redux)
        dispatch(
          propertyActions.appendPropertyData({ newForm: propertiesArray })
        );
        //add property files(File type) to files array(redux)
        dispatch(
          propertyActions.appendFile({
            newFile: {
              gasCerti: gasFile,
              epcCerti: epcFile,
              eicrCerti: eicrFile,
              hmoCerti: hmoFile,
              fireCerti: fireFile,
            },
          })
        );
        dispatch(mdActions.showModal({ type: DUPLICATE_PROP_MODAL }));
      } else if (!postData.saved) {
        toast.error("This property reference has already been taken!");
      }
    }
  }, [postData]);

  //TODO: REMOVE THIS LATER
  // const formSubmitHandler = (e) => {
  //   e.preventDefault();
  //   function formikValid() {
  //     if (!formik.isValid) {
  //       formik.handleSubmit(e);
  //     } else {
  //       return true;
  //     }
  //   }
  //   //submit form if everything is validated(phonenumber, checkbox)
  //   if (
  //     checkError ||
  //     gasFileError ||
  //     epcFileError ||
  //     eicrFileError ||
  //     hmoFileError ||
  //     fireFileError ||
  //     dropError ||
  //     postError ||
  //     parkError
  //   ) {
  //     formikValid();
  //   }
  //   if (
  //     !checkValue &&
  //     !dropError &&
  //     !dropOption &&
  //     !postError &&
  //     !postCode &&
  //     !parkError &&
  //     !isParking
  //   ) {
  //     setCheckError("The checkbox field is required.");
  //     setDropError("This field is required.");
  //     setParkError("This field is required.");
  //     setPostError("Postcode is required.");
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
  //   if (!postError && !postCode) {
  //     setPostError("Postcode is required.");
  //     formikValid();
  //   }
  //   if (!checkValue) {
  //     setCheckError("The checkbox field is required.");
  //     formikValid();
  //   }
  //   if (formikValid() && checkValue && dropOption && postCode && isParking) {
  //     //form is valid
  //     formik.handleSubmit(e);
  //   }
  //   console.log(
  //     formik.isValid,
  //     formik.submitCount,
  //     formik,
  //     checkValue,
  //     dropOption,
  //     postCode,
  //     isParking
  //   );
  // };

  const formSubmitHandler = (e) => {
    toast.dismiss();
    e.preventDefault();
    formik.validateForm();
    setFieldsTouchedSingleForm(formik.values, formik);
    console.log(formik.errors, "these are formik errors");
    if (
      Object.keys(formik.errors).length !== 0 ||
      dropError || !dropOption ||
      parkError || !isParking ||
      postError || !postCode ||
      checkError || !checkValue ||
      gasFileError ||
      eicrFileError ||
      hmoFileError ||
      fireFileError ||
      epcFileError
    ) {
      toast.error(
        "Form submission failed. Kindly check the form for errors and resubmit."
      );
    }
    if (
      checkError ||
      gasFileError ||
      epcFileError ||
      eicrFileError ||
      hmoFileError ||
      fireFileError ||
      dropError ||
      postError ||
      parkError
    ) {
      return;
    }
    if (
      !checkValue &&
      !dropError &&
      !dropOption &&
      !postError &&
      !postCode &&
      !parkError &&
      !isParking
    ) {
      setCheckError("The checkbox field is required.");
      setDropError("This field is required.");
      setParkError("This field is required.");
      setPostError("Postcode is required.");
    }
    if (!dropError && !dropOption) {
      setDropError("This field is required.");
    }
    if (!parkError && !isParking) {
      setParkError("This field is required.");
    }
    if (!postError && !postCode) {
      setPostError("Postcode is required.");
    }
    if (!checkValue) {
      setCheckError("The checkbox field is required.");
    }
    if (formik.isValid && checkValue && dropOption && postCode && isParking) {
      //form is valid
      formik.handleSubmit(e);
    }
  };

  const updateMediaFiles = async (file, key) => {
    try {
      const base64String = await fileBase64(file);
      setMediaFiles((prevMediaFiles) => ({
        ...prevMediaFiles,
        [key]: base64String,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateMediaFiles(gasFile, "gasCerti");
  }, [gasFile]);

  useEffect(() => {
    updateMediaFiles(epcFile, "epcCerti");
  }, [epcFile]);

  useEffect(() => {
    updateMediaFiles(eicrFile, "eicrCerti");
  }, [eicrFile]);

  useEffect(() => {
    updateMediaFiles(hmoFile, "hmoCerti");
  }, [hmoFile]);

  useEffect(() => {
    updateMediaFiles(fireFile, "fireCerti");
  }, [fireFile]);

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Add a Property {multiFormData?.length + 1}</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <div className="app_details position-relative">
          <form className="mt-3" onSubmit={formSubmitHandler}>
            <div className="d-flex flex-column gap-3">
              {renderInputFields(0, 1, formik, propInputFields)}
              <Dropdown
                label="Property Status"
                option={propertyStatusOptions}
                className="flex-100"
                required={false}
                error={dropError}
                setError={setDropError}
                selectValue={dropOption}
                selectHandler={setDropOption}
              />
              <Postcode
                postCode={postCode}
                postcodeHandler={setPostcode}
                error={postError}
                setError={setPostError}
                formik={formik}
              />
              {renderInputFields(1, 2, formik, propInputFields)}
            </div>
            <div className="panel_form form-agency mt-4">
              {renderInputFields(2, 4, formik, propInputFields)}
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
                {renderInputFields(15, 16, formik, propInputFields)}
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
                <div className="panel_setting d-flex flex-wrap">
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
                <div className="panel_setting d-flex flex-wrap">
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
            <div className="panel_form form-agency mt-4">
              {renderInputFields(4, 6, formik, propInputFields)}
            </div>
            <div className="panel_que-btns mt-3">
              <p className="form-labels">Has Gas</p>
              <div className="btn_group">
                <RadioBtns
                  label="Yes"
                  name="hasGas"
                  id="gas-yes"
                  value="Yes"
                  radioOption={isGas}
                  onChange={gasHandler}
                />
                <RadioBtns
                  label="No"
                  name="hasGas"
                  id="gas-no"
                  value="No"
                  radioOption={isGas}
                  onChange={gasHandler}
                />
              </div>
            </div>
            {isGas === "Yes" && (
              <div className="mt-3">
                {renderInputFields(16, undefined, formik, propInputFields)}
                <div className="prop-file">
                  <FileUpload
                    className={gasFile ? "flex-80" : "flex-100"}
                    fileId="gas1"
                    label="Gas Certificate"
                    text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                    required={false}
                    error={gasFileError}
                    setError={setGasFileError}
                    file={gasFile}
                    fileHandler={setGasFile}
                    accept={fileType}
                  />
                  {gasFile && <ViewDownload file={gasFile} />}
                </div>
              </div>
            )}
            <div className="panel_form form-agency mt-4">
              {renderInputFields(6, 7, formik, propInputFields)}
              <div className="prop-file">
                <FileUpload
                  className={epcFile ? "flex-80" : "flex-100"}
                  fileId="epcCerti"
                  label="EPC Certificate"
                  text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                  required={false}
                  error={epcFileError}
                  setError={setEpcFileError}
                  file={epcFile}
                  fileHandler={setEpcFile}
                  accept={fileType}
                />
                {epcFile && <ViewDownload file={epcFile} />}
              </div>
              {renderInputFields(7, 8, formik, propInputFields)}
              <div className="prop-file">
                <FileUpload
                  className={eicrFile ? "flex-80" : "flex-100"}
                  fileId="eicrCerti"
                  label="EICR Certificate"
                  text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                  required={false}
                  error={eicrFileError}
                  setError={setEicrFileError}
                  file={eicrFile}
                  fileHandler={setEicrFile}
                  accept={fileType}
                />
                {eicrFile && <ViewDownload file={eicrFile} />}
              </div>
            </div>
            <div className="panel_que-btns mt-3 mb-3">
              <p className="form-labels">HMO Certificate Available?</p>
              <div className="btn_group">
                <RadioBtns
                  label="Yes"
                  name="hmoYes"
                  id="hmo-yes"
                  value="Yes"
                  radioOption={hmo}
                  onChange={hmoHandler}
                />
                <RadioBtns
                  label="No"
                  name="hmoYes"
                  id="hmo-no"
                  value="No"
                  radioOption={hmo}
                  onChange={hmoHandler}
                />
              </div>
            </div>
            {hmo === "Yes" && (
              <>
                {renderInputFields(8, 9, formik, propInputFields)}
                <div className="prop-file">
                  <FileUpload
                    className={hmoFile ? "flex-80" : "flex-100"}
                    fileId="HMOCerti"
                    label="HMO Certificate"
                    text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                    required={false}
                    error={hmoFileError}
                    setError={setHmoFileError}
                    file={hmoFile}
                    fileHandler={setHmoFile}
                    accept={fileType}
                  />
                  {hmoFile && <ViewDownload file={hmoFile} />}
                </div>
              </>
            )}
            <div className="panel_que-btns mt-3 mb-3">
              <p className="form-labels">Fire Alarm Certificate Available?</p>
              <div className="btn_group">
                <RadioBtns
                  label="Yes"
                  name="fireYes"
                  id="fire-yes"
                  value="Yes"
                  radioOption={fire}
                  onChange={fireHandler}
                />
                <RadioBtns
                  label="No"
                  name="fireYes"
                  id="fire-no"
                  value="No"
                  radioOption={fire}
                  onChange={fireHandler}
                />
              </div>
            </div>
            {fire === "Yes" && (
              <>
                {renderInputFields(9, 10, formik, propInputFields)}
                <div className="prop-file">
                  <FileUpload
                    className={fireFile ? "flex-80" : "flex-100"}
                    fileId="fireCerti"
                    label="Fire Alarm Certificate"
                    text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                    required={false}
                    error={fireFileError}
                    setError={setFireFileError}
                    file={fireFile}
                    fileHandler={setFireFile}
                    accept={fileType}
                  />
                  {fireFile && <ViewDownload file={fireFile} />}
                </div>
              </>
            )}
            <div className="panel_form form-agency mt-4">
              {renderInputFields(10, 15, formik, propInputFields)}
            </div>
            <Checkbox
              className="mt-4 checkbox-modal"
              id="checkbox1"
              label="Do you agree that all information provided by you is correct."
              changeHandler={handleCheckboxChange}
              isChecked={checkValue}
              checkError={checkError}
            />
            <div className="modal_footer mt-4">
              <button className="btn_light btn_sm mx-auto" type="submit">
                {isLoading && <span className="loader"></span>}Submit Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
