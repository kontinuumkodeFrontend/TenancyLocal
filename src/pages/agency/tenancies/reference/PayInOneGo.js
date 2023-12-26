import React from "react";
import viewIcon from "../../../../assets/images/view-doc.svg";
import DownloadFile from "../../../../components/formComponent/DownloadFile";
import UploadFileIcon from "../../../../components/formComponent/UploadFileIcon";
import RefProof from "./RefProof";
import InfoTooltip from "../../../../components/tooltip/InfoTooltip";


const DetailList = (props) => {
  return (
    <>
      <li>
        <h6>Closing balance in your bank account :</h6>
        <p className="d-flex">£72440.00 <span className="ms-2">
          <InfoTooltip />
        </span></p>
      </li>
      <li>
        <h6>Applicant Income Proof :</h6>
        <p className="d-flex align-items-center ms-lg-0">
          income proof.png
          <span>
            <img
              src={viewIcon}
              alt="view-icon"
              className="view-icon ms-3"
            />
          </span>
          <span className="ms-2 view-icon">
            <DownloadFile />
          </span>
         {/* <span className="ms-1 view-icon">
            <UploadFileIcon />
          </span>*/}
        </p>
      </li>
      <li style={{ border: 'none' }}><RefProof /></li>
    </>
  );
};

const PayInOneGo = (props) => {
  return (
    <div className="app_progress mt-md-5 mt-4">
      <div className="pro-head">
        <h5 className="text_lg-green text-center text-uppercase">
        </h5>
      </div>
      <div className="pro-body px-lg-5 px-3">
        <div className="d-flex justify-content-between mt-4 align-items-center flex-md-row flex-column gap-3">
          <h3 className="para1 fw-600 mt-0" style={{ color: "#03565a" }}>
            Full Terms Payment Application
          </h3>
          <div className="d-flex gap-2">
            <div className="bg_light2">Provisional Result : Accepted</div>
          </div>
        </div>
        <ul className="app_pro-details">
          <DetailList />
        </ul>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn_filled btn_md">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PayInOneGo
