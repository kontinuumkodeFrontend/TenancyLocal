import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mdActions } from '../../store/modal-slice';
import { useSelector } from "react-redux";
import { ADMIN, AGENCY } from '../../helper/constants/UserConstant';
import { LOGOUT_MODAL } from '../customModal/ModalConstants';


const AccDropContent = () => {
    const userType = useSelector(state => state.user.userType);
    let profilePath;
    const dispatch = useDispatch();
    const location = useLocation();
    const logoutHandler = () => {
        dispatch(mdActions.showModal({ type: LOGOUT_MODAL }));
        console.log('Logging out...')
    };

    const authRole = localStorage.getItem("authRole");
    if (location.pathname === "/applicant/dashboard") {
        profilePath = "/applicant/dashboard/profile";
    }
    else if (location.pathname.includes("admin")) {
        profilePath = "/admin/profile";
    }
    else if (authRole === '1') {
        profilePath = "/agency/profile";
    }

    return (
        <>
            <ul className="drop-content scale-up-center">
                <li><NavLink to={profilePath}>My Profile</NavLink></li>
                {location.pathname.includes("admin") && <li><NavLink to='agency-setting'>Agency Setting</NavLink></li>}
                {authRole === '1' && !location.pathname.includes("admin") && !location.pathname.includes("applicant/dashboard") && <li><NavLink to='help-contact'>Help/Contact</NavLink></li>}
                <li><button onClick={() => logoutHandler()}>Logout</button></li>
            </ul>
        </>
    );
};

export default AccDropContent

