import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import {
  GENERATE_AGREEMENT_MODAL,
  REVIEW_AGREEMENT_MODAL,
} from "../../../components/customModal/ModalConstants";
import moment from "moment";
import AggrementTable from "./AggrementTable";

const Agreement = () => {
  const dispatch = useDispatch();
  const [generate, setGenerate] = useState(false)
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const isAgreement = useSelector((state) => state.agreement.isAgreement);
  const [selectedTenancy, setSelectedTenancy] = useState("")
  const [tenancyType, setTenancyType] = useState("")
  const [show, setShow] = useState(false)

  const agreeModalHandler = () => {
    dispatch(mdActions.showModal({ type: GENERATE_AGREEMENT_MODAL }));
  };

  const reviewAgreementHandler = () => {
    dispatch(mdActions.showModal({ type: REVIEW_AGREEMENT_MODAL }));
  };

  useEffect(() => {
    if (selectedTenancy?.length > 0 && tenancyType?.length > 0) {
      setShow(true)
    }
  }, [selectedTenancy, tenancyType])


  return (
    <>
      {
        generate ?
          <div className="px-lg-5 mt-4 px-3 agr-tbl custom-table">
            <button className="btn_light2 btn_sm ms-auto" onClick={() => setGenerate((prev) => !prev)}>Back</button>
            <div className="agree-box mt-4">
              <div className="row">
                <div className="col-md-4 col-sm-6 mt-xl-0 mt-3 my-auto">
                  <p className="para1 fw-500 text-start">
                    Select Agreement
                  </p>
                  {/* */}
                  <div className="input-box">
                    <select onChange={(e) => setSelectedTenancy(e.target.value)}>
                      <option selected disabled>Select Agreement</option>
                      <option value="tenancyAgreement">Tenancy Agreement</option>
                      <option value="terminateAgreement">Terminate Agreement</option>
                      <option value="extendAgreement">Extend Agreement</option>
                    </select>
                  </div>
                  {
                    selectedTenancy === "extendAgreement" ?
                      <>
                        <p className="para1 fw-500 text-start mt-4">
                      Extend Tenancy End Date
                        </p>
                        <div className="input-box">
                          <input type="date" placeholder="Select date" />
                        </div>
                      </> :
                      selectedTenancy === "tenancyAgreement" ? <>
                        <p className="para1 fw-500 text-start mt-4">
                          Tenancy Agreement Generate Date
                        </p>
                        <div className="input-box">
                          <p className="edit_file-upload">{date}</p>
                        </div>
                      </> : selectedTenancy === "terminateAgreement" ? <>
                        <p className="para1 fw-500 text-start mt-4">
                          Tenancy Termination Date
                        </p>
                        <div className="input-box">
                          <p className="edit_file-upload">{date}</p>
                        </div>
                      </> : ""
                  }

                </div>
                <div className="col-md-4 offset-md-4 col-sm-6 mt-xl-0 mt-3 my-auto">
                  <p className="para1 fw-500 text-start">
                    Select Agreement Template
                  </p>
                  <div className="input-box">
                    <select onChange={(e) => setTenancyType(e.target.value)}>
                      <option selected disabled>Select Type</option>
                      <option value="template1">Template 1</option>
                      <option value="template2">Template 2</option>
                      <option value="template3">Template 3</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="input-box flex-100 mt-3">
              <h5 class=" fw-500 text-center" htmlFor="note">
                Terminate clause 
              </h5>
              <textarea
                id="note"
                name="note"
                placeholder="Enter terminate clause"
                // value={notesText}
                // onChange={(e) => setNotesText(e.target.value)}
                className="flex-100"
                rows={10}
              />
            </div>

              {/* {(selectedTenancy && tenancyType) &&  
            <div className="d-flex justify-content-end">
              <div className="btn_light2 btn_sm d-inline-flex mt-4" onClick={agreeModalHandler}>View</div>
            </div> } */}


              <div>
                {/* {isAgreement && ( */}
                {show && (
                  <> <div className="mt-4">
                    <object
                      data="https://www.newline.co/fullstack-react/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf"
                      type="application/pdf"
                      width="100%"
                      className="agreement_file"
                      aria-label="This object displays an PDF file"
                    />
                  </div>
                    <div className="d-flex justify-content-center mt-3">
                      <div className="btn_light2 btn_sm">Generate Agreement</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div> :
          <div className="px-lg-5 mt-4 px-3 agr-tbl custom-table">
            <div class="contact_head d-flex justify-content-between align-items-center">
              <h3 class="text_lg-green text-start m-0">Terminate Agreement</h3>
              <div className="btn_light2 btn_sm" onClick={() => setGenerate((prev) => !prev)}>Generate Agreement</div>
            </div>
            <AggrementTable />
          </div>
      }


      {/* previous code */}
      <div className="px-lg-5 px-3 grn-agg d-none">
        <Tabs defaultActiveKey="1" className="mt-4 tab-bg d-flex justify-content-between gen-btn">
          <Tab eventKey="1" title="View Generated Agreements">
            <div>
              <div className="row mt-lg-4 mt-3">
                <div className="col-xl-3 col-12 my-auto">
                  <p className="para1 fw-500 text-start">
                    Tenancy agreement sign date
                  </p>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto">
                  <div className="input-box">
                    <input
                      type="date"
                      placeholder="Select date"
                      value={date}
                      className="pe-none"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <object
                  data="https://tenancy-backend.tenancyhive.co.uk/storage/agency/agreement/white house_2023-09-14_aoTXyhAm_agreement.pdf?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjkyLCJpc3MiOiJodHRwczovL3RlbmFuY3ktYmFja2VuZC50ZW5hbmN5aGl2ZS5jby51ay9hcGkvbG9naW4iLCJpYXQiOjE2OTU4Nzc0NjUsImV4cCI6MTY5NTk2Mzg2NSwibmJmIjoxNjk1ODc3NDY1LCJqdGkiOiJ2eXBSc2dVTVl6M3hvbTFHIn0._waKs9rzBK4M6kL8i5W-9-wW9EI-faCJv1XNPiga4oY"
                  type="application/pdf"
                  width="100%"
                  className="agreement_file"
                  aria-label="This object displays an PDF file"
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey="2" title="Generate Agreement">
            <div>
              <div className="row mt-lg-4 mt-3">
                <div className="col-xl-3 col-12 my-auto">
                  <p className="para1 fw-500 text-start">
                    Tenancy agreement sign date
                  </p>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto">
                  <div className="input-box">
                    <input type="date" placeholder="Select date" />
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto">
                  <div className="file-upload input-box">
                    <input type="file" id="file1" name="file"></input>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto text-center">
                  <button
                    className="btn_filled btn_md"
                    onClick={reviewAgreementHandler}
                  >
                    Review Agreement
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-xl-3 col-12 my-auto">
                  <p className="para1 fw-500 text-start">
                    Terminate tenancy agreement
                  </p>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto">
                  <div className="input-box">
                    <input type="date" placeholder="Select date" />
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto">
                  <div className="file-upload input-box">
                    <input type="file" id="file1" name="file"></input>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto text-center">
                  <button
                    className="btn_filled btn_md"
                    onClick={agreeModalHandler}
                  >
                    Generate Agreement
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-xl-3 col-12 my-auto">
                  <p className="para1 fw-500 text-start">
                    Extend tenancy agreement
                  </p>
                </div>
                <div className="col-xl-6 col-12 mt-xl-0 mt-3 my-auto">
                  <div className="input-box">
                    <select defaultValue="Select otpion">
                      <option value="1month">1 Month</option>
                      <option value="2month">2 Month</option>
                      <option value="3month">3 Month</option>
                    </select>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mt-xl-0 mt-3 my-auto text-center">
                  <button
                    className="btn_filled btn_md"
                    onClick={agreeModalHandler}
                  >
                    Generate Agreement
                  </button>
                </div>
              </div>
              {isAgreement && (
                <div className="mt-4">
                  <object
                    data="https://www.newline.co/fullstack-react/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf"
                    type="application/pdf"
                    width="100%"
                    className="agreement_file"
                    aria-label="This object displays an PDF file"
                  />
                </div>
              )}
            </div>
          </Tab>

        </Tabs>
      </div>
    </>
  );
};

export default Agreement;
