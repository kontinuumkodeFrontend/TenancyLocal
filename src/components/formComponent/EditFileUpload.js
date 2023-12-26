import React from "react";
import fileIcon from "../../assets/images/file-upload.png";

const EditFileUpload = (props) => {
    return (
        <div
            className={
                props.className
                    ? `${props.className} file-upload input-box`
                    : `file-upload input-box`
            }
        >
            <label className="form-labels" htmlFor={props.fileId}>
                {props.label}
            </label>
            <div className="edit_file-upload position-relative">
                <div className="d-flex align-items-center justify-content-between">
                    <p>File Name</p>
                    <img
                        src={fileIcon}
                        alt="icon"
                        style={{ width: "25px", cursor: "pointer" }}
                    />
                </div>
                <input type="file" id={props.fileId} name={props.fileId}></input>
            </div>


            <p className="helper-text">{props.text}</p>
        </div>
    );
};

export default EditFileUpload;
