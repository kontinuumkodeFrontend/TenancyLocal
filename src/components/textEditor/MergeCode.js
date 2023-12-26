import React from "react";

const MergeCode = (props) => {
  // const mergeItem = [
  //   "{{today_date}}",
  //   "{{signing_date}}",
  //   "{{generated_date}}",
  //   "{{agency.name}}",
  //   "{{tenancy.reference}}",
  //   "{{property.address}}",
  //   "{{property.address}}",
  //   "{{tenancy.start_date}}",
  //   "{{tenancy.end_date}}",
  //   "{{tenancy.total_rent}}",
  //   "{{tenancy.parking_cost}}",
  //   "{{tenancy.monthly_amount}}",
  //   "{{tenancy.deposit_amount}}",
  //   "{{tenancy.holding_amount}}",
  //   "{{tenancy.total_applicant}}",
  //   "{{tenancy.negotiator_name}}",
  // ];

  // const onDrop = (event) => {
  //   let taskName = event.dataTransfer.getData("taskName");
  //   console.log(taskName, ">>>>>>>>>>>>>");
  //   console.log(event, "<<<<<<");
  // };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragStart = (event, taskName) => {
    console.log("dragstart on div: ", taskName);
    event.dataTransfer.setData("taskName", taskName);
  };

  return (
    <div className={props.className ? `merge-code ${props.className}` : 'merge-code'}>
      <h4>Merge Codes</h4>
      <ul
        onDragOver={(event) => onDragOver(event)}
      // onDrop={(event) => {
      //   onDrop(event);
      // }}
      >
        {props?.mergeItems?.map((item, index) => (
          <li
            key={index}
          // draggable
          // onDragStart={(event) => onDragStart(event, item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MergeCode;

