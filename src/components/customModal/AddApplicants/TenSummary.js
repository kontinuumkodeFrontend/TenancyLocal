import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import Close from "../../../assets/images/close.png";
import Checkbox from "../../formComponent/Checkbox";
import TelInput from "../../formComponent/TelInput";
import { ADD_APPLICANTS_MODAL, ADD_TENANTS_MODAL } from "../ModalConstants";
import { renderDisabledFields } from "../../formComponent/InputFields";
import { post } from "../../../services/api";
import { AGENCY_CREATE_TENANCY } from "../../../config/url";
import { toast } from "react-toastify";
import { tenancyActions } from "../../../store/tenancy-slice";
import { updateActions } from "../../../store/update-slice";

const generateInputFields = (data, name) => {
    const {
        pro_address,
        monthly_amount,
        deposite_amount,
        holding_amount,
        t_start_date,
        no_applicant,
        parking_cost,
        total_rent,
        t_end_date,
        interism_inspection,
    } = data;
    return [
        {
            name: "propAddress",
            label: "Property Address",
            placeholder: "Enter property address",
            type: "text",
            className: "flex-100",
            required: true,
            disabled: true,
            value: pro_address,
        },
        {
            name: "inspection",
            label: "Quantity of Interim Inspection",
            placeholder: "Select Quantity",
            type: "text",
            className: "flex-100",
            required: true,
            disabled: true,
            value: interism_inspection,
        },
        {
            name: "monthlyRent",
            label: "Monthly Rental Amount",
            placeholder: "Enter rental amount",
            type: "number",
            prepend: true,
            required: true,
            disabled: true,
            value: parseInt(monthly_amount, 10),
        },
        {
            name: "totalAmount",
            label: "Total Amount",
            placeholder: "Enter total amount",
            type: "number",
            prepend: true,
            required: true,
            disabled: true,
            value: parseInt(total_rent, 10),
        },
        {
            name: "depositAmount",
            label: "Deposit Amount ",
            placeholder: "Enter deposit amount",
            type: "number",
            prepend: true,
            required: true,
            disabled: true,
            value: parseInt(deposite_amount, 10),
        },
        {
            name: "holdingAmount",
            label: "Holding Amount",
            placeholder: "Enter holding amount",
            type: "number",
            prepend: true,
            required: true,
            disabled: true,
            value: parseInt(holding_amount, 10),
        },
        {
            name: "tenancyStartDate",
            label: "Tenancy Start Date",
            placeholder: "Enter date",
            type: "date",
            value: t_start_date,
            disabled: true,
            required: true,
        },
        {
            name: "tenancyEndDate",
            label: "Tenancy End Date",
            placeholder: "Enter date",
            type: "date",
            value: t_end_date,
            disabled: true,
            required: true,
        },
        {
            name: "name",
            label: "Landlord",
            placeholder: "Enter landlord name",
            type: "text",
            disabled: true,
            value: name,
            required: true,
        },
        {
            name: "applicant",
            label: "Number of Applicants",
            placeholder: "Enter number",
            type: "number",
            value: no_applicant,
            disabled: true,
            required: true,
        },
        {
            name: "parkingCost",
            label: "Additional Parking Cost",
            placeholder: "Enter parking cost",
            type: "number",
            prepend: true,
            disabled: true,
            className: "flex-100 mt-3",
            value: parseInt(parking_cost, 10),
        },
        {
            name: "firstName",
            label: "Applicant First Name",
            placeholder: "Enter applicant first name",
            type: "text",
            required: true,
            disabled: true,
            value: data.app_f_name,
        },
        {
            name: "middleName",
            label: "Applicant Middle Name",
            placeholder: "Enter applicant middle name",
            type: "text",
            disabled: true,
            value: data.app_m_name,
        },
        {
            name: "lastName",
            label: "Applicant Last Name",
            placeholder: "Enter applicant last name",
            type: "text",
            required: true,
            disabled: true,
            value: data.app_l_name,
        },
        {
            name: "email",
            label: "Applicant Email",
            placeholder: "Enter applicant email",
            type: "text",
            required: true,
            disabled: true,
            value: data.app_email,
        },
    ];
};

