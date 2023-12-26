import React from "react";
import CustomSwitch from "../../../../../components/formComponent/CustomSwitch";

const ReqTen = () => {
    const tenReq = [
        { label: "No Pets", defaultChecked: false },
        { label: "No Students", defaultChecked: false },
        { label: "No Families", defaultChecked: false },
        { label: "No Professionals", defaultChecked: false },
        { label: "Minimum tenancy length", defaultChecked: false },
        {
            label: "Tenancies must start on the 1st of a month",
            defaultChecked: false,
        },
        {
            label: "Tenancies must end on the last day of a month",
            defaultChecked: false,
        },
    ];
    return (
        <div className="text-center">
            <h4 className="text-h4">List of Tenancy Requirements</h4>
            <div className="mt-4 land-require">
                {tenReq.map((item, index) => {
                    return (
                        <div className="land-switch tenancy-switch" key={index}>
                            <label className="form-labels">{item.label}</label>
                            <div className="cus-switch-box">
                                {index === 4 && <div className="input-box width-75">
                                    <input type="number" placeholder="Months" defaultValue="" />
                                </div>}
                                {index !== 4 && (
                                    <CustomSwitch isChecked={item.defaultChecked} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="btn_filled btn_sm mt-4 mx-auto">Save Requirements</button>
        </div>
    );
};

export default ReqTen;
