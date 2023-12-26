import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Input from "../components/formComponent/Input";
import { landlordVariables } from "../helper/variables";
import PanelBottom from "../components/PanelBottom";
import { THANKS_MODAL } from "../components/customModal/ModalConstants";
import RadioBtnGrpTwo from "../components/formComponent/RadioBtnGrpTwo";
import RadioBtnGrpThree from "../components/formComponent/RadioBtnGrpThree";


const Landlord = () => {
    const [rentPaid, setRentPaid] = useState();
    const [damage, setDamage] = useState();
    const [recommend, setRecommend] = useState();
    const [arrears, setArrears] = useState();
    const [freeMove, setFreeMove] = useState();

    const rentPaidHandler = (value) => {
        setRentPaid(value);
        console.log("Value of rent paid: ", value);
    };

    const arrearsHandler = (value, e) => {
        e.stopPropagation();
        setArrears(value);
        console.log("Value of arrears: ", value);
    }
    const EQ1 = () => {
        return (
            <RadioBtnGrpThree
                label="How frequently were they late?"
                value1="One-off"
                value2="Every month"
                value3="Every other month"
            />
        );
    };
    
    const EQ2 = () => {
        return (
            <RadioBtnGrpTwo label="Currently in arrears?" value1="Yes" value2="No" className='mt-3' handleChange={arrearsHandler} />
        );
    };
 

    return (
        <Container>
            <div className="panel pt-md-5 pt-4">
                <div className="panel_head pb-5">
                    <h2 className="text-h2">Landlord Reference</h2>
                </div>
                <div className="panel_center-sec">
                    <div className="panel_center-top panel_inner-pb">
                        <h3 className="text-h3 mb-4">{landlordVariables.heading}</h3>
                        <p className="para1">{landlordVariables.subHeading}</p>
                    </div>
                    <div className="panel_center-mid panel_inner-pt">
                        <h5 className="text-h5">Landlord Information</h5>
                        <div className="panel_inner-p panel_form">
                            <Input
                                type="text"
                                placeholder="Enter applicant name"
                                label="Name of applicant"
                                value="Priyank Sharma"
                                disabled={true}
                                prepend={false}
                            />
                            <Input
                                type="text"
                                placeholder="Enter your property name"
                                label="Property rented with you"
                                value="F-244, Phase 8B, Industrial Area"
                                disabled={true}
                                prepend={false}
                            />
                            <Input
                                type="number"
                                placeholder="Enter rental amount"
                                label="Rental Amount PCM"
                                value=""
                                disabled={false}
                                prepend={false}
                            />
                            <Input
                                type="text"
                                placeholder="Steve Austin"
                                label="Landlord/Agent Name"
                                defaultValue=""
                                disabled={false}
                                prepend={false}
                            />
                            <Input
                                type="date"
                                placeholder="Enter tenancy start date"
                                required
                                label="Tenancy Start Date"
                                disabled={false}
                                prepend={false}
                            />
                            <Input
                                type="date"
                                placeholder="Enter tenancy end date"
                                label="Tenancy End Date"
                                disabled={false}
                                prepend={false}
                            />
                            <Input
                                type="text"
                                placeholder="Ente your name"
                                defaultValue=""
                                label="Your Name"
                                disabled={false}
                                prepend={false}
                            />
                            <Input
                                type="text"
                                placeholder="Enter position"
                                label="Position"
                                defaultValue=""
                                disabled={false}
                                prepend={false}
                            />
                        </div>
                        <div className="panel_que landlord_que">
                            <div className="panel_que-head">
                                <h5 className="text-h5">Landlord Questionnaire</h5>
                            </div>
                            <div className="panel_que-mid">
                                <RadioBtnGrpTwo
                                    label="Rent Paid On Time?"
                                    value1="Yes"
                                    value2="No"
                                    handleChange={rentPaidHandler}
                                />
                                {rentPaid === "No" ? (
                                    <div className="flex-100">
                                        <EQ1 />
                                        {/*<EQ2 /> */}
                                        <RadioBtnGrpTwo label="Currently in arrears?" value1="Yes" value2="No" className='mt-3' handleChange={arrearsHandler} />
                                    </div>
                                ) : (
                                    ""
                                )}
                                <RadioBtnGrpTwo label="Any Damage?" value1="Yes" value2="No" />
                                <RadioBtnGrpTwo
                                    label="Would You recommend them as Tenant?"
                                    value1="Yes"
                                    value2="No"
                                />
                                <RadioBtnGrpTwo
                                    label="Is the Applicant free to move out?"
                                    value1="Yes"
                                    value2="No"
                                />
                            </div>
                        </div>
                    </div>
                    <PanelBottom
                        label="Landlord's Signature"
                        modalType={THANKS_MODAL}
                        checkLabel="I confirm that I accept the privacy policy and the information provided is accurate to the best of my knowledge."
                    />
                </div>
            </div>
        </Container>
    );
};

export default Landlord;

// <button
// className={
//     btnActive ? "btn_filled btn_sm" : "btn_stroke3 btn_sm"
// }
// onClick={() => { setBtnActive(prev => !prev) }}
// >
// {props.label}
// </button>
