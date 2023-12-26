import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import Dropdown from "../../../components/formComponent/Dropdown";
import { ViewDownload } from "../../../components/formComponent/ViewDownload";
import {
  EICR_FILE,
  EPC_FILE,
  FIRE_FILE,
  GAS_FILE,
  HMO_FILE,
} from "../../../helper/constants/ViewTenancyConstant";
import BtnCheckbox from "../../../components/formComponent/BtnCheckbox";
import {
  CHANGE_NEGO_MODAL,
  EXTEND_TENANCY_MODAL,
  RENEW_TENANCY_MODAL,
} from "../../../components/customModal/ModalConstants";
import CustomSwitch from "../../../components/formComponent/CustomSwitch";
import { useFormik } from "formik";
import { ReviewTenancyInputField } from "../../../helper/InputFields";
import { renderInputFields } from "../../../components/formComponent/InputFields";
import { tenancyValidationSchema } from "../../../validation/validation";
import RadioBtns from "../../../components/formComponent/RadioBtns";
import { interimOptions, appStatusOption } from "../../../helper/SelectOptions";
import { getParkStatusValue, parkStatusOptions } from "../../../services/utils";
import { AGENCY_UPDATE_TENANCY_INFO } from "../../../config/url";
import { post } from "../../../services/api";
import { toast } from "react-toastify";

let durationOption = [
  { label: "Select Duration", value: "SD" },
  { label: "1 Month", value: "1M" },
];

