import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { applicantVariables } from "../../helper/variables";
import RadioBtn from "../../components/formComponent/RadioBtn";
import Checkbox from "../../components/formComponent/Checkbox";

const Questionnaire = () => {
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState(null);
  const [employed, setEmployed] = useState(null);
  const [neither, setNeither] = useState(null);
  const [resident, setResident] = useState(null);
  const [guarantor, setGuarantor] = useState(null);
  const [income, setIncome] = useState(null);

  const empStatusHandler = (value) => {
    if (value === "student") {
      setStudent(true);
      setEmployed(false);
      setNeither(false);
      setResident(false);
      setGuarantor(false);
      setIncome(false);
      setShow(false);
    } else if (value === "employed") {
      setStudent(false);
      setEmployed(true);
      setNeither(false);
      setResident(false);
      setGuarantor(false);
      setIncome(false);
      setShow(false);
    } else if (value === "neither") {
      setStudent(false);
      setEmployed(false);
      setNeither(true);
      setResident(false);
      setGuarantor(false);
      setIncome(false);
      setShow(false);
    }
  };

  const residentHandler = (value) => {
    if (value === false || value === true) {
      setResident(true);
    }
  };

  const guarantorHandler = (value) => {
    setShow(true);
    if (value === false) {
      setGuarantor(true);
    }
    if (value === true) {
      setGuarantor(false);
    }
  };

  const incomeHandler = (value) => {
    if (value === true) {
      setIncome(false);
    }
    if (value === false) {
      setIncome(true);
    }
  };

  return (
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2">APPLICATION Questionnaire</h2>
        </div>
        <div className="panel_center-sec mb-4">
          <div className="panel_center-top" style={{ border: "none" }}>
            <h3 className="text-h3 mb-sm-5 mb-4">
              {applicantVariables.heading}
            </h3>
            <p className="para1">{applicantVariables.subHeading}</p>
          </div>
          <div className="panel_center-mid panel_inner-pt">
            <div className="d-flex flex-column justify-content-center  gap-4">
              <div className="app-quat">
                <p className="text_lg-green">Employment Status</p>
                <div className="panel_que-btns">
                  <div className="btn_group">
                    <RadioBtn
                      className="radio-btn-md"
                      label="Student"
                      name="app-emp"
                      id="app-stu"
                      defaultValue="student"
                      clickAction={empStatusHandler}
                    />
                    <RadioBtn
                      className="radio-btn-md"
                      label="Employed"
                      name="app-emp"
                      id="app-emp"
                      defaultValue="employed"
                      clickAction={empStatusHandler}
                    />
                    <RadioBtn
                      className="radio-btn-md"
                      label="Neither"
                      name="app-emp"
                      id="app-neither"
                      defaultValue="neither"
                      clickAction={empStatusHandler}
                    />
                  </div>
                </div>
              </div>
              {student && (
                <div className="app-quat">
                  <p className="text_lg-green">Permanent Residency</p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn-lg"
                        label="Uk Resident"
                        name="ukResident"
                        id="uk-resident"
                        defaultValue={true}
                        clickAction={residentHandler}
                      />
                      <RadioBtn
                        className="radio-btn-xl"
                        label="International Resident"
                        name="ukResident"
                        id="inter-resident"
                        defaultValue={false}
                        clickAction={residentHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
              {employed && (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Is your net Income 3x your share of the rent?{" "}
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        label="Yes"
                        name="net-income"
                        id="net-yes"
                        defaultValue={true}
                        clickAction={incomeHandler}
                      />
                      <RadioBtn
                        label="No"
                        name="net-income"
                        id="net-no"
                        defaultValue={false}
                        clickAction={incomeHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
              {neither && (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Do you have a UK based guarantor that has a net income of 3x
                    your share of the monthly rent?
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn"
                        label="Yes"
                        name="guarantor"
                        id="gua-yes"
                        defaultValue={true}
                        clickAction={guarantorHandler}
                      />
                      <RadioBtn
                        className="radio-btn"
                        label="No"
                        name="guarantor"
                        id="gua-no"
                        defaultValue={false}
                        clickAction={guarantorHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
              {student && resident && (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Do you have a UK based guarantor that has a net income of 3x
                    your share of the monthly rent?
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn"
                        label="Yes"
                        name="guarantor"
                        id="gua-yes"
                        defaultValue={true}
                        clickAction={guarantorHandler}
                      />
                      <RadioBtn
                        className="radio-btn"
                        label="No"
                        name="guarantor"
                        id="gua-no"
                        defaultValue={false}
                        clickAction={guarantorHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
              {student && guarantor && (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Can you pay 3x monthly rent in advance and provide income
                    proof to support this?
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn"
                        label="Yes"
                        name="advance"
                        id="adv-yes"
                        defaultValue={true}
                      />
                      <RadioBtn
                        className="radio-btn"
                        label="No"
                        name="advance"
                        id="adv-no"
                        defaultValue={false}
                      />
                    </div>
                  </div>
                </div>
              )}
              {employed && income && (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Do you have a UK based guarantor that has a net income of 3x
                    your share of the monthly rent?
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn"
                        label="Yes"
                        name="guarantor"
                        id="gua-yes"
                        defaultValue={true}
                        clickAction={guarantorHandler}
                      />
                      <RadioBtn
                        className="radio-btn"
                        label="No"
                        name="guarantor"
                        id="gua-no"
                        defaultValue={false}
                        clickAction={guarantorHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
              {employed && guarantor && (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Can you pay 3x monthly rent in advance and provide income
                    proof to support this?
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn"
                        label="Yes"
                        name="advance"
                        id="adv-yes"
                        defaultValue={true}
                      />
                      <RadioBtn
                        className="radio-btn"
                        label="No"
                        name="advance"
                        id="adv-no"
                        defaultValue={false}
                      />
                    </div>
                  </div>
                </div>
              )}
              {neither && !guarantor && show ? (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Can you pay 3x monthly rent in advance and provide income
                    proof to support this?
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn"
                        label="Yes"
                        name="advance"
                        id="adv-yes"
                        defaultValue={true}
                      />
                      <RadioBtn
                        className="radio-btn"
                        label="No"
                        name="advance"
                        id="adv-no"
                        defaultValue={false}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {neither && guarantor && (
                <div className="app-quat">
                  <p className="text_lg-green">
                    Can pay whole terms rent in advance and provide income proof
                    to support this?
                  </p>
                  <div className="panel_que-btns">
                    <div className="btn_group">
                      <RadioBtn
                        className="radio-btn"
                        label="Yes"
                        name="whole-adv"
                        id="whole-yes"
                        value={true}
                      />
                      <RadioBtn
                        className="radio-btn"
                        label="No"
                        name="whole-adv"
                        id="whole-no"
                        value={false}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center mt-5">
              <Checkbox
                className="mt-4"
                id="checkbox1"
                label="I confirm the answers provided is accurate to the best of my knowledge."
              />
              <div className="text-center mt-4 gap-3 d-flex justify-content-center ">
                <Link to={-1}>
                  <button className="btn_dark btn_lg">Back</button>
                </Link>
                <Link to="/applicant/application">
                  <button className="btn_stroke btn_lg">Next</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Questionnaire;
