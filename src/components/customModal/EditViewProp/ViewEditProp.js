import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import Close from "../../../assets/images/close.png";
import { get } from "../../../services/api";
import { AGENCY_GET_PROPRTY_INFO } from "../../../config/url";
import TabTenancy from "./TabTenancy";
import TabProp from "./TabProp";
import { editPropActions } from "../../../store/edit-property-slice";

const ViewEditProp = () => {
    const propId = sessionStorage.getItem("propId");
    const token = localStorage.getItem("token");
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const url = `${AGENCY_GET_PROPRTY_INFO}/${propId}?token=${token}`;
        if (token && propId) get(url, setData, setIsLoading);
    }, []);

    console.log(data, "}}}}}}}}}}");

    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(editPropActions.emptyFiles());
        dispatch(mdActions.hideModal());
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Edit & View Property</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <div className="app_details position-relative">
                    <Tabs defaultActiveKey="first">
                        <Tab eventKey="first" title="Property">
                            <TabProp propValues={data?.prop_info} />
                        </Tab>
                        <Tab eventKey="second" title="Tenancies">
                            <div className="mt-3 ">
                                {data?.prop_info?.tenancies.length === 0 && <div className="ref-incomplete">
                                    There is no tenancy associated with this property!
                                </div>}
                                {data?.prop_info?.tenancies.length > 0 && <TabTenancy tenancyData={data?.prop_info} />}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ViewEditProp;
