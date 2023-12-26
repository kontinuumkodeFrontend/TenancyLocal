import React from "react";
import CustomSwitch from "../../../../../components/formComponent/CustomSwitch";

const ReqQuat = () => {
  const quatReq = [
    { label: "Is Applicant closing balance >= 3x their share of the monthly rent?", defaultChecked: false }
  ];
  return (
    <div className="text-center">
      <h4 className="text-h4">List of Quarterly Requirements</h4>
      <div className="mt-4 land-require">
        {quatReq.map((item, index) => {
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

export default ReqQuat;
