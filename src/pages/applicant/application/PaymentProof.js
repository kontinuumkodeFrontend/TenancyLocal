import React, { useReducer } from "react";
import Input from "../../../components/formComponent/Input";
import FileUpload from "../../../components/formComponent/FileUpload";

//input file type inital state
const docs = [
  {
    id: 0,
    label: "Upload the last 3-Months worth of bank statements",
    text: "Upload file with PNG, JPG, PDF format and size less than 10 MB.",
  },
];

//Reducer function for adding more input type file or deleting file
const fileReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log(state.length, "lenght of input type file array");
    return [
      ...state,
      {
        id: state.length,
        label: "Other Document",
        text: "Upload file of size less than 10 MB.",
      },
    ];
  } else if (action.type === "DELETE") {
    const updatedDocs = state.filter((item) => item.id !== action.id);
    console.log(updatedDocs, "updated docs after delete");
    return updatedDocs;
  } else {
    return docs;
  }
};

const PaymentProof = (props) => {
  const [fileUpload, dispatchFile] = useReducer(fileReducer, docs);

  //document add handler
  const addDocHandler = () => {
    if (fileUpload.length === 6) {
      //if tatal file is greater than 6 then don't add any more documents
      return;
    }
    dispatchFile({ type: "ADD" });
  };

  //document delete handler
  const deleteDocHandler = (ID) => {
    console.log(ID, "id File deleted");
    dispatchFile({ type: "DELETE", id: ID });
  };

  console.log(fileUpload, ">>>>>>>>");

  return (
    <>
      <div className="panel_center-top pb-4">
        <h5 className="text-h5">{props.label}</h5>
      </div>
      <div className="panel_center-mid my-4">
        <div className="panel_form">
          <Input
            type="number"
            placeholder="Enter closing balance"
            label="What is the closing balance in your bank account"
            value=""
            disabled={false}
            prepend={true}
          />
          {/*File upload with Add-more or delete option*/}
          {/*Maxmimum upload possible == 5*/}
          {fileUpload?.map((item, index) => {
            return (
              <div key={index} className="input-box position-relative">
                <FileUpload
                  fileId={`file-${item.id}`}
                  label={item.label}
                  text={item.text}
                />
                <div className="fileUp-actions app-panel">
                  {/*Add ADD-MORE option only in last input file upload*/}
                  {index + 1 === fileUpload.length && index !== 4 && (
                    <button className="btn_add" onClick={addDocHandler}>
                      Add More
                    </button>
                  )}
                  {/*-->Add DELETE option in every input after 1st input file 
                      -->delete file on the ID basis not acc to index */}
                  {index >= 1 && (
                    <button
                      className="btn_del"
                      onClick={() => deleteDocHandler(item.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PaymentProof;
