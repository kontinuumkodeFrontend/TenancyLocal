import React from "react";
import Input from "../../../components/formComponent/Input";
import TelInput from "../../../components/formComponent/TelInput";

const GuarantorDetails = () => {
  return (
    <>
      <div className="panel_center-top pb-4">
        <h5 className="text-h5">Guarantor Details</h5>
      </div>
      <div className="panel_center-mid my-4">
        <div className="panel_form">
          <Input
            type="text"
            placeholder="Enter guarantor name"
            label="Name"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <TelInput />
          <Input
            type="text"
            placeholder="Enter email address"
            label="Guarantor Email Address"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="text"
            defaultValue=""
            placeholder="Re-enter email address"
            label="Confirm Guarantor Email Address"
            disabled={false}
            prepend={false}
          />
        </div>
      </div>
    </>
  );
};

export default GuarantorDetails;
