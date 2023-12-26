import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Signature from "../../components/formComponent/Signature";
import Checkbox from "../../components/formComponent/Checkbox";

const ConfirmDetails = () => {
  return (
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2">Confirm details</h2>
        </div>
        <div className="panel_center-sec mb-4">
          <div className="panel_center-mid">
            <div className="d-flex flex-column justify-content-center gap-md-5 gap-4">
              <div>
                <p className="text_lg-green text-uppercase text-center mb-3">
                  <span>Guarantor Details</span>
                </p>
                <div className="d-flex flex-column gap-3">
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">Name Details</p>
                    <p className="text_lg">Steve</p>
                  </div>
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">Tele Details</p>
                    <p className="text_lg">8899554542</p>
                  </div>
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">Email Details</p>
                    <p className="text_lg">steve@yopmail.com</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text_lg-green text-uppercase text-center mb-3">
                  <span>Current or Previous Landlords Details</span>
                </p>
                <div className="d-flex flex-column gap-3">
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">Landlord/Agent Name</p>
                    <p className="text_lg">Steve</p>
                  </div>
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">
                      Landlord/Agent Telephone no.
                    </p>
                    <p className="text_lg">8899554542</p>
                  </div>
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">
                      Landlord/Agent Email Details
                    </p>
                    <p className="text_lg">garry@yopmail.com</p>
                  </div>
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">
                      Address whilst renting with this Landlord/Agent
                    </p>
                    <p className="text_lg">E34NA</p>
                  </div>
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">
                      Date your Tenancy started with this Landlord/Agent
                    </p>
                    <p className="text_lg">06/04/2023</p>
                  </div>
                  <div className="tenancy-info">
                    <p className="text_lg hypen-after">
                      Date your Tenancy ended with this Landlord/Agent
                    </p>
                    <p className="text_lg">06/04/2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-md-5 mt-4 text-center">
            <p className="text_lg-green text-uppercase text-center mb-3">
              <span>Applicant Signature</span>
            </p>
            <Signature />
            <Checkbox className="mt-4"
              id="checkbox1"
              label=" I accept the terms of the privacy statement, and accept to the terms of my data being processed."
            />
            <div className="text-center mt-4 gap-3 d-flex justify-content-center ">
              <Link to={-1}>
                <button className="btn_dark btn_lg">Back</button>
              </Link>
              <Link to="/thankspage">
                <button className="btn_stroke btn_lg">
                  Submit Application
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConfirmDetails;
