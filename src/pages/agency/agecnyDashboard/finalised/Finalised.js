import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import FinalTable from "./FinalTable";

const Finalised = () => {
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
                    Recently Finalized &lt; 14 days
                    <div className="badge-num">4</div>
                  </React.Fragment>
                }
              >
                <div className="custom-table">
                  <FinalTable className='sending-table' />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Finalised