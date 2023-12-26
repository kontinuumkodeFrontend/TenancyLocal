import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { applicantVariables } from "../../helper/variables";
import DownloadFile from "../../components/formComponent/DownloadFile";
import Checkbox from "../../components/formComponent/Checkbox";

const TenancyInfo = () => {
  return (
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2"> Tenancy Information</h2>
        </div>
        <div className="panel_center-sec mb-4">
          <div className="panel_center-top panel_inner-pb">
            <h3 className="text-h3 mb-4">{applicantVariables.heading}</h3>
            <p className="para1">{applicantVariables.subHeading}</p>
            <div className="mt-sm-5 mt-4 text-center">
              <p className="text-uppercase  text_lg-green">Property Address</p>
              <p className="text_lg mt-3">
                Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN
              </p>
            </div>
          </div>
          <div className="panel_center-mid panel_inner-pt">
            <div className="d-flex flex-column justify-content-center gap-sm-4 gap-3">
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>Deposit</span> (Whole tenancy amount)
                </p>
                <p className="text_lg">£253.00</p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>Holding fee </span>(Whole tenancy amount)
                </p>
                <p className="text_lg">£253.00</p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>monthly rent </span> (Whole tenancy amount)
                </p>
                <p className="text_lg">£253.00</p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>parking cost</span> (PCM)
                </p>
                <p className="text_lg">£253.00</p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>total amount </span>(Whole tenancy amount)
                </p>
                <p className="text_lg">£253.00</p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>Tenancy term</span>
                </p>
                <p className="text_lg">01/03/2023 to 01/03/2025</p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>rent includes</span>
                </p>
                <p className="text_lg ">Gas, Water </p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>Gas Certificate Expiry Date</span>
                </p>
                <p className="text_lg d-flex gap-sm-4 gap-3">
                  29-09-2026
                  <span>
                    <DownloadFile />
                  </span>
                </p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>epc certificate expiry date</span>
                </p>
                <p className="text_lg d-flex gap-sm-4 gap-3">
                  29-09-2026
                  <span>
                    <DownloadFile />
                  </span>
                </p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>electric certificate expiry date</span>
                </p>
                <p className="text_lg d-flex gap-sm-4 gap-3">
                  19-07-2025
                  <span>
                    <DownloadFile />
                  </span>
                </p>
              </div>
              <div className="tenancy-info">
                <p className="text_lg-green">
                  <span>Applicants in this tenancy</span>
                </p>
                <div className="app-list">
                  <div className="d-flex gap-3 flex-column">
                    <p className="text_lg text-start">Harry Potter</p>
                    <p className="text_lg">Lucy Bright</p>
                    <p className="text_lg">Draco Malfoy</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Checkbox
                className="mt-4"
                id="checkbox1"
                label="I have checked the above terms of this tenancy and confirm it is correct."
              />
              <div className="text-center mt-4 gap-3 d-flex justify-content-center ">
                <Link to={-1}>
                  <button className="btn_dark btn_lg">Back</button>
                </Link>
                <Link to="/applicant/questions">
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

export default TenancyInfo;
