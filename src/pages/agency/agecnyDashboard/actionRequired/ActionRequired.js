import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import StalledTable from "./stalledApp/StalledTable";
import AwaitingReview from "./awaitingReview/AwaitingReview";
import FailedReview from "./failedApp/FailedReview";

const ActionRequired = () => {
  return (
    <Container>
      <div className="panel agency_panel mt-3">
        <div className="panel_center-sec py-0">
          <div className="app_details">
            <Tabs defaultActiveKey="first">
              <Tab
                eventKey="first"
                title={
                  <React.Fragment>
                    Problematic/Stalled Applications
                    <div className="badge-num">0</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <StalledTable className='action-table' />
                </div>
              </Tab>
              <Tab
                eventKey="second"
                title={
                  <React.Fragment>
                    Awaiting Reviews
                    <div className="badge-num">0</div>
                  </React.Fragment>
                }
              >
                <AwaitingReview />
              </Tab>
              <Tab
                eventKey="third"
                title={
                  <React.Fragment>
                    Failed Application Review
                    <div className="badge-num">0</div>
                  </React.Fragment>
                }
              >
                <FailedReview />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ActionRequired;
