import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPropActions } from "../../store/edit-property-slice";
import { FILE } from "../../helper/constants/ViewTenancyConstant";
import { fileBase64 } from "../../services/utils";
import { VIEW_EDIT_PROP_MODAL } from "../customModal/ModalConstants";

const FileUpload = (props) => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.type);
  const fileChangeHandler = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile && props.accept) {
      const acceptedTypes = props.accept.split(',').map((type) => type.trim());
      const maxSize = props.accept === 'image/jpeg' ? 2 * 1024 * 1024 : 10 * 1024 * 1024;
      console.log(acceptedTypes, "These are accepted files: " + selectedFile.type)
      if (!acceptedTypes.includes(selectedFile.type)) {
        props.setError('Invalid file type.');
        props.fileHandler(null);
      } else if (selectedFile.size > maxSize) {
        props.setError(`File size should be less than or equal to ${maxSize / (1024 * 1024)}MB.`);
        props.fileHandler(null);
      } else {
        props.fileHandler(selectedFile);
        if (modalType === VIEW_EDIT_PROP_MODAL) {
          fileBase64(selectedFile).then((data) => {
            console.log(data, "this is a file data");
            dispatch(editPropActions.setFile({ type: FILE, fileType: props.fileType, file: data }))
          });
        }
        props.setError(null);
      }
    }
  };

  console.log(props.file, "This is the file..")
  return (
    <div
      className={`
    file-upload input-box
    ${props.error ? "input-err" : ""}
    ${props.className || ""}`}
    >
      <label className="form-labels" htmlFor={props.fileId}>
        {props.label}
      </label>
      <div className="position-relative">
        <input
          type="file"
          id={props.fileId}
          name={props.fileId}
          onChange={fileChangeHandler}
          required={props.required}
          accept={props.accept}
        />
        <div className="file-name">
          <p>{props.file ? typeof props?.file === 'string' ? props.file : props.file.name : "No file chosen"}</p>
        </div>
      </div>
      <p className={`helper-text ${props.error && "text-danger"}`}>{props.text}</p>
      {/*{props.error && <p className="error-text">{props.error}</p>}*/}
    </div>
  );
};

export default FileUpload;

// accept="image/jpeg, image/png"
// <FileUpload accept=".pdf" />
// <FileUpload accept="image/jpeg, image/png" />
// <FileUpload accept="image/*" />
// <FileUpload accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf" />
// <FileUpload accept="*/*" />
