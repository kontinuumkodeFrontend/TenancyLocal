import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ArrowDown from "../../../assets/images/arrow_outward.svg";
import ArrowUp from "../../../assets/images/arrow_inward.svg";

const LetCard = (props) => {
  return (
    <div className="let-card">
      <div className="pro-chart">
        <CircularProgressbar
          value={props.item.value}
          maxValue={100}
          text={`${props.item.value}`}
          strokeWidth="10"
          styles={buildStyles({
            textSize: "20px",
            textColor: "#03565A",
            pathColor: `${props.item.pieColor}`,
          })}
        />
      </div>
      <h6>{props.item.title}</h6>
      <div className={(props.item.growth < 0 ? `let-badge mt-2 danger` : `let-badge mt-2 success`)}>
        {props.item.growth < 0 && <img src={ArrowDown} alt="icon" />}
        {props.item.growth > 0 && <img src={ArrowUp} alt="icon" />}
        <p>{props.item.growth}</p>
      </div>
    </div>
  );
};

export default LetCard;
