import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import AppContent from "./AppContent";
import { useDispatch } from "react-redux";
import { ADD_TENANTS_MODAL } from "../../../../components/customModal/ModalConstants";
import { mdActions } from "../../../../store/modal-slice";

const Applicants = () => {
  const dispatch = useDispatch();
  const addApplicantHandler = () => {
    dispatch(mdActions.showModal({type: ADD_TENANTS_MODAL}));
  };

  return (
    <>
      <div className="mt-4 d-flex justify-content-end pe-3" style={{marginBottom:'-43px'}}>
        <button className="btn_light2 btn_sm" onClick={addApplicantHandler}>
          Add Applicant
        </button>
      </div>
      <Tabs defaultActiveKey="1" className=" tab-bg">
        <Tab eventKey="1" title="Rose Budd 11">
          <AppContent />
        </Tab>
        <Tab eventKey="2" title="Sam Hardy">
          <AppContent />
        </Tab>
        <Tab eventKey="3" title="Emaa Watson">
          <AppContent />
        </Tab>
      </Tabs>
    </>
  );
};

export default Applicants;
