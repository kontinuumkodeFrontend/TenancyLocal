import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Input from "../../components/formComponent/Input";
import RadioBtn from "../../components/formComponent/RadioBtn";
import TelInput from "../../components/formComponent/TelInput";

const Application = () => {
  const [rentBefore, setRentBefore] = useState();
  const rentHandler = (value) => {
    setRentBefore(value);
  };

  return (
    <Container>
      <div className="panel">
        <div className="panel_head panel_inner-pb">
          <h2 className="text-h2">Reference details</h2>
        </div>
        <div className="panel_center-sec">
          <div className="panel_center-top pb-4">
            <h5 className="text-h5">Guarantor Details</h5>
          </div>
          <div className="panel_center-mid my-sm-5 my-4">
            <div className="panel_form">
              <Input
                type="text"
                placeholder="Enter guarantor name"
                label="Name"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <TelInput />
              <Input
                type="text"
                placeholder="Enter email address"
                label="Guarantor Email Address"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                defaultValue=""
                placeholder="Re-enter email address"
                label="Confirm Guarantor Email Address"
                disabled={false}
                prepend={false}
              />
            </div>
          </div>
          <div className="panel_center-top pb-4">
            <h5 className="text-h5">Student Details</h5>
          </div>
          <div className="panel_center-mid my-sm-5 my-4">
            <div className="panel_form">
              <Input
                type="text"
                placeholder="Enter university name"
                label="Name of University"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter course title"
                label="Course Title"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter year of graduation"
                label="Year of Graduation"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
            </div>
          </div>
          <div className="panel_center-top pb-4">
            <h5 className="text-h5">Direct Family / Next of Kin Address</h5>
          </div>
          <div className="panel_center-mid my-sm-5 my-4">
            <div className="panel_form">
              <Input
                type="text"
                placeholder="Enter post code"
                label="Postcode Lookup"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter street"
                label="Street"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter town or city"
                label="Town/City"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter country"
                label="Country"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="number"
                placeholder="Enter number of years"
                label="How Many Years At This Address"
                value=""
                disabled={false}
                prepend={false}
              />

            </div>
            <div className="panel_form" style={{ marginTop: "30px" }}>
              <Input
                type="date"
                placeholder=""
                label="Move In Date"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="date"
                placeholder=""
                label="Move Out Date"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
            </div>
          </div>
        </div>
        <div className="panel_center-sec mt-5">
          <div className="panel_center-top pb-4">
            <h5 className="text-h5">Have You Rented Before</h5>
            <p
              className="helper-text text-center mt-2"
              style={{ fontSize: "14px" }}
            >
              (Living in Halls of Residence is considered Renting)
            </p>
          </div>
          <div className="panel_center-mid my-sm-5 my-4">
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
            <div>
              <div className="panel_center-top pb-4">
                <h5 className="text-h5">Details of Previous Addresses</h5>
              </div>
              <div className="panel_center-mid my-sm-5 my-4">
                <div className="panel_form">
                  <Input
                    type="text"
                    placeholder="Enter name"
                    label="Landlord/Agent Name"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <TelInput label='Landlord/Agent Phone Number' />
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    label="Landlord/Agent Email Address"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    label="Confirm Landlord/Agent Email Address"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="text"
                    placeholder="Enter year of graduation"
                    label="Address whilst renting with this Landlord/Agent"
                    valdefaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="date"
                    placeholder=""
                    label="Date your Tenancy started with this Landlord/Agent"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="date"
                    placeholder=""
                    label="Date your Tenancy will end with this Landlord/Agent"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-3 gap-sm-4 gap-3 d-flex justify-content-center ">
            <Link to={-1}>
              <button className="btn_dark btn_lg">Back</button>
            </Link>
            <Link to="/confirm">
              <button className="btn_stroke btn_lg">Next</button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Application;
