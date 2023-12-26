import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AgencyActions from "./AgencyActions";

const AgencyDashboard = () => {
  const [title, setTitle] = useState('Actions');

  const changeTitleHandler = (text) => {
    setTitle(text);
  }
  return (
    <>
      <div className="agency_banner">
        <div className="banner_top">
          <p>Hello Thomas !</p>
          <h3>Welcome to Tenancy Hive</h3>
        </div>
        <div className="banner_bottom">
          <ul>
            <li>
              <p>Active Tenancies</p>
              <h4>2</h4>
            </li>
            <li>
              <p>Complete Tenancies Last 2 Weeks</p>
              <h4>4</h4>
            </li>
            <li>
              <p>Average No of Days to Complete a Tenancy</p>
              <h4>3</h4>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-3">
        <Container>
          <div className="panel">
            <div className="d-flex justify-content-between align-items-sm-start align-items-center mb-3">
              <h5 className="text-h5 text-start">{title}</h5>
              <select className="staff-dropdown" defaultValue='0'>
                <option disabled value='0'>Staff</option>
                <option value='1'>Agency XYZ</option>
                <option value='2'>Agency ABC</option>
                <option value='3'>Agency PQR</option>
                <option value='4'>Everybody</option>
              </select>
            </div>
            <AgencyActions titleHandler={changeTitleHandler} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default AgencyDashboard;
