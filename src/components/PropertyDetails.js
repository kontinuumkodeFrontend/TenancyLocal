import React from 'react';
import DownloadIcon from "../assets/images/download-icon1.svg";

const PropertyDetails = () => {
    return (
        <div className="mt-4">
            <div className="bg_filled hdg-btn">
                <p className="text_xsm">
                    Flat 9 Wellington Buildings Wellington Way London, London, England
                    E34NA
                </p>
                <div className="text-sm-end text-center">
            <button className="btn_light2 btn_sm">
                Download all Reference
                <img src={DownloadIcon} alt="download-icon" className="view-icon" />
            </button>
            </div>
            </div>
            <div className="tenancy-detail mt-2">
                <div className="tenancy-detail-header">
                    <p>Start date</p>
                    <p>End date</p>
                    <p>Rental amount</p>
                    <p>Additional Parking Cost</p>
                    <p>total amount</p>
                    <p>Deposit amount</p>
                    <p>Application Completion Deadline (Days)</p>
                </div>
                <div className="tenancy-detail-body mt-xl-3 mt-0">
                    <p>01/04/2023</p>
                    <p>01/04/2025</p>
                    <p>£1000.00</p>
                    <p>£1000.00</p>
                    <p>£1000.00</p>
                    <p>£1000.00</p>
                    <p>N/A</p>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails