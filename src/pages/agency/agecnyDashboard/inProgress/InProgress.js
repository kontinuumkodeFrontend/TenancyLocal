import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import AwaitAppTable from "./AwaitAppTable";
import AwaitRefTable from "./AwaitRefTable";
import AwaitSignTable from "./AwaitSignTable";

const InProgress = () => {
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
                    Awaiting Applications
                    <div className="badge-num">1</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <AwaitAppTable className='await-app-table'/>
                </div>
              </Tab>
              <Tab
                eventKey="second"
                title={
                  <React.Fragment>
                    Awaiting References
                    <div className="badge-num">2</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <AwaitRefTable className='await-app-table'/>
                </div>
              </Tab>
              <Tab
                eventKey="third"
                title={
                  <React.Fragment>
                    Awaiting Signing
                    <div className="badge-num">3</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <AwaitSignTable className='await-app-table'/>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default InProgress;
