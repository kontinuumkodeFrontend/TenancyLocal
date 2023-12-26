import React from "react";
import CancelIcon from "../../../../assets/images/cancel-icon.svg";
import CheckIcon from "../../../../assets/images/check-icon.svg";

const AppSummaryCard = (props) => {
    let isEmpRefCheck = props.item.empRef === "Completed";
    let isLandRefCheck = props.item.landRef === "Completed";
    let isGurRefCheck = props.item.gurRef === "Completed";

    return (
        <div
            className="app_summary-card"
            style={{ backgroundColor: "transparent" }}
        >
            <div className="app_summary-card mb-2">
                <div className="tenancy-info">
                    <p className="hypen-after">Applicant Name</p>
                    <p className="fw-600">{props.item.appName}</p>
                </div>
            </div>
            <div className="app_summary-card h-100" style={{maxHeight: '180px'}}>
                <div className="d-flex flex-column gap-md-3 gap-2">
                    <div className="tenancy-info">
                        <p className="hypen-after">Employer Reference</p>
                        <p
                            className={isEmpRefCheck ? "active fw-600" : "text-danger fw-600"}
                        >
                            {props.item.empRef}
                            {isEmpRefCheck ? (
                                <img src={CheckIcon} alt="icon" className="status-icon" />
                            ) : (
                                <img src={CancelIcon} alt="icon" className="status-icon" />
                            )}
                        </p>
                    </div>
                    <div className="tenancy-info">
                        <p className=" hypen-after">Guarantor Reference</p>
                        <p
                            className={isGurRefCheck ? "active fw-600" : "text-danger fw-600"}
                        >
                            {props.item.gurRef}
                            {isGurRefCheck ? (
                                <img src={CheckIcon} alt="icon" className="status-icon" />
                            ) : (
                                <img src={CancelIcon} alt="icon" className="status-icon" />
                            )}
                        </p>
                    </div>
                    <div className="tenancy-info">
                        <p className=" hypen-after">Landlord Reference</p>
                        <p
                            className={
                                isLandRefCheck ? "active fw-600" : "text-danger fw-600"
                            }
                        >
                            {props.item.landRef}
                            {isLandRefCheck ? (
                                <img src={CheckIcon} alt="icon" className="status-icon" />
                            ) : (
                                <img src={CancelIcon} alt="icon" className="status-icon" />
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSummaryCard;
