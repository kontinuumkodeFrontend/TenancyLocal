import React from "react";
import Time from "../formComponent/Time";
import Checkbox from "../formComponent/Checkbox";
import { useDispatch } from "react-redux";
import { workdayActions } from "../../store/workday-slice";

const WorkItem = (props) => {
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(workdayActions.updateCheck({ day: props.label }))
  }

  const timeHandler = (time, type) => {
    dispatch(workdayActions.updateTime({
      day: props.label,
      time: type === 'Opening Time' ? "OPEN" : "CLOSE",
      closeTime: type === 'Closing Time' ? time : "",
      openTime: type === 'Opening Time' ? time : "",
    }))
  }

  return (
    <div className="work-item">
      <div className="row mt-3">
        <div className="col-md-1 col-0"></div>
        <div className="col-md-3 col-12 my-auto">
          <Checkbox
            label={props.label}
            value={props.value}
            id={props.id}
            changeHandler={handleCheckboxChange}
            isChecked={props.isChecked}
          />
        </div>
        <div className="col-md-4 col-12 mt-md-0 mt-2">
          <Time label='Opening Time' time={props.openingTime} timeHandler={timeHandler} />
        </div>
        <div className="col-md-4 col-12 mt-md-0 mt-2">
          <Time label='Closing Time' time={props.closingTime} timeHandler={timeHandler} />
        </div>
      </div>
    </div>
  );
};

export default WorkItem;
