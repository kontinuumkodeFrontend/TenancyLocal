import React, { useState } from 'react'
import ChartDropdown from './ChartDropdown';
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
export const Data = [
    {
        id: 1,
        year: 2016,
        number: 20,
    },
    {
        id: 2,
        year: 2017,
        number: 27,
    },
    {
        id: 3,
        year: 2018,
        number: 20,
    },
    {
        id: 4,
        year: 2019,
        number: 10,
    }
];

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    layout: {
        padding: {
            left: 0,
            right: 50,
            top: 40,
            bottom: 0
        }
    },
    plugins: {
        legend: {
            display: true,
            position: 'right',
            align: 'center',
            labels: {
                font: {
                    size: 15,
                    color: '#1C1C1C',
                },
                usePointStyle: true,
                padding: 20
            }
        },
        title: {
            display: false,
        },
    },

};


const Chart2 = () => {

    const [chartData, setChartData] = useState({
        labels: ['Total Landlord', 'Today Stat', 'This Month', 'This Year'],
        datasets: [
            {
                label: 'Stats',
                data: Data.map((data) => data.number),
                backgroundColor: [
                    '#4FBF67',
                    '#FE7F75',
                    '#1BB598',
                    '#0AABFA',
                ],
                borderRadius: 5,
                offset: 10,
                barThickness: 10,
                weight: 10
            }
        ]
    });




    return (
        <div className="chart-container">
            <div className='chart-head'><h2>Total Percentage</h2><ChartDropdown /></div>
            <div className='chart'>
                <Doughnut
                    data={chartData}
                    options={options}
                /></div>

        </div>
    );
}

export default Chart2
