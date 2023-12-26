import React from "react";
import CustomSwitch from "../../../../../components/formComponent/CustomSwitch";

const ReqGuar = () => {
  const guarReq = [
    { label: "Guarantor must be over 18", defaultChecked: false },
    { label: "Guarantor must be living in the UK", defaultChecked: false },
    {
      label:
        "Guarantor must have an income of 3x the applicant share of the monthly rent",
      defaultChecked: false,
    },
  ];
  return (
    <div className="text-center">
      <h4 className="text-h4">List of Guarantor Requirements</h4>
      <div className="mt-4 land-require">
        {guarReq.map((item, index) => {
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

export default ReqGuar;
