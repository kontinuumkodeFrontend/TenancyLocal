import React from "react";
import StatCard from "./StatCard";

const StatCardGroup = (props) => {
    console.log(props.card[0]);
    return (
        <div className="stat-card-grp">
            <StatCard details={props.card[0]} />
            <StatCard details={props.card[1]} />
            <StatCard details={props.card[2]} />
            <StatCard details={props.card[3]} />
        </div>
    );
};

export default StatCardGroup;
