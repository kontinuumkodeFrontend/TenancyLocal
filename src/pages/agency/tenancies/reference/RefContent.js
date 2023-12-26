import React, { useState } from "react";
import EmpRef from "./EmpRef";
import GurRef from "./GurRef";
import LandRef from "./LandRef";
import IncomeProof from "./IncomeProof";
import Quarterly from "./Quarterly";
import PayInOneGo from "./PayInOneGo";
import { useEffect } from "react";

const RefContent = (props) => {
    const [refBtn, setRefBtn] = useState("EMP-REF"); //initialy setting employment reference as default
    const TabkeyInr = localStorage.getItem("tabKeyInr");

    useEffect(() => {
        if (TabkeyInr) {
            setRefBtn(TabkeyInr);
            setTimeout(() => {
                localStorage.setItem("tabKeyInr", '')
            }, 1500);
        }
    }, []);

    return (
        <div className="mt-4">
            <div className="panel_setting d-flex justify-content-center gap-md-4 gap-3 px-xl-5 px-3 flex-wrap">
                <button
                    className={
                        refBtn === "EMP-REF" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setRefBtn("EMP-REF");
                    }}
                >
                    Employment Reference
                </button>
                <button
                    className={
                        refBtn === "GUR-REF" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setRefBtn("GUR-REF");
                    }}
                >
                    Guarantor Reference
                </button>
                <button
                    className={
                        refBtn === "LAND-REF" ? "btn_filled btn_sm" : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setRefBtn("LAND-REF");
                    }}
                >
                    Landlord Reference
                </button>
                {/*  <button
                    className={
                        refBtn === "INCOME-PROOF"
                            ? "btn_filled btn_sm"
                            : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setRefBtn("INCOME-PROOF");
                    }}
                >
                    Income Proof
                </button>*/}
                <button
                    className={
                        refBtn === "QUATERLY"
                            ? "btn_filled btn_sm"
                            : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setRefBtn("QUATERLY");
                    }}
                >
                    Quarterly
                </button>
                <button
                    className={
                        refBtn === "PAY-IN-ONE-GO"
                            ? "btn_filled btn_sm"
                            : "btn_light2 btn_sm"
                    }
                    onClick={() => {
                        setRefBtn("PAY-IN-ONE-GO");
                    }}
                >
                    Full Terms Payment
                </button>
            </div>
            <div className="mt-4">
                {refBtn === "EMP-REF" && <EmpRef item={props.item} />}
                {refBtn === "GUR-REF" && <GurRef item={props.item} />}
                {refBtn === "LAND-REF" && <LandRef item={props.item} />}
                {refBtn === "INCOME-PROOF" && <IncomeProof />}
                {refBtn === "QUATERLY" && <Quarterly />}
                {refBtn === "PAY-IN-ONE-GO" && <PayInOneGo />}
            </div>
        </div>
    );
};

export default RefContent;
