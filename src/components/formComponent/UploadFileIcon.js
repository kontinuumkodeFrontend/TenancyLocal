import React from "react";
import Download from "../../assets/images/downloads-file.png";

const UploadFileIcon = () => {
  return (
    <div className="download-file">
      <input type="file" id="uploadFile" style={{ display: "none" }} />
      <label htmlFor="uploadFile">
        <img
          alt="file-download"
          src={Download}
          style={{ transform: "rotate(178deg)", cursor: "pointer" }}
        />
      </label>
    </div>
  );
};

export default UploadFileIcon;
