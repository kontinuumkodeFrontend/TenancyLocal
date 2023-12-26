import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input";
import CustomSwitch from "../formComponent/CustomSwitch";
import Dropdown from "../formComponent/Dropdown";

const EditStaff = () => {
  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  const appPermissions = [
    { label: "Add Landlord", defaultChecked: true },
    { label: "Edit Landlord", defaultChecked: false },
    { label: "Add Property", defaultChecked: true },
    { label: "Edit Property", defaultChecked: true },
    { label: "Add Tenancy", defaultChecked: false },
    { label: "Edit Tenancy", defaultChecked: true },
    { label: "Delete Tenancy", defaultChecked: true },
    { label: "Edit Applicant", defaultChecked: false },
    { label: "Delete Applicant", defaultChecked: false },
  ];

  const advPermissions = [
    { label: "Review a Tenancy Application", defaultChecked: false },
    { label: "Change Tenancy Negotiator", defaultChecked: true },
    { label: "Manually Change Tenancy Status", defaultChecked: true },
    { label: "Manually Change Property Status", defaultChecked: false },
    { label: "Can Access Agency Customisations", defaultChecked: true },
    { label: "Can Access Agency Configurations", defaultChecked: true },
    { label: "Can Create/Edit Staff User", defaultChecked: false },
  ];

  let assignStaffOptions = [
    { label: "Choose Staff", value: "CS" },
    { label: "Staff 1 ", value: "1" },
    { label: "Staff 2 ", value: "2" },
    { label: "Staff 3", value: "3" },
    { label: "Staff 4", value: "4" },
  ];

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Edit Staff Details & Permissions</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5 ">
        <div className="app_details position-relative staff_details">
          <Tabs defaultActiveKey="first">
            <Tab eventKey="first" title="Staff Details">
              <div className="mt-3">
                <div className="panel_form form-agency mt-4">
                  <Input
                    type="text"
                    placeholder="Enter first name"
                    label="First Name"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="text"
                    placeholder="Enter last name"
                    label="Last Name"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    label="Email"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                    className="flex-100"
                  />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    label="Password"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    label="Confirm Password"
                    defaultValue=""
                    disabled={false}
                    prepend={false}
                  />
                  <div className="mx-auto">
                    <label className="form-labels">Activate</label>
                    <CustomSwitch />
                  </div>
                </div>
                <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap mb-4">
                  <button
                    className="btn_filled btn_sm"
                    onClick={hideModalHandler}
                  >
                    Update Staff Information
                  </button>
                  <button
                    className="btn_filled btn_sm"
                    onClick={hideModalHandler}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="mt-3 border-top">
                <h3 className="para1 fw-500">Please assign associated data of this staff to another staff member.</h3>
                <div className="panel_form form-agency mt-4">
                  <Dropdown
                    label="Assign to Staff"
                    option={assignStaffOptions}
                    className="flex-100"
                  />
                </div>
                <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                  <button
                    className="btn_danger btn_sm"
                    onClick={hideModalHandler}
                  >
                    Delete
                  </button>
                  <button
                    className="btn_filled btn_sm"
                    onClick={hideModalHandler}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Tab>
            <Tab eventKey="second" title="Applicant Permissions">
              <div className="mt-3 app_perm">
                {appPermissions.map((item, index) => {
                  return (
                    <div className="perm_switch" key={index}>
                      <label className="form-labels">{item.label}</label>
                      <CustomSwitch isChecked={item.defaultChecked} />
                    </div>
                  );
                })}
              </div>
              <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                <button
                  className="btn_filled btn_sm"
                  onClick={hideModalHandler}
                >
                  Update Staff Permissions
                </button>
                <button
                  className="btn_filled btn_sm"
                  onClick={hideModalHandler}
                >
                  Cancel
                </button>
              </div>
            </Tab>
            <Tab eventKey="third" title="Advanced Permissions">
              <div className="mt-3 app_perm">
                {advPermissions.map((item, index) => {
                  return (
                    <div className="perm_switch perm_switch-adv" key={index}>
                      <label className="form-labels">{item.label}</label>
                      <CustomSwitch isChecked={item.defaultChecked} />
                    </div>
                  );
                })}
              </div>
              <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                <button
                  className="btn_filled btn_sm"
                  onClick={hideModalHandler}
                >
                  Update Staff Permissions
                </button>
                <button
                  className="btn_filled btn_sm"
                  onClick={hideModalHandler}
                >
                  Cancel
                </button>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EditStaff;
