import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import TenancyDetail from "./TenancyDetail";
import Reference from "./reference/Reference";
import Events from "./Events";
import Applicants from "./applicant/Applicants";
import EmailSMS from "./EmailSMS";
import Agreement from "./Agreement";
import { ViewTenanTab } from "../../../helper/constants/ViewTenancyConstant";
import { useEffect } from "react";
import Inspection from "../inspection/Inspection";
import { AGENCY_REVIEW_TENANCY } from "../../../config/url";
import { useParams } from "react-router-dom";
import { get } from "../../../services/api";
import { useSelector } from "react-redux";

const ViewTenancy = () => {
    const Tabkey = localStorage.getItem("tabKey");
    console.log(Tabkey, "Tabkey");
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [reviewData, setReviewData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const isDataUpdated = useSelector((state) => state.update.isUpdated);
    
    useEffect(() => {
        if (Tabkey) {
            setTimeout(() => {
                localStorage.setItem("tabKey", "");
            }, 1500);
        }
    }, []);

    useEffect(() => {
        const url = `${AGENCY_REVIEW_TENANCY}/${id}?token=${token}`;
        if (token) {
            get(url, setReviewData, setIsLoading);
        }
    }, [isDataUpdated]);

    useEffect(() => {
        if (!reviewData) return;
        console.log(reviewData, "this is review data");
    }, [reviewData]);

    return (
        <Container className="pt-md-5 pt-4 mb-5">
            <h5 class="text-h5 mb-4 text-start">
                Application Status: <span className="text-warning">In Progress</span>
            </h5>
            <div className="panel">
                <div className="panel_center-sec pt-0 mb-2">
                    <div className="app_details position-relative">
                        <Tabs defaultActiveKey={Tabkey ? Tabkey : ViewTenanTab?.FIRST}>
                            <Tab eventKey={ViewTenanTab?.FIRST} title="Tenancy">
                                <TenancyDetail tenancyData={reviewData?.tenancies} />
                            </Tab>
                            <Tab eventKey={ViewTenanTab?.SECOND} title="Applicants">
                                <Applicants />
                            </Tab>
                            {/* <Tab eventKey={ViewTenanTab?.THIRD} title='Email/SMS'>
                                <EmailSMS />
                            </Tab> */}
                            <Tab eventKey={ViewTenanTab?.FOUR} title="Reference">
                                <Reference />
                            </Tab>
                            <Tab eventKey={ViewTenanTab?.FIFTH} title="Events">
                                <Events />
                            </Tab>
                            <Tab eventKey={ViewTenanTab?.SIX} title="Agreement">
                                <Agreement />
                            </Tab>
                            <Tab eventKey={ViewTenanTab?.SEVEN} title="Interim Inspection">
                                <div className="px-xl-5 px-3">
                                    <Inspection />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ViewTenancy;
