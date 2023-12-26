import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Requirement from "./requirement/Requirement";
import BulkImport from "./BulkImport";
import Billing from "./Billing";
import AgencyInfo from "./AgencyInfo";
import Chasing from "./Chasing";
import Financial from "./Financial";
import EmailServerSetting from "../../../../components/EmailServerSetting";

const AgencyConfig = () => {
    return (
        <Container>
            <div className="panel agency_panel mt-4">
                <div className="panel_head pb-4">
                    <h5 className="text-h5 text-start">
                        Agency Settings (Configurations)
                    </h5>
                </div>
                <div className="panel_center-sec pt-0 mb-2">
                    <div className="app_details position-relative config_details">
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="Email Server Settings">
                                <EmailServerSetting />
                            </Tab>
                            <Tab eventKey="second" title="Agency Requirements">
                                <Requirement />
                            </Tab>
                            <Tab eventKey="third" title="Bulk Data Import">
                                <BulkImport />
                            </Tab>
                            <Tab eventKey="fourth" title="Subscription/Billing Details">
                                <Billing />
                            </Tab>
                            <Tab eventKey="fifth" title="Agency Information">
                                <AgencyInfo />
                            </Tab>
                            <Tab eventKey="sixth" title="Chasing">
                                <Chasing />
                            </Tab>
                            <Tab eventKey="seventh" title="Financial Configurations">
                                <Financial />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AgencyConfig;
