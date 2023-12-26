import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input";
import RadioBtn from "../formComponent/RadioBtn";
import BtnCheckbox from "../formComponent/BtnCheckbox";
import Checkbox from "../formComponent/Checkbox";
import Dropdown from "../formComponent/Dropdown";
import Postcode from "../formComponent/Postcode";
import EditFileUpload from "../formComponent/EditFileUpload";
import DownloadFile from "../formComponent/DownloadFile";
import { Link } from "react-router-dom";
import FileUpload from "../formComponent/FileUpload";
import { get } from "../../services/api";
import { AGENCY_GET_PROPRTY_INFO } from "../../config/url";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  streetValidation,
  countryValidation,
  townValidation,
  addPropValidation,
} from "../../validation/validation";

const validationSchema = Yup.object().shape({
  ...countryValidation.fields,
  ...townValidation.fields,
  ...streetValidation.fields,
  ...addPropValidation.fields,
});
let statusOptions = [
  { label: "Application Status", value: "AS" },
  { label: "Pending ", value: "permanent full" },
  { label: "Hold ", value: "permanent full" },
  { label: "Awaiting Review ", value: "temporary" },
  { label: "Awaiting Signing", value: "agency" },
  { label: "Completed ", value: "freelancer" },
  { label: "Expired ", value: "consultant" },
  { label: "Rolling ", value: "contractor" },
  { label: "Failed Review", value: "zero-hours" },
  { label: "Cancelled ", value: "maternity" },
];
//Additional Question for parking
const EQ1 = (props) => {
  return (
    <div>
      <Input
        type="number"
        placeholder="Enter parking cost"
        label="Additional Parking Cost"
        value="100"
        disabled={true}
        prepend={true}
        className="flex-100 mt-3"
      />
      <div className="panel_que-btns mt-3 ">
        <p className="form-labels">Parking Status</p>
        <div className="btn_group">
          <RadioBtn
            label="Secure"
            name={props.name}
            id={`${props.name}-secure`}
            defaultValue={true}
          />
          <RadioBtn
            label="Off-Road"
            name={props.name}
            id={`${props.name}-offRoad`}
            defaultValue={false}
          />
          <RadioBtn
            label="Street"
            name={props.name}
            id={`${props.name}-street`}
            defaultValue={false}
          />
          <RadioBtn
            label="Other"
            name={props.name}
            id={`${props.name}-other`}
            defaultValue={false}
          />
        </div>
      </div>
    </div>
  );
};

const EQ2 = () => {
  return (
    <>
      <Input
        type="date"
        placeholder="Enter date"
        label="Gas Certificate Expiry Date"
        defaultValue=""
        disabled={false}
        prepend={false}
        className="flex-100 mt-2"
      />
      <div className="flex-100 d-flex align-items-center mt-2 justify-content-between ">
        <EditFileUpload
          fileId="file1"
          className="flex-90"
          label="Gas Certificate"
          text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
        />
        <DownloadFile />
      </div>
    </>
  );
};

const tab2InputField = [
  {
    name: "propAddress",
    label: "Property Address",
    placeholder: "Enter property address",
    type: "text",
    className: "flex-100",
    disabled: true,
    required: true,
  },
  {
    name: "appStatus",
    label: "Application Status",
    placeholder: "Enter application status",
    type: "text",
    className: "flex-100",
    disabled: true,
    required: true,
  },
  {
    name: "town",
    label: "Town",
    placeholder: "Enter town name",
    type: "text",
    disabled: true,
    required: true,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Enter country name",
    type: "text",
    disabled: true,
    required: true,
  },
  {
    name: "parkingCost",
    label: "Additional Parking Cost",
    placeholder: "Enter parking cost",
    type: "text",
    className: "flex-100",
    disabled: true,
    required: true,
  },
  {
    name: "bedRoom",
    placeholder: "Enter no. of bedrooms",
    label: "Number Of Bedrooms",
    type: "number",
    required: true,
  },
  {
    name: "availableFrom",
    label: "Available From",
    placeholder: "Enter date",
    type: "text",
    disabled: true,
    required: true,
  },
  {
    name: "monthlyRent",
    label: "Monthly Rental Amount",
    placeholder: "Enter rental amount",
    type: "number",
    prepend: true,
    required: true,
    disabled: true,
  },
  {
    name: "totalAmount",
    label: "Total Amount",
    placeholder: "Enter total amount",
    type: "number",
    prepend: true,
    required: true,
    disabled: true,
  },
  {
    name: "depositAmount",
    label: "Deposit Amount ",
    placeholder: "Enter deposit amount",
    type: "number",
    prepend: true,
    required: true,
    disabled: true,
  },
  {
    name: "holdingAmount",
    label: "Holding Amount",
    placeholder: "Enter holding amount",
    type: "number",
    prepend: true,
    required: true,
    disabled: true,
  },
  {
    name: "name",
    label: "Landlord",
    placeholder: "Enter landlord name",
    type: "text",
    disabled: true,
  },
]

