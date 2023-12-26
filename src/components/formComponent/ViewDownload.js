import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Viewer from "react-viewer";
import Close from "../../assets/images/close.png"
import viewIcon from "../../assets/images/view-dark.svg";
import DownloadIcon from "../../assets/images/download-dark.svg";
import { DOWNLOAD_FILES } from "../../config/url";
import { useEffect } from "react";
import { get } from "../../services/api";
import { useDispatch } from "react-redux";
import { editPropActions } from "../../store/edit-property-slice";
import { BASE64 } from "../../helper/constants/ViewTenancyConstant";
import { useLocation } from "react-router-dom";

// Helper function to convert base64 to Blob
const base64ToBlob = (base64) => {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create a Blob, not a Blob URL
  const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
  // Create an object URL from the Blob
  const url = URL.createObjectURL(blob);
  console.log(url, "blob url");
  return url;
};


const getFileUrl = async (file) => {
  // Convert base64 file to blob type
  const base64Data = file;
  const response = await fetch(base64Data);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }
  // Convert the response to a blob
  const blob = await response.blob();
  // Create an object URL from the Blob
  const url = URL.createObjectURL(blob);
  console.log(url, "blob url");
  return url;
};

export const ViewDownload = ({ file, fileType }) => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);
  const location = useLocation();
  const [isImage, setIsImage] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [visible, setVisible] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // if file already exists
    if (typeof file === 'string' && file) {
      const url = `${DOWNLOAD_FILES}/${file}?token=${token}`;
      get(url, setData, setIsLoading);
    }
  }, []);

  useEffect(() => {
    const setFileUrlFromData = async () => {
      try {
        if (data?.saved && data?.data && file && typeof file === 'string') {
          const url = await getFileUrl(data?.data);
          setFileUrl(url);
          setIsImage(data?.mime_type?.startsWith('image'));
          //update the editProp slice (which handles  base64v files)
          if (location.pathname === "/agency/properties") {
            dispatch(editPropActions.setFile({ type: BASE64, fileType: fileType, file: data?.data }))
          }
        } else if (file && typeof file !== 'string' && data === null) {
          const url = URL.createObjectURL(file);
          setFileUrl(url);
          setIsImage(file.type.startsWith('image'));
        }
      } catch (error) {
        console.error('Error setting file URL:', error);
      }
    };

    setFileUrlFromData();
  }, [data, file]);

  console.log("file type:", typeof file, "file:", file);
  console.log("data type:", typeof data, "data:", data);


  const handleButtonClick = () => {
    setVisible(true);
  };

  const handleCloseViewer = () => {
    setVisible(false);
  };

  console.log(fileUrl, data, "this is File url-----------");

  return (
    <div className="view-download">
      <a href={fileUrl} target="_blank" rel="noreferrer">
        <img src={DownloadIcon} alt="download-icon" />
      </a>
      <button type="button" onClick={handleButtonClick}>
        <img src={viewIcon} alt="view-icon" />
      </button>
      {isImage ? (
        <Viewer
          zIndex={100000000}
          visible={visible}
          images={[{ src: fileUrl, alt: "file" }]}
          downloadable={true}
          onClose={handleCloseViewer}
          zoomable={true}
          rotateable={false}
          noFooter={true}
        />
      ) : (
        <Modal
          open={visible}
          onClose={handleCloseViewer}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="file-viewer position-relative">
            <button className="close-btn" onClick={handleCloseViewer}>
              <img src={Close} alt="img" />
            </button>
            <DocViewer documents={[{ uri: fileUrl }]} pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: false,
                },
                pdfZoom: {
                  defaultZoom: 0.5, // 1 as default,
                },
                pdfVerticalScrollByDefault: true, // false as default
              }} />
          </div>
        </Modal>
      )}
    </div>
  );
};

