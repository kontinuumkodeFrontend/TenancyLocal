import React from "react";
import CustomSwitch from "../../../../../components/formComponent/CustomSwitch";

const ReqEmp = () => {
  const empReq = [
    { label: "Applicant must not be in probation period", defaultChecked: false },
    { label: "Applicant must have a salary of at least 3 times their share of the monthly rent", defaultChecked: false },
    {
      label:
        "If applicant is employed but is earning between 2x to 3x, a guarantor is required",
      defaultChecked: false,
    },
    {
        label:
          "Applicant must not be on a temporary or zero-hour or maternity cover contract",
        defaultChecked: false,
      },
  ];
  return (
    <div className="text-center">
      <h4 className="text-h4">List of Employment Requirements</h4>
      <div className="mt-4 land-require">
        {empReq.map((item, index) => {
          return (
            <div className="land-switch" key={index}>
              <label className="form-labels">{item.label}</label>
              <div className="cus-switch-box">
                <CustomSwitch isChecked={item.defaultChecked} />
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn_filled btn_sm mt-4 mx-auto">Save Requirements</button>
    </div>
  );
};

export default ReqEmp;
