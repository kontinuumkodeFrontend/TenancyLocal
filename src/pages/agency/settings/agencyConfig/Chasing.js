import React from "react";
import CustomSwitch from "../../../../components/formComponent/CustomSwitch";

const Chasing = () => {
    const chaseOption = [
        { label: "Chase via Email", defaultChecked: false },
        { label: "If chasing references, cc Applicant", defaultChecked: false },
        { label: "Times to chase before 'stalling'", defaultChecked: false },
        { label: "Hours to chase after no response", defaultChecked: false }
    ];
    return (
        <div className="text-center">
            <div className="mt-4 land-require">
                {chaseOption.map((item, index) => {
                    return (
                        <div className="land-switch tenancy-switch" key={index}>
                            <label className="form-labels">{item.label}</label>
                            <div className="cus-switch-box">
                            {(index === 0 || index === 1) && (
                              <CustomSwitch isChecked={item.defaultChecked} />
                          )}
                                {(index === 3 || index === 2 )&& <div className="input-box width-75">
                                    <input type="number" defaultValue="" />
                                </div>}
                             
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="btn_filled btn_sm mt-4 mx-auto">Save Requirements</button>
        </div>
    );
};

export default Chasing;
