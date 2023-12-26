import React from "react";
import { Container } from "react-bootstrap";
import LetCard from "./LetCard";
import AgencyChart from "./AgencyChart";
import PropertyCard from "./PropertyCard";

const LetCardContent = [
    { title: "Lets in Today", growth: -134, value: 45, pieColor: "#FF6767" },
    { title: "Lets in Week", growth: 34, value: 35, pieColor: "#009BA2" },
    { title: "Lets in Month", growth: -134, value: 45, pieColor: "#EC9725" },
    { title: "Lets in Year", growth: 34, value: 85, pieColor: "#70A72B" },
];

const PropertyCardContent = [
    { title: "Properties added Today", growth: -134, value: 85, chartColor: "#FF6767", bgColor: 'rgb(255 103 103 / 20%)' },
    { title: "Properties added in this Week", growth: 34, value: 35, chartColor: "#009BA2", bgColor: 'rgb(0 155 162 / 20%)'},
    { title: "Properties added in this Month", growth: -134, value: 115, chartColor: "#EC9725", bgColor: 'rgb(236 151 37 / 20%)' },
    { title: "Properties added in this Year", growth: 34, value: 235, chartColor: "#70A72B", bgColor: 'rgb(112 167 43 / 20%)' },
];

const AgencyStats = () => {
    return (
        <div className="agency_stats">
            <Container>
                <div className="mt-md-5 mt-3">
                    <div className="row mb-md-5 mb-4">
                        <div className="col-xl-8 pe-xl-4">
                            <h5 className="text-h5 text-start">Let’s In Statistics</h5>
                            <div className="let-cards mt-4">
                                {LetCardContent?.map((item, index) => {
                                    return <LetCard key={index} item={item} />;
                                })}
                            </div>
                        </div>
                        <div className="col-xl-4 ps-xl-4 mt-xl-0 mt-4 col-md-6 col-sm-8">
                            <h5 className="text-h5 text-start">Tenancy Statistics</h5>
                            <div className="ten_stats mt-4">
                                <div className="ten_stats-cnt">
                                    <p>Average time taken to complete tenancy</p>
                                    <div className="avg-time">
                                        <h6 className="m-0">24</h6>
                                    </div>
                                </div>
                                <div className="ten_stats-cnt mt-4">
                                    <select className="staff-dropdown" defaultValue="0">
                                        <option disabled value="0">
                                            Select Staff
                                        </option>
                                        <option value="1">Agency XYZ</option>
                                        <option value="2">Agency ABC</option>
                                        <option value="3">Agency PQR</option>
                                        <option value="4">Everybody</option>
                                    </select>
                                    <div className="avg-time">
                                        <h6 className="m-0">24</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AgencyChart />
                <div className="my-5">
                    <h5 className="text-h5 text-start">Properties Statistics</h5>
                    <div className="properties-cards mt-4">
                      {PropertyCardContent?.map((item, index)=>{
                        return <PropertyCard item={item} key={index}/>
                      })}
                    </div>
                </div>
                <AgencyChart />
            </Container>
        </div>
    );
};

export default AgencyStats;
