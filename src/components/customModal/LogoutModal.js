import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authRole = localStorage.getItem("authRole");
    const hideModalHandler = (e) => {
        e.preventDefault();
        dispatch(mdActions.hideModal());
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head">
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body">
                <h4 className="text-h4">Are you sure you want to logout?</h4>
            </div>
            <div className="modal_footer text-center mt-4">
                <button
                    className="btn_filled btn_sm mx-auto"
                    onClick={() => {
                        dispatch(mdActions.hideModal());
                        if (authRole === "1" || authRole === "2") {
                            localStorage.removeItem("token");
                            navigate("/")
                        }else if(authRole === "0"){
                            localStorage.removeItem("applicantToken");
                            navigate("/")
                        }
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default LogoutModal;
