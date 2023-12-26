import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import GuarantorDetails from "./GuarantorDetails";
import StudentDetails from "./StudentDetails";
import FamilyDetails from "./FamilyDetails";
import RadioBtn from "../../../components/formComponent/RadioBtn";
import PreviousAdd from "./PreviousAdd";
import EmpDetails from "./EmpDetails";
import QuatPayProof from "./QuatPayProof";
import FullPayProof from "./FullPayProof";

const Application = () => {
  const [rentBefore, setRentBefore] = useState();
  const rentHandler = (value) => {
    setRentBefore(value);
  };
  return (
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2">Reference details</h2>
        </div>
        <div className="panel_center-sec">
          <GuarantorDetails />
          <StudentDetails />
          <FamilyDetails />
          <EmpDetails/>
          <QuatPayProof/>
          <FullPayProof/>
        </div>
        <div className="panel_center-sec mt-4 mb-4">
          <div className="panel_center-top pb-4">
            <h5 className="text-h5">Have You Rented Before</h5>
            <p
              className="helper-text text-center mt-2"
              style={{ fontSize: "14px" }}
            >
              (Living in Halls of Residence is considered Renting)
            </p>
          </div>
          <div className="panel_center-mid my-4">
            <div className="panel_que-btns flex-100 align-items-center">
              <p className="form-labels">Have You Rented Before</p>
              <div className="btn_group">
                <RadioBtn
                  label="Yes"
                  name="rent"
                  id="rent-yes"
                  defaultValue={true}
                  clickAction={rentHandler}
                />
                <RadioBtn
                  label="No"
                  name="rent"
                  id="rent-no"
                  defaultValue={false}
                  clickAction={rentHandler}
                />
              </div>
            </div>
          </div>
          {rentBefore && (
            <PreviousAdd />
          )}
          <div className="text-center mt-sm-5 mt-4 gap-3 d-flex justify-content-center ">
            <Link to={-1}>
              <button className="btn_dark btn_lg">Back</button>
            </Link>
            <Link to="/applicant/confirm-details">
              <button className="btn_stroke btn_lg">Next</button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Application