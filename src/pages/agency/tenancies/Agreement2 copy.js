import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import {
  GENERATE_AGREEMENT_MODAL,
  REVIEW_AGREEMENT_MODAL,
} from "../../../components/customModal/ModalConstants";
import moment from "moment";

const Agreement2 = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const isAgreement = useSelector((state) => state.agreement.isAgreement);

  const agreeModalHandler = () => {
    dispatch(mdActions.showModal({type :GENERATE_AGREEMENT_MODAL}));
  };
  const reviewAgreementHandler = () => {
    dispatch(mdActions.showModal({type: REVIEW_AGREEMENT_MODAL}));
  };

  return (
    <div className="px-lg-5 px-3 grn-agg">
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
            {/* <div className="mt-4">
              <object
                data="https://www.newline.co/fullstack-react/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf"
                type="application/pdf"
                width="100%"
                className="agreement_file"
                aria-label="This object displays an PDF file"
              />
            </div> */}
          </div>
        </Tab>
        <Tab eventKey="2" title="Generate Agreement">
          <div>
            {/* <div className="row mt-lg-4 mt-3">
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
            </div> */}
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
  );
};

export default Agreement2;
