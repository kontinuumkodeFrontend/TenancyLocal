import React from "react";
import GrowthBadge from "./GrowthBadge";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            display: false, //to hide legend
        },
        title: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    scales: {
        x: {
            display: false,
        },
        y: {
            type: 'linear',
            display: false,
            min: 0,
        },
    },
    layout: {
        padding: 0
    }
};
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]



const PropertyCard = (props) => {

    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: [40, 55, 40, 60, 30, 100, 60, 70, 60, 88, 90, 88],
                fill: true,
                backgroundColor: `${props.item.bgColor}`,
                borderColor: `${props.item.chartColor}`,
                borderWidth: 3, // to increase the width of line
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
                capBezierPoints: true,
                lineTension: 0.4, //to make the line curve
                pointStyle: false, //to hide the point elements
            },
        ],
    };

    const growth = 123;
    return (
        <div className="prop-card">
            <div className="prop-card-head">
                <div>
                    <h6>{props.item.title}</h6>
                    <GrowthBadge growth={growth} />
                </div>
                <h5 style={{ color: `${props.item.chartColor}` }}>{props.item.value}</h5>
            </div>
            <div className="prop-chart">
                <div className="chart-empty"></div>
                <div className="chart-canvas">
                    <Line options={options} data={data} />
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
