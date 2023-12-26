import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainContainer from "./MainContainer";

import Register from "../pages/applicant/Register";
import TenancyInfo from "../pages/applicant/TenancyInfo";
import Questionnaire from "../pages/applicant/Questionnaire";
import Application from "../pages/applicant/application/Application";
import ConfirmDetails from "../pages/applicant/ConfirmDetails";
import DashAgreement from "../pages/applicant/dashboard/DashAgreement";

import AgencyDetail from "../pages/admin/AgencyDetail";
import AgencySetting from "../pages/admin/agencySettings/AgencySetting";
import Settings from "../pages/admin/settings/Settings";
import Statistics from "../pages/admin/statistics/Statistics";

import Inspection from "../pages/agency/inspection/Inspection";
import Tenancies from "../pages/agency/tenancies/Tenancies";
import ViewTenancy from "../pages/agency/tenancies/ViewTenancy";
import AgencyProperty from "../pages/agency/agencyProperty/AgencyProperty";
import AgencyApplicant from "../pages/agency/agencyApplicant/AgencyApplicant";
import AgencyLandlord from "../pages/agency/agencyLandlord/AgencyLandlord";
import Customization from "../pages/agency/settings/customization/Customization";
import Staff from "../pages/agency/settings/staff/Staff";
import AgencyConfig from "../pages/agency/settings/agencyConfig/AgencyConfig";
import AgencyStats from "../pages/agency/agencyStats/AgencyStats";
import ThanksPage from "../pages/ThanksPage";
import Contact from "../pages/agency/Contact";
import Profile from "../components/profile/Profile";
import Auth from "../pages/authentication/Auth";
import Home from "./Home";
import Protected from "./Protected";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/applicant/dashboard/Dashboard";
import {
  ADMIN,
  AGENCY,
  APPLICANT_DASHBOARD,
  APPLICANT_PANEL,
  EMPLOYER,
  GUARANTOR,
  LANDLORD,
  USER_NOT_ALLOWED,
} from "../helper/constants/UserConstant";
import { useSelector } from "react-redux";
import AgencyDashboard from "../pages/agency/agecnyDashboard/AgencyDashboard";
import GuarantorPanel from "../pages/GuarantorPanel";
import LandlordPanel from "../pages/LandlordPanel";
import EmployerPanel from "../pages/EmployerPanel";
import Privacy from "../pages/applicant/Privacy";
import Admin from "../pages/admin/Admin";
import VerifyAgency from "../pages/VerifyAgency";


