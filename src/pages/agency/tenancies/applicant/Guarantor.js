import React, { useState } from "react";
import Input from "../../../../components/formComponent/Input";
import RadioBtn from "../../../../components/formComponent/RadioBtn";
import TelInput from "../../../../components/formComponent/TelInput";
import DownloadFile from "../../../../components/formComponent/DownloadFile";
import viewIcon from "../../../../assets/images/view-doc.svg";
import DeleteModal from "../../../../components/customModal/DeleteModal";

const Guarantor = () => {
  const [counter, setCounter] = useState([1]);
  const [removeAppBtn, setRemoveAppBtn] = useState(false);
  const [counterGurr, setCounterGurr] = useState([1]);
  const [removeGurrAppBtn, setRemoveGurrAppBtn] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const addBtnHandler = () => {
    setRemoveAppBtn(true);
    setCounter(prevCounter => [...prevCounter, 1]);
  };

  const removeBtnHandler = () => {
    if (counter?.length === 1) {
    } else {
      setCounter(prevCounter => prevCounter.slice(0, -1));
    }
  };


  const addGurrBtnHandler = () => {
    setRemoveGurrAppBtn(true);
    setCounterGurr(prevCounter => [...prevCounter, 1]);
    console.log(counterGurr, ">>>>>> counter Gureantor");
  };

  const removeGurrBtnHandler = (e) => {
    setIsDeleteOpen(true)
    setDeleteData(e)
  };

  if (isDelete) {
    if (counterGurr?.length === 1) {
      // Handle the case where there's only one item
    } else {
      setCounterGurr(prevCounter => prevCounter.slice(0, -1));
    }
  }
  return (
    <div className="px-xl-5 px-3">
      <div className="row mt-4">
        {isDeleteOpen && <DeleteModal data={deleteData} setDelete={setIsDelete} setIsOpen={setIsDeleteOpen} />}
        {
          counterGurr?.map((item, i) => {
            return (
              <React.Fragment key={i}>
                {counterGurr?.length > 1 &&
                  <div className="col-12">
                    <div class="bg_filled mb-3 d-flex justify-content-between align-items-center"><p class="text_xsm">Guarantor {i + 1}</p>
                      {
                        counterGurr?.length > 1 && <button className="btn_light2 btn_sm" onClick={() => removeGurrBtnHandler(`Guarantor ${(i + 1)}`)}>Delete</button>}
                    </div>
                  </div>
                }
                <div className="col-lg-6 pe-xl-4 px-2 mb-4">
                  <div
                    className="contact-form"
                    style={{ maxWidth: "100%", height: "100%" }}
                  >
                    <div className="contact_head">
                      <h3 className="text_lg-green text-start m-0">
                        Guarantor Details
                      </h3>
                    </div>
                    <div className="contact-body" style={{ paddingBottom: "100px" }}>
                      <div className="panel_form form-agency">
                        <Input
                          type="text"
                          placeholder="Enter landlord name"
                          label="Name"
                          value="Willam Smith"
                          disabled={true}
                          prepend={false}
                        />
                        <TelInput />
                        <div className="flex-100 position-relative">
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            label="Email"
                            value="roseBudd@gmail.com"
                            disabled={true}
                            prepend={false}
                            className="flex-100"
                          />
                          <button className="resend-btn">Resend</button>
                        </div>
                        <Input
                          type="text"
                          placeholder="Enter address"
                          label="Address"
                          value="F-244, Phase 8B, Industrial Area"
                          disabled={true}
                          prepend={false}
                          className="flex-100"
                        />
                        <Input
                          type="text"
                          placeholder="Enter occupation"
                          label="Occupation"
                          value=""
                          disabled={false}
                          prepend={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ps-xl-4 px-2 mt-xl-0 mt-4 mb-4">
                  <div className="contact-form" style={{ maxWidth: "100%" }}>
                    <div className="contact_head">
                      <h3 className="text_lg-green text-start m-0">
                        Provided Information
                      </h3>
                    </div>
                    <div className="contact-body" style={{ paddingBottom: "100px" }}>
                      <div className="panel_form form-agency">
                        <div className="panel_que-btns">
                          <p className="form-labels">Home Owner</p>
                          <div className="btn_group">
                            <RadioBtn
                              label="Yes"
                              name="owner"
                              id="owner-yes"
                              defaultValue={true}
                            />
                            <RadioBtn
                              label="No"
                              name="owner"
                              id="owner-no"
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
                          <p className="form-labels">Are you Employed?</p>
                          <div className="btn_group">
                            <RadioBtn
                              label="Yes"
                              name="emp"
                              id="emp-yes"
                              defaultValue={true}
                            />
                            <RadioBtn
                              label="No"
                              name="emp"
                              id="emp-no"
                              defaultValue={false}
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
                            />
                            <RadioBtn
                              label="No"
                              name="income"
                              id="income-no"
                              defaultValue={false}
                            />
                          </div>
                        </div>
                        {/*Files */}
                        <div className="panel_form form-agency">
                          <Input
                            type="text"
                            placeholder="Address Proof"
                            label="Address Proof (Within 3 months)"
                            value="address.jpeg"
                            disabled={true}
                            prepend={false}
                            className="flex-80"
                          />
                          <p className="d-flex align-items-center ms-lg-0 doc-dv">
                            <span>
                              <img
                                src={viewIcon}
                                alt="view-icon"
                                className="view-icon ms-3"
                              />
                            </span>
                            <span className="ms-3 view-icon">
                              <DownloadFile />
                            </span>
                          </p>
                          <Input
                            type="text"
                            placeholder="ID Proof"
                            label="ID Proof"
                            value="myid.jpeg"
                            disabled={true}
                            prepend={false}
                            className="flex-80"
                          />
                          <p className="d-flex align-items-center ms-lg-0 doc-dv">
                            <span>
                              <img
                                src={viewIcon}
                                alt="view-icon"
                                className="view-icon ms-3"
                              />
                            </span>
                            <span className="ms-3 view-icon">
                              <DownloadFile />
                            </span>
                          </p>
                          {
                            counter?.map((item, i) => {
                              return (
                                <div key={i} className="one-rw" >
                                  <Input
                                    type="text"
                                    placeholder={i == 0 ? "Financial Proof" : "Additional Document"}
                                    label={i == 0 ? "Financial Proof (Recent 3 months)" : "Additional Document"}
                                    disabled={true}
                                    prepend={false}
                                    className="flex-80"
                                  />
                                  <p className="d-flex align-items-center ms-lg-0 doc-dv">
                                    <span>
                                      <img
                                        src={viewIcon}
                                        alt="view-icon"
                                        className="view-icon ms-3"
                                      />
                                    </span>
                                    <span className="ms-3 view-icon">
                                      <DownloadFile />
                                    </span>
                                  </p>
                                  <div>
                                    {counter?.length > 1 && <button class="btn_light2 btn_sm" onClick={removeBtnHandler}>Remove</button>}
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                        <div class="input-box flex-100">
                          <div class="mb-3 d-flex justify-content-end gap-3">
                            <button class="btn_filled btn_sm" onClick={addBtnHandler}>Add Additional Document</button></div>
                        </div>
                        <div class="input-box flex-100">
                          <label class="form-labels" htmlFor="note">
                            Notes
                          </label>
                          <textarea
                            id="note"
                            name="note"
                            placeholder="Type your message"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales."
                            className="flex-100"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {
                counterGurr?.length > 1 ?
                <button className="bnt_light-danger btn_sm" >
                   This Guarantor
              </button> :''
              } */}
              </React.Fragment>
            )
          })

        }
        <div className="mt-5 d-flex justify-content-center  flex-wrap gap-3">

          <button className="btn_light2 btn_sm" onClick={addGurrBtnHandler}>
            Add Additional Guarantor
          </button>
          <button className="btn_filled btn_sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Guarantor;
