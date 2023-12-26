import React, { useState } from "react";
import proIcon from "../../assets/images/app-profile.svg";
import uploadIcon from "../../assets/images/upload-icon.svg";
import { useEffect } from "react";
import { post } from "../../services/api";
import {
  AGECNY_UPDATE_SELFIE,
  IMG_URL,
  BASE_URL,
  ADMIN_AGENCY_MEDIA,
  MEDIA_LOGO,
  ADMIN_UPDATE_AGENCY_INFO_LOGO,
} from "../../config/url";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const ProfileImg = ({ fname, lname, imgURL, token, adminId }) => {
  const regex = /^\/admin\/agency\/\d+$/;
  let authRole = localStorage.getItem("authRole");
  const { id } = useParams();
  const location = useLocation();
  let postURL;
  let completeURL;

  if (
    regex.test(location.pathname) ||
    location.pathname === "/admin/agency-setting"
  ) {
    completeURL = `${BASE_URL}${MEDIA_LOGO}/${imgURL}?token=${token}`;
  } else {
    completeURL = `${BASE_URL}${IMG_URL}/${imgURL}?token=${token}`;
  }

  const [data, setData] = useState(null);
  const [image, setImg] = useState(proIcon);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const imgHandler = (event) => {
    let file = event.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        if (file.size <= 1048576) {
          // 1MB in bytes
          const reader = new FileReader();
          let url = URL.createObjectURL(file);
          setImg(url);
          reader.onloadend = () => {
            // After reading the file, set the base64 string to state
            setSelectedFile(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          toast.error(
            "File size exceeds the allowed limit (up to 1MB allowed)"
          );
          setSelfie();
          setSelectedFile(null);
        }
      } else {
        toast.error("Selected file is not an image.");
        setSelfie();
        setSelectedFile(null);
      }
    } else {
      setSelectedFile(null);
    }
  };

  function setSelfie() {
    if (completeURL) {
      setImg(completeURL);
    } else {
      setImg(proIcon);
    }
  }

  useEffect(() => {
    setSelfie();
  }, [completeURL]);

  const handleImgSubmit = () => {
    if (
      image !== undefined &&
      image !== null &&
      image !== proIcon &&
      image !== completeURL
    ) {
      let body;
      if (authRole === "1") {
        postURL = AGECNY_UPDATE_SELFIE;
        body = { selfie_pic: selectedFile };
      } else if (authRole === "2" && regex.test(location.pathname)) {
        postURL = ADMIN_AGENCY_MEDIA;
        body = { media_logo: selectedFile, id: id };
      } else if (
        authRole === "2" &&
        location.pathname === "/admin/agency-setting"
      ) {
        postURL = ADMIN_UPDATE_AGENCY_INFO_LOGO;
        body = { mediaLogo: { media_logo: selectedFile } };
      } else {
        postURL = "";
        body = "";
      }
      const path = `${postURL}?token=${token}`;
      post(path, body, null, setData, setIsLoading);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      toast.dismiss();
    }, 2000);
    if (data?.saved) {
      toast.success("Selfie saved successfully!");
    } else if (data?.errors) {
      toast.error(data.errors?.selfie_pic[0]);
      setSelfie();
    }
  }, [data]);

  return (
    <div className="panel_center-top panel_inner-pb">
      <div className="app_db-profile">
        <div className="d-flex flex-column gap-md-4 gap-3">
          <div className="position-relative">
            <input
              type="file"
              id="app-photo"
              name="app-photo"
              accept="image/png, image/jpeg"
              onChange={(event) => imgHandler(event)}
            />
            <div className="position-relative">
              <div className="app_db-photo">
                <img alt="img" src={image} />
              </div>
              <div className="photo-input">
                <label htmlFor="app-photo" className="upload-icon">
                  <img src={uploadIcon} alt="upload-icon" />
                </label>
              </div>
            </div>
          </div>
          <p className="helper-text2 mt-4">
            Drag and Drop or <span>Browse</span> to upload (max 2Mb)
          </p>
        </div>
        <div className="d-flex flex-column gap-lg-4 gap-2">
          <h2 className="text-capitalize text-h2">
            {fname} {lname}
          </h2>
          <button
            className="ava-btn btn_filled btn_lg"
            onClick={handleImgSubmit}
            type="button"
          >
            {isLoading && <span className="loader"></span>} Upload Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImg;
