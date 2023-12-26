import React from "react";
import AppSummaryCard from "./AppSummaryCard";

const AppSummary = (props) => {
    return (
        <div className="mt-4">
            <div className="bg_filled">
                <p className="text_xsm">Applicant Snapshot Summary</p>
            </div>
            <div className="app_summary mt-2 p-1">
                {props.data.map((item, index) => {
                    return <AppSummaryCard key={index} item={item} />
                })}
            </div>
        </div>
    );
};

export default AppSummary;
