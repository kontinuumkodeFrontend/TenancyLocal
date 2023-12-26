import React from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import Information from "../../../components/information/Information";
import EmailServerSetting from "../../../components/EmailServerSetting";

const AgencySetting = () => {
  return (
    <Container className="pt-md-5 pt-4">
      <div className="panel">
        <div className="panel_center-sec pt-0 mb-2">
          <div className="app_details position-relative">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Email Server Settings">
                <EmailServerSetting/>
              </Tab>
              <Tab eventKey="second" title="Super Admin Agency Information">
                <Information />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgencySetting;
