import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import EPC from "./EPC";
import Gas from "./Gas";
import EICR from "./EICR";
import HMO from "./HMO";
import FireAlarm from "./FireAlarm";

const PropCerti = () => {
  return (
    <Container>
      <div className="panel agency_panel mt-3">
        <div className="panel_center-sec py-0">
          <div className="app_details">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="EPC">
                <div className="custom-table">
                  <EPC className='certi-table'/>
                </div>
              </Tab>
              <Tab eventKey="second" title="Gas">
                <div className="custom-table">
                  <Gas className='certi-table'/>
                </div>
              </Tab>
              <Tab eventKey="third" title="EICR">
                <div className="custom-table">
                  <EICR className='certi-table'/>
                </div>
              </Tab>
              <Tab eventKey="fourth" title="HMO">
                <div className="custom-table">
                  <HMO className='certi-table'/>
                </div>
              </Tab>
              <Tab eventKey="fifth" title="Fire Alarm">
                <div className="custom-table">
                  <FireAlarm className='certi-table'/>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PropCerti;