const Router = () => {
  const userType = useSelector((state) => state.user.userType);

  const profileUserHandler = function () {
    //Setting user not allowed for landlord, gurantor and employer for profile route
    if (
      userType === LANDLORD ||
      userType === GUARANTOR ||
      userType === EMPLOYER
    ) {
      return USER_NOT_ALLOWED;
    } else {
      return userType;
    }
  };

  const profileUserType = profileUserHandler();
  console.log(profileUserType);

  return (
    <BrowserRouter>
      <Routes>
        {/*Agency Panel */}
        <Route path="/" element={<Home />} />

        {userType === AGENCY && <Route path="/agency/" element={<MainContainer />}>
          <Route index element={<AgencyDashboard />} />
          <Route
            path="interim-inspection"
            element={
              <Protected user={AGENCY}>
                <Inspection />
              </Protected>
            }
          />
          <Route
            path="tenancies"
            element={
              <Protected user={AGENCY}>
                <Tenancies />
              </Protected>
            }
          />
          <Route
            path="tenancy-applicants/:id"
            element={
              <Protected user={AGENCY}>
                <ViewTenancy />
              </Protected>
            }
          />
          <Route
            path="profile"
            element={
              <Protected user={AGENCY}>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="properties"
            element={
              <Protected user={AGENCY}>
                <AgencyProperty />
              </Protected>
            }
          />
          <Route
            path="applicants"
            element={
              <Protected user={AGENCY}>
                <AgencyApplicant />
              </Protected>
            }
          />
          <Route
            path="landlord"
            element={
              <Protected user={AGENCY}>
                <AgencyLandlord />
              </Protected>
            }
          />
          <Route
            path="settings/staff"
            element={
              <Protected user={AGENCY}>
                <Staff />
              </Protected>
            }
          />
          <Route
            path="settings/customization"
            element={
              <Protected user={AGENCY}>
                <Customization />
              </Protected>
            }
          />
          <Route
            path="settings/configuration"
            element={
              <Protected user={AGENCY}>
                <AgencyConfig />
              </Protected>
            }
          />
          <Route
            path="statistics"
            element={
              <Protected user={AGENCY}>
                <AgencyStats />
              </Protected>
            }
          />
          <Route
            path="help-contact"
            element={
              <Protected user={AGENCY}>
                <Contact />
              </Protected>
            }
          />
          <Route
            path="profile"
            element={
              <Protected user={profileUserType}>
                <Profile />
              </Protected>
            }
          />
          <Route path="login" element={<Auth />} />
        </Route>}

        {/*Admin Panel*/}
        {userType === ADMIN && <Route path="/admin/" element={<MainContainer />}>
          <Route index element={<Admin />} />
          <Route
            path="agency/:id"
            element={
              <Protected user={ADMIN}>
                <AgencyDetail />
              </Protected>
            }
          />
          <Route
            path="statistics"
            element={
              <Protected user={ADMIN}>
                <Statistics />
              </Protected>
            }
          />
          <Route
            path="settings"
            element={
              <Protected user={ADMIN}>
                <Settings />
              </Protected>
            }
          />
          <Route
            path="agency-setting"
            element={
              <Protected user={ADMIN}>
                <AgencySetting />
              </Protected>
            }
          />
          <Route
            path="profile"
            element={
              <Protected user={ADMIN}>
                <Profile />
              </Protected>
            }
          />
        </Route>}

        {/*Applicant Panel*/}
        {userType === APPLICANT_PANEL && <Route path="/applicant/" element={<MainContainer />}>
          <Route index element={<Privacy />} />
          <Route
            path="register"
            element={
              <Protected user={AGENCY}>
                <Register />
              </Protected>
            }
          />
          <Route
            path="tenancy-info"
            element={
              <Protected user={AGENCY}>
                <TenancyInfo />
              </Protected>
            }
          />
          <Route
            path="questions"
            element={
              <Protected user={AGENCY}>
                <Questionnaire />
              </Protected>
            }
          />
          <Route
            path="application"
            element={
              <Protected user={AGENCY}>
                <Application />
              </Protected>
            }
          />
          <Route
            path="confirm-details"
            element={
              <Protected user={AGENCY}>
                <ConfirmDetails />
              </Protected>
            }
          />
        </Route>}

        {/*Applicant Dashboard*/}
        {userType === APPLICANT_PANEL && <Route path="/applicant/dashboard/" element={<MainContainer />}>
          <Route index element={<Dashboard />} />
          <Route
            path="agreement"
            element={
              <Protected user={APPLICANT_DASHBOARD}>
                <DashAgreement />
              </Protected>
            }
          />
          <Route
            path="profile"
            element={
              <Protected user={APPLICANT_DASHBOARD}>
                <Profile />
              </Protected>
            }
          />
        </Route>}

        {/*Guarantor Panel*/}
        <Route path="/guarantor/:id/:code" element={<MainContainer />}>
          <Route index element={<GuarantorPanel />} />
        </Route>
        {/*Employer Panel*/}
        <Route path="/employment/:id/:code" element={<MainContainer />}>
          <Route index element={<EmployerPanel />} />
        </Route>
        {/*Landlord Panel*/}
        <Route path="/landlord/:id/:code" element={<MainContainer />}>
          <Route index element={<LandlordPanel />} />
        </Route>

        <Route
          path="/thanksPage"
          element={
            <Protected user={AGENCY}>
              <ThanksPage />
            </Protected>
          }
        />
        <Route path="login" element={<Auth />} />
        <Route path="/app/login" element={<Auth />} />
        <Route path="create-agency" element={<Auth />} />
        <Route path="/agency_link/:id" element={<VerifyAgency />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
