import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import icon1 from "../../assets/images/privacy-icon.svg";
import icon1Active from "../../assets/images/privacy-icon-active.svg";
import icon2 from "../../assets/images/inspection-icon.svg";
import icon2Active from "../../assets/images/inspection-icon-active.svg";
import icon3 from "../../assets/images/tenancies-icon.svg";
import icon3Active from "../../assets/images/tenancies-icon-active.svg";
import icon4 from "../../assets/images/property-icon.svg";
import icon4Active from "../../assets/images/property-icon-active.svg";
import icon5 from "../../assets/images/app-que-icon.svg";
import icon5Active from "../../assets/images/app-icon-active.svg";
import icon6 from "../../assets/images/landlord-icon.svg";
import icon6Active from "../../assets/images/landlord-icon-active.svg";
import icon7 from "../../assets/images/stat-icon.svg";
import icon7Active from "../../assets/images/stat-icon-active.svg";
import icon8 from "../../assets/images/confirm-icon.svg";
import icon8Active from "../../assets/images/confirm-active.svg";
import dropIcon from "../../assets/images/dropdown-icon.svg";

const SettingDropContent = () => {
  return (
    <ul className="drop-content scale-up-center drop-setting">
      <li className="text-start">
        <NavLink to="settings/staff">Staff</NavLink>
      </li>
      <li className="text-start">
        <NavLink to="settings/customization">Customizations</NavLink>
      </li>
      <li className="text-start">
        <NavLink to="settings/configuration">Configurations</NavLink>
      </li>
    </ul>
  );
};

const AgencyHeader = () => {
  const location = useLocation();

  //setting header bottom 'setting link' active for below pages
  const settingActivePath =
    location.pathname === "/agency/settings/staff" ||
    location.pathname === "/agency/settings/customization" ||
    location.pathname === "/agency/settings/configuration";
  //   console.log(settingActivePath);

  const navLinks = [
    {
      path: "/agency",
      label: "Dashboard",
      icon: icon1,
      iconActive: icon1Active,
      hasChild: false,
    },
    {
      path: "/agency/tenancies",
      label: "Tenancies",
      icon: icon3,
      iconActive: icon3Active,
      hasChild: false,
    },
    {
      path: "/agency/properties",
      label: "Properties",
      icon: icon4,
      iconActive: icon4Active,
      hasChild: false,
    },
    {
      path: "/agency/applicants",
      label: "Applicants",
      icon: icon5,
      iconActive: icon5Active,
      hasChild: false,
    },
    {
      path: "/agency/interim-inspection",
      label: "Interim Inspections",
      icon: icon2,
      iconActive: icon2Active,
      hasChild: false,
    },
    {
      path: "/agency/landlord",
      label: "Landlords",
      icon: icon6,
      iconActive: icon6Active,
      hasChild: false,
    },
    {
      path: "/agency/statistics",
      label: "Statistics",
      icon: icon7,
      iconActive: icon7Active,
      hasChild: false,
    },
    {
      path: "",
      label: "Agency Settings",
      icon: icon8,
      iconActive: icon8Active,
      hasChild: true,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const [dropContent, setDropContent] = useState(false);
  const dropdownRef = useRef(null);

  const dropContentHandler = (event) => {
    event.preventDefault(); //to prevent the event from bubbling
    setDropContent((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropContent(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="panel_app-header">
      <Container>
        <ul className="panel_app-list">
          {navLinks.map(
            ({ path, label, icon, iconActive, hasChild }, index) => {
              if (!hasChild) {
                return (
                  <NavLink to={path} key={index}>
                    <li className={isActive(path)}>
                      <div className="img-md1">
                        <img src={icon} alt="icon" />
                      </div>
                      <div className="img-md2">
                        <img src={iconActive} alt="icon" />
                      </div>
                      <p>{label}</p>
                    </li>
                  </NavLink>
                );
              } else {
                return (
                  <li
                    className={settingActivePath ? 'active agency_header-drop' : 'agency_header-drop'}
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={dropContentHandler}
                    ref={dropdownRef}
                  >
                    <div className="img-md1">
                      <img src={icon} alt="icon" />
                    </div>
                    <div className="img-md2">
                      <img src={iconActive} alt="icon" />
                    </div>
                    <p>{label}</p>
                    <div className="position-relative d-flex">
                      <button className="dropdown-btn">
                        <img src={dropIcon} alt="dropdown-icon" />
                      </button>
                      {dropContent && <SettingDropContent />}
                    </div>
                  </li>
                );
              }
            }
          )}
        </ul>
      </Container>
    </div>
  );
};

export default AgencyHeader;
