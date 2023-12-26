import React from "react";

const PoundSign = () => {
  return (
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon">
        &#163;
      </span>
    </div>
  );
};

export const renderInputFields = (
  startIndex,
  endIndex,
  formik,
  inputFields
) => {

  const handleWheel = (event) => {
    event.preventDefault();
    event.target.blur();
  };
  // console.log(formik, "this is formik||||||");
  return inputFields.slice(startIndex, endIndex).map((field) => (
    <div
      key={field.name}
      className={`${formik.errors[field.name] && formik.touched[field.name]
        ? `input-box input-err ${field.className || ""} `
        : `input-box ${field.className || ""}`
        } ${field.prepend && formik.values[field.name] > 0 ? "pound_prefix" : ""
        }`}
    >
      <label className={`form-labels ${field.required} ? required : ""`}>
        {field.label}
        {field.required && <span> *</span>}
      </label>
      <div className="position-relative">
        {field.prepend && formik.values[field.name] > 0 && <PoundSign />}
        <input
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[field.name]}
          disabled={field.disabled}
          min={field.minDate}
          onWheel={handleWheel}
        />
      </div>
      {formik.errors[field.name] && formik.touched[field.name] && (
        <p className="error-text">{formik.errors[field.name]}</p>
      )}
    </div>
  ));
};

export const multiFormInputFields = (
  startIndex,
  endIndex,
  formik,
  inputFields
) => {
  const handleWheel = (event) => {
    event.preventDefault();
    event.target.blur();
  };
  // console.log(formik, "this is formik||||||");
  return inputFields.slice(startIndex, endIndex).map((field) => {
    // Split the field name into parts using '.'
    const [index, fieldName] = field.name.split(".");
    // console.log(index, fieldName, "125249374927");
    // Construct the corresponding property name in formik.values and formik.errors
    const propertyValue = formik.values[index]?.[fieldName] || "";
    const errorOccurred =
      formik.errors?.[index]?.[fieldName] &&
      formik.touched?.[index]?.[fieldName];
    // console.log(errorOccurred, propertyValue, "this will tell about the error");
    return (
      <div
        key={field.name}
        className={`${errorOccurred
          ? `input-box input-err ${field.className || ""} `
          : `input-box ${field.className || ""}`
          } ${field.prepend && propertyValue > 0 ? "pound_prefix" : ""}`}
      >
        <label className={`form-labels ${field.required ? "required" : ""}`}>
          {field.label}
          {field.required && <span> *</span>}
        </label>
        <div className="position-relative">
          {field.prepend && propertyValue > 0 && <PoundSign />}
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={propertyValue}
            disabled={field.disabled}
            min={field.minDate}
            onWheel={handleWheel}
          />
        </div>
        {errorOccurred && (
          <p className="error-text">{formik.errors?.[index]?.[fieldName]}</p>
        )}
      </div>
    );
  });
};

export const applicantInputFields = (
  startIndex,
  endIndex,
  formik,
  inputFields
) => {
  const handleWheel = (event) => {
    event.preventDefault();
    event.target.blur();
  };
  // console.log(formik, "this is formik||||||");
  return inputFields.slice(startIndex, endIndex).map((field) => {
    // Split the field name into parts using '.'
    const [index, fieldName] = field.name.split(".");
    // console.log(index, fieldName, "125249374927");
    // Construct the corresponding property name in formik.values and formik.errors
    const propertyValue = formik.values[index]?.[fieldName] || "";
    const errorOccurred =
      formik.errors?.[index]?.[fieldName] &&
      formik.touched?.[index]?.[fieldName];
    // console.log(errorOccurred, propertyValue, "this will tell about the error");
    return (
      <div
        key={field.name}
        className={`${errorOccurred
          ? `input-box input-err ${field.className || ""} `
          : `input-box ${field.className || ""}`
          } ${field.prepend && propertyValue > 0 ? "pound_prefix" : ""}`}
      >
        <label className={`form-labels ${field.required ? "required" : ""}`}>
          {field.label}
          {field.required && <span> *</span>}
        </label>
        <div className="position-relative">
          {field.prepend && propertyValue > 0 && <PoundSign />}
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={propertyValue}
            disabled={field.disabled}
            min={field.minDate}
            onWheel={handleWheel}
          />
        </div>
        {errorOccurred && (
          <p className="error-text">{formik.errors?.[index]?.[fieldName]}</p>
        )}
      </div>
    );
  });
};

export const renderDisabledFields = (startIndex, endIndex, inputFields) => {
  return inputFields.slice(startIndex, endIndex).map((field) => (
    <div
      key={field.name}
      className={`input-box ${field.className || ""} ${field.prepend && field.values > 0 ? "pound_prefix" : ""
        }`}
    >
      <label className={`form-labels ${field.required ? "required" : ""}`}>
        {field.label}
        {field.required && <span> *</span>}
      </label>
      <div className="position-relative">
        {field.prepend > 0 && <PoundSign />}
        <input
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          defaultValue={field.value}
          disabled={field.disabled}
          min={field.minDate}
        />
      </div>
    </div>
  ));
};
