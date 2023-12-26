import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Checkbox from "../formComponent/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { costValidationSchema } from "../../validation/validation";
import PropertyForm from "./PropertyModal.js/PropertyForm";
import { getParkStatusValue, parkStatusOptions } from "../../services/utils";
import { DUPLICATE_PROP_MODAL } from "./ModalConstants";
import { propertyActions } from "../../store/multiple-property-slice";
import { toast } from "react-toastify";

const generateValidationSchema = (numberOfForms) => {
  const formShapes = {};
  for (let i = 1; i <= numberOfForms; i++) {
    formShapes[`property${i}`] = Yup.object().shape({
      // Dynamic validation schema for each form
      [`propRef${i}`]: Yup.string()
        .max(20, "Maximum character limit is 20 characters")
        .required("This field is required."),
      // .test('unique', 'Property reference must be unique.', propRefUniqueValidation),
      [`street${i}`]: Yup.string().required("This field is required."),
      [`town${i}`]: Yup.string().required("This field is required."),
      [`country${i}`]: Yup.string().required("This field is required."),
      [`bedRoom${i}`]: Yup.number()
        .typeError("Must be a valid number")
        .min(0, "Cannot be negative")
        .max(10, "Cannot exceed the 10")
        .required("This field is required."),
      [`availableFrom${i}`]: Yup.date()
        .typeError("Please enter a valid date")
        .required("Date is required"),
      [`monthlyRent${i}`]: costValidationSchema.required(
        "This field is required"
      ),
      [`holdingAmount${i}`]: costValidationSchema.required(
        "This field is required"
      ),
      [`totalAmount${i}`]: costValidationSchema.required(
        "This field is required"
      ),
      [`depositAmount${i}`]: costValidationSchema.required(
        "This field is required"
      ),
      [`name${i}`]: Yup.string().required(`This field is required`),
      [`parkingCost${i}`]: costValidationSchema.optional(),
    });
  }

  return Yup.object().shape(formShapes).defined();
};

const generateInitialValues = (formValues, name) => {
  console.log(formValues, "THIS IS FORM VALUES");
  const initialValues = {};
  for (let i = 1; i <= formValues.length; i++) {
    initialValues[`property${i}`] = {
      // Dynamic initial values for each form
      [`propRef${i}`]: formValues[i - 1]?.property_ref || "",
      [`street${i}`]: formValues[i - 1]?.street || "",
      [`town${i}`]: formValues[i - 1]?.town || "",
      [`country${i}`]: formValues[i - 1]?.country || "",
      [`bedRoom${i}`]: formValues[i - 1]?.bedroom || "",
      [`availableFrom${i}`]: formValues[i - 1]?.available_from || "",
      [`epcDate${i}`]: formValues[i - 1]?.epc_expiry_date || "",
      [`eicrDate${i}`]: formValues[i - 1]?.electric_expiry_date || "",
      [`hmoDate${i}`]: formValues[i - 1]?.hmo_expiry_date || "",
      [`fireDate${i}`]: formValues[i - 1]?.fire_alarm_expiry_date || "",
      [`monthlyRent${i}`]: formValues[i - 1]?.monthly_rent || "",
      [`holdingAmount${i}`]: formValues[i - 1]?.holding_fee_amount || "",
      [`totalAmount${i}`]: formValues[i - 1]?.total_rent || "",
      [`depositAmount${i}`]: formValues[i - 1]?.deposite_amount || "",
      [`name${i}`]: name || "",
      [`parkingCost${i}`]: formValues[i - 1]?.parking_cost || "",
      [`gasDate${i}`]: formValues[i - 1]?.gas_expiry_date || "",
    };
  }
  return initialValues;
};

