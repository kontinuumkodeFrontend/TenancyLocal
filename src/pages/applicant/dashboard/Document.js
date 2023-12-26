import React from "react";
import viewIcon from "../../../assets/images/view-doc.svg";
import DownloadFile from "../../../components/formComponent/DownloadFile";

const Document = () => {
  return (
    <div className="mt-4">
      <div className="bg_filled">
        <p className="text_xsm">Documents</p>
      </div>
      <div className="app-doc mt-3 px-sm-5 px-3 flex-wrap gap-4">
        <p className="d-flex align-items-center">
          EICR Certificate
          <span className="ms-3">
           <img src={viewIcon} alt="view-icon" className="view-icon" />
          </span>
          <span className="ms-3"><DownloadFile/></span>
        </p>        
        <p className="d-flex align-items-center">
          Gas Certificate
          <span className="ms-3">
            <img src={viewIcon} alt="view-icon" className="view-icon" />
          </span>
          <span className="ms-3"><DownloadFile/></span>
        </p>
        <p className="d-flex align-items-center">
          EPC Certificate
          <span className="ms-3">
            <img src={viewIcon} alt="view-icon" className="view-icon" />
          </span>
          <span className="ms-3"><DownloadFile/></span>
        </p>
        <p className="d-flex align-items-center">
          View Tenancy Agreement
          <span className="ms-3">
            <img src={viewIcon} alt="view-icon" className="view-icon" />
          </span>
          <span className="ms-3"><DownloadFile/></span>
        </p>
      </div>
    </div>
  );
};

export default Document;
