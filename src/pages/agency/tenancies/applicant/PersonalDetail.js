import React, { useState } from "react";
import Dropdown from "../../../../components/formComponent/Dropdown";
import Input from "../../../../components/formComponent/Input";
import RadioBtn from "../../../../components/formComponent/RadioBtn";
import DownloadFile from "../../../../components/formComponent/DownloadFile";
import viewIcon from "../../../../assets/images/view-doc.svg";
import TelInput from "../../../../components/formComponent/TelInput";
import EditIcon from "../../../../assets/images/edit-icon.svg";
import PaymentSchedule from "./PaymentSchedule";

let pauseOption = [
  { label: "Select option", value: "SO" },
  { label: "10 Days", value: "10" },
];

const paymentSchedule = [
  { date: "01-04-2023", amount: "£1000.00" },
  { date: "01-05-2023", amount: "£1000.00" },
  { date: "01-06-2023", amount: "£1000.00" },
  { date: "01-07-2023", amount: "£1000.00" },
  { date: "01-08-2023", amount: "£1000.00" },
  { date: "01-09-2023", amount: "£1000.00" },
];

const PersonalDetail = () => {
  const [insNumber, setInsNumber] = useState(false);
  const [status, setStatus] = useState(false);
  const [pauseStatus, setPauseStatus] = useState(false);

  return (
    <div className="px-xl-5 px-3">
      <div className="row mt-4">
        <div className="col-lg-6 pe-xl-4 px-2">
          <div className="contact-form" style={{ maxWidth: "100%" }}>
            <div className="contact_head">
              <h3 className="text_lg-green text-start m-0">Personal Details</h3>
            </div>
            <div className="contact-body" style={{ paddingBottom: "50px" }}>
              <div className="panel_form form-agency">
                <Input
                  type="text"
                  placeholder="Enter first name"
                  label="First Name"
                  value="Rose"
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="text"
                  placeholder="Enter middle name"
                  label="Middle Name"
                  value=""
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="text"
                  placeholder="Enter last name"
                  label="Last Name"
                  value="Budd"
                  disabled={true}
                  prepend={false}
                />
                <TelInput />
                <Input
                  type="email"
                  placeholder="Enter email address"
                  label="Email"
                  value="roseBudd@gmail.com"
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="date"
                  placeholder="Enter D.O.B."
                  label="Date of Birth"
                  value="2000-08-05"
                  disabled={true}
                  prepend={false}
                />
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">Student Status</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="stu-status"
                      id="stu-status-yes"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="stu-status"
                      id="stu-status-no"
                      defaultValue={false}
                    />
                  </div>
                </div>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">Employment Status</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="emp-status"
                      id="emp-status-yes"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="emp-status"
                      id="emp-status-no"
                      defaultValue={false}
                    />
                  </div>
                </div>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">UK/EU/International</p>
                  <div className="btn_group ">
                    <RadioBtn
                      label="UK"
                      name="stu-country"
                      id="stu-country-uk"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="EU/International"
                      name="stu-country"
                      id="stu-country-inter"
                      defaultValue={false}
                      className="radio-btn-lg"
                    />
                  </div>
                </div>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">
                    Do You Have a National Insurance Number?
                  </p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="ins-no"
                      id="ins-no-yes"
                      defaultValue={true}
                      clickAction={setInsNumber}
                    />
                    <RadioBtn
                      label="No"
                      name="ins-no"
                      id="ins-no-no"
                      defaultValue={false}
                      clickAction={setInsNumber}
                    />
                  </div>
                </div>
                {
                  insNumber ? 
                  <Input
                  type="text"
                  placeholder="Enter National Insurance Number"
                  label="National Insurance Number"
                  value=""
                  disabled={true}
                  prepend={false}
                  className="flex-100"
                />:''
                }
                
                <Input
                  type="text"
                  placeholder="Enter university name"
                  label="University Name"
                  value="Lorem Ipsum University"
                  disabled={true}
                  prepend={false}
                  className="flex-100"
                />
                <Input
                  type="text"
                  placeholder="Enter course title"
                  label="Course Title"
                  value="Lorem Ipsum University"
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="text"
                  placeholder="Enter year of graduation"
                  label="Year of Graduation"
                  value="2024"
                  disabled={true}
                  prepend={false}
                />
                <Input
                  type="date"
                  placeholder="Enter expiry date"
                  label="Right to Rent Expiry"
                  value=""
                  disabled={false}
                  prepend={false}
                />
                {/*Files */}
                <div className="panel_form form-agency">
                  <Input
                    type="text"
                    placeholder="Signature"
                    label="Signature"
                    value="sign.pdf"
                    disabled={true}
                    prepend={false}
                    className="flex-80"
                  />
                  <p className="d-flex align-items-center ms-lg-0 doc-dv">
                    <span>
                      <img
                        src={viewIcon}
                        alt="view-icon"
                        className="view-icon ms-3"
                      />
                    </span>
                    <span className="ms-3 view-icon">
                      <DownloadFile />
                    </span>
                  </p>
                  <Input
                    type="text"
                    placeholder="Passport"
                    label="Document Type"
                    value="Passport"
                    disabled={true}
                    prepend={false}
                    className="flex-80"
                  />
                  <Input
                    type="text"
                    placeholder=""
                    label="Selfie holding the Passport Document"
                    value="selfie passport.pdf"
                    disabled={true}
                    prepend={false}
                    className="flex-80"
                  />
                  <p className="d-flex align-items-center ms-lg-0 doc-dv">
                    <span>
                      <img
                        src={viewIcon}
                        alt="view-icon"
                        className="view-icon ms-3"
                      />
                    </span>
                    <span className="ms-3 view-icon">
                      <DownloadFile />
                    </span>
                  </p>
                  <Input
                    type="text"
                    placeholder="Passport Document"
                    label="Passport Document"
                    value="passport.pdf"
                    disabled={true}
                    prepend={false}
                    className="flex-80"
                  />
                  <p className="d-flex align-items-center ms-lg-0 doc-dv">
                    <span>
                      <img
                        src={viewIcon}
                        alt="view-icon"
                        className="view-icon ms-3"
                      />
                    </span>
                    <span className="ms-3 view-icon">
                      <DownloadFile />
                    </span>
                  </p>
                </div>
                <div class="input-box flex-100 pb-5">
                  <label class="form-labels" htmlFor="note">
                    Notes
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    placeholder="Type your message"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales."
                    className="flex-100"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 ps-xl-4 px-2 mt-xl-0 mt-4">
          <div className="contact-form" style={{ maxWidth: "100%" }}>
            <div className="contact_head">
              <h3 className="text_lg-green text-start m-0">Pause Application</h3>
            </div>
            <div className="contact-body">
              <div className="panel_form">
                <div class="input-box flex-100">
                  <div className="pause-btn-wpr">
                    <Dropdown label="" option={pauseOption} />  
                    <button className={pauseStatus ? "btn_light2 filled px-3 py-2 invert": "btn_light2 gray px-3 py-2 invert"} onClick={() => setPauseStatus(!pauseStatus)}>
                        {pauseStatus ? "Paused" : "Un Pause"}
                    </button>
                  </div>
                  {pauseStatus ? <small className="text-danger">Paused From Last 6 Days</small> : ''}
                </div>
              </div>
              {/* <div className="panel_que-btns flex-100 mt-4"> */}
                  {/* <p className="form-labels">Pause Status</p> */}
                  {/* <div className="btn_group"> */}
                    {/* <RadioBtn
                      label="Yes"
                      name="stu-status"
                      id="stu-status-yes"
                      defaultValue={!status}
                      // defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="stu-status"
                      id="stu-status-no"
                      // defaultValue={status}
                      // checked={true}
                      value={false}
                      defaultValue={false}
                      checked={true}
                    /> */}
                    {/* <div
                        className="radio-btn">
                        <input
                          type="radio"
                          id={"stu-status-yes"}
                          name={"stu-status"}
                          checked={true}
                        />
                        <label htmlFor={"stu-status-yes"} className="dummy-label">Yes</label>
                      </div>

                      <div
                        className="radio-btn">
                        <input
                          type="radio"
                          id={"stu-status-no"}
                          name={"stu-status"}
                          checked={false}
                        />
                        <label htmlFor={"stu-status-no"}>No</label>
                      </div> */}
                    
                  {/* </div> */}
                {/* </div> */}
            </div>
          </div>
          <div className="contact-form mt-4" style={{ maxWidth: "100%" }}>
            <div className="contact_head">
              <h3 className="text_lg-green text-sm-start text-center m-0">
                Payment Schedule
              </h3>
            </div>
            <div className="contact-body payment-sch">
              <div className="row mb-4">
                <div className="col-4">
                  <p className="form-labels text-center fw-600">Date</p>
                </div>
                <div className="col-4">
                  <p className="form-labels text-center fw-600">
                    Rental Amount
                  </p>
                </div>
                <div className="col-4">
                  <p className="form-labels text-center fw-600">Action</p>
                </div>
              </div>
              {paymentSchedule.map((item, index) => {
                return <PaymentSchedule key={index} item={item} />;
              })}
            </div>
          </div>
          <div className="mt-5 d-flex justify-content-center">
            <button className="btn_filled btn_md">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;
