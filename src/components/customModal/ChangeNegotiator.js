import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Dropdown from "../formComponent/Dropdown";
import { post, get } from "../../services/api";
import { AGENCY_CHANGE_NEGOTIATOR, AGENCY_STAFF_MEMBERS } from "../../config/url";
import { toast } from "react-toastify";
import { updateActions } from "../../store/update-slice";

let staffOption = [
    { label: "Select Staff", value: "SS" },
];

const ChangeNegotiator = () => {
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    const [staffOptions, setStaffOptions] = useState(staffOption); //for setting staff options
    const [dropOption, setDropOption] = useState();
    const [dropError, setDropError] = useState("");
    const [data, setData] = useState();
    const [postData, setPostData] = useState();
    const dispatch = useDispatch();

    const hideModalHandler = () => {
        dispatch(mdActions.hideModal());
    };
    const tenancyId = useSelector((state) => state.modal.data);

    useEffect(() => {
        const url = `${AGENCY_STAFF_MEMBERS}?token=${token}`;
        get(url, setData, setIsLoading);
    }, []);

    console.log(data, "this is data");

    useEffect(() => {
        if (!data) return;
        if (data.saved && data?.agencyMembers?.length > 0) {
            // Filter text_area based on agreementType
            const newOptions = data.agencyMembers
                .map((item) => ({
                    label: `${item.name} ${item.l_name}`,
                    value: item.id,
                }));

            console.log(newOptions, "these options");

            // Set agreeOptions to the unique set of options
            setStaffOptions((prev) => {
                // Use a Set to ensure uniqueness
                const uniqueOptions = new Set([...staffOption, ...newOptions]);
                // Convert the Set back to an array
                return Array.from(uniqueOptions);
            });
        }
    }, [data]);

    const changeNegoHandler = () => {
        if (!dropOption) {
            setDropError("This field is required.");
            return;
        }
        const url = `${AGENCY_CHANGE_NEGOTIATOR}?token=${token}`;
        const body = {
            staff_id: dropOption,
            tenancy_id: tenancyId
        }
        post(url, body, null, setPostData, setIsLoading);
    }

    useEffect(() => {
        if (!postData) return;
        if (postData.saved) {
            toast.success("Negotiator Changed Successfully!");
            setTimeout(() => {
                hideModalHandler();
            }, 1000);
            dispatch(updateActions.setUpdation());
        } else {
            toast.error("Failed To Update Negotiator!");
        }
    }, [postData]);

    console.log(postData, "this is post Data");
    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Change Tenancy Negotiator</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <div className="panel_form form-agency mt-4">
                    <Dropdown
                        label="Agency/Staff"
                        option={staffOptions}
                        className="flex-100 mb-4"
                        required={false}
                        error={dropError}
                        setError={setDropError}
                        selectValue={dropOption}
                        selectHandler={setDropOption}
                    />
                </div>
            </div>
            <div className="modal_footer d-flex mt-4 justify-content-center gap-3 flex-wrap">
                <button className="btn_light btn_sm" onClick={hideModalHandler}>
                    Cancel
                </button>
                <button className="btn_light btn_sm" onClick={changeNegoHandler}>
                    {isLoading && <span className="loader"></span>} Change Negotiator
                </button>
            </div>
        </div>
    );
}

export default ChangeNegotiator