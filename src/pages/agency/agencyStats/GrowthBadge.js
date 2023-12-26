import React from 'react'
import ArrowDown from "../../../assets/images/arrow_outward.svg";
import ArrowUp from "../../../assets/images/arrow_inward.svg";

const GrowthBadge = (props) => {
    return (
        <div
            className={
                props.growth < 0 ? `let-badge mt-2 danger` : `let-badge mt-2 success`
            }
        >
            {props.growth < 0 && <img src={ArrowDown} alt="icon" />}
            {props.growth > 0 && <img src={ArrowUp} alt="icon" />}
            <p>{props.growth}</p>
        </div>
    );
};

export default GrowthBadge;