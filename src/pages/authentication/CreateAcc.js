import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  emailValidation,
  confirmPasswordValidation,
  nameValidation,
} from "../../validation/validation";
import { post } from "../../services/api";
import { AGENCY_REGISTER } from "../../config/url";
import { useEffect } from "react";
import { toast } from "react-toastify";


const inputFields = [
  {
    name: 'name',
    label: 'Agency Name',
    type: 'text',
    placeholder: 'Enter agency name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email id',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Re-enter password',
  },
];

const validationSchema = Yup.object().shape({
  ...emailValidation.fields,
  ...nameValidation.fields,
  ...confirmPasswordValidation.fields,
});

const CreateAcc = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const body = {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword
      }
      post(AGENCY_REGISTER, body, null, setData, setIsLoading);
    },
  });

  useEffect(() => {
    toast.dismiss()
    if (data) {
      console.log(data, "this is data");
      if (data?.errors?.email) {
        toast.error(data?.errors?.email[0]);
      }
    }
  }, [data]);

  return (
    <React.Fragment>
      <div className="mt-lg-4 mt-3">
        <p className="text_lg-green">Create your account</p>
      </div>
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-column gap-3">

            {inputFields.map((field) => (
              <div
                key={field.name}
                className={
                  formik.errors[field.name] && formik.touched[field.name]
                    ? "input-box input-err"
                    : "input-box"
                }
              >
                <label className="form-labels">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                />
                {formik.errors[field.name] && formik.touched[field.name] && (
                  <p className="error-text">{formik.errors[field.name]}</p>
                )}
              </div>
            ))}
            {/*<div
              className={
                formik.errors.name && formik.touched.name
                  ? "input-box input-err"
                  : "input-box"
              }
            >
              <label className="form-labels">Agency Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter agency name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="error-text">{formik.errors.name}</p>
              )}
            </div>
            <div
              className={
                formik.errors.email && formik.touched.email
                  ? "input-box input-err"
                  : "input-box"
              }
            >
              <label className="form-labels">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="error-text">{formik.errors.email}</p>
              )}
            </div>
            <div
              className={
                formik.errors.password && formik.touched.password
                  ? "input-box input-err"
                  : "input-box"
              }
            >
              <label className="form-labels">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="error-text">{formik.errors.password}</p>
              )}
            </div>
            <div
              className={
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "input-box input-err"
                  : "input-box"
              }
            >
              <label className="form-labels">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p className="error-text">{formik.errors.confirmPassword}</p>
                )}
                </div> */}
          </div>
          <button className="btn_dark btn_lg w-100 mt-4" type="submit">{isLoading && <span className="loader"></span>}Create</button>
        </form>
        <div className="create-acc mt-4 text-center">
          <p>
            Already have an account?
            <span className="ms-2">
              <NavLink to="/login">Log in</NavLink>
            </span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateAcc;
