import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import DefaultCustom from "./DefaultCustom";
import Custom from "./Custom";

const Settings = () => {
  return (
    <Container className="pt-md-5 pt-4">
      <div className="panel">
        <div className="panel_center-sec pt-0 mb-2">
          <div className="app_details position-relative">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Default Customization">
                <DefaultCustom />
              </Tab>
              <Tab eventKey="second" title="Customization">
                <Custom />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