const TenancyDetail = ({ data }) => {
    const { name } = useSelector((state) => state.tenancy.propData);
    console.log(data, name);
    return (
        <div className="app_details position-relative mt-3">
            <div className="panel_form form-agency mt-4">
                {renderDisabledFields(0, 2, generateInputFields(data, name))}
                {renderDisabledFields(2, 10, generateInputFields(data, name))}
            </div>
            <div className="panel_que-btns mt-3">
                <p className="form-labels">Parking Available</p>
                <div className="btn_group">
                    <div className="radio-btn">
                        <input type="radio" disabled />
                        <label className={data.parking === 1 && "label-checked"}>Yes</label>
                    </div>
                    <div className="radio-btn">
                        <input type="radio" disabled />
                        <label className={data.parking === 2 && "label-checked"}>No</label>
                    </div>
                </div>
            </div>
            {data.parking === 1 && (
                <>
                    {renderDisabledFields(
                        10,
                        11,
                        generateInputFields(data, name)
                    )}
                    <div className="panel_que-btns mt-3">
                        <p className="form-labels">Parking Status</p>
                        <div className="btn_group">
                            <div className="radio-btn">
                                <input type="radio" disabled />
                                <label className={data.parkingArray === "1" && "label-checked"}>
                                    Secure
                                </label>
                            </div>
                            <div className="radio-btn">
                                <input type="radio" disabled />
                                <label className={data.parkingArray === "2" && "label-checked"}>
                                    Off-Road
                                </label>
                            </div>
                            <div className="radio-btn">
                                <input type="radio" disabled />
                                <label className={data.parkingArray === "3" && "label-checked"}>
                                    Street
                                </label>
                            </div>
                            <div className="radio-btn">
                                <input type="radio" disabled />
                                <label className={data.parkingArray === "4" && "label-checked"}>
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="panel_que-btns mt-3">
                <p className="form-labels">Rental Price Includes</p>
                <div className="btn_group">
                    <div className="panel_setting d-flex flex-wrap">
                        <button
                            className={`${data.rentIncludeArray.includes("Electricity")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            Electricity
                        </button>
                        <button
                            className={`${data.rentIncludeArray.includes("Gas")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            Gas
                        </button>
                        <button
                            className={`${data.rentIncludeArray.includes("Water")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            Water
                        </button>
                        <button
                            className={`${data.rentIncludeArray.includes("Insurance")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            Insurance
                        </button>
                    </div>
                </div>
            </div>
            <div className="panel_que-btns mt-3">
                <p className="form-labels">Restrictions</p>
                <div className="btn_group">
                    <div className="panel_setting d-flex flex-wrap">
                        <button
                            className={`${data.restrictionArray.includes("No Pets")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            No Pets
                        </button>
                        <button
                            className={`${data.restrictionArray.includes("No Students")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            No Students
                        </button>
                        <button
                            className={`${data.restrictionArray.includes("No Families")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            No Families
                        </button>
                        <button
                            className={`${data.restrictionArray.includes("No Professionals")
                                ? "btn_filled"
                                : "btn_stroke3"
                                } btn_sm`}
                        >
                            No Professionals
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AppSummary = ({ data, error }) => {
    const [phoneError, setPhoneError] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState({
        phone: data ? data?.app_mobile : null,
        countryCode: data ? data?.country_code : null,
    });

    return (
        <>
            {error && error?.errorEmail?.includes(data.app_email) && (
                <div className="ref-incomplete py-3 my-3">{error?.errorMessage}</div>
            )}
            <div className="panel_form form-agency mb-5">
                {renderDisabledFields(11, 15, generateInputFields(data, null))}
                <TelInput
                    phoneNumber={phoneNumber}
                    phoneHandler={setPhoneNumber}
                    error={phoneError}
                    setError={setPhoneError}
                    disabled={true}
                />
                <div className="panel_que-btns input-box">
                    <p className="form-labels">Existing Applicant?</p>
                    <div className="btn_group h-100">
                        <div className="radio-btn">
                            <input type="radio" disabled />
                            <label
                                className={data.app_renew_tenant === "1" && "label-checked"}
                            >
                                Yes
                            </label>
                        </div>
                        <div className="radio-btn">
                            <input type="radio" disabled />
                            <label
                                className={data.app_renew_tenant === "0" && "label-checked"}
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const TenSummary = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
        dispatch(tenancyActions.emptyForm());
    };
    const { tenancyData, applicantData } = useSelector((state) => state.tenancy);
    console.log(tenancyData, applicantData, "the updated data00000000`00000000")
    const [checkValue, setCheckValue] = useState(false);
    const [checkError, setCheckError] = useState(null);
    const prevHandler = () => {
        dispatch(mdActions.showModal({ type: ADD_APPLICANTS_MODAL }));
        dispatch(tenancyActions.setAppForm({ type: "SET_FORM" }))
    };
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const handleCheckboxChange = () => {
        setCheckValue((prevCheckValue) => !prevCheckValue);
        setCheckError(null);
    };

    const submitFormHandler = () => {
        if (!checkValue) {
            setCheckError("The checkbox field is required.");
            toast.error(
                "Form submission failed. Kindly check the form for errors and resubmit."
            );
            return;
        } else if (checkError) {
            return;
        } else {
            const url = `${AGENCY_CREATE_TENANCY}?token=${token}`;
            const body = { tenancyData: { ...tenancyData, applicants: applicantData, isNew: "new", type: "1", status: "" } };
            console.log(body, "this is body");
            post(url, body, null, setData, setIsLoading);
        }
    };

    useEffect(() => {
        console.log(data);
        if (data?.saved) {
            toast.success("Tenancy created successfully!");
            dispatch(updateActions.setUpdation());
            hideModalHandler();
        } else if (!data?.saved && data?.statusCode === 2322) {
            toast.error(
                "You can not create a new tenancy from property where property status is Hold and Not available to let."
            );
            hideModalHandler();
        } else if (!data?.saved && data?.statusCode === 2327) {
            toast.error(
                "You can not create an tenancy where property is not available, please check property available from date.");
            hideModalHandler();
        } else if (!data?.saved && data?.statusCode === 780) {
            toast.error("Your credit is not sufficient.");
            hideModalHandler();
        } else if (!data?.saved && data?.statusCode === 728) {
            toast.error(
                "Previous tenancy end date and this tenancies starting date is overlapped."
            );
            hideModalHandler();
        } else if (!data?.saved && data?.statusCode === 2326) {
            const errorEmails = data.errors.map((errorObj) => errorObj.app_email);
            setError({
                errorEmail: errorEmails,
                errorMessage: data.reason,
            });
        }
    }, [data]);

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after mb-4">
                <h5 className="text-h5 text-start">Tenancy Summary</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <TenancyDetail data={tenancyData} />
                <div className="mt-5">
                    <div className="modal_head border-after justify-content-start">
                        <h5 className="text-h5 text-start">Tenancy Applicants</h5>
                    </div>
                    <div className="app_details position-relative mt-5">
                        {applicantData?.map((item, index) => {
                            return <AppSummary key={index} data={item} error={error} />;
                        })}
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
            <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                <button className="btn_filled btn_sm" onClick={prevHandler}>
                    Previous
                </button>
                <button className="btn_filled btn_sm" onClick={submitFormHandler}>
                    {isLoading && <span className="loader"></span>} Create Tenancy
                </button>
            </div>
        </div>
    );
};

export default TenSummary;
