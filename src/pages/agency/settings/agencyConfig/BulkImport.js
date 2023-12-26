import React from "react";
import FileUpload from "../../../../components/formComponent/FileUpload";

const BlukFileUpload = (props) => {
  return (
    <div className={props.className ? `${props.className} flex-60` : 'flex-60'}>
      <FileUpload
        fileId={props.fileId}
        label={props.label}
        text="Upload file with CSV format and size less than 10MB."
      />
      <div className="mx-auto mt-4 d-flex gap-3 flex-wrap">
        <button className="btn_filled btn_lg">Upload and Import</button>
        <a href="#" download>
          <button className="btn_filled btn_lg">
            Download Example: {props.btnLabel}
          </button>
        </a>
      </div>
    </div>
  );
};

const BulkImport = () => {
  return (
    <div className="panel_form panel_center-mid  mt-4 justify-content-center">
      <BlukFileUpload label="Bulk Import Landlord" fileId="bulk1" btnLabel='Landlord'/>
      <BlukFileUpload label="Bulk Import Properties" fileId="bulk2" className='mt-4' btnLabel='Property'/>
    </div>
  );
};

export default BulkImport;
