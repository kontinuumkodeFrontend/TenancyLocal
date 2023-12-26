import React from "react";

const SummaryCard = () => {

  return (
    <div className="app_summary-card">
      <div className="d-flex flex-column gap-md-3 gap-2">
        <div className="tenancy-info">
          <p className="hypen-after">Applicant Name</p>
          <p className="fw-600">Steve</p>
        </div>
        <div className="tenancy-info">
          <p className="hypen-after">Employment Reference</p>
          <p className=" active fw-600">Completed</p>
        </div>
        <div className="tenancy-info">
          <p className=" hypen-after">Guarantor Reference</p>
          <p className=" active fw-600">Completed</p>
        </div>
        <div className="tenancy-info">
          <p className=" hypen-after">Landlord Reference</p>
          <p className=" active fw-600">Completed</p>
        </div>
        {/* <div className="tenancy-info">
          <p className=" hypen-after">University Name</p>
          <p className=" fw-600">European University of MBBS</p>
        </div>
        <div className="tenancy-info">
          <p className=" hypen-after ">Course Tile</p>
          <p className=" fw-600">06/04/2024</p>
        </div>
        <div className="tenancy-info">
          <p className=" hypen-after ">Year Of Graduation</p>
          <p className=" fw-600">3rd Year</p>
        </div> */}
      </div>
    </div>
  );
};

export default SummaryCard;
   