import React, { useState } from "react";
import ReqApp from "./ReqApp";
import ReqLand from "./ReqLand";
import ReqGuar from "./ReqGuar";
import ReqEmp from "./ReqEmp";
import ReqQuat from "./ReqQuat";
import ReqTen from "./ReqTen";

const Requirement = () => {
  const [appBtn, setAppBtn] = useState("APPLICANT"); //initialy setting personal details tab as default

  return (
    <div className="mt-4">
      <div className="panel_setting d-flex gap-md-4 gap-3 px-xl-5 px-3 flex-wrap justify-content-lg-center">
        <button
          className={
            appBtn === "APPLICANT" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
          }
          onClick={() => {
            setAppBtn("APPLICANT");
          }}
        >
          Applicants
        </button>
        <button
          className={
            appBtn === "LANDLORD" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
          }
          onClick={() => {
            setAppBtn("LANDLORD");
          }}
        >
          Landlord
        </button>
        <button
          className={
            appBtn === "GUARANTOR" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
          }
          onClick={() => {
            setAppBtn("GUARANTOR");
          }}
        >
          Guarantor
        </button>
        <button
          className={
            appBtn === "EMPLOYMENT" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
          }
          onClick={() => {
            setAppBtn("EMPLOYMENT");
          }}
        >
          Employment
        </button>
        <button
          className={
            appBtn === "QUARTERLY" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
          }
          onClick={() => {
            setAppBtn("QUARTERLY");
          }}
        >
          Quarterly
        </button>
        <button
          className={
            appBtn === "TENANCY" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
          }
          onClick={() => {
            setAppBtn("TENANCY");
          }}
        >
          Tenancies
        </button>
      </div>
      <div className="px-xl-5 px-3 py-md-5 py-4">
        {appBtn === "APPLICANT" && <ReqApp />}
        {appBtn === "LANDLORD" && <ReqLand />}
        {appBtn === "GUARANTOR" && <ReqGuar />}
        {appBtn === "EMPLOYMENT" && <ReqEmp />}
        {appBtn === "QUARTERLY" && <ReqQuat />}
        {appBtn === "TENANCY" && <ReqTen />}
      </div>
    </div>
  );
};

export default Requirement;
