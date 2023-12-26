import React, { useState } from "react";
import AwaitEmpTable from "./AwaitEmpTable";
import AwaitGurTable from "./AwaitGurTable";
import AwaitLandTable from "./AwaitLandTable";
import AwaitProofTable from "./AwaitProofTable";
import AwaitSendingTable from "./AwaitSendingTable";
import AwaitReviewTable from "./AwaitReviewTable";

const AwaitingReview = () => {
    const [actionsBtn, setActionsBtn] = useState("AWAIT-EMP"); //initialy setting personal details tab as default

    return (
        <div className="mt-3 px-sm-3 px-1">
            <div className="agency-actions d-flex gap-md-4 gap-3 await-review">
                <button
                    className={
                        actionsBtn === "AWAIT-EMP"
                            ? "btn_filled btn-ag-action"
                            : "btn_light2 btn-ag-action"
                    }
                    onClick={() => {
                        setActionsBtn("AWAIT-EMP");
                    }}
                >
                    <p>Awaiting Employment Reviews</p>
                    <div className="bg-num"><h5>1</h5></div>
                </button>
                <button
                    className={
                        actionsBtn === "AWAIT-GUAR"
                            ? "btn_filled btn-ag-action"
                            : "btn_light2 btn-ag-action"
                    }
                    onClick={() => {
                        setActionsBtn("AWAIT-GUAR");
                    }}
                >
                    <p>Awaiting Guarantor Review</p>
                    <div className="bg-num"><h5>2</h5></div>
                </button>
                <button
                    className={
                        actionsBtn === "AWAIT-LAND"
                            ? "btn_filled btn-ag-action "
                            : "btn_light2 btn-ag-action "
                    }
                    onClick={() => {
                        setActionsBtn("AWAIT-LAND");
                    }}
                >    <p>Awaiting Landlord Review</p>
                    <div className="bg-num"><h5>3</h5></div>
                </button>
                <button
                    className={
                        actionsBtn === "AWAIT-PROOF"
                            ? "btn_filled btn-ag-action "
                            : "btn_light2 btn-ag-action "
                    }
                    onClick={() => {
                        setActionsBtn("AWAIT-PROOF");
                    }}
                >
                    <p>Awaiting Proof Review</p>
                    <div className="bg-num"><h5>3</h5></div>
                </button>
                <button
                    className={
                        actionsBtn === "AWAIT-SENDING"
                            ? "btn_filled btn-ag-action"
                            : "btn_light2 btn-ag-action"
                    }
                    onClick={() => {
                        setActionsBtn("AWAIT-SENDING");
                    }}
                >
                    <p>Awaiting Tenancy Agreement Sending</p>
                    <div className="bg-num"><h5>1</h5></div>
                </button>
                <button
                    className={
                        actionsBtn === "AWAIT-REVIEW"
                            ? "btn_filled btn-ag-action"
                            : "btn_light2 btn-ag-action"
                    }
                    onClick={() => {
                        setActionsBtn("AWAIT-REVIEW");
                    }}
                >
                    <p>Awaiting Tenancy Agreement Review</p>
                    <div className="bg-num"><h5>2</h5></div>
                </button>
            </div>
            <div className="custom-table table-review mt-3">
                {actionsBtn === "AWAIT-EMP" && <AwaitEmpTable />}
                {actionsBtn === "AWAIT-GUAR" && <AwaitGurTable />}
                {actionsBtn === "AWAIT-LAND" && <AwaitLandTable />}
                {actionsBtn === "AWAIT-PROOF" && <AwaitProofTable/>}
                {actionsBtn === "AWAIT-SENDING" && <AwaitSendingTable className='sending-table' />}
                {actionsBtn === "AWAIT-REVIEW" && <AwaitReviewTable className='sending-table' />}
            </div>
        </div>
    );
};

export default AwaitingReview;
