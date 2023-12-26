import React, { useState } from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDropdown from './ChartDropdown';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const Data = [
    {
        id: 1,
        year: 2016,
        number: 600,
    },
    {
        id: 2,
        year: 2017,
        number: 677,
    },
    {
        id: 3,
        year: 2018,
        number: 900,
    },
    {
        id: 4,
        year: 2019,
        number: 300,
    },
    {
        id: 5,
        year: 2020,
        number: 1000,
    },
    {
        id: 6,
        year: 2021,
        number: 900,
    }
];

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                color: '#00000066',
                font: {
                    size: 14,
                },


            }
        },
        y: {
            grid: {
                display: true,
                drawBorder: true,
            },
            ticks: {
                color: '#00000066',
                font: {
                    size: 14,
                },
                callback: function (value) {
                    return + value + 'K';
                },
            }
        },
    }
};


const Chart1 = () => {

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Number",
                data: Data.map((data) => data.number),
                backgroundColor: [
                    "#0AABFA",
                    "#1BB598",
                    "#1C1C1C",
                    "#FE7F75",
                    "#4FBF67",
                    "#03565A"
                ],
                borderWidth: 0,
                borderRadius: 5,
                barThickness: 25,
            }
        ]
    });

    return (
        <div className="chart-container">
            <div className='chart-head'><h2>Per Year Stats</h2><ChartDropdown/></div>
            <div className='mt-3 chart'><Bar
                data={chartData}
                options={options}
            /></div>

        </div>
    );
}

export default Chart1
