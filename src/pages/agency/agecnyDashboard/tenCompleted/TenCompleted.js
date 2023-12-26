import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import TenCompTable from "./TenCompTable";

const TenCompleted = () => {
  return (
    <Container>
      <div className="panel agency_panel mt-3">
        <div className="panel_center-sec py-0">
          <div className="app_details app_details-commence btn-btm-line">
            <Tabs defaultActiveKey="first">
              <Tab
                eventKey="first"
                title={
                  <React.Fragment >
                    Tenancies (Complete) Due to Commence (&lt; 10 days)
                    <div className="badge-num">4</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <TenCompTable className='sending-table' />
                </div>
              </Tab>
              <Tab
                eventKey="second"
                title={
                  <React.Fragment>
                    New
                    <div className="badge-num">4</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <TenCompTable className='sending-table' />
                </div>
              </Tab>
              <Tab
                eventKey="third"
                title={
                  <React.Fragment>
                    Partial Renewal
                    <div className="badge-num">4</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <TenCompTable className='sending-table' />
                </div>
              </Tab>
              <Tab
              eventKey="fourth"
              title={
                <React.Fragment>
                  Renewal
                  <div className="badge-num">4</div>
                </React.Fragment>
              }
            >
              <div className="custom-table">
                <TenCompTable className='sending-table' />
              </div>
            </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TenCompleted