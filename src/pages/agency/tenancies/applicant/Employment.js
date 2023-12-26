import React, { useState } from "react";
import Input from "../../../../components/formComponent/Input";
import RadioBtn from "../../../../components/formComponent/RadioBtn";
import TelInput from "../../../../components/formComponent/TelInput";
import DeleteModal from "../../../../components/customModal/DeleteModal";

const Employment = () => {
  const [counter, setCounter] = useState([1]);
  const [removeAppBtn, setRemoveAppBtn] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const addBtnHandler = () => {
    setRemoveAppBtn(true);
    setCounter(prevCounter => [...prevCounter, 1]);
  };

  const removeBtnHandler = (e) => {
    setIsDeleteOpen(true) 
    setDeleteData(e)   
};

if(isDelete){
    if (counter?.length === 1 ) {
      // Handle the case where there's only one item
    } else {
      setCounter(prevCounter => prevCounter.slice(0, -1));
    }
}
setTimeout(() => {
  setIsDelete(false)
}, 1000);
  return (
    <div className="px-xl-5 px-3">
      <div className="row mt-4">
      {isDeleteOpen && <DeleteModal data={deleteData} setDelete={setIsDelete}  setIsOpen={setIsDeleteOpen}/>}
        {
          counter?.map((item, i) => {
            return(
              <React.Fragment key={i}>
                {counter?.length > 1 &&
                    <div className="col-12">
                        <div class="bg_filled mb-3 d-flex justify-content-between align-items-center"><p class="text_xsm">Employer {i+1}</p>
                        {
                       counter?.length > 1 && <button className="btn_light2 btn_sm"  onClick={() => removeBtnHandler(`Employer ${(i+1)}`)}>Delete</button>}
                        </div>
                    </div>
                  }
                <div className="col-lg-6 pe-xl-4 px-2 mb-4">
                  <div
                    className="contact-form"
                    style={{ maxWidth: "100%", height: "100%" }}
                  >
                    <div className="contact_head">
                      <h3 className="text_lg-green text-start m-0">Employer Details</h3>
                    </div>
                    <div className="contact-body" style={{ paddingBottom: "100px" }}>
                      <div className="panel_form form-agency">
                        <Input
                          type="text"
                          placeholder="Enter landlord name"
                          label="Name"
                          value="Willam Smith"
                          disabled={false}
                          prepend={false}
                        />
                        <Input
                          type="text"
                          placeholder="Enter company name"
                          label="Company"
                          value=""
                          disabled={false}
                          prepend={false}
                        />
                        <div className="flex-100 position-relative">
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            label="Email"
                            value="roseBudd@gmail.com"
                            disabled={false}
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
                          disabled={false}
                          prepend={false}
                          className="flex-100"
                        />
                        <TelInput />
                        <Input
                          type="text"
                          placeholder="Enter job title"
                          label="Job Title"
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
                          <p className="form-labels">In Probation Period</p>
                          <div className="btn_group">
                            <RadioBtn
                              label="Yes"
                              name="probation"
                              id="probation-yes"
                              defaultValue={true}
                            />
                            <RadioBtn
                              label="No"
                              name="probation"
                              id="probation-no"
                              defaultValue={false}
                            />
                          </div>
                        </div>
                        <Input
                          type="text"
                          placeholder="Enter contract type"
                          label="Contract Type"
                          value="Permanent Full-Time"
                          disabled={false}
                          prepend={false}
                          className="flex-100"
                        />
                        <Input
                          type="number"
                          placeholder="Enter annual salary"
                          label="Annual Salary"
                          value="3545"
                          disabled={false}
                          prepend={true}
                        />
                        <Input
                          type="number"
                          placeholder="Enter annual bonus"
                          label="Average Annual Bonus / Commision"
                          value="253.00"
                          disabled={false}
                          prepend={true}
                        />
                        <Input
                          type="text"
                          placeholder="Enter position"
                          label="Position"
                          value="Marketing Manager"
                          disabled={false}
                          prepend={false}
                        />
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
                <div className="mb-4">
                  {/* {
                    counter?.length > 1 && <button className="bnt_light-danger btn_sm" onClick={removeBtnHandler}>
                    Delete This Employer
                  </button>
                  } */}
                </div>
              </React.Fragment>
            )
          })
        }
        <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
        {/* <button className="bnt_light-danger btn_sm" onClick={removeBtnHandler}>
            Delete This Employer
          </button> */}
          <button className="btn_light2 btn_sm" onClick={addBtnHandler}>Add Additional Employer</button>
          <button className="btn_filled btn_sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Employment;
