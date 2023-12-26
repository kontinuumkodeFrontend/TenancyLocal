import React, { useEffect, useState } from "react";
import Input from "../../../../components/formComponent/Input";
import RadioBtn from "../../../../components/formComponent/RadioBtn";
import TelInput from "../../../../components/formComponent/TelInput";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../../store/modal-slice";
import { DELETE_MODAL } from "../../../../components/customModal/ModalConstants";
import DeleteModal from "../../../../components/customModal/DeleteModal";

const PrevLandlord = () => {
  const [rentPaid, setRentPaid] = useState(true);
  const [isArrears, setIsArrears] = useState(true);
  const [isTenant, setIsTenant] = useState(true);
  const [isDamage, setIsDamage] = useState(false);
  const [counter, setCounter] = useState([1]);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [removeAppBtn, setRemoveAppBtn] = useState(false);
  const dispatch =  useDispatch();

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
     {isDeleteOpen && <DeleteModal data={deleteData} setDelete={setIsDelete}  setIsOpen={setIsDeleteOpen}/>}
      <div className="row mt-4">
        {
          counter?.map((item, i) => {
              return(
                <React.Fragment key={i}>
                  {counter?.length > 1 &&
                    <div className="col-12">
                        <div class="bg_filled mb-3 d-flex justify-content-between align-items-center"><p class="text_xsm">Landlord {i+1}</p>
                        {
                counter?.length > 1 && <button className="btn_light2 btn_sm" onClick={() => removeBtnHandler(`Landlord ${(i+1)}`)}>Delete</button>}
                        </div>
                    </div>
                  }
         <div className="col-lg-6 pe-xl-4 px-2 mb-4">
          <div
            className="contact-form"
            style={{ maxWidth: "100%", height: "100%" }}
          >
            <div className="contact_head">
              <h3 className="text_lg-green text-start m-0">Landlord Details</h3>
            </div>
            <div className="contact-body" style={{ paddingBottom: "100px" }}>
              <div className="panel_form form-agency">
                <Input
                  type="text"
                  placeholder="Enter landlord/agent name"
                  label="Landlord / Agent Name"
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
                  label="Property Rented with You"
                  value="F-244, Phase 8B, Industrial Area"
                  disabled={true}
                  prepend={false}
                  className="flex-100"
                />
                <Input
                  type="text"
                  placeholder="Enter your name"
                  label="Your Name"
                  value=""
                  disabled={false}
                  prepend={false}
                />
                <Input
                  type="text"
                  placeholder="Enter position"
                  label="Position"
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
                <Input
                  type="number"
                  placeholder="Enter rental amount"
                  label="Rental Amount (pcm)"
                  value="1000.00"
                  disabled={true}
                  prepend={true}
                />
              </div>
              <div className="panel_form form-agency mt-3">
                <div className="panel_que-btns">
                  <p className="form-labels">Rent Paid on Time</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="rent"
                      id="rent-yes"
                      defaultValue={true}
                      checked={rentPaid === true}
                      clickAction={setRentPaid}
                    />
                    <RadioBtn
                      label="No"
                      name="rent"
                      id="rent-no"
                      checked={rentPaid === false}
                      defaultValue={false}
                      clickAction={setRentPaid}
                    />
                  </div>
                </div>

                {rentPaid ?"":
                <>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">How frequently were they late</p>
                  <div className="btn_group lg-btns">
                    <RadioBtn
                      label="One-Off"
                      name="damage"
                      id="OneOff"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="Every month"
                      name="damage"
                      id="Everymonth"
                      defaultValue={false}
                    />
                    <RadioBtn
                      label="Every other month"
                      name="damage"
                      id="everyothermonth"
                      defaultValue={false}
                    />
                  </div>
                </div>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">
                  Currently in arrears?
                  </p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="app-free"
                      id="app-free-yes"
                      defaultValue={true}
                      checked={isArrears === true}
                      clickAction={setIsArrears}
                    />
                    <RadioBtn
                      label="No"
                      name="app-free"
                      id="app-free-no"
                      defaultValue={false}
                      checked={isArrears === false}
                      clickAction={setIsArrears}
                    />
                  </div>
                </div>
                {
                  isArrears === true && (
                    <div className="panel_que-btns flex-100">
                    <div className="btn_group">
                    <Input
                        type="number"
                        placeholder="0"
                        label="How much arrears?"
                        prepend={false}
                      />
                    </div>
                    </div>
                  )
                }
                </>
                }

                <div className="panel_que-btns flex-100">
                  <p className="form-labels">Any Damages</p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="damage"
                      id="damage-yes"
                      defaultValue={true}
                      checked={isDamage === true}
                      clickAction={setIsDamage}
                    />
                    <RadioBtn
                      label="No"
                      name="damage"
                      id="damage-no"
                      defaultValue={false}
                      checked={isDamage === false}
                      clickAction={setIsDamage}
                    />
                   
                  </div>
                </div>
                {
                  isDamage === true && (
                    <div className="panel_que-btns flex-100">
                    <div className="btn_group">
                    <Input
                        type="text"
                        placeholder="Enter Damage Detail"
                        label="Details of the Damages"
                        prepend={false}
                      />
                    </div>
                    </div>
                  )
                }
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">
                    Is the Applicant Free to Move out?
                  </p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="app-free"
                      id="app-free-yes"
                      defaultValue={true}
                    />
                    <RadioBtn
                      label="No"
                      name="app-free"
                      id="app-free-no"
                      defaultValue={false}
                    />
                  </div>
                </div>
                <div className="panel_que-btns flex-100">
                  <p className="form-labels">
                    Would You Recommend Them as a Tenants?
                  </p>
                  <div className="btn_group">
                    <RadioBtn
                      label="Yes"
                      name="app-recommend"
                      id="app-recommend-yes"
                      defaultValue={true}
                      checked={isTenant === true}
                      clickAction={setIsTenant}
                    />
                    <RadioBtn
                      label="No"
                      name="app-recommend"
                      id="app-recommend-no"
                      clickAction={setIsTenant}
                      checked={isTenant === false}
                      defaultValue={false}
                    />
                  </div>
                </div>
                {
                  isTenant === false && (
                    <div className="panel_que-btns flex-100">
                    <div className="btn_group">
                    <Input
                        type="text"
                        placeholder="Your Name"
                        label="Why not?"
                        prepend={false}
                      />
                    </div>
                    </div>
                  )
                }
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
              </React.Fragment>
              )
          })
        }
       
        <div className="mt-5 d-flex justify-content-center  flex-wrap gap-3">
          {/* <button className="bnt_light-danger btn_sm" onClick={removeBtnHandler}>
            Delete This Landlord
          </button> */}
          <button className="btn_light2 btn_sm" onClick={addBtnHandler}>Add Additional Landlord</button>
          <button className="btn_filled btn_sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default PrevLandlord;
