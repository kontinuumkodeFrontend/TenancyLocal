import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Input from "../components/formComponent/Input";
import RadioBtn from "../components/formComponent/RadioBtn";
import { landlordVariables } from "../helper/variables";
import PanelBottom from "../components/PanelBottom";
import { THANKS_MODAL } from "../components/customModal/ModalConstants";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { LANDLORD } from "../helper/constants/UserConstant";

//Additonal question
const EQ3 = () => {
  return (
    <div className="panel_form w-100 rgt-inpt">
      <Input
        type="text"
        placeholder="Enter text"
        label="Why not?"
        defaultValue=""
        disabled={false}
        prepend={false}
      />
    </div>
  );
};

//Additonal question
const EQ5 = () => {
  return (
    <div className="panel_form w-100 rgt-inpt ">
      <Input
        type="text"
        placeholder="Enter reason"
        label="Why is the Applicant not free to move out?"
        defaultValue=""
        disabled={false}
        prepend={false}
      />
    </div>
  );
};

const LandlordPanel = () => {
  const [rentPaid, setRentPaid] = useState(false);
  const [damage, setDamage] = useState(false);
  const [recommend, setRecommend] = useState(true);
  const [arrears, setArrears] = useState(false);
  const [freeMove, setFreeMove] = useState(false);

  const dispatch = useDispatch();
  dispatch(userActions.setUser(LANDLORD));

  const rentStatusHandler = (value) => {
    setRentPaid(value);
    if (value === false) {
      setArrears(false);
    }
    console.log(value, ">>>>>>>>>>>>");
  };

  const damageHandler = (value) => {
    setDamage(value);
  };
  const recommendHandler = (value) => {
    setRecommend(value);
  };

  const arrearsHandler = (value) => {
    setArrears(value);
  };
  const freeMoveHandler = (value) => {
    setFreeMove(value);
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
                <div className="panel_que-btns">
                  <p className="form-labels">Rent Paid On Time?</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="rent"
                      id="rent-yes"
                      defaultValue={false}
                      clickAction={rentStatusHandler}
                    />
                    <RadioBtn
                      label="No"
                      name="rent"
                      id="rent-no"
                      defaultValue={true}
                      clickAction={rentStatusHandler}
                    />
                  </div>
                </div>
                {rentPaid ? (
                  <div className="flex-100">
                    <div className="panel_que-btns">
                      <p className="form-labels">
                        How frequently were they late?
                      </p>
                      <div className="btn_group">
                        <RadioBtn
                          label="One-off"
                          name="month"
                          id="one-off"
                          className="radio-btn-md"
                          clickAction={false}
                        />
                        <RadioBtn
                          label="Every month"
                          name="month"
                          id="month"
                          className="radio-btn-lg"
                          clickAction={false}
                        />
                        <RadioBtn
                          label="Every other month"
                          name="month"
                          id="month-other"
                          className="radio-btn-xl"
                          clickAction={false}
                        />
                      </div>
                    </div>
                    <div className="panel_que-btns mt-4">
                      <p className="form-labels">Currently in arrears?</p>
                      <div className="btn_group">
                        <RadioBtn
                          label="Yes"
                          name="arrears"
                          id="arrears1"
                          defaultValue={true}
                          clickAction={arrearsHandler}
                        />
                        <RadioBtn
                          label="No"
                          name="arrears"
                          id="arrears2"
                          defaultValue={false}
                          clickAction={arrearsHandler}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {rentPaid && arrears ? (
                  <div className="panel_form w-100">
                    <Input
                      type="number"
                      placeholder="Enter arrears"
                      label="How much arrears?"
                      value=""
                      disabled={false}
                      prepend={false}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="panel_que-btns">
                  <p className="form-labels">Any Damage?</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="damage"
                      id="damage-yes"
                      defaultValue={true}
                      clickAction={damageHandler}
                    />
                    <RadioBtn
                      label="No"
                      name="damage"
                      id="damage-no"
                      defaultValue={false}
                      clickAction={damageHandler}
                    />
                  </div>
                </div>
                {damage ? (
                  <div className="panel_form w-100">
                    <Input
                      type="text"
                      placeholder="Enter damage detail"
                      label="Details of the Damages "
                      defaultValue=""
                      disabled={false}
                      prepend={false}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="row w-100 m-0">
                  <div className={recommend ? "col-12 " : "col-md-6"}>
                    <div className="panel_que-btns">
                      <p className="form-labels">
                        Would You recommend them as Tenant?
                      </p>
                      <div className="btn_group">
                        <RadioBtn
                          label="Yes"
                          name="recommend"
                          id="recommend-yes"
                          defaultValue={true}
                          clickAction={recommendHandler}
                        />
                        <RadioBtn
                          label="No"
                          name="recommend"
                          id="recommend-no"
                          defaultValue={false}
                          clickAction={recommendHandler}
                        />
                      </div>
                    </div>
                  </div>
                  {recommend ? '' : <div className={recommend ? "col-12 " : "col-md-6"}>
                    <EQ3 />
                  </div>}
                </div>


                <div className="row w-100 m-0">
                  <div className={freeMove ? " col-md-6 " : "col-12"}>
                    <div className="panel_que-btns">
                      <p className="form-labels">
                        Is the Applicant free to move out?
                      </p>
                      <div className="btn_group">
                        <RadioBtn
                          label="Yes"
                          name="free-move"
                          id="free-move-yes"
                          defaultValue={false}
                          clickAction={freeMoveHandler}
                        />
                        <RadioBtn
                          label="No"
                          name="free-move"
                          id="free-move-no"
                          defaultValue={true}
                          clickAction={freeMoveHandler}
                        />
                      </div>
                    </div>
                  </div>
                  {freeMove ? <div className={freeMove ? "col-md-6 " : "col-12"}>
                    <EQ5 />
                  </div> : ''}
                </div>

                {/* {freeMove ? <EQ5 /> : ""} */}
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

export default LandlordPanel;
