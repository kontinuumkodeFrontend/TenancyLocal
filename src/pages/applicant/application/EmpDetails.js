import React from 'react'
import Input from "../../../components/formComponent/Input";
import TelInput from "../../../components/formComponent/TelInput";

const EmpDetails = () => {
  return (
    <>
      <div className="panel_center-top pb-4">
        <h5 className="text-h5">Employment details</h5>
      </div>
      <div className="panel_center-mid my-4">
        <div className="panel_form">
          <Input
            type="text"
            placeholder="Enter company name"
            label="Company Name"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <TelInput label="Manager's Telephone Number"/>
          <Input
            type="email"
            placeholder="Enter email"
            label="Manager's Email Address"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="email"
            placeholder="Re-enter email"
            label="Confirm Manager's Email Address"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
        </div>
      </div>
    </>
  )
}

export default EmpDetails