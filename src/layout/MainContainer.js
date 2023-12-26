import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Modal from "../components/customModal/Modal";
import AppHeader from "../pages/applicant/AppHeader";
import AgencyHeader from "../pages/agency/AgencyHeader";
import AdminHeader from "../pages/admin/AdminHeader";
import {
  ADMIN,
  AGENCY,
  APPLICANT_DASHBOARD,
} from "../helper/constants/UserConstant";

const MainContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isModal = useSelector((state) => state.modal.isModal);
  const userType = useSelector((state) => state.user.userType);
  const token = localStorage.getItem("token");
  const appToken = localStorage.getItem("applicantToken");
  const authRole = localStorage.getItem("authRole");

  useEffect(() => {
    if (
      !token &&
      (location.pathname === "/admin" || location.pathname === "/agency")
    ) {
      navigate("/");
    } else if (!appToken && location.pathname === "/applicant") {
      navigate("/");
    }
  }, []);

  const pathname = location.pathname;
  //if path is tenancy-details or help-contact or profile page then do not show header bottom for agency panel
  //And path is profile or admin/agency-setting do not show header bottom for admin panel
  const adminHeaderBottom =
    userType === ADMIN &&
    !pathname.includes("profile") &&
    !pathname.includes("agency-setting");
  const agencyHeaderBottom =
    userType === AGENCY &&
    authRole === "1" &&
    pathname !== "/admin/agency-setting" &&
    !pathname.includes("profile") &&
    !pathname.includes("help-contact") && !pathname.includes("/agency/tenancy-applicants");
  const applicantHeaderBottom =
    userType === APPLICANT_DASHBOARD && !pathname.includes("dashboard");

  return (
    <>
      <Header />
      <div className="panel_main-wrapper">
        <div className="panel_app">
          {applicantHeaderBottom && <AppHeader />}
          {adminHeaderBottom && <AdminHeader />}
          {agencyHeaderBottom && <AgencyHeader />}
          <Outlet />
        </div>
      </div>
      {isModal && <Modal />}
    </>
  );
};
export default MainContainer;

// const isHeaderBottom =
//   pathname.includes("tenancy-detail") ||
//   pathname.includes("help-contact") ||
//   pathname.includes("profile") ||
//   pathname.includes("admin/agency-setting") ||
//   /^\/employment\/[\w]+\/[\w]+$/.test(pathname) ||
//   /^\/guarantor\/[\w]+\/[\w]+$/.test(pathname) ||
//   /^\/landlord\/[\w]+\/[\w]+$/.test(pathname);

// console.log(isHeaderBottom, "this is header bottom")
