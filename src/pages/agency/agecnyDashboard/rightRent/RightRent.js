import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import ExpiryTable from "./ExpiryTable";
import ExpiredTable from "./ExpiredTable";

const RightRent = () => {
  return (
    <Container>
      <div className="panel agency_panel mt-3">
        <div className="panel_center-sec py-0">
          <div className="app_details">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Right to Rent Expired">
                <div className="custom-table">
                  <ExpiryTable className='rent-table'/>
                </div>
              </Tab>
              <Tab eventKey="second" title="Right to Rent Expiring within 30 Days">
                <div className="custom-table">
                  <ExpiredTable className='rent-table'/>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RightRent;
