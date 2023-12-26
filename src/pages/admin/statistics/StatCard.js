import React from "react";
import growIcon from "../../../assets/images/growth-icon.png";

const StatCard = (props) => {
  return (
    <div className="stat-card d-flex flex-column">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="stat-icon" style={{backgroundColor: props.details.bgColor}}>
          <img src={props.details.icon} alt="stat-icon" />
        </div>
        <h5>{props.details.title}</h5>
      </div>
      <h3 className="mb-2">{props.details.number}</h3>
      <div className="d-flex align-items-center gap-3">
        <div className="stat-icon">
          <img src={growIcon} alt="stat-icon" />
        </div>
        <h6>{props.details.percent}</h6>
        <p>{props.details.text}</p>
      </div>
    </div>
  );
};

export default StatCard;
