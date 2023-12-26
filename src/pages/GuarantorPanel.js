import React, { useState, useReducer } from "react";
import { Container } from "react-bootstrap";
import Input from "../components/formComponent/Input";
import { guarantorVariables } from "../helper/variables";
import PanelBottom from "../components/PanelBottom";
import FileUpload from "../components/formComponent/FileUpload";
import RadioBtn from "../components/formComponent/RadioBtn";
import { TERMS_MODAL } from "../components/customModal/ModalConstants";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { GUARANTOR } from "../helper/constants/UserConstant";

const EQ1 = () => {
  //additional question
  return (
    <div className="panel_form w-100">
      <Input
        type="text"
        className="flex-100"
        placeholder="Enter company name"
        label="Company Name"
        defaultValue=""
        disabled={false}
      />
      <Input
        type="text"
        className="flex-100"
        placeholder="Enter company address"
        label="Company Address"
        defaultValue=""
        disabled={false}
      />
      <Input
        type="text"
        className="flex-100"
        placeholder="Enter company HR email address"
        label="Company hr email address(for employment reference)"
        defaultValue=""
        disabled={false}
      />
    </div>
  );
};

const EQ2 = () => {
  //additional question
  return (
    <div className="panel_form w-100">
      <Input
        type="number"
        className="flex-100"
        placeholder="Enter amount"
        label="What is your net annual income (after taxes)?"
        value=""
        disabled={false}
        prepend={true}
      />
    </div>
  );
};

//input file type inital state
const docs = [
  {
    id: 0,
    label: "Upload Address Proof",
    text: "Proof of address can be any of the following - a utility bill - (gas, electricity or water), landline tele, or a bank statement) which is dated within the last three months and size less than 10 MB.",
  },
  {
    id: 1,
    label: "Upload Photo ID",
    text: "Photo ID can be a Passport or Driver's License and size less than 10 MB.",
  },
  {
    id: 2,
    label: "Upload Financial Proof",
    text: "Upload Financial proof of 3 month's worth of payslips and size less than 10 MB.",
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

const GuarantorPanel = () => {
  const [isEmployed, setIsEmployed] = useState(false);
  const [worth, setWorth] = useState(false);
  const [fileUpload, dispatchFile] = useReducer(fileReducer, docs);
  const dispatch = useDispatch();
  dispatch(userActions.setUser(GUARANTOR));
  
  const empStatusHandler = (value) => {
    setIsEmployed(value);
  };

  const worthHandler = (value) => {
    setWorth(value);
  };

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
    <Container>
      <div className="panel pt-md-5 pt-4">
        <div className="panel_head pb-5">
          <h2 className="text-h2">Guarantor Reference</h2>
        </div>
        <div className="panel_center-sec">
          <div className="panel_center-top panel_inner-pb">
            <h3 className="mb-4 text-h3">{guarantorVariables.heading}</h3>
            <p className="para1">{guarantorVariables.subHeading}</p>
          </div>
          <div className="panel_center-mid panel_inner-pt">
            <h5 className="text-h5">Guarantor Information</h5>
            <div className="panel_inner-p panel_form">
              <Input
                type="text"
                placeholder="Enter applicant name"
                label="Name of Applicant"
                value="Priyank Sharma"
                disabled={true}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter property name"
                label="Property Address"
                value="F-244, Phase 8B, Industrial Area"
                disabled={true}
                prepend={false}
              />
              <Input
                type="number"
                value="1000.00"
                placeholder="Enter rent amount"
                label="Rent Split Amount PCM"
                disabled={true}
                prepend={true}
              />
              <Input
                type="text"
                placeholder="Enter guarantor name"
                defaultValue="Steve Austin"
                label="Guarantor's Name"
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter address"
                label="Address"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
              <Input
                type="text"
                placeholder="Enter occupation"
                label="Occupation"
                defaultValue=""
                disabled={false}
                prepend={false}
              />
            </div>
            <div className="panel_que">
              <div className="panel_que-head">
                <h5 className="text-h5">Guarantor Questionnaire</h5>
              </div>
              <div className="panel_que-mid">
                <div className="panel_que-btns">
                  <p className="form-labels">Home Owner</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="home-owner"
                      id="own-yes"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="home-owner"
                      id="own-no"
                      defaultValue={false}
                    />
                  </div>
                </div>
                <div className="panel_que-btns">
                  <p className="form-labels">Are you Employed?</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="emp"
                      id="emp-yes"
                      clickAction={empStatusHandler}
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="emp"
                      id="emp-no"
                      clickAction={empStatusHandler}
                      defaultValue={false}
                    />
                  </div>
                </div>
                {isEmployed && <EQ1 />}
                <div className="panel_que-btns">
                  <p className="form-labels">Are You Living in UK ?</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="live-in-uk"
                      id="uk-yes"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="live-in-uk"
                      id="uk-no"
                      defaultValue={false}
                    />
                  </div>
                </div>
                <div className="panel_que-btns">
                  <p className="form-labels">Are you 18 years old?</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="eightin-plus"
                      id="eightin-yes"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="eightin-plus"
                      id="eightin-no"
                      defaultValue={false}
                    />
                  </div>
                </div>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">Relationship with the applicant</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Parent"
                      name="relation"
                      id="parent"
                      defaultValue="parent"
                    />
                    <RadioBtn
                      label="Sibling"
                      name="relation"
                      id="sibling"
                      defaultValue="sibling"
                    />
                    <RadioBtn
                      className="radio-btn-lg"
                      label="Other Family"
                      name="relation"
                      id="other-fam"
                      defaultValue="other family"
                    />
                    <RadioBtn
                      label="Friend"
                      name="relation"
                      id="friend"
                      defaultValue="friend"
                    />
                  </div>
                </div>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">
                    Is your net income at least 3x the rental amount you're
                    guaranteeing?
                  </p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="income"
                      id="income-yes"
                      defaultValue={true}
                      clickAction={worthHandler}
                    />
                    <RadioBtn
                      label="No"
                      name="income"
                      id="income-no"
                      defaultValue={false}
                      clickAction={worthHandler}
                    />
                  </div>
                </div>
                {worth && <EQ2 />}

                {/*File upload with Add-more or delete option*/}
                {/*Max file upload == 5*/}
                {fileUpload?.map((item, index) => {
                  if (index >= 2) {
                    //if file upload input is 3rd one or greater than 3rd one then add ADD-MORE option/DELETE option
                    return (
                      <div key={index} className="flex-100 position-relative">
                        <FileUpload
                          fileId={`file-${item.id}`}
                          label={item.label}
                          text={item.text}
                        />
                        <div className="fileUp-actions">
                          {/*Add ADD-MORE option only in last input file upload*/}
                          {index + 1 === fileUpload.length && index !== 4 && (
                            <button className="btn_add" onClick={addDocHandler}>
                              Add More
                            </button>
                          )}
                          {/*
                          -->Add DELETE option in every input after 3rd input file 
                           -->delete file on the ID basis not  acc to index
                          */}
                          {index >= 3 && (
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
                  } else {
                    //for 1st two options return simple input file w/o any ADD-MORE/DELETE option
                    return (
                      <div key={index} className="flex-100">
                        <FileUpload
                          fileId={`file-${item.id}`}
                          label={item.label}
                          text={item.text}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <PanelBottom
            label="Guarantor's Signature"
            modalType={TERMS_MODAL}
            checkLabel="I confirm the information provided is accurate and I accept the terms to act as guarantor for Priyank Sharma"
          />
        </div>
      </div>
    </Container>
  );
};

export default GuarantorPanel;
