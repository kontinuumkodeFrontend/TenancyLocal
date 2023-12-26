import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import closeIcon from "../../assets/images/close.png";
import { ENTER_EMAIL_MODAL } from "./ModalConstants";
import { get } from "../../services/api";
import { useLocation } from "react-router-dom";
import { ADMIN_GET_AGENCY_CSV, AGECNY_GET_LANDLORD_CSV, AGECNY_GET_PROPERTY_CSV, AGENCY_GET_TENANCY_CSV } from "../../config/url";

const DownloadCSV = () => {
    const dispatch = useDispatch();
    let token = localStorage.getItem("token");
    let url;
    const location = useLocation();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function handleDownload(data) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
        URL.revokeObjectURL(url);
        hideModalHandler();
    };

    if (location.pathname === "/admin") {
        url = ADMIN_GET_AGENCY_CSV;
    } else if (location.pathname === "/agency/landlord") {
        url = AGECNY_GET_LANDLORD_CSV;
    } else if (location.pathname === "/agency/properties") {
        url = AGECNY_GET_PROPERTY_CSV;
    } else if (location.pathname === "/agency/tenancies") {
        url = AGENCY_GET_TENANCY_CSV;
    }
    else {
        url = "";
    }

    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };
    const enterEmailHandler = () => {
        dispatch(mdActions.showModal({ type: ENTER_EMAIL_MODAL }));
    }

    useEffect(() => {
        if (token) {
            const completeUrl = `${url}?token=${token}`;
            get(completeUrl, setData, setIsLoading);
            console.log(completeUrl);
        }
    }, []);

    // console.log(data);

    const downloadCSV = () => {
        if (data) {
            handleDownload(data);
        }
    }

    return (
        <div className="CSV-modal">
            <div className="d-flex justify-content-end">
                <button onClick={hideModalHandler} style={{ width: '13px' }}>
                    <img src={closeIcon} alt="icon" />
                </button>
            </div>
            <p>
                Would you like to download the CSV or you would like to send this to
                email id?
            </p>
            <div className="d-flex mt-sm-4 mt-3 flex-wrap justify-content-center gap-md-3 gap-2">
                <button className="btn_filled btn_sm" onClick={downloadCSV}>Download CSV</button>
                <button className="btn_light btn_sm" onClick={enterEmailHandler}>Send to Email</button>
            </div>
        </div>
    );
};

export default DownloadCSV;
