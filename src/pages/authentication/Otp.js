import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import OtpInput from "react-otp-input";

const Otp = () => {
  const [otp, setOtp] = useState("");
  return (
    <React.Fragment>
      <div className="mt-lg-4 mt-3">
        <p className="text_lg-green">OTP Send Successfully</p>
        <p className="text_sm mt-2">
          An OTP is shared in your registered mail id (mail@abc.com) please
          enter the 6 digit code you receive.
        </p>
      </div>
      <div className="mt-lg-4 mt-4 otp">
        <form>
          <p className="form-labels mb-4 text-lg-start text-center">
            Enter OTP
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <div className="d-flex mb-4 mt-lg-4 mt-3 justify-content-lg-end justify-content-center">
            <NavLink to="">
              <p>Resend Again</p>
            </NavLink>
          </div>
          <Link
            to="/"
            onClick={() => localStorage.setItem("token", "hjbsjdbhv")}
          >
            <button className="btn_dark btn_lg w-100">Verify</button>
          </Link>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Otp;