// const TenanciesTab = () => {
//   const dispatch = useDispatch();
//   const hideModalHandler = () => {
//     dispatch(mdActions.hideModal());
//   };
//   return (
//     <Tab eventKey="first" title="E34NA-25/01/2023">
//       <div className="mt-3">
//         <div className="d-flex flex-column gap-3 ">
//           <Input
//             type="text"
//             placeholder="Enter property address"
//             label="Property Address"
//             value="Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN"
//             disabled={true}
//             prepend={false}
//             className="flex-100"
//           />
//           <Input
//             type="text"
//             placeholder="Enter application status"
//             label="Application Status"
//             value="Hold"
//             disabled={true}
//             prepend={false}
//             className="flex-100"
//           />
//         </div>
//         <div className="panel_form form-agency mt-4 ">
//           <Input
//             type="text"
//             placeholder="Enter town name"
//             label="Town"
//             value="Mohali"
//             disabled={false}
//             prepend={false}
//           />
//           <Input
//             type="text"
//             placeholder="Enter town name"
//             label="Country"
//             value="India"
//             disabled={false}
//             prepend={false}
//           />
//         </div>
//         <div className="panel_que-btns mt-3 ">
//           <p className="form-labels">Parking Available</p>
//           <div className="btn_group">
//             <RadioBtn
//               label="Yes"
//               name="parkAva2"
//               id="park2-yes"
//               defaultValue={true}
//               clickAction={parkingHandler}
//             />
//             <RadioBtn
//               label="No"
//               name="parkAva2"
//               id="park2-no"
//               defaultValue={false}
//               clickAction={parkingHandler}
//             />
//           </div>
//         </div>
//         {isParking && <EQ1 name="park2" />}
//         <div className="panel_que-btns mt-3 ">
//           <p className="form-labels">Rental Price Includes</p>
//           <div className="btn_group">
//             <div className="panel_setting d-flex flex-wrap">
//               <BtnCheckbox label="Electricity" />
//               <BtnCheckbox label="Gas" />
//               <BtnCheckbox label="Water" />
//               <BtnCheckbox label="Internet" />
//               <BtnCheckbox label="Insurance" />
//             </div>
//           </div>
//         </div>
//         <div className="panel_que-btns mt-3 ">
//           <p className="form-labels">Restrictions</p>
//           <div className="btn_group">
//             <div className="panel_setting d-flex flex-wrap">
//               <BtnCheckbox label="No Pets" />
//               <BtnCheckbox label="No Students" />
//               <BtnCheckbox label="No Families" />
//               <BtnCheckbox label="No Professionals" />
//             </div>
//           </div>
//         </div>
//         <div className="panel_form form-agency mt-4 ">
//           <Input
//             type="number"
//             placeholder="Enter no. of bedrooms"
//             label="Number Of Bedrooms"
//             value=""
//             disabled={false}
//             prepend={false}
//           />
//           <Input
//             type="date"
//             placeholder="Enter date"
//             label="Available From"
//             defaultValue=""
//             disabled={false}
//             prepend={false}
//           />
//         </div>
//         <div className="panel_que-btns mt-3 ">
//           <p className="form-labels">Has Gas</p>
//           <div className="btn_group">
//             <RadioBtn
//               label="Yes"
//               name="hasGas"
//               id="gas-yes"
//               defaultValue={true}
//               clickAction={gasHandler}
//             />
//             <RadioBtn
//               label="No"
//               name="hasGas"
//               id="gas-no"
//               defaultValue={false}
//               clickAction={gasHandler}
//             />
//           </div>
//         </div>
//         {isGas && <EQ2 />}
//         <div className="panel_form form-agency mt-4 ">
//           <Input
//             type="number"
//             placeholder="Enter rental amount"
//             label="Monthly Rental Amount"
//             value="1000"
//             disabled={false}
//             prepend={true}
//           />
//           <Input
//             type="number"
//             placeholder="Enter total amount"
//             label="Total Amount"
//             value="1000"
//             disabled={false}
//             prepend={true}
//           />
//           <Input
//             type="number"
//             placeholder="Enter total amount"
//             label="Deposit Amount"
//             value="1000"
//             disabled={false}
//             prepend={true}
//           />
//           <Input
//             type="number"
//             placeholder="Enter number of applicants"
//             label="Holding Amount"
//             value="155"
//             disabled={false}
//             prepend={true}
//           />
//           <Input
//             type="date"
//             placeholder="Enter date"
//             label="Tenancy Start Date"
//             value="2021-05-08"
//             disabled={false}
//             prepend={false}
//           />
//           <Input
//             type="date"
//             placeholder="Enter date"
//             label="Tenancy End Date"
//             value="2023-05-16"
//             disabled={false}
//             prepend={false}
//           />
//           <Input
//             type="text"
//             placeholder="Enter landlord name"
//             label="Landlord"
//             value="Simon Smith"
//             disabled={true}
//             prepend={false}
//           />
//           <Input
//             type="number"
//             placeholder="Enter total no of applicants"
//             label="Number of Applicants"
//             value="1"
//             disabled={true}
//             prepend={false}
//           />
//         </div>
//         <div className="modal_footer d-flex mt-4 justify-content-center gap-3">
//           <Link to={`/agency/tenancy-applicants/${id}`}>
//             <button
//               className="btn_light btn_sm"
//               onClick={hideModalHandler}
//             >
//               View Tenancy
//             </button>
//           </Link>
//         </div>
//       </div>
//     </Tab>)
// }


