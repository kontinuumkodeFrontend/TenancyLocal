import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import DefaultEmail from "../../../../components/customSettings/DefaultEmail";
import Text from "../../../../components/customSettings/Text";
import Agreement from "../../../../components/customSettings/Agreement";
import Documents from "./Documents";

const Customization = () => {
  return (
    <Container>
      <div className="panel agency_panel mt-4">
        <div className="panel_head pb-4">
          <h5 className="text-h5 text-start">
            Agency Settings (Customizations)
          </h5>
        </div>
        <div className="panel_center-sec pt-0 mb-2">
          <div className="app_details position-relative">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Default Documents">
                <Documents />
              </Tab>
              <Tab eventKey="second" title="Emails" className="px-lg-5 px-3">
                <DefaultEmail />
              </Tab>
              <Tab eventKey="third" title="Text for Specific Area" className="px-lg-5 px-3">
                <Text />
              </Tab>
              <Tab eventKey="fourth" title="Tenancy Agreement" className="px-lg-5 px-3">
                <Agreement />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Customization;
