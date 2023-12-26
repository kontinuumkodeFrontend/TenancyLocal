import React from "react";
import CustomSwitch from "../../../../../components/formComponent/CustomSwitch";

const ReqLand = () => {
    const landReq = [
        { label: "Applicant must have paid rent on time", defaultChecked: false },
        { label: "Applicant must not have had any damage", defaultChecked: false },
        { label: "Applicant must be free to move out", defaultChecked: false },
        { label: "Applicant must be recommended as a tenant", defaultChecked: false }
    ];
    return (
        <div className="text-center">
            <h4 className="text-h4">List of Landlord Requirements</h4>
            <div className="mt-4 land-require">
                {landReq.map((item, index) => {
                    return (
                        <div className="land-switch" key={index}>
                            <label className="form-labels">{item.label}</label>
                            <div className="cus-switch-box"> <CustomSwitch isChecked={item.defaultChecked} /></div>
                           
                        </div>
                    );
                })}
            </div>
            <button className="btn_filled btn_sm mt-4 mx-auto">Save Requirements</button>
        </div>
    );
};

export default ReqLand;
