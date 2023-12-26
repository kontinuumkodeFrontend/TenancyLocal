import React from "react";
import { Container } from "react-bootstrap";
import Input from "../components/formComponent/Input";
import { employerVariables } from "../helper/variables";
import PanelBottom from "../components/PanelBottom";
import RadioBtn from "../components/formComponent/RadioBtn";
import Dropdown from "../components/formComponent/Dropdown";
import { THANKS_MODAL } from "../components/customModal/ModalConstants";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { EMPLOYER } from "../helper/constants/UserConstant";


let empOptions = [
  { label: "Contract Type", value: "contract" },
  { label: "Permanent Full-Time", value: "permanent full" },
  { label: "Permanent Part-Time", value: "permanent full" },
  { label: "Temporary", value: "temporary" },
  { label: "Agency", value: "agency" },
  { label: "Freelancer", value: "freelancer" },
  { label: "Consultant", value: "consultant" },
  { label: "Contractor", value: "contractor" },
  { label: "Zero-Hours", value: "zero-hours" },
  { label: "Maternity Cover", value: "maternity" },
  { label: "Fixed-Term", value: "fixed" },
];

const EmployerPanel = () => {
  const dispatch = useDispatch();
  dispatch(userActions.setUser(EMPLOYER));


  return (
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2">Employment Reference</h2>
        </div>
        <div className="panel_center-sec">
          <div className="panel_center-top panel_inner-pb">
            <h3 className="text-h3 mb-4">{employerVariables.heading}</h3>
            <p className="para1">{employerVariables.subHeading}</p>
          </div>
          <div className="panel_center-mid panel_inner-pt">
            <div className="panel_form">
              <Input
                type="text"
                placeholder="Enter applicant name"
                label="Name of Applicant"
                value="Priyank Sharma"
                disabled={true}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter company name"
                label="Company Name"
                value="Tussle Dealerships"
                disabled={true}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter company address"
                label="Company Address"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                defaultValue=""
                placeholder="Enter job title"
                label="Job Title "
                disabled={false}
                prepend={false}
              />

              <Input
                type="number"
                placeholder="Enter annual salary"
                label="Annual Salary"
                value=""
                disabled={false}
                prepend={true}
              />
              <Input
                type="number"
                placeholder="Enter annual bonus/commision"
                label="Average Annual Bonus/Commision"
                value=""
                disabled={false}
                prepend={true}
              />
              <div className="panel_que-btns">
                <p className="form-labels">In Probation Period</p>
                <div className="btn_group">
                  <RadioBtn
                    label="Yes"
                    name="prob-period"
                    id="prob-yes"
                    defaultValue={true}
                  />
                  <RadioBtn
                    label="No"
                    name="prob-period"
                    id="prob-no"
                    defaultValue={false}
                  />
                </div>
              </div>
              <Dropdown label="Contract Type" option={empOptions} />
              <Input
                type="text"
                placeholder="Enter your name"
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
          </div>
          <PanelBottom
            label="Employer's Signature"
            modalType={THANKS_MODAL}
            checkLabel="I confirm that I accept the privacy policy and the information provided is accurate to the best of my knowledge."
          />
        </div>
      </div>
    </Container>
  );
};

export default EmployerPanel;
