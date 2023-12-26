import React from "react";
import Input from "../../../components/formComponent/Input";

const StudentDetails = () => {
  return (
    <>
      <div className="panel_center-top pb-4">
        <h5 className="text-h5">Student Details</h5>
      </div>
      <div className="panel_center-mid  my-4">
        <div className="panel_form">
          <Input
            type="text"
            placeholder="Enter university name"
            label="Name of University"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="text"
            placeholder="Enter course title"
            label="Course Title"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
          <Input
            type="text"
            placeholder="Enter year of graduation"
            label="Year of Graduation"
            defaultValue=""
            disabled={false}
            prepend={false}
          />
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
