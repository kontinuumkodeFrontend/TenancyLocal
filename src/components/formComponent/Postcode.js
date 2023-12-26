import React, { useState } from "react";
import { get } from "../../services/api";
import { FETCH_POSTCODE } from "../../config/url";
import { isValidPostcode } from "../../validation/validation";
import { useEffect } from "react";

const appendAddress = (add) => {
    let address = "";
    add.forEach((element) => {
        address += " " + element;
    });
    return address;
};

const Postcode = (props) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState();

    const findPostCode = (e) => {
        e.preventDefault();
        if (!props.error) {
            const url = `${FETCH_POSTCODE}/${props.postCode}`;
            setIsLoading(true);
            setTimeout(() => {
                get(url, setData, setIsLoading);
            }, 100);
        }
    };

    useEffect(() => {
        if (data?.status === 400 || data?.latitude === 0 || data?.longitude === 0
            || data?.addresses.length === 0) {
            props.setError("Enter a valid postcode.");
        } else {
            props.setError(null);
        }
    }, [data]);

    // console.log(data, selectedOption, "this is dataaaaaa");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        if (data?.addresses.length) {
            const address = data?.addresses?.filter((add, index) => {
                return String(index) === event.target.value;
            })
            console.log(address, ">>>>????????>>>>>>>>>>>")
            if (address.length) {
                let country = address[0].country;
                let street = appendAddress(address[0].formatted_address);
                let town = address[0].town_or_city;
                // console.log("Country: ", country, "Street: ", street, "Town: ", town);
                if (props.index === undefined || props.index === null) {
                    props.formik.setFieldValue("town", town);
                    props.formik.setFieldValue("street", street);
                    props.formik.setFieldValue("country", country);
                } else {
                    props.formik.setFieldValue(`property${props.index + 1}.town${props.index + 1}`, town)
                    props.formik.setFieldValue(`property${props.index + 1}.street${props.index + 1}`, street)
                    props.formik.setFieldValue(`property${props.index + 1}.country${props.index + 1}`, country)
                }
            }
        }
    };

    const postCodeValidator = (e) => {
        e.preventDefault();
        setData(null);
        const isValidCode = isValidPostcode(e.target.value);
        console.log(isValidCode, "This is a valid code");
        if (isValidCode) {
            props.setError(null);
        } else {
            props.setError("Enter a valid postcode.");
        }
        props.postcodeHandler(e.target.value)
        console.log(e.target.value, "This is a postcode");
    };

    console.log(props.error, props.postCode);

    return (
        <>
            <div
                className={
                    props.error
                        ? "input-box input-err"
                        : "input-box "
                }>
                <label className="form-labels required">Postcode Lookup <span>{" "}*</span></label>
                <div className="position-relative">
                    <input
                        type="text"
                        placeholder="Enter post code"
                        value={props.postCode}
                        onChange={postCodeValidator}
                    />
                    <button
                        className="btn_filled btn_post"
                        onClick={findPostCode}
                        disabled={props.error || !props.postCode ? true : false}
                    >
                        {isLoading && <span className="loader"></span>}  Find Address
                    </button>
                </div>
                {props.error && <p className="error-text">{props.error}</p>}
            </div>
            {(data && !props.error) && (
                <div className="input-box">
                    <label className="form-labels">Addresses</label>
                    <select
                        className="mt-2"
                        value={selectedOption}
                        onChange={handleSelectChange}
                    >
                        <option value=""></option>
                        {data && data?.addresses?.length > 0
                            ? data.addresses.map((item, index) => {
                                return (
                                    <option key={index} value={index}>
                                        {appendAddress(item.formatted_address)}
                                    </option>
                                );
                            })
                            : null}
                    </select>
                </div>
            )}
        </>
    );
};

export default Postcode;