const TenancyDetail = ({ tenancyData }) => {
  const dispatch = useDispatch();
  const [isParking, setIsParking] = useState("");
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [parkStatus, setParkStatus] = useState("Secure");
  const [interimDropOption, setInterimDropOption] = useState("");
  const [appStatusDropOption, setAppStatusDropOption] = useState("");
  const [notesText, setNotesText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([
    { label: "Gas Expiry Date", date: null, certi: null, type: GAS_FILE },
    { label: "EPC Expiry Date", date: null, certi: null, type: EPC_FILE },
    { label: "EICR Expiry Date", date: null, certi: null, type: EICR_FILE },
    { label: "HMO Certificate Date", date: null, certi: null, type: HMO_FILE },
    {
      label: "Fire Alarm Certificate Date",
      date: null,
      certi: null,
      type: FIRE_FILE,
    },
  ]);

  console.log(tenancyData, "this is prop data");

  const parkingHandler = (event) => {
    setIsParking(event.target.value);
  };

  const renewModalHandler = (event) => {
    event.preventDefault();
    dispatch(mdActions.showModal({ type: RENEW_TENANCY_MODAL }));
  };

  const changeNegoHandler = () => {
    dispatch(
      mdActions.showModal({ type: CHANGE_NEGO_MODAL, data: tenancyData.id })
    );
  };

  const parkStatusHandler = (event) => {
    setParkStatus(event.target.value);
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

  const formik = useFormik({
    initialValues: {
      tenancyRef: "",
      negotiator: "",
      propAddress: "",
      tenancyStartDate: "",
      tenancyEndDate: "",
      name: "",
      parkingCost: "",
      applicant: "",
      monthlyRent: "",
      totalAmount: "",
      depositAmount: "",
      holdingAmount: "",
      bedRoom: "",
    },
    validationSchema: tenancyValidationSchema,
    onSubmit: (values) => {
      const url = `${AGENCY_UPDATE_TENANCY_INFO}?token=${token}`;
      const body = {
        ...tenancyData,
        pro_address: values.propAddress,
        monthly_amount: values.monthlyRent,
        total_rent: values.totalAmount,
        deposite_amount: values.depositAmount,
        holding_amount: values.holdingAmount,
        t_start_date: values.tenancyStartDate,
        t_end_date: values.tenancyEndDate,
        deadline: tenancyData.deadline,
        type: tenancyData.type,
        signing_date: tenancyData.signing_date,
        days_to_complete: tenancyData.days_to_complete,
        status: appStatusDropOption,
        parking: isParking === "Yes" ? 1 : 2,
        parking_cost: isParking === "Yes" ? values.parkingCost : 0.0,
        parkingArray: isParking === "Yes" ? parkStatusOptions(parkStatus) : "1",
        notes_text: notesText,
        no_applicant: values.applicant,
        interism_inspection: interimDropOption,
      };
      post(url, body, null, setData, setIsLoading);
      console.log(body, "these are body fields");
    },
  });

  useEffect(() => {
    if (!data) return;
    if (data.saved) {
      toast.success("Tenancy Updated Successfully!");
    } else if (!data.saved && data.statusCode === 2312) {
      toast.error("You can not increase the no of applicants.");
    } else if (!data.saved && data.statusCode === 2313) {
      toast.error("You can not decrease the no of applicants.");
    } else if (!data.saved && data.statusCode === 2314) {
      toast.error(
        "Previous tenancy end date and this tenancies starting date is overlapped."
      );
    } else if (!data.saved && data.statusCode === 2315) {
      toast.error("You can not update the tenancy status.");
    } else {
      toast.error("Failed To Update Tenancy!");
    }
  }, [data]);

  useEffect(() => {
    if (tenancyData) {
      formik.setValues({
        tenancyRef: tenancyData.reference,
        negotiator: tenancyData.negotiator_name,
        propAddress: tenancyData.pro_address,
        depositAmount: tenancyData.deposite_amount,
        holdingAmount: tenancyData.holding_amount,
        bedRoom: tenancyData.properties.bedroom,
        monthlyRent: tenancyData.monthly_amount,
        parkingCost: tenancyData.parking_cost,
        totalAmount: tenancyData.total_rent,
        tenancyStartDate: tenancyData.t_start_date,
        tenancyEndDate: tenancyData.t_end_date,
        applicant: tenancyData?.no_applicant,
        name: `${tenancyData.landlords?.f_name} ${tenancyData.landlords?.l_name}`,
      });

      setNotesText(tenancyData?.notes_text);
      setAppStatusDropOption(tenancyData?.status);
      setIsParking(tenancyData?.parking === 1 ? "Yes" : "No");
      setParkStatus(getParkStatusValue(tenancyData?.parkingArray));
      setRentalPrice({
        electricity: tenancyData?.rentIncludeArray?.includes("Electricity"),
        gas: tenancyData?.rentIncludeArray?.includes("Gas"),
        water: tenancyData?.rentIncludeArray?.includes("Water"),
        internet: tenancyData?.rentIncludeArray?.includes("Internet"),
        insurance: tenancyData?.rentIncludeArray?.includes("Insurance"),
      });
      setRestrictions({
        pets: tenancyData?.restrictionArray?.includes("No Pets"),
        students: tenancyData?.restrictionArray?.includes("No Students"),
        families: tenancyData?.restrictionArray?.includes("No Families"),
        professionals:
          tenancyData?.restrictionArray?.includes("No Professionals"),
      });
      setInterimDropOption(tenancyData?.interism_inspection || "");

      setMediaFiles([
        {
          label: "Gas Expiry Date",
          date: tenancyData?.properties?.gas_expiry_date,
          certi: tenancyData?.properties?.gas_certificate,
        },
        {
          label: "EPC Expiry Date",
          date: tenancyData?.properties?.epc_expiry_date,
          certi: tenancyData?.properties?.epc_certificate,
        },
        {
          label: "EICR Expiry Date",
          date: tenancyData?.properties?.electric_expiry_date,
          certi: tenancyData?.properties?.electric_certificate,
        },
        {
          label: "HMO Certificate Date",
          date: tenancyData?.properties?.hmo_expiry_date,
          certi: tenancyData?.properties?.hmo_certificate,
        },
        {
          label: "Fire Alarm Certificate Date",
          date: tenancyData?.properties?.fire_alarm_expiry_date,
          certi: tenancyData?.properties?.fire_alarm_certificate,
        },
      ]);
    }
  }, [tenancyData]);

  console.log(mediaFiles, "these are the files");

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

  return (
    <div className="px-xl-5 px-3">
      <div className="mt-4 px-xl-4 d-flex align-items-center justify-content-sm-end justify-content-center gap-3">
        <button className="btn_light" onClick={changeNegoHandler}>
          Extend Tenancy 
        </button>
        <button className="btn_light" onClick={changeNegoHandler}>
          Change Tenancy Negotiator
        </button>
      </div>
      {/* <div class="panel_head d-flex justify-content-between align-items-start mb-4">
        <h5 class="text-h5 text-start">Tenancies</h5>
      </div> */}
      <form onSubmit={formik.handleSubmit}>
        <div className="row mt-4">
          <div className="col-lg-6 px-xl-4 px-2">
            {/* <div className="panel_que-btns mb-4">
              <p className="form-labels">Application Complete?</p>
              <div className="btn_group pe-none">
                  <div
                    className="radio-btn">
                    <input
                      type="radio"
                      id={"stu-status-no"}
                      name={"stu-status"}
                      checked={false}
                    />
                    <label htmlFor={"stu-status-no"}>Yes</label>
                  </div>
                <RadioBtn
                  label="No"
                  name="app-complete"
                  id="app-comp-no"
                  value={false}
                  defaultValue={false}
                  checked={true}
                />
              </div>
            </div> */}
            {/* <div className="contact-form" style={{ maxWidth: "100%" }}>
            <div className="contact_head">
              <h3 className="text_lg-green text-start m-0">Extend Tenancy</h3>
            </div>
            <div className="contact-body">
              <div className="panel_form">
                <div class="input-box flex-100">
                  <Dropdown label="Select Duration" option={durationOption} />
                </div>
                <div className="m-auto">
                  <button
                    className="btn_filled btn_md"
                    onClick={renewModalHandler}
                  >
                    Extend Tenancy
                  </button>
                </div>
              </div>
            </div>
          </div> */}
            <div className="contact-form" style={{ maxWidth: "100%" }}>
              <div className="contact_head">
                <h3 className="text_lg-green text-start m-0">
                  Tenancy Information
                </h3>
              </div>
              <div className="contact-body">
                <div className="panel_form form-agency">
                  {renderInputFields(0, 3, formik, ReviewTenancyInputField)}
                  <Dropdown
                    label="Application Status"
                    option={appStatusOption}
                    required={true}
                    className="flex-100"
                    selectValue={appStatusDropOption}
                    selectHandler={setAppStatusDropOption}
                  />
                  {renderInputFields(3, 5, formik, ReviewTenancyInputField)}
                </div>
                <div className="panel_form form-agency mt-3">
                  {renderInputFields(5, 6, formik, ReviewTenancyInputField)}
                </div>
                <div className="panel_form form-agency mt-3">
                  <Dropdown
                    label="Quantity of Interim Inspection"
                    option={interimOptions}
                    required={false}
                    selectValue={interimDropOption}
                    selectHandler={setInterimDropOption}
                  />
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
                </div>
                {isParking === "Yes" && (
                  <>
                    {renderInputFields(6, 7, formik, ReviewTenancyInputField)}
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
              </div>
            </div>
          </div>
          <div className="col-lg-6 px-xl-4 px-2">
            <div className="contact-form" style={{ maxWidth: "100%" }}>
              <div className="contact_head">
                <h3 className="text_lg-green text-start m-0">
                  Tenancy Information
                </h3>
              </div>
              <div className="contact-body">
                <div className="panel_form form-agency">
                  {renderInputFields(7, 8, formik, ReviewTenancyInputField)}
                </div>
                <div className="panel_form form-agency mt-3">
                  {renderInputFields(
                    8,
                    undefined,
                    formik,
                    ReviewTenancyInputField
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 px-3">
              {mediaFiles
                .filter((item) => item.certi !== null && item.date !== null)
                .map((item) => {
                  return (
                    <div className="review-forms mt-3">
                      <div className="input-box">
                        <label className="form-labels">{item.label}</label>
                        <div className="d-flex forms">
                          <input
                            className="pe-none flex-50"
                            type="date"
                            value={item.date}
                          />
                          <div className="forms">
                            <p>Certificate</p>
                            <ViewDownload
                              file={item.certi}
                              fileType={GAS_FILE}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div class="input-box flex-100 mt-3">
                <label class="form-labels" htmlFor="note">
                  Notes
                </label>
                <textarea
                  id="note"
                  name="note"
                  placeholder=""
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="flex-100"
                  rows={6}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-md-5 mt-4">
          <button className="btn_light mx-auto" type="submit">
            {isLoading && <span className="loader"></span>}Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenancyDetail;
