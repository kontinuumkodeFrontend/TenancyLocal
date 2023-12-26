import React, { useState } from "react";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import RadioBtn from "../../components/formComponent/RadioBtn";
import Input from "../../components/formComponent/Input";
import FileUpload from "../../components/formComponent/FileUpload";
import TelInput from "../../components/formComponent/TelInput";
import Checkbox from "../../components/formComponent/Checkbox";

const Register = () => {
  const [insuranceNo, setinsuranceNo] = useState(false);
  const [document, setDocument] = useState();

  const insuranceHandler = (value) => {
    setinsuranceNo(value);
  };

  const documnetHandler = (e) => {
    setDocument(e.target.value);
    console.log(e.target.value, ".......");
  };

  return (
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2">Register Account</h2>
        </div>
        <div className="panel_center-sec mb-4">
          <div className="panel_center-top panel_inner-pb">
            <div className="panel_form">
              <Input
                type="text"
                placeholder="Enter your first name"
                label="First Name"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter your last name"
                label="Last Name"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <TelInput />
              <Input
                type="date"
                placeholder="Select your D.O.B."
                label="Date of Birth"
                disabled={false}
                prepend={false}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                label="New Password"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="password"
                placeholder="Re-enter your password"
                label="Retype New Password"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <div className="panel_que-btns flex-100 align-items-center">
                <p className="form-labels">
                  Do you have a National Insurance Number
                </p>
                <div className="btn_group">
                  <RadioBtn
                    label="Yes"
                    name="insurance"
                    id="insurance-yes"
                    defaultValue={true}
                    clickAction={insuranceHandler}
                  />
                  <RadioBtn
                    label="No"
                    name="insurance"
                    id="insurance-no"
                    defaultValue={false}
                    clickAction={insuranceHandler}
                  />
                </div>
              </div>
              {insuranceNo && (
                <div className="mx-auto">
                  <Input
                    type="text"
                    placeholder="Type insurance Number here..."
                    label=""
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <p className="helper-text mt-2">
                    Beginning of string of two letters, six digits, with
                    optional white space, zero or one letter, optional
                    whitespace{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="panel_center-mid panel_inner-pt">
            <h5 className="text-h5">Know Your Customer</h5>
            <div className="panel_inner-p panel_form">
              <div className="input-box">
                <label className="form-labels">
                  Please select document type
                </label>
                <select
                  onChange={documnetHandler}
                  defaultValue={"Choose Document Type"}
                >
                  <option disabled={true}>Choose Document Type</option>
                  <option value="passport">Passport</option>
                </select>
              </div>
            </div>
            {document === "passport" && (
              <div className="panel_form mb-5">
                <FileUpload
                  fileId="passport1"
                  label="Selfie Holding the Passport Document"
                  text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                />
                <FileUpload
                  fileId="passport2"
                  label="Passport Document"
                  text="Upload file with PNG, JPG, PDF format and size less than 10 MB."
                />
              </div>
            )}
            <div className="text-center">
              <Checkbox
                className=" mt-4"
                id="checkbox1"
                label="I confirm the information provided is accurate to the best of my knowledge."
              />
              <div className="text-center mt-4 gap-3 d-flex justify-content-center">
                <Link to={-1}>
                  <button className="btn_dark btn_lg">Back</button>
                </Link>
                <Link to="/applicant/tenancy-info">
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

export default Register;
