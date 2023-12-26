import React, { useState } from "react";
import FailedEmpTable from "./FailedEmpTable";
import FailedGurTable from "./FailedGurTable";
import FailedLandTable from "./FailedLandTable";
import FailedProofTable from "./FailedProofTable";

const FailedReview = () => {
  const [actionsBtn, setActionsBtn] = useState("FAILED-EMP"); //initialy setting Failed Guarantor Review tab as default

  return (
    <div className="mt-3 px-sm-3 px-1">
      <div className="agency-actions d-flex gap-md-4 gap-3 await-review">
        <button
          className={
            actionsBtn === "FAILED-EMP"
              ? "btn_filled btn-ag-action"
              : "btn_light2 btn-ag-action"
          }
          onClick={() => {
            setActionsBtn("FAILED-EMP");
          }}
        >
          <p>Failed Employment Reviews</p>
          <div className="bg-num">
            <h5>1</h5>
          </div>
        </button>
        <button
          className={
            actionsBtn === "FAILED-GUAR"
              ? "btn_filled btn-ag-action"
              : "btn_light2 btn-ag-action"
          }
          onClick={() => {
            setActionsBtn("FAILED-GUAR");
          }}
        >
          <p>Failed Guarantor Review</p>
          <div className="bg-num">
            <h5>2</h5>
          </div>
        </button>
        <button
          className={
            actionsBtn === "FAILED-LAND"
              ? "btn_filled btn-ag-action "
              : "btn_light2 btn-ag-action "
          }
          onClick={() => {
            setActionsBtn("FAILED-LAND");
          }}
        >
          <p>Failed Landlord Review</p>
          <div className="bg-num">
            <h5>3</h5>
          </div>
        </button>
        <button
          className={
            actionsBtn === "FAILED-PROOF"
              ? "btn_filled btn-ag-action "
              : "btn_light2 btn-ag-action "
          }
          onClick={() => {
            setActionsBtn("FAILED-PROOF");
          }}
        >
          <p>Failed Income Proof Review</p>
          <div className="bg-num">
            <h5>3</h5>
          </div>
        </button>
      </div>
      <div className="custom-table table-fail mt-3">
        {actionsBtn === "FAILED-EMP" && <FailedEmpTable className='action-table' />}
        {actionsBtn === "FAILED-GUAR" && <FailedGurTable className='action-table fail-gur-table'/>}
        {actionsBtn === "FAILED-LAND" && <FailedLandTable className='action-table fail-land-table'/>}
        {actionsBtn === "FAILED-PROOF" && <FailedProofTable  />}
      </div>
    </div>
  );
};

export default FailedReview;
