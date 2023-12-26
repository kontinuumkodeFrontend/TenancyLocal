import React from "react";
import { Container } from "react-bootstrap";
import StatCardGroup from "./StatCardGroup";
import icon1 from "../../../assets/images/bookmark.png";
import icon2 from "../../../assets/images/plane-icon.png";
import icon3 from "../../../assets/images/Box-icon.png";
import icon4 from "../../../assets/images/chart-icon.png";
import Chart1 from "./chart/Chart1";
import Chart2 from "./chart/Chart2";


const Statistics = () => {
  const statCard1 = [
    {
      title: "Total landlords",
      number: "162",
      percent: "1.4%",
      text: "+21 this week",
      icon: icon1,
      bgColor: '#ceeefe',
    },
    {
      title: "Today stat",
      number: "1,215",
      percent: "0.8%",
      text: "+21 this week",
      icon: icon2,
      bgColor: '#1bb59833',
    },
    {
      title: "This month",
      number: "427",
      percent: "3.1%",
      text: "+$1,321 this week",
      icon: icon3,
      bgColor: '#ff2c2c33',
    },
    {
      title: "this year",
      number: "$82.9K",
      percent: "1.4%",
      text: "+$6.8K this week",
      icon: icon4,
      bgColor: '#1bb59833',
    },
  ];
  const statCard2 = [
    {
      title: "Total Tenancy",
      number: "122",
      percent: "1.4%",
      text: "+21 this week",
      icon: icon1,
      bgColor: '#ceeefe',
    },
    {
      title: "This week",
      number: "130",
      percent: "1.4%",
      text: "+21 this week",
      icon: icon2,
      bgColor: '#1bb59833',
    },
    {
      title: "This month",
      number: "132",
      percent: "1.4%",
      text: "+21 this week",
      icon: icon3,
      bgColor: '#ff2c2c33',
    },
    {
      title: "This year",
      number: "2362",
      percent: "1.4%",
      text: "+21 this week",
      icon: icon4,
      bgColor: '#1bb59833',
    },
  ];
  const statCard3 = [
    {
      title: "Total Agency",
      number: "132",
      percent: "1.4%",
      text: "+21 this week",
      icon: icon1,
      bgColor: '#ceeefe',
    },
    {
      title: "Today stat",
      number: "1230",
      percent: "1.4%",
      text: "+21 this week",
      icon: icon2,
      bgColor: '#1bb59833',
    },
    {
      title: "This month",
      number: "100",
      percent: "1.4%",
      text: "+$1,321 this week",
      icon: icon3,
      bgColor: '#ff2c2c33',
    },
    {
      title: "This year",
      number: "162",
      percent: "1.4%",
      text: "+$6.8K this week",
      icon: icon4,
      bgColor: '#1bb59833',
    },
  ];


  return (
    <Container className="pt-md-5 pt-4">
      <div className="stat-box">
        <div className="mb-xl-5 mb-4">
          <h5 className="text-h5 text-start mb-3">Landlord Stats</h5>
          <div className="row">
            <div className="col-xl-6 px-xxl-4 mb-xl-0 mb-4">
              <StatCardGroup card={statCard1} />
            </div>
            <div className="col-xl-6 px-xxl-4 mb-xl-0 mb-4"><Chart1 /></div>
          </div>
        </div>
        <div className="mb-xl-5 mb-4">
          <h5 className="text-h5 text-start mb-3">Tenancy Stats</h5>
          <div className="row">
            <div className="col-xl-6 px-xxl-4 mb-xl-0 mb-4 order-xl-1 order-2">
              <Chart2 />
            </div>
            <div className="col-xl-6 px-xxl-4 mb-xl-0 mb-4 order-xl-2 order-1"><StatCardGroup card={statCard2} /></div>
          </div>
        </div>
        <div className="mb-xl-5 mb-4">
          <h5 className="text-h5 text-start mb-3">Agency Stats</h5>
          <div className="row">
            <div className="col-xl-6 px-xxl-4 mb-xl-0 mb-4"><StatCardGroup card={statCard3} /></div>
            <div className="col-xl-6 px-xxl-4">
              <Chart1 />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Statistics;
