import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { getCountryCallingCode } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";

// Function to extract the country and phone number
const getCallingCodeFromPhoneNumber = (phoneNumber) => {
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
  // console.log(parsedPhoneNumber, ">>>>>>>>");
  const country = {
    countryCode: parsedPhoneNumber.country,
    phone: parsedPhoneNumber.nationalNumber,
  };
  return country;
};

//validate the phone number
const validatePhoneNumber = (value, countryCode) => {
  const phoneNumber = parsePhoneNumber(value, countryCode);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return "Invalid phone number";
  }
  return undefined;
};

const TelInput = (props) => {
  const [value, setValue] = useState();

  const handleMobileChange = (value) => {
    let country;
    if (value && isValidPhoneNumber(value)) {
      country = getCallingCodeFromPhoneNumber(value);
      // console.log(value, country, "This is the updated value");
      const validationError = validatePhoneNumber(value, country?.countryCode);
      if (validationError) {
        // Phone number is invalid
        props.setError(validationError);
        props.phoneHandler({
          phone: null,
          countryCode: null
        })
      } else {
        // Phone number is valid
        props.setError(null);
        setValue(value);
        props.phoneHandler({
          phone: country.phone,
          countryCode: country.countryCode
        });
      }
    } else {
      props.setError("Invalid phone number");
      props.phoneHandler({
        phone: null,
        countryCode: null
      })
    }
  };

  useEffect(() => {
    if (props?.phoneNumber?.countryCode) {
      const countryCode = getCountryCallingCode(props?.phoneNumber?.countryCode);
      setValue(`+${countryCode}${props?.phoneNumber?.phone}`);
    }
  }, [props]);

  return (
    <div
      className={`
    input-box
    ${props.error ? "input-err" : ""}
    ${props.className || ""}`}
    >
      <label className="form-labels required">
        {props.label ? props.label : "Phone Number"}<span> *</span>
      </label>
      <PhoneInput
        international
        placeholder="Enter phone number"
        countryCallingCodeEditable={false}
        value={value}
        defaultCountry="GB"
        onChange={handleMobileChange}
        disabled={props.disabled}
      />
      {props.error && <p className="error-text">{props.error}</p>}
    </div>
  );
};
export default TelInput;
