import React, { useState } from "react";
import zoomPlugin from "chartjs-plugin-zoom";
import moment from "moment";
import DropIcon from "../../../assets/images/dropdown-icon.svg";
import GrowthBadge from "./GrowthBadge";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top',
            display: true, //to hide legend
        },
        title: {
            display: false,
        },
        zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              drag:{
                enabled:true
              },
              mode: "x",
              speed: 50,
              sensitivity: 0.5
            },
            pan: {
              enabled: true,
              mode: "x",
              speed: 0.5
            }
          }
    },
    scales: {
        y: {
            type: 'linear',
            min: 20,
            max: 200,
        },
    },
    layout: {
        padding: 0
    }
};
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [40, 95, 80, 120, 100, 180, 60, 40, 120, 160, 100, 88],
            borderColor: "#03565A",
            backgroundColor: "#03565A",
            radius: 3,
            borderWidth: 1, // to increase the width of line
        },
        {
            label: "Dataset 2",
            data: [180, 120, 90, 60, 198, 180, 135, 160, 160, 88, 160, 160],
            borderColor: "#4FBF67",
            radius: 3,
            backgroundColor: "#4FBF67",
            borderWidth: 1, // to increase the width of line
        },
    ],
};


const Date = (props) => {
    const [date, setDate] = useState("Select Date");

    const dateHandler = (event) => {
        let x = event.target.value;
        let dateValue = moment(x).format("DD/MM/YYYY");
        // console.log(event?.target.value, dateValue, ">>", x);
        setDate(dateValue);
    };
    return (
        <div className="date_picker">
            <label htmlFor="date">{props.label}</label>
            <div className="position-relative">
                <div className="staff-dropdown select-date w-100">
                    <p>{date}</p>
                    <img src={DropIcon} alt="dropdown-icon" />
                </div>
                <input type="date" id="date" onChange={dateHandler} />
            </div>
        </div>
    );
};
const letInYearGrowth = 134;

const AgencyChart = () => {
    return (
        <>
            <h5 className="text-h5 text-start">Compare Let’s In</h5>
            <div className="row mt-sm-4 mt-3">
                <div className="col-lg-6">
                    <div className="date-compare">
                        <h4>From</h4>
                        <div className="date_picker-box">
                            <Date label="Start Date" />
                            <Date label="End Date" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-lg-0 mt-3">
                    <div className="date-compare">
                        <h4>To</h4>
                        <div className="date_picker-box">
                            <Date label="Start Date" />
                            <Date label="End Date" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="agency_stats-graph mt-md-5 mt-4">
                <div className="graph-details">
                    <div>
                        <h3>Lets in Year</h3>
                        <GrowthBadge growth={letInYearGrowth} />
                    </div>
                    <h2>578</h2>
                </div>
                <div className="graph-body px-4 pt-2"><div><Line options={options} data={data} /></div></div>
            </div>
        </>
    );
};

export default AgencyChart;
