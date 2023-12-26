import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Logo from "../assets/images/tenancy_logo.png";
import Account from "../components/account/Account";
import {
  APPLICANT_DASHBOARD,
  ADMIN,
  AGENCY,
} from "../helper/constants/UserConstant";

export const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const userType = useSelector((state) => state.user.userType);
  let url;
  let hideAccount = false;
  const authRole = localStorage.getItem("authRole");
  if (
    /^\/employment\/[\w]+\/[\w]+$/.test(pathname) ||
    /^\/guarantor\/[\w]+\/[\w]+$/.test(pathname) ||
    /^\/landlord\/[\w]+\/[\w]+$/.test(pathname)
  ) {
    url = "";
    hideAccount = true;
  } else if (
    pathname === "/applicant" ||
    pathname === "/applicant/register" ||
    pathname === "/applicant/tenancy-info" ||
    pathname === "/applicant/questions" ||
    pathname === "/applicant/application" ||
    pathname === "/applicant/confirm-details"
  ) {
    hideAccount = true;
  } else if (authRole === "1") {
    url = "/agency";
  } else if (authRole === "2") {
    url = "/admin";
  }

  return (
    <header>
      <Container>
        <div className="d-flex justify-content-between">
          <div className="logo">
            <Link to={url}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          {(hideAccount ? null : <Account />)}
        </div>
      </Container>
    </header>
  );
};

// {(userType === APPLICANT_DASHBOARD ||
//   userType === ADMIN ||
//   userType === AGENCY) && <Account />}