import React from "react";
import { renderInputFields } from "../../formComponent/InputFields";
import { Tabs, Tab } from "react-bootstrap";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import RadioBtns from "../../formComponent/RadioBtns";
import BtnCheckbox from "../../formComponent/BtnCheckbox";
import { tenancyStatusOptions } from "../../../helper/SelectOptions";
import { statusValue } from "../../../services/utils";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";

const inputFields = [
    {
        name: "propAddress",
        label: "Property Address",
        placeholder: "Enter property address",
        type: "text",
        className: "flex-100",
        disabled: true,
    },
    {
        name: "appStatus",
        label: "Application Status",
        placeholder: "Enter application status",
        type: "text",
        className: "flex-100",
        disabled: true,
    },
    {
        name: "parkingCost",
        placeholder: "Enter parking cost",
        label: "Additional Parking Cost",
        type: "number",
        className: "flex-100",
        prepend: true,
        disabled: true,
    },
    {
        name: "monthlyRent",
        label: "Monthly Rental Amount",
        placeholder: "Enter rental amount",
        type: "number",
        prepend: true,
        disabled: true,
    },
    {
        name: "totalAmount",
        label: "Total Amount",
        placeholder: "Enter total amount",
        type: "number",
        prepend: true,
        disabled: true,
    },
    {
        name: "depositAmount",
        label: "Deposit Amount ",
        placeholder: "Enter deposit amount",
        type: "number",
        prepend: true,
        disabled: true,
    },
    {
        name: "holdingAmount",
        label: "Holding Amount",
        placeholder: "Enter holding amount",
        type: "number",
        prepend: true,
        disabled: true,
    },
    {
        name: "tenancyStartDate",
        label: "Tenancy Start Date",
        placeholder: "Enter date",
        type: "text",
        disabled: true,
    },
    {
        name: "tenancyEndDate",
        label: "Tenancy End Date",
        placeholder: "Enter date",
        type: "text",
        disabled: true,
    },
    {
        name: "name",
        label: "Landlord",
        placeholder: "Enter landlord name",
        type: "text",
        disabled: true,
    },
    {
        name: "applicant",
        label: "Number of Applicants",
        placeholder: "Enter number",
        type: "number",
        disabled: true,
    },
];

const TabData = (data, i, extraPayload) => {
    const dispatch = useDispatch();

    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };
    const formik = useFormik({
        initialValues: {
            propAddress: data?.pro_address || "",
            appStatus: statusValue(tenancyStatusOptions, data?.status),
            parkingCost: extraPayload.parkingCost || "",
            monthlyRent: data?.monthly_amount || "",
            holdingAmount: data?.holding_amount || "",
            totalAmount: data?.total_rent || "",
            depositAmount: data?.deposite_amount || "",
            tenancyStartDate: data.t_start_date || null,
            tenancyEndDate: data?.t_end_date || null,
            name: extraPayload?.landlordData.f_name + " " + extraPayload?.landlordData.l_name,
            applicant: data?.no_applicant || "",
        }
    });

    return (
        <Tab eventKey={i} title={data.reference}>
            <div className="mt-3">
                <div className="d-flex flex-column gap-3 ">
                    {renderInputFields(0, 2, formik, inputFields)}
                </div>
                <div className="panel_que-btns mt-3 ">
                    <p className="form-labels">Parking Available</p>
                    <div className="btn_group">
                        <RadioBtns
                            label="Yes"
                            name={`parkAva1${i}`}
                            id={`parkAva1${i}-yes`}
                            value="Yes"
                            radioOption={data.parking === 1 ? "Yes" : "No"}
                            disabled={true}
                        />
                        <RadioBtns
                            label="No"
                            name={`parkAva1${i}`}
                            id={`parkAva1${i}-no`}
                            value="No"
                            disabled={true}
                            radioOption={data.parking === 1 ? "Yes" : "No"}
                        />
                    </div>
                </div>
                {extraPayload.parkingCost !== "0.00" && (
                    <div className="panel_form form-agency mt-4 ">
                        {renderInputFields(2, 3, formik, inputFields)}
                    </div>
                )}
                <div className="panel_que-btns mt-3">
                    <p className="form-labels">Rental Price Includes</p>
                    <div className="btn_group">
                        <div className="panel_setting d-flex flex-wrap">
                            <BtnCheckbox
                                label="Electricity"
                                defaultValue={data.rentIncludeArray.includes("Electricity")}
                                disabled={true}
                            />
                            <BtnCheckbox
                                label="Gas"
                                defaultValue={data.rentIncludeArray.includes("Gas")}
                                disabled={true}
                            />
                            <BtnCheckbox
                                label="Water"
                                defaultValue={data.rentIncludeArray.includes("Water")}
                                disabled={true}
                            />
                            <BtnCheckbox
                                label="Internet"
                                defaultValue={data.rentIncludeArray.includes("Internet")}
                                disabled={true}
                            />
                            <BtnCheckbox
                                label="Insurance"
                                defaultValue={data.rentIncludeArray.includes("Insurance")}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="panel_que-btns mt-3 ">
                    <p className="form-labels">Restrictions</p>
                    <div className="btn_group">
                        <BtnCheckbox
                            label="No Pets"
                            defaultValue={data.restrictionArray.includes("No Pets")}
                            disabled={true}
                        />
                        <BtnCheckbox
                            label="No Students"
                            defaultValue={data.restrictionArray.includes("No Students")}
                            disabled={true}
                        />
                        <BtnCheckbox
                            label="No Families"
                            defaultValue={data.restrictionArray.includes("No Families")}
                            disabled={true}
                        />
                        <BtnCheckbox
                            label="No Professionals"
                            defaultValue={data.restrictionArray.includes("No Professionals")}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="panel_form form-agency mt-4 ">
                    {renderInputFields(3, undefined, formik, inputFields)}
                </div>
                <div className="modal_footer d-flex mt-4 justify-content-center gap-3">
                    <Link to={`/agency/tenancy-applicants/45`} onClick={hideModalHandler}>
                        <button className="btn_light btn_sm">View Tenancy</button>
                    </Link>
                </div>
            </div>
        </Tab>
    );
};

const TabTenancy = ({ tenancyData }) => {
    console.log(tenancyData, "::::");
    const extraPayload = {
        landlordData: tenancyData?.landlords,
        parkingCost: tenancyData?.parking_cost
    };
    return (
        <div>
            <Tabs defaultActiveKey={0}>
                {tenancyData?.tenancies?.length > 0 &&
                    tenancyData?.tenancies?.map((item, i) => TabData(item, i, extraPayload))}
            </Tabs>
        </div>
    );
};

export default TabTenancy;
