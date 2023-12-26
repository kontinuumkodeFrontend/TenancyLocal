import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import InspectTable from "./InspectTable";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import { SEND_MAIL_MODAL } from "../../../components/customModal/ModalConstants";

const Inspection = () => {
  const dispatch = useDispatch();

  const sendMailHandler = ()=>{
    dispatch(mdActions.showModal({type:SEND_MAIL_MODAL}));
  }
  return (
    <Container>
      <div className="panel agency_panel mt-4">
        <div className="panel_head pb-4">
          <h5 className="text-h5 text-start">Interim Inspections</h5>
        </div>
        <div className="panel_center-sec py-0">
          <div className="app_details position-relative">
            <div className="send-email">
              <button className="btn_filled btn_md" onClick={sendMailHandler}>Send Email</button>
            </div>
            <Tabs defaultActiveKey="first">
              <Tab
                eventKey="first"
                title={
                  <React.Fragment>
                    Inspections Due Month
                    <div className="badge-num">0</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <InspectTable className="inspection-table " />
                </div>
              </Tab>
              <Tab
                eventKey="second"
                title={
                  <React.Fragment>
                    Past Due Dates
                    <div className="badge-num">0</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <InspectTable className="inspection-table" />
                </div>
              </Tab>
              <Tab
                eventKey="third"
                title={
                  <React.Fragment>
                    Done Date
                    <div className="badge-num">0</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <InspectTable className="inspection-table" />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Inspection;
