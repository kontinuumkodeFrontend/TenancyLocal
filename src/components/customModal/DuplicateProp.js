import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { ADD_MULTI_PROPERTY_MODAL, ADD_PROPERTY_MODAL } from "./ModalConstants";
import { post } from "../../services/api";
import { AGENCY_ADD_PROPERTY } from "../../config/url";
import { toast } from "react-toastify";
import { updateActions } from "../../store/update-slice";
import { propertyActions } from "../../store/multiple-property-slice";

const DuplicateProp = () => {
    const token = localStorage.getItem("token");
    const { id, name } = JSON.parse(sessionStorage.getItem("currLandlord"));
    const dispatch = useDispatch();
    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
        dispatch(propertyActions.emptyForm());
        sessionStorage.removeItem("currLandlord");
    };
    const [isLoading, setIsLoading] = useState(false);
    const [propData, setPropData] = useState();

    const multiFormData = useSelector((state) => state.property.propFormData);
    // console.log(multiFormData, "This is the properties in the list ABCDEFGHI...");

    const prevModalHandler = () => {
        //show previous modal
        dispatch(
            mdActions.showModal({
                type: ADD_MULTI_PROPERTY_MODAL,
                data: {
                    landlord: { name: name, id: id },
                },
            })
        );
    };

    const dupPropHandler = () => {
        //duplicate property 
        dispatch(mdActions.showModal({ type: ADD_PROPERTY_MODAL }));
    };

    useEffect(() => {
        if (propData) {
            if (propData.statusCode === 123 && !propData.saved) {
                dispatch(
                    mdActions.showModal({
                        type: ADD_MULTI_PROPERTY_MODAL,
                        data: {
                            errors: propData.errors,
                            landlord: { name: name, id: id },
                        },
                    })
                );
                console.error("Error");
            } else if (propData.saved) {
                toast.success(`Property ${multiFormData.length}/${multiFormData.length} added successfully!`);
                dispatch(updateActions.setUpdation());
                hideModalHandler();
            }
            // console.log(propData, "this is a POST request");
        }
    }, [propData]);


    const addPropertyHandler = () => {
        if (multiFormData.length > 0) {
            const url = `${AGENCY_ADD_PROPERTY}?token=${token}`;
            const body = {
                propertyData: multiFormData,
            };
            post(url, body, null, setPropData, setIsLoading);
        }
    };

    return (
        <div className="custom-modal bg-after event-modal">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Duplicate Property?</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <h4 className="text-h4" style={{ fontWeight: "400" }}>
                    Would you like to duplicate this property profile?
                </h4>
            </div>
            <div className="modal_footer d-flex mt-4 flex-wrap  justify-content-center gap-3">
                <button className="btn_filled btn_sm" onClick={dupPropHandler}>
                    Yes
                </button>
                <button className="btn_stroke2 btn_sm" onClick={addPropertyHandler}>
                    {isLoading && <span className="loader"></span>} No
                </button>
                <button className="btn_dark btn_sm" onClick={prevModalHandler}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default DuplicateProp