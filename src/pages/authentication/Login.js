import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  emailValidation,
  passwordValidation,
} from "../../validation/validation";
import { post } from "../../services/api";
import { LOGIN, APP_LOGIN } from "../../config/url";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  ADMIN,
  AGENCY,
  APPLICANT_DASHBOARD,
} from "../../helper/constants/UserConstant";
import { userActions } from "../../store/user-slice";
import { renderInputFields } from "../../components/formComponent/InputFields";

const validationSchema = Yup.object().shape({
  ...emailValidation.fields,
  ...passwordValidation.fields,
});

const inputFields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email id",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
];

const Login = (props) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [url, setURL] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/login") {
      setURL(LOGIN);
    } else if (location.pathname === "/applicant/login") {
      setURL(APP_LOGIN);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values, "????????");
      const body = {
        email: values.email,
        password: values.password,
      };
      post(url, body, null, setData, setIsLoading);
    },
  });

  useEffect(() => {
    toast.dismiss();
    if (data) {
      if (data.status === 200 && data.content === "done") {
        if (url === LOGIN) {
          localStorage.setItem("token", data.token);
          if (data.role === 2) {
            navigate("/admin");
            dispatch(userActions.setUser(ADMIN));
          }
          if (data.role === 1) {
            navigate("/agency");
            dispatch(userActions.setUser(AGENCY));
          }
        } else if (url === APP_LOGIN) {
          localStorage.setItem("applicantToken", data.token);
          dispatch(userActions.setUser(APPLICANT_DASHBOARD));
        }
        localStorage.setItem("authRole", data.role);
      } else if (
        data.status === 422 &&
        data.content === "invalid_email_or_password"
      ) {
        toast.error("This email & password do not match our records!");
      } else if (data.status === 450 || data.status === 451) {
        toast.error("You are unauthorized to log in. Please check your credentials and try again.");
      }
    }
  }, [data]);

  return (
    <React.Fragment>
      <div
        className="mt-lg-4 mt-3"
        style={{ margin: "auto", maxWidth: "290px" }}
      >
        <p className="text_lg-green">Login to your Account</p>
        <p className="text_sm mt-2">See what is going on here...</p>
      </div>
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-column gap-3">
            {renderInputFields(0, undefined, formik, inputFields)}
            <div className="d-flex mb-4 mt-2 justify-content-end gap-3 flex-wrap">
              {/*<div className="custom-checkbox2">
                <input type="checkbox" id="checkbox2" />
                <label htmlFor="checkbox2"></label>
                <span className="text_sm ms-2">Remember me</span>
              </div> */}
              <NavLink>
                <p onClick={() => props.authContent("forgotPass")}>
                  Forgot Password?
                </p>
              </NavLink>
            </div>
            <button
              className="btn_dark btn_lg w-100 position-relative"
              type="submit"
            >
              {isLoading && <span className="loader"></span>} Login
            </button>
          </div>
        </form>
        {/*!location.pathname.includes("applicant/login") && (
          <div className="create-acc mt-4 text-center">
            <p>
              Not Registered Yet?
              <span className="ms-2">
                <NavLink to="/create-agency">Create an account</NavLink>
              </span>
            </p>
          </div>
        )*/}
      </div>
    </React.Fragment>
  );
};

export default Login;
