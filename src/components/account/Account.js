import React, { useState, useEffect, useRef } from "react";
import proIcon from "../../assets/images/app-profile.svg";
import dropIcon from "../../assets/images/dropdown-icon.svg";
import AccDropContent from "./AccDropContent";
import { AGECNY_INFO, IMG_URL, BASE_URL, ADMIN_INFO } from "../../config/url";
import { get } from "../../services/api";

const Account = () => {
    const [dropContent, setDropContent] = useState(false);
    const [image, setImg] = useState(proIcon);
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userType = localStorage.getItem('authRole');
    let url; let imgUrl;
    let token;
    if (userType === "1") {
        token = localStorage.getItem("token");
        url = `${AGECNY_INFO}?token=${token}`;
        imgUrl = IMG_URL;
    } else if (userType === "2") {
        token = localStorage.getItem("token");
        url = `${ADMIN_INFO}?token=${token}`;
        imgUrl = IMG_URL;
    }
    const dropdownRef = useRef(null);
    const dropContentHandler = () => {
        setDropContent((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropContent(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);


    useEffect(() => {
        if (token) {
            get(url, setData, setIsLoading);
        }
    }, []);

    useEffect(() => {
        let completeURL = `${BASE_URL}${imgUrl}/${data?.info?.selfie_pic}?token=${token}`;
        setImg(completeURL);
        console.log(data,data?.info?.selfie_pic,  "this is user data !!!!!!!!!!")
    }, [data]);

    return (
        <div className="app_db-menu" ref={dropdownRef} onClick={dropContentHandler} >
            <p className="app-name">Hi, {data?.info?.name}</p>
            <div className="app-img">
                <img src={image} alt="profile-img" />
            </div>
            <div className="position-relative d-flex" >
                <button className="dropdown-btn">
                    <img src={dropIcon} alt="dropdown-icon" />
                </button>
                {dropContent && <AccDropContent />}
            </div>
        </div>
    )
}

export default Account