import React from "react";
import { Link } from "react-router-dom";
import { applicantVariables } from "../../helper/variables";
import { Container } from "react-bootstrap";
import Checkbox from "../../components/formComponent/Checkbox";

const Privacy = () => {
  return (
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2">Privacy Statement</h2>
        </div>
        <div className="panel_center-sec mb-4">
          <div
            className="panel_center-top"
            style={{ border: "none" }}
          >
            <h3 className="text-h3 mb-4">{applicantVariables.heading}</h3>
            <p className="para1">{applicantVariables.subHeading}</p>
            <Checkbox className="mt-4"
              id="checkbox1"
              label="I Confirm I have reviewed the privacy statement and understand
                how my data will be processed."
            />
            <div className="mt-4 d-block">
              <Link to='register' className="d-flex justify-content-center"><button className="btn_stroke btn_lg">Next</button></Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Privacy;
