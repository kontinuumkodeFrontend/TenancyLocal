import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import icon1 from "../../assets/images/privacy-icon.svg";
import icon1Active from "../../assets/images/privacy-icon-active.svg";
import icon2 from "../../assets/images/register-icon.svg";
import icon2Active from "../../assets/images/register-icon-active.svg";
import icon3 from "../../assets/images/tenancy-icon.svg";
import icon3Active from "../../assets/images/tenancy-icon-active.svg";
import icon4 from "../../assets/images/app-que-icon.svg";
import icon4Active from "../../assets/images/app-icon-active.svg";
import icon5 from "../../assets/images/confirm-icon.svg";
import icon5Active from "../../assets/images/confirm-active.svg";

const navLinks = [
  {
    path: "/",
    label: "Privacy Statement",
    icon: icon1,
    iconActive: icon1Active,
  },
  {
    path: "/applicant/register",
    label: "Register Account",
    icon: icon2,
    iconActive: icon2Active,
  },
  {
    path: "/applicant/tenancy-info",
    label: "Tenancy Information",
    icon: icon3,
    iconActive: icon3Active,
  },
  {
    path: "/applicant/questions",
    label: "Application Questionnaire",
    icon: icon4,
    iconActive: icon4Active,
  },
  {
    path: "/applicant/application",
    label: "Application",
    icon: icon4,
    iconActive: icon4Active,
  },
  {
    path: "/applicant/confirm-details",
    label: "Confirm Details",
    icon: icon5,
    iconActive: icon5Active,
  },
];

const AppHeader = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const isActive = (path) => (path === activePath ? "active" : "");

  return (
    <div className="panel_app-header">
      <Container>
        <ul className="panel_app-list">
          {navLinks.map(({ path, label, icon, iconActive }) => (
            <li key={path} className={isActive(path)}>
              <div className="img-md1">
                <img src={icon} alt="icon" />
              </div>
              <div className="img-md2">
                <img src={iconActive} alt="icon" />
              </div>
              <p>{label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default AppHeader;
