import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { get } from "../services/api";
import { VERIFY_AGENCY } from "../config/url";
import { useNavigate, useParams } from "react-router-dom";
import CheckImg from "../assets/images/check.png";

const VerifyAgency = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [viewData, setViewData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const url = `${VERIFY_AGENCY}/${id}`;
        get(url, setData, setIsLoading);
    }, []);

    useEffect(() => {
        console.log(data);
        if (data?.saved === false && data?.errorCode === 404) {
            setViewData("Agency Authorization Already Completed!");
        }
    }, [data]);

    return (
        <div className="panel_main-wrapper" style={{ height: "100vh" }}>
            <Container>
                <div className="panel_center-sec center">
                    <div className="panel_center-mid verify p-5">
                        {data?.saved && (
                            <>
                                <img src={CheckImg} alt="img" />
                                <h2 className="mb-4">Agency Successfully Authorized!</h2>
                            </>
                        )}
                        {!data?.saved && <h2 className="mb-4 danger">{viewData}</h2>}
                        <button
                            className="btn_dark btn_lg mx-auto"
                            onClick={() => navigate("/")}
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default VerifyAgency;