const AddMultiProperty = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.modal.data);

  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
    dispatch(propertyActions.emptyForm());
    sessionStorage.removeItem("currLandlord");
  };

  const [checkValue, setCheckValue] = useState(false);
  const [checkError, setCheckError] = useState(null);

  const multiFormData = useSelector((state) => state.property.propFormData);
  // console.log(multiFormData, "This is the properties in the list ABCDEFGHI...");

  const generateInitialState = (initialValues) => {
    //generating initial values for custom fields
    const initialState = initialValues.map((initialValue) => {
      return {
        dropOption: initialValue.status || "",
        dropError: null,
        postCode: initialValue.post_code || "",
        postError: null,
        isParking:
          initialValue.parkingToggle === 1
            ? "Yes"
            : initialValue.parkingToggle === 2
              ? "No"
              : "",
        parkError: null,
        parkStatus:
          getParkStatusValue(parseInt(initialValue.parkingArray, 10)) ||
          "Secure",
        isGas:
          initialValue.hasGas === 1
            ? "Yes"
            : initialValue.hasGas === 2
              ? "No"
              : "",
        hmo:
          initialValue.hmo === 1
            ? "Yes"
            : initialValue.hmo === 2
              ? "No"
              : "",
        fire:
          initialValue.fire_alarm === 1
            ? "Yes"
            : initialValue.fire_alarm === 2
              ? "No"
              : "",
        rentIncludeArray: initialValue.rentIncludeArray,
        restrictionArray: initialValue.restrictionArray,
        gasCerti: initialValue.gas_certificate,
        gasFileError: null,
        fireCerti: initialValue.fire_alarm_certificate,
        fireFileError: null,
        epcCerti: initialValue.epc_certificate,
        epcFileError: null,
        eicrCerti: initialValue.electric_certificate,
        eicrFileError: null,
        hmoCerti: initialValue.hmo_certificate,
        hmoFileError: null,
      };
    });
    return initialState;
  };

  const [propertyData, setPropertyData] = useState(
    generateInitialState(multiFormData)
  );

  const handleCheckboxChange = () => {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    setCheckError(null);
  };

  const formik = useFormik({
    initialValues: generateInitialValues(
      multiFormData,
      properties.landlord.name
    ),
    validationSchema: generateValidationSchema(multiFormData.length),
    onSubmit: (values) => {
      //Adding custom fields and formik fields in property form data
      const transformedData = Object.entries(values).map(
        ([key, value], index) => {
          const propertyDataAtIndex = propertyData[index];
          return {
            available_from: value[`availableFrom${index + 1}`],
            bedroom: value[`bedRoom${index + 1}`],
            country: value[`country${index + 1}`],
            deposite_amount: value[`depositAmount${index + 1}`],
            electric_certificate: propertyDataAtIndex?.eicrCerti || null,
            electric_expiry_date: value[`eicrDate${index + 1}`],
            epc_certificate: propertyDataAtIndex?.epcCerti || null,
            epc_expiry_date: value[`epcDate${index + 1}`],
            gas_certificate:
              propertyDataAtIndex.isGas === "Yes"
                ? propertyDataAtIndex.gasCerti
                : null,
            gas_expiry_date:
              propertyDataAtIndex.isGas === "Yes"
                ? value[`gasDate${index + 1}`]
                : null,
            hasGas:
              propertyDataAtIndex.isGas === "Yes"
                ? 1
                : propertyDataAtIndex.isGas === "No"
                  ? 2
                  : null,
            holding_fee_amount: value[`holdingAmount${index + 1}`],
            landlord_id: properties.landlord.id,
            monthly_rent: value[`monthlyRent${index + 1}`],
            parking_cost:
              propertyDataAtIndex.isParking === "Yes"
                ? value[`parkingCost${index + 1}`]
                : null,
            parkingArray:
              propertyDataAtIndex.isParking === "Yes"
                ? parkStatusOptions(propertyDataAtIndex.parkStatus)
                : 1,
            parkingToggle:
              propertyDataAtIndex.isParking === "Yes"
                ? 1
                : propertyDataAtIndex.isParking === "No"
                  ? 2
                  : null,
            post_code: propertyDataAtIndex.postCode,
            property_ref: value[`propRef${index + 1}`],
            rent_include: "",
            rentIncludeArray: propertyDataAtIndex.rentIncludeArray,
            restriction: "",
            restrictionArray: propertyDataAtIndex.restrictionArray,
            status: propertyDataAtIndex.dropOption,
            street: value[`street${index + 1}`],
            total_rent: value[`totalAmount${index + 1}`],
            town: value[`town${index + 1}`],
            hmo:
              propertyDataAtIndex.hmo === "Yes"
                ? 1
                : propertyDataAtIndex.hmo === "No"
                  ? 2
                  : null,
            hmo_expiry_date:
              propertyDataAtIndex.hmo === "Yes"
                ? value[`hmoDate${index + 1}`]
                : null,
            hmo_certificate:
              propertyDataAtIndex.hmo === "Yes"
                ? propertyDataAtIndex?.hmoCerti
                : null,
            fire_alarm:
              propertyDataAtIndex.fire === "Yes"
                ? 1
                : propertyDataAtIndex.fire === "No"
                  ? 2
                  : null,
            fire_alarm_expiry_date:
              propertyDataAtIndex.fire === "Yes"
                ? value[`fireDate${index + 1}`]
                : null,
            fire_alarm_certificate:
              propertyDataAtIndex.fire === "Yes"
                ? propertyDataAtIndex?.fireCerti
                : null,
          };
        }
      );
      // console.log(transformedData, "I'm body");
      dispatch(
        propertyActions.replacePropertyData({ newForm: transformedData })
      );
      dispatch(mdActions.showModal({ type: DUPLICATE_PROP_MODAL })); //duplicate property
    },
  });

  const handleFormStateChange = (key, value, index) => {
    //function to update the custom fields of each property form
    setPropertyData((prevData) => {
      // Create a copy of the previous state
      const updatedData = [...prevData];
      // Update the specific key in the specified index
      updatedData[index] = {
        ...updatedData[index],
        [key]: value,
      };
      return updatedData;
    });
  };

  console.log(propertyData, "The updated property data1`````");

  const handleFormSubmit = (e) => {
    //check form validations
    e.preventDefault();
    function formikValid() {
      console.log(formik.isValid, formik, "========````");
      if (!formik.isValid) {
        //when formik is not valid call formik.handleSubmit to throw errors
        formik.handleSubmit(e);
      } else {
        //if formik is valid then hanlde custom validity
        return true;
      }
    }
    if (!checkValue) {
      setCheckError("The checkbox field is required.");
      toast.error(
        "Form submission failed. Kindly check the form for errors and resubmit."
      );
      formikValid();
    }
    for (let index = 0; index < propertyData.length; index++) {
      const data = propertyData[index];
      if (
        data.gasFileError ||
        data.epcFileError ||
        data.eicrFileError ||
        data.hmoFileError ||
        data.fireFileError ||
        data.dropError ||
        data.postError ||
        data.parkError
      ) {
        toast.error(
          "Form submission failed. Kindly check the form for errors and resubmit."
        );
        return;
      }
      if (!data.postError && !data.postCode) {
        setPropertyData((state) => {
          return state.map((item, i) => {
            if (i === index) {
              toast.error(
                "Form submission failed. Kindly check the form for errors and resubmit."
              );
              return { ...item, postError: "Postcode is required." };
            } else {
              return item;
            }
          });
        });
        return;
      }
    }
    if (formikValid() && checkValue) {
      //form is valid
      formik.handleSubmit(e);
    }
  };

  console.log(propertyData, "This is the udapted data~~``````");
  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Add a Property</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <div className="app_details position-relative">
          <form className="mt-3" onSubmit={handleFormSubmit}>
            {propertyData?.map((item, index) => {
              return (
                <PropertyForm
                  initialState={item}
                  formik={formik}
                  errors={properties.errors}
                  key={index}
                  index={index}
                  formHandler={handleFormStateChange}
                />
              );
            })}
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
                Submit Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMultiProperty;
