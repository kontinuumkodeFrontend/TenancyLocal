import React, { useState } from "react";
import ActionRequired from "./actionRequired/ActionRequired";
import AccApplication from "./accApplication/AccApplication";
import InProgress from "./inProgress/InProgress";
import Finalised from "./finalised/Finalised";
import TenCompleted from "./tenCompleted/TenCompleted";
import RightRent from "./rightRent/RightRent";
import PropCerti from "./propCerti/PropCerti";
import ScrollContainer from 'react-indiana-drag-scroll'

const AgencyActions = (props) => {
  const [actionsBtn, setActionsBtn] = useState("ACTION-REQUIRED"); //initialy setting personal details tab as default

  return (
    <>
    <ScrollContainer horizontal className="scroll-container agency-actions d-flex gap-md-4 gap-3">

      {/* <div className="agency-actions d-flex gap-md-4 gap-3"> */}
        <button
          className={
            actionsBtn === "ACTION-REQUIRED"
              ? "btn_filled btn-ag-action"
              : "btn_light2 btn-ag-action"
          }
          onClick={() => {
            setActionsBtn("ACTION-REQUIRED");
            props.titleHandler('Actions');
          }}
        >
          <p>Actions Required</p>
          <h5>5</h5>
        </button>
        <button
          className={
            actionsBtn === "ACC-APP"
              ? "btn_filled btn-ag-action"
              : "btn_light2 btn-ag-action"
          }
          onClick={() => {
            setActionsBtn("ACC-APP");
            props.titleHandler('Accelerated Applications');
          }}
        >
          <p>Accelerated Applications</p>
          <h5>8</h5>
        </button>
        <button
          className={
            actionsBtn === "PROGRESS"
              ? "btn_filled btn-ag-action "
              : "btn_light2 btn-ag-action "
          }
          onClick={() => {
            setActionsBtn("PROGRESS");
            props.titleHandler('In Progress');
          }}
        >
          <p>In Progress</p> <h5>12</h5>
        </button>
        <button
          className={
            actionsBtn === "FINALISED"
              ? "btn_filled btn-ag-action "
              : "btn_light2 btn-ag-action "
          }
          onClick={() => {
            setActionsBtn("FINALISED");
            props.titleHandler('Recently Finalised');
          }}
        >
          <p>Recently Finalized</p>
          <h5>19</h5>
        </button>
        <button
          className={
            actionsBtn === "TEN-COMPLETE"
              ? "btn_filled btn-ag-action"
              : "btn_light2 btn-ag-action"
          }
          onClick={() => {
            setActionsBtn("TEN-COMPLETE");
            props.titleHandler('Tenancies Complete');
          }}
        >
          <p>Tenancies (Complete) due to commence &lt; 10 days</p>
          <h5>17</h5>
        </button>
        <button
          className={
            actionsBtn === "RIGHT-RENT"
              ? "btn_filled btn-ag-action"
              : "btn_light2 btn-ag-action"
          }
          onClick={() => {
            setActionsBtn("RIGHT-RENT");
            props.titleHandler('Right to Rent');
          }}
        >
          <p>Right to Rent</p>
          <h5>12</h5>
        </button>
        <button
          className={
            actionsBtn === "EXPIRED"
              ? "btn_filled btn-ag-action"
              : "btn_light2 btn-ag-action"
          }
          onClick={() => {
            setActionsBtn("EXPIRED");
            props.titleHandler('Properties Certificates');
          }}
        >
          <p>Certificates Expiring within 30 Days</p><h5>23</h5>
        </button>
        
      {/* </div> */}
    </ScrollContainer>
      {actionsBtn === "ACTION-REQUIRED" && <ActionRequired/>}
      {actionsBtn === "ACC-APP" && <AccApplication/>}
      {actionsBtn === "PROGRESS" && <InProgress/>}
      {actionsBtn === "FINALISED" && <Finalised/>}
      {actionsBtn === "TEN-COMPLETE" && <TenCompleted/>}
      {actionsBtn === "RIGHT-RENT" && <RightRent/>}
      {actionsBtn === "EXPIRED" && <PropCerti/>}
    </>
  );
};

export default AgencyActions;
