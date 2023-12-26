import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import BtnCheckbox from "../../formComponent/BtnCheckbox";
import Checkbox from "../../formComponent/Checkbox";
import Dropdown from "../../formComponent/Dropdown";
import Postcode from "../../formComponent/Postcode";
import FileUpload from "../../formComponent/FileUpload";
import { post } from "../../../services/api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { propValidationSchema } from "../AddProperty";
import {
  GAS_FILE,
  EPC_FILE,
  FIRE_FILE,
  EICR_FILE,
  HMO_FILE,
} from "../../../helper/constants/ViewTenancyConstant";
import { ViewDownload } from "../../formComponent/ViewDownload";
import { rentalArray, restrictionArray } from "../../../helper/SelectOptions";
import { renderInputFields } from "../../formComponent/InputFields";
import RadioBtns from "../../formComponent/RadioBtns";
import { propertyStatusOptions } from "../../../helper/SelectOptions";
import { AGENCY_EDIT_PROPERTY } from "../../../config/url";
import {
  fileType,
  getParkStatusValue,
  parkStatusOptions,
  selectedArray,
  setFieldsTouchedSingleForm,
} from "../../../services/utils";
import { editPropInputFields } from "../../../helper/InputFields";

const TabProp = ({ propValues }) => {
  const dispatch = useDispatch();
  const propertyCerti = useSelector((state) => state.editProp);

  console.log(propertyCerti, "these is a property files");
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
      name: "",
      parkingCost: "",
      gasDate: null,
    },
    validationSchema: propValidationSchema,
    onSubmit: (values) => {
      const url = `${AGENCY_EDIT_PROPERTY}?token=${token}`;
      const body = {
        propertyData: {
          agency_id: propValues?.agency_id,
          created_at: propValues?.created_at,
          creator_id: propValues?.creator_id,
          available_from: values.availableFrom,
          bedroom: values.bedRoom,
          country: values.country,
          deposite_amount: values.depositAmount,
          electric_certificate: propertyCerti.eicrFile,
          electric_expiry_date: values.eicrDate,
          epc_certificate: propertyCerti.epcFile,
          epc_expiry_date: values.epcDate,
          gas_certificate: isGas === "Yes" ? propertyCerti.gasFile : "",
          gas_expiry_date: isGas === "Yes" ? values.gasDate : "",
          hasGas: isGas === "Yes" ? 1 : 2,
          holding_fee_amount: values.holdingAmount,
          id: propValues?.id,
          landlord_id: propValues?.landlord_id,
          landlords: propValues?.landlords,
          monthly_rent: values.monthlyRent,
          parking_cost: values.parkingCost,
          parkingArray:
            isParking === "Yes" ? parkStatusOptions(parkStatus) : "1",
          parkingToggle: isParking === "Yes" ? 1 : 2,
          post_code: postCode,
          previous_status: propValues?.previous_status,
          property_ref: values.propRef,
          rent_include: propValues?.rent_include,
          rentIncludeArray: selectedArray(rentalPrice, rentalArray),
          restriction: propValues?.restriction,
          restrictionArray: selectedArray(restrictions, restrictionArray),
          status: dropOption,
          street: values.street,
          tenancies: propValues?.tenancies,
          total_rent: values.totalAmount,
          town: values.town,
          updated_at: propValues?.updated_at,
          hmo: hmo === "Yes" ? 1 : 2,
          hmo_expiry_date: hmo === "Yes" ? values.hmoDate : "",
          hmo_certificate: hmo === "Yes" ? propertyCerti.hmoFile : "",
          fire_alarm: fire === "Yes" ? 1 : 2,
          fire_alarm_expiry_date: fire === "Yes" ? values.fireDate : "",
          fire_alarm_certificate: fire === "Yes" ? propertyCerti.fireFile : "",
        },
      };
      console.log(body, "This is body|||||||||||||||");
      post(url, body, null, setPostData, setIsLoading);
    },
  });

  useEffect(() => {
    //to automatically calculate total amount, holding amount and deposit amount
    const { monthlyRent, parkingCost } = formik.values;
    const totalAmount = Math.floor(
      parseInt(monthlyRent) + (isParking === "Yes" ? parseInt(parkingCost) : 0)
    );
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
  }, [formik.values.monthlyRent, formik.values.parkingCost, isParking]);

  useEffect(() => {
    //to update the form when we get values
    formik.setFieldValue("propRef", propValues?.property_ref);
    formik.setFieldValue("street", propValues?.street);
    formik.setFieldValue("town", propValues?.town);
    formik.setFieldValue("country", propValues?.country || "");
    formik.setFieldValue("bedRoom", propValues?.bedroom || "");
    formik.setFieldValue("availableFrom", propValues?.available_from || "");
    formik.setFieldValue("epcDate", propValues?.epc_expiry_date || "");
    formik.setFieldValue("eicrDate", propValues?.electric_expiry_date || "");
    formik.setFieldValue("hmoDate", propValues?.hmo_expiry_date || "");
    formik.setFieldValue("fireDate", propValues?.fire_alarm_expiry_date);
    formik.setFieldValue("monthlyRent", propValues?.monthly_rent || 0);
    formik.setFieldValue("holdingAmount", propValues?.holding_fee_amount || 0);
    formik.setFieldValue("totalAmount", propValues?.total_rent || 0);
    formik.setFieldValue("depositAmount", propValues?.deposite_amount);
    formik.setFieldValue("parkingCost", propValues?.parking_cost || 0);
    formik.setFieldValue("gasDate", propValues?.gas_expiry_date);
    formik.setFieldValue(
      "name",
      `${propValues?.landlords?.f_name} ${propValues?.landlords?.l_name}`
    );

    setPostcode(propValues?.post_code);
    setDropOption(propValues?.status);
    setIsParking(propValues?.parkingToggle === 1 ? "Yes" : "No");
    setParkStatus(getParkStatusValue(propValues?.parkingArray));

    setIsGas(
      propValues?.hasGas === 1 || propValues?.hasGas === "1"
        ? "Yes"
        : propValues?.hasGas === 2 || propValues?.hasGas === "2"
        ? "No"
        : null
    );
    setHmo(
      propValues?.hmo === 1 || propValues?.hmo === "1"
        ? "Yes"
        : propValues?.hmo === 2 || propValues?.hmo === "2"
        ? "No"
        : null
    );
    setFire(
      propValues?.fire_alarm === 1 || propValues?.fire_alarm === "1"
        ? "Yes"
        : propValues?.fire_alarm === 2 || propValues?.fire_alarm === "2"
        ? "No"
        : null
    );

    setRentalPrice({
      electricity: propValues?.rentIncludeArray?.includes("Electricity"),
      gas: propValues?.rentIncludeArray?.includes("Gas"),
      water: propValues?.rentIncludeArray?.includes("Water"),
      internet: propValues?.rentIncludeArray?.includes("Internet"),
      insurance: propValues?.rentIncludeArray?.includes("Insurance"),
    });
    setRestrictions({
      pets: propValues?.restrictionArray?.includes("No Pets"),
      students: propValues?.restrictionArray?.includes("No Students"),
      families: propValues?.restrictionArray?.includes("No Families"),
      professionals: propValues?.restrictionArray?.includes("No Professionals"),
    });
    setGasFile(propValues?.gas_certificate ? propValues.gas_certificate : null);
    setEpcFile(propValues?.epc_certificate ? propValues.epc_certificate : null);
    setEicrFile(
      propValues?.electric_certificate ? propValues.electric_certificate : null
    );
    setHmoFile(propValues?.hmo_certificate ? propValues.hmo_certificate : null);
    setFireFile(
      propValues?.fire_alarm_certificate
        ? propValues.fire_alarm_certificate
        : null
    );
  }, [propValues]);

  useEffect(() => {
    if (postData) {
      if (postData.saved) {
        toast.success("Property updated successfully!");
        dispatch(mdActions.hideModal());
      } else if (!postData.saved && postData.statusCode === 2315) {
        toast.error("You can not update the property status.");
      } else if (!postData.saved) {
        toast.error("Failed to update property!");
      }
    }
  }, [postData]);

  //TODO: REMOVE THIS LATER
  // const formSubmitHandler = (e) => {
  //     e.preventDefault();
  //     function formikValid() {
  //         if (!formik.isValid) {
  //             formik.handleSubmit(e);
  //         } else {
  //             return true;
  //         }
  //     }
  //     //submit form if everything is validated(phonenumber, checkbox)
  //     if (
  //         checkError ||
  //         gasFileError ||
  //         epcFileError ||
  //         eicrFileError ||
  //         hmoFileError ||
  //         fireFileError ||
  //         dropError ||
  //         postError ||
  //         parkError
  //     ) {
  //         formikValid();
  //     }
  //     if (
  //         !checkValue &&
  //         !dropError &&
  //         !dropOption &&
  //         !postError &&
  //         !postCode &&
  //         !parkError &&
  //         !isParking
  //     ) {
  //         setCheckError("The checkbox field is required.");
  //         setDropError("This field is required.");
  //         setParkError("This field is required.");
  //         setPostError("Postcode is required.");
  //         formik.handleSubmit(e);
  //         return;
  //     }
  //     if (!dropError && !dropOption) {
  //         setDropError("This field is required.");
  //         formikValid();
  //     }
  //     if (!parkError && !isParking) {
  //         setParkError("This field is required.");
  //         formikValid();
  //     }
  //     if (!postError && !postCode) {
  //         setPostError("Postcode is required.");
  //         formikValid();
  //     }
  //     if (!checkValue) {
  //         setCheckError("The checkbox field is required.");
  //         formikValid();
  //     }
  //     if (formikValid() && checkValue && dropOption && postCode && isParking) {
  //         //form is valid
  //         formik.handleSubmit(e);
  //     }
  // };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    toast.dismiss();
    formik.validateForm();
    setFieldsTouchedSingleForm(formik.values, formik);
    // console.log(formik.errors, "these are formik errors");
    if (
      Object.keys(formik.errors).length !== 0 ||
      dropError ||
      !dropOption ||
      parkError ||
      !isParking ||
      postError ||
      !postCode ||
      checkError ||
      !checkValue ||
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

  // console.log(propValues, "These are properties++++++++++++++++++++++++++++++++++++");

  return (
    <form className="mt-3" onSubmit={formSubmitHandler}>
      <div className="d-flex flex-column gap-3">
        {renderInputFields(0, 1, formik, editPropInputFields)}
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
        {renderInputFields(1, 2, formik, editPropInputFields)}
      </div>
      <div className="panel_form form-agency mt-4">
        {renderInputFields(2, 4, formik, editPropInputFields)}
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
        {parkError && <p className="error-text">This field is required.</p>}
      </div>
      {isParking === "Yes" && (
        <>
          {renderInputFields(15, 16, formik, editPropInputFields)}
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
        {renderInputFields(4, 6, formik, editPropInputFields)}
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
          {renderInputFields(16, undefined, formik, editPropInputFields)}
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
              fileType={GAS_FILE}
            />
            {gasFile && <ViewDownload file={gasFile} fileType={GAS_FILE} />}
          </div>
        </div>
      )}
      <div className="panel_form form-agency mt-4">
        {renderInputFields(6, 7, formik, editPropInputFields)}
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
            fileType={EPC_FILE}
          />
          {epcFile && <ViewDownload file={epcFile} fileType={EPC_FILE} />}
        </div>
        {renderInputFields(7, 8, formik, editPropInputFields)}
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
            fileType={EICR_FILE}
          />
          {eicrFile && <ViewDownload file={eicrFile} fileType={EICR_FILE} />}
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
          {renderInputFields(8, 9, formik, editPropInputFields)}
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
              fileType={HMO_FILE}
            />
            {hmoFile && <ViewDownload file={hmoFile} fileType={HMO_FILE} />}
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
          {renderInputFields(9, 10, formik, editPropInputFields)}
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
              fileType={FIRE_FILE}
            />
            {fireFile && <ViewDownload file={fireFile} fileType={FIRE_FILE} />}
          </div>
        </>
      )}
      <div className="panel_form form-agency mt-4">
        {renderInputFields(10, 15, formik, editPropInputFields)}
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
  );
};

export default TabProp;
