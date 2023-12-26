import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import icon1 from "../../assets/images/privacy-icon.svg";
import icon1Active from "../../assets/images/privacy-icon-active.svg";
import icon2 from "../../assets/images/register-icon.svg";
import icon2Active from "../../assets/images/register-icon-active.svg";
import icon3 from "../../assets/images/confirm-icon.svg";
import icon3Active from "../../assets/images/confirm-active.svg";


const navLinks = [
  { path: "/admin", label: "Agencies", icon: icon1, iconActive: icon1Active },
  { path: "/admin/statistics", label: "Statistics", icon: icon2, iconActive: icon2Active },
  { path: "/admin/settings", label: "Settings", icon: icon3, iconActive: icon3Active },
];

const AdminHeader = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(location.pathname);
    //for internal page i.e. agency-detail make first li active
    const regex = /^\/admin\/agency\/\d+$/;
    if (regex.test(location.pathname)) {
      setActivePath('/admin');
    }
  }, [location.pathname]);

  const isActive = (path) => path === activePath ? "active" : "";

  return (
    <div className="panel_app-header">
      <Container>
        <ul className="panel_app-list">
          {navLinks.map(({ path, label, icon, iconActive }) => (
            <NavLink to={path} key={label}>
              <li key={path} className={isActive(path)}>
                <div className="img-md1">
                  <img src={icon} alt="icon" />
                </div>
                <div className="img-md2">
                  <img src={iconActive} alt="icon" />
                </div>
                <p>{label}</p>
              </li>
            </NavLink>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default AdminHeader;
