import React from "react";
import Download from "../../assets/images/downloads-file.png";

const DownloadFile = () => {
  return (
    <div className="download-file">
      <a href="#" download>
        <img alt="file-download" src={Download}/>
      </a>
    </div>
  );
};

export default DownloadFile;
