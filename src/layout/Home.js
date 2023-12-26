import React from "react";
import { Link } from "react-router-dom";
import HomeImg from "../assets/images/home-img.png"

const Home = () => {
  return (
    <div className="auth_panel">
      <div className="container">
        <div className="auth_panel-center home">
          <img src={HomeImg} alt="img" />
          <h2>Join Tenancy Community!</h2>
          <ul className="d-flex flex-column justify-content-center">
            <Link to="/login">Agency Login</Link>
            <Link to="/app/login">Applicant Login</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
