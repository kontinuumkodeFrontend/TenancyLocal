import React from "react";
import PropertyDetails from "../../../../components/PropertyDetails";
import AppSummary from "./AppSummary";
import { Tabs, Tab } from "react-bootstrap";
import RefContent from "./RefContent";
import DownloadIcon from "../../../../assets/images/download-icon1.svg";

const Reference = () => {
    const AppData = [
        {
            appName: "James Clear",
            empRef: "Completed",
            gurRef: "Completed",
            landRef: "Completed",
        },
        {
            appName: "Arnold",
            empRef: "Completed",
            gurRef: "Reference Not Completed",
            landRef: "Reference Not Completed",
        },
        {
            appName: "Sam AltMan",
            empRef: "Reference Not Completed",
            gurRef: "Reference Not Completed",
            landRef: "Completed",
        },
        {
            appName: "Sam AltMan",
            empRef: "Reference Not Completed",
            gurRef: "Reference Not Completed",
            landRef: "Completed",
        },
        {
            appName: "Sam AltMan",
            empRef: "Reference Not Completed",
            gurRef: "Reference Not Completed",
            landRef: "Completed",
        },
    ];
    return (
        <div className="reference-tab mt-4">
            {/* <div className="text-sm-end text-center">
            <button className="btn_light2 btn_sm">
                Download all Reference
                <img src={DownloadIcon} alt="download-icon" className="view-icon" />
            </button>
            </div> */}

            <PropertyDetails />
            <AppSummary data={AppData} />
            <Tabs defaultActiveKey="0" className="mt-4 tab-bg">
                {AppData.map((item, index) => {
                    return (
                        <Tab eventKey={index} key={index} title={item.appName}>
                            <RefContent item={item} />
                        </Tab>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default Reference;