const ViewEditProp = () => {
  const propId = sessionStorage.getItem("propId");
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `${AGENCY_GET_PROPRTY_INFO}/${propId}?token=${token}`;
    if (token && propId) get(url, setData, setIsLoading);
  }, []);

  console.log(data, "}}}}}}}}}hfghfghfghgf}");
  
  const id = "9";
  const [isGas, setIsGas] = useState(false);
  const [isEpc, setIsEpc] = useState(false);
  const [fire, setFire] = useState(false);
  const [hmo, setHmo] = useState(false);

  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  const hmoHandler = (value) => {
    setHmo(value);
  };

  const [isParking, setIsParking] = useState(false);

  const parkingHandler = (value) => {
    console.log(value);
    setIsParking(value);
  };
  const gasHandler = (value) => {
    setIsGas(value);
    console.log(isGas, "gas");
  };

  const epcHandler = (value) => {
    setIsEpc(value);
  };
  const fireHandler = (value) => {
    setFire(value);
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
    validationSchema,
    onSubmit: (values) => {
      // const body = {
      //   propertyData: {
      //     available_from: values.availableFrom,
      //     bedroom: values.bedRoom,
      //     country: values.country,
      //     deposite_amount: values.depositAmount,
      //     electric_certificate: null,
      //     electric_expiry_date: values.eicrDate,
      //     epc_certificate: null,
      //     epc_expiry_date: values.epcDate,
      //     gas_certificate: null,
      //     gas_expiry_date: isGas === "Yes" ? values.gasDate : "",
      //     hasGas: isGas === "Yes" ? 1 : 2,
      //     holding_fee_amount: values.holdingAmount,
      //     landlord_id: id,
      //     monthly_rent: values.monthlyRent,
      //     parking_cost: values.parkingCost,
      //     parkingArray: isParking === "Yes" ? parkStatusOptions(parkStatus.parkValue) : "",
      //     parkingToggle: isParking === "Yes" ? 1 : 2,
      //     post_code: postCode,
      //     property_ref: values.parkingCost,
      //     rent_include: "",
      //     rentIncludeArray: selectedArray(rentalPrice, rentalArray),
      //     restriction: "",
      //     restrictionArray: selectedArray(restrictions, restrictionArray),
      //     status: dropOption,
      //     street: values.street,
      //     total_rent: values.totalAmount,
      //     town: values.town,
      //     hmo: hmo === "Yes" ? 1 : 2,
      //     hmo_expiry_date: hmo === "Yes" ? " " : values.hmoDate,
      //     hmo_certificate: hmo === "Yes" ? " " : "",
      //     fire_alarm: fire === "Yes" ? 1 : 2,
      //     fire_alarm_expiry_date: fire === "Yes" ? "" : values.fireDate,
      //     fire_alarm_certificate: fire === "Yes" ? "" : ""
      //   }
      // }
      // console.log(body, "This is body|||||||||||||||")

    },
  });


  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Edit & View Property</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
        <div className="app_details position-relative">
          <Tabs defaultActiveKey="first">
            <Tab eventKey="first" title="Property">
              <div className="mt-3">
                <div className="d-flex flex-column gap-3">
                  <Input
                    type="text"
                    placeholder="Enter property reference"
                    label="Property Reference"
                    value="CR84F02_2023-04-01"
                    disabled={true}
                    prepend={false}
                    className="flex-100"
                  />
                  <Dropdown label="Property Status" option={statusOptions} />
                  <Postcode />
                  <Input
                    type="text"
                    placeholder="Enter property address"
                    label="Street"
                    value="Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN"
                    disabled={true}
                    prepend={false}
                    className="flex-100"
                  />
                </div>
                <div className="panel_form form-agency mt-4">
                  <Input
                    type="text"
                    placeholder="Enter town name"
                    label="Town"
                    value="Mohali"
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="text"
                    placeholder="Enter town name"
                    label="Country"
                    value="India"
                    disabled={false}
                    prepend={false}
                  />
                </div>
                <div className="panel_que-btns mt-3">
                  <p className="form-labels">Parking Available</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="parkAva1"
                      id="park1-yes"
                      clickAction={parkingHandler}
                    />
                    <RadioBtn
                      label="No"
                      name="parkAva1"
                      id="park1-no"
                      clickAction={parkingHandler}
                    />
                  </div>
                </div>
                {isParking && <EQ1 name="park1" />}
                <div className="panel_que-btns mt-3">
                  <p className="form-labels">Rental Price Includes</p>
                  <div className="btn_group">
                    <div className="panel_setting d-flex flex-wrap">
                      <BtnCheckbox label="Electricity" />
                      <BtnCheckbox label="Gas" />
                      <BtnCheckbox label="Water" />
                      <BtnCheckbox label="Internet" />
                      <BtnCheckbox label="Insurance" />
                    </div>
                  </div>
                </div>
                <div className="panel_que-btns mt-3">
                  <p className="form-labels">Restrictions</p>
                  <div className="btn_group">
                    <div className="panel_setting d-flex flex-wrap">
                      <BtnCheckbox label="No Pets" />
                      <BtnCheckbox label="No Students" />
                      <BtnCheckbox label="No Families" />
                      <BtnCheckbox label="No Professionals" />
                    </div>
                  </div>
                </div>
                <div className="panel_form form-agency mt-4">
                  <Input
                    type="number"
                    placeholder="Enter no. of bedrooms"
                    label="Number Of Bedrooms"
                    value=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="date"
                    placeholder="Enter date"
                    label="Available From"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                </div>
                {/* <div className="panel_que-btns mt-3">
                  <p className="form-labels">Has Gas</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="hasGas"
                      id="gas-yes"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="hasGas"
                      id="gas-no"
                      defaultValue={false}
                    />
                  </div>
                </div> */}
                <div className="panel_que-btns mt-3 mb-3">
                  <p className="form-labels">Has Gas</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="hasGas"
                      id="gas-yes"
                      defaultValue={true}
                      clickAction={gasHandler}
                    />
                    <RadioBtn
                      label="No"
                      name="hasGas"
                      id="gas-no"
                      defaultValue={false}
                      clickAction={gasHandler}
                    />
                  </div>
                </div>
                {isGas && <EQ2 />}
                <div className="panel_form form-agency mt-4">
                  <div className="panel_que-btns  mb-3">
                    <p className="form-labels">Has EPC</p>
                    <div className="btn_group">
                      <RadioBtn
                        label="Yes"
                        name="epc"
                        id="epc-yes"
                        defaultValue={true}
                        clickAction={epcHandler}
                      />
                      <RadioBtn
                        label="No"
                        name="epc"
                        id="epc-no"
                        defaultValue={false}
                        clickAction={epcHandler}
                      />
                    </div>
                  </div>
                  {isEpc &&
                    <><Input
                      type="date"
                      placeholder="Enter date"
                      label="EPC Certificate Expiry Date"
                      defaultValue=""
                      disabled={false}
                      prepend={false}
                      className="flex-100"
                    />
                      <div className="flex-100 d-flex align-items-center justify-content-between">
                        <EditFileUpload
                          fileId="file2"
                          className="flex-90"
                          label="EPC Certificate"
                          text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                        />
                        <DownloadFile />
                      </div>
                    </>}


                  <div className=" w-100  mb-3">
                    <p className="form-labels mb-2">HMO Certificate Available?</p>
                    <div className="btn_group">
                      <RadioBtn
                        label="Yes"
                        name="hmoYes"
                        id="hmo-yes"
                        defaultValue={true}
                        clickAction={hmoHandler}
                      />
                      <RadioBtn
                        label="No"
                        name="hmoYes"
                        id="hmo-no"
                        defaultValue={false}
                        clickAction={hmoHandler}
                      />
                    </div>
                  </div>
                  {
                    hmo &&
                    <>
                      <Input
                        type="date"
                        placeholder="Enter date"
                        label="HMO Certificate Expiry Date"
                        defaultValue=""
                        disabled={false}
                        prepend={false}
                        className="flex-100 mb-3"
                      />
                      <div className="prop-file  align-items-center">
                        <FileUpload
                          fileId="HMOCerti"
                          label="HMO Certificate"
                          text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                          className="flex-100"
                        />
                        <DownloadFile />
                      </div>
                    </>
                  }

                  <div className="panel_que-btns mb-3">
                    <p className="form-labels">Fire Alarm Certificate Available?</p>
                    <div className="btn_group">
                      <RadioBtn
                        label="Yes"
                        name="fireYes"
                        id="fire-yes"
                        defaultValue={true}
                        clickAction={fireHandler}
                      />
                      <RadioBtn
                        label="No"
                        name="fireYes"
                        id="fire-no"
                        defaultValue={false}
                        clickAction={fireHandler}
                      />
                    </div>
                  </div>
                  {
                    fire &&
                    <>
                      <Input
                        type="date"
                        placeholder="Enter date"
                        label="Fire Alarm Certificate Expiry Date"
                        defaultValue=""
                        disabled={false}
                        prepend={false}
                        className="flex-100 mb-3"
                      />
                      <div className="prop-file align-items-center">
                        <FileUpload
                          fileId="fireCerti"
                          label="Fire Alarm Certificate"
                          text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                          className="flex-100"
                        />
                        <DownloadFile />
                      </div>
                    </>
                  }

                  <Input
                    type="date"
                    placeholder="Enter date"
                    label="EICR Certificate Expiry Date"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                    className="flex-100"
                  />
                  <div className="flex-100 d-flex align-items-center justify-content-between">
                    <EditFileUpload
                      fileId="file3"
                      className="flex-90"
                      label="EICR Certificate"
                      text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                    />
                    <DownloadFile />
                  </div>
                  {/* <Input
                    type="date"
                    placeholder="Enter date"
                    label="HMO Certificate Expiry Date"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                    className="flex-100"
                  />
                  <div className="flex-100 d-flex align-items-center justify-content-between">
                    <EditFileUpload
                      fileId="file4"
                      className="flex-90"
                      label="HMO Certificate"
                      text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                    />
                    <DownloadFile />
                  </div> */}
                  {/* <Input
                    type="date"
                    placeholder="Enter date"
                    label="Fire Alarm Certificate Expiry Date"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                    className="flex-100"
                  />
                  <div className="flex-100 d-flex align-items-center justify-content-between">
                    <EditFileUpload
                      fileId="file5"
                      className="flex-90"
                      label="Fire Alarm"
                      text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                    />
                    <DownloadFile />
                  </div> */}
                </div>
                <div className="panel_form form-agency mt-4">
                  <Input
                    type="number"
                    placeholder="Enter rental amount"
                    label="Monthly Rental Amount"
                    value="1000"
                    disabled={false}
                    prepend={true}
                  />
                  <Input
                    type="number"
                    placeholder="Enter total amount"
                    label="Total Amount"
                    value="1000"
                    disabled={false}
                    prepend={true}
                  />
                  <Input
                    type="number"
                    placeholder="Enter total amount"
                    label="Deposit Amount"
                    value="1000"
                    disabled={false}
                    prepend={true}
                  />
                  <Input
                    type="number"
                    placeholder="Enter number of applicants"
                    label="Holding Amount"
                    value="155"
                    disabled={false}
                    prepend={true}
                  />
                  <Input
                    type="text"
                    placeholder="Enter landlord name"
                    label="Landlord"
                    value="Simon Smith"
                    disabled={true}
                    prepend={false}
                  />
                </div>
                <Checkbox
                  className="mt-4 checkbox-modal"
                  id="checkbox1"
                  label="Do you agree that all information provided by you is correct."
                />
                <div className="modal_footer d-flex mt-4  justify-content-center gap-3">
                  <button
                    className="btn_light btn_sm"
                    onClick={hideModalHandler}
                  >
                    Update Details
                  </button>
                </div>
              </div>
            </Tab>
            <Tab eventKey="second" title="Tenancies">
              <div className="mt-3 ">
                {/*<div className="ref-incomplete">
                    There is no tenancy associated with this property!
                </div> */}
                <div>
                  <Tabs defaultActiveKey="first">
                    <Tab eventKey="first" title="E34NA-25/01/2023">
                      <div className="mt-3">
                        <div className="d-flex flex-column gap-3 ">
                          <Input
                            type="text"
                            placeholder="Enter property address"
                            label="Property Address"
                            value="Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN"
                            disabled={true}
                            prepend={false}
                            className="flex-100"
                          />
                          <Input
                            type="text"
                            placeholder="Enter application status"
                            label="Application Status"
                            value="Hold"
                            disabled={true}
                            prepend={false}
                            className="flex-100"
                          />
                        </div>
                        <div className="panel_form form-agency mt-4 ">
                          <Input
                            type="text"
                            placeholder="Enter town name"
                            label="Town"
                            value="Mohali"
                            disabled={false}
                            prepend={false}
                          />
                          <Input
                            type="text"
                            placeholder="Enter town name"
                            label="Country"
                            value="India"
                            disabled={false}
                            prepend={false}
                          />
                        </div>
                        <div className="panel_que-btns mt-3 ">
                          <p className="form-labels">Parking Available</p>
                          <div className="btn_group">
                            <RadioBtn
                              label="Yes"
                              name="parkAva2"
                              id="park2-yes"
                              defaultValue={true}
                              clickAction={parkingHandler}
                            />
                            <RadioBtn
                              label="No"
                              name="parkAva2"
                              id="park2-no"
                              defaultValue={false}
                              clickAction={parkingHandler}
                            />
                          </div>
                        </div>
                        {isParking && <EQ1 name="park2" />}
                        <div className="panel_que-btns mt-3 ">
                          <p className="form-labels">Rental Price Includes</p>
                          <div className="btn_group">
                            <div className="panel_setting d-flex flex-wrap">
                              <BtnCheckbox label="Electricity" />
                              <BtnCheckbox label="Gas" />
                              <BtnCheckbox label="Water" />
                              <BtnCheckbox label="Internet" />
                              <BtnCheckbox label="Insurance" />
                            </div>
                          </div>
                        </div>
                        <div className="panel_que-btns mt-3 ">
                          <p className="form-labels">Restrictions</p>
                          <div className="btn_group">
                            <div className="panel_setting d-flex flex-wrap">
                              <BtnCheckbox label="No Pets" />
                              <BtnCheckbox label="No Students" />
                              <BtnCheckbox label="No Families" />
                              <BtnCheckbox label="No Professionals" />
                            </div>
                          </div>
                        </div>
                        <div className="panel_form form-agency mt-4 ">
                          <Input
                            type="number"
                            placeholder="Enter no. of bedrooms"
                            label="Number Of Bedrooms"
                            value=""
                            disabled={false}
                            prepend={false}
                          />
                          <Input
                            type="date"
                            placeholder="Enter date"
                            label="Available From"
                            defaultValue=""
                            disabled={false}
                            prepend={false}
                          />
                        </div>
                        <div className="panel_que-btns mt-3 ">
                          <p className="form-labels">Has Gas</p>
                          <div className="btn_group">
                            <RadioBtn
                              label="Yes"
                              name="hasGas"
                              id="gas-yes"
                              defaultValue={true}
                              clickAction={gasHandler}
                            />
                            <RadioBtn
                              label="No"
                              name="hasGas"
                              id="gas-no"
                              defaultValue={false}
                              clickAction={gasHandler}
                            />
                          </div>
                        </div>
                        {isGas && <EQ2 />}
                        <div className="panel_form form-agency mt-4 ">
                          <Input
                            type="number"
                            placeholder="Enter rental amount"
                            label="Monthly Rental Amount"
                            value="1000"
                            disabled={false}
                            prepend={true}
                          />
                          <Input
                            type="number"
                            placeholder="Enter total amount"
                            label="Total Amount"
                            value="1000"
                            disabled={false}
                            prepend={true}
                          />
                          <Input
                            type="number"
                            placeholder="Enter total amount"
                            label="Deposit Amount"
                            value="1000"
                            disabled={false}
                            prepend={true}
                          />
                          <Input
                            type="number"
                            placeholder="Enter number of applicants"
                            label="Holding Amount"
                            value="155"
                            disabled={false}
                            prepend={true}
                          />
                          <Input
                            type="date"
                            placeholder="Enter date"
                            label="Tenancy Start Date"
                            value="2021-05-08"
                            disabled={false}
                            prepend={false}
                          />
                          <Input
                            type="date"
                            placeholder="Enter date"
                            label="Tenancy End Date"
                            value="2023-05-16"
                            disabled={false}
                            prepend={false}
                          />
                          <Input
                            type="text"
                            placeholder="Enter landlord name"
                            label="Landlord"
                            value="Simon Smith"
                            disabled={true}
                            prepend={false}
                          />
                          <Input
                            type="number"
                            placeholder="Enter total no of applicants"
                            label="Number of Applicants"
                            value="1"
                            disabled={true}
                            prepend={false}
                          />
                        </div>
                        <div className="modal_footer d-flex mt-4 justify-content-center gap-3">
                          <Link to={`/agency/tenancy-applicants/${id}`}>
                            <button
                              className="btn_light btn_sm"
                              onClick={hideModalHandler}
                            >
                              View Tenancy
                            </button>
                          </Link>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ViewEditProp;
//This component should be deleted