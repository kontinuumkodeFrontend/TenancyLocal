import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Img from "../../assets/images/auth-img.png";
import Login from "./Login";
import Otp from "./Otp";
import Logo from "../../assets/images/logo.png";
import ForgotPass from "./ForgotPass";
import NewPass from "./NewPass";
import CreateAcc from "./CreateAcc";

const Auth = (props) => {
  const location = useLocation();
  const [type, setType] = useState("");
  const authContentHandler = (type) => {
    setType(type);
  };
  useEffect(() => {
    if (location.pathname === "/register") {
      setType("createAcc");
    }
  }, [location]);

  return (
    <div className={location.pathname === "/register" ? "auth_panel create-acc-panel" : "auth_panel"}>
      <Container>
        <div className="auth_panel-center">
          <div className="row">
            <div className="col-lg-6">
              <div className="auth_panel-left">
                <img src={Img} alt="img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="auth_panel-right">
                <div className="login_panel">
                  <div className="login_logo">
                    <img src={Logo} alt="logo" />
                  </div>
                  {type === "otp" ? (
                    <Otp />
                  ) : type === "forgotPass" ? (
                    <ForgotPass authContent={authContentHandler} />
                  ) : type === "createAcc" ? (
                    <CreateAcc authContent={authContentHandler} />
                  ) : type === "newPass" ? (
                    <NewPass />
                  ) : (
                    <Login authContent={authContentHandler} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
