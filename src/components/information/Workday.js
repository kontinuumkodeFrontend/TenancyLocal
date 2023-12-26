import React from "react";
import WorkItem from "./WorkItem";
import { useSelector } from "react-redux";

const Workday = () => {
  const workdayTiming = useSelector(state => state.workday.scheduleTime);
  console.log(workdayTiming, "lllllllllllllllllllllllllll");

  return (
    <div className="bg_light flex-100">
      <div className="row mb-4">
        <div className="col-md-1 col-0"></div>
        <div className="col-md-3 col-12">
          <p className="form-labels text-md-start text-center">Day</p>
        </div>
        <div className="col-md-4 col-12">
          <p className="form-labels text-center">Opening Time</p>
        </div>
        <div className="col-md-4 col-12">
          <p className="form-labels text-center">Closing Time</p>
        </div>
      </div>
      {workdayTiming.map((item, index) => (
        <WorkItem
          key={item.index}
          label={item.day}
          value={item.value}
          openingTime={item.openingTime}
          closingTime={item.closingTime}
          id={`checkbox${index}`}
          isChecked={item.isChecked}
          error={item.error}
        />
      ))}
    </div>
  );
};

export default Workday;
