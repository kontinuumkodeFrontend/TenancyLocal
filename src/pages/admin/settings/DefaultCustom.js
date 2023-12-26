import React, { useState } from "react";
import DefaultEmail from "../../../components/customSettings/DefaultEmail";
import Text from "../../../components/customSettings/Text";
import Agreement from "../../../components/customSettings/Agreement";

const DefaultCustom = () => {
  const [showEmail, setShowEmail] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const emailHandler = () => {
    setShowEmail(true);
    setShowAgreement(false);
    setShowText(false);
  }
  const textHandler = () => {
    setShowEmail(false);
    setShowAgreement(false);
    setShowText(true);
  }
  const agreementHandler = () => {
    setShowEmail(false);
    setShowAgreement(true);
    setShowText(false);
  }

  return (
    <div className="panel_center-mid mt-5">
      <div className="panel_setting d-flex justify-content-center gap-4">
        <button
          className={showEmail ? "btn_filled btn_sm" : "btn_light2 btn_sm"}
          onClick={emailHandler}
        >
          Emails
        </button>
        <button
          className={showText ? "btn_filled btn_sm" : "btn_light2 btn_sm"}
          onClick={textHandler}
        >
          Text for Specific Areas
        </button>
        <button
          className={showAgreement ? "btn_filled btn_sm" : "btn_light2 btn_sm"}
          onClick={agreementHandler}
        >
          Agreement
        </button>
      </div>
      {showEmail && <DefaultEmail />}
      {showText && <Text />}
      {showAgreement && <Agreement />}
    </div>
  );
};

export default DefaultCustom;
