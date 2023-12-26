import React from "react";
import { Link } from "react-router-dom";
import Summary from "./Summary";
import Document from "./Document";
import { Progress } from "./Progress";
import PropertyDetails from "../../../components/PropertyDetails";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container className="pt-5">
      <div className="app_db">
        <div className="app_db-actions d-flex gap-3">
          <button className="btn_filled">
            Design TestPropertyRef_2023-05-01
          </button>
        </div>
        <PropertyDetails />
        <Summary />
        <div className="app_db-actions flex-wrap mt-md-5 mt-4 d-flex gap-3">
          <Link to="applicant/agreement">
            <button className="btn_filled">Sign Tenancy Documents</button>
          </Link>
          <button className="btn_stroke2">Sign Extension Agreement</button>
        </div>
        <Document />
        <Progress />
      </div>
    </Container>
  );
};

export default Dashboard;
