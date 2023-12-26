import React from "react";
import SummaryCard from "./SummaryCard";

const Summary = () => {
  return (
    <div className="mt-5">
      <div className="bg_filled">
        <p className="text_xsm">Applicant Snapshot Summary</p>
      </div>
      <div className="app_summary mt-2">
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
      </div>
    </div>
  );
};

export default Summary;
