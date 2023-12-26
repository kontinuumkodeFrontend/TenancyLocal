import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../../store/modal-slice";
import RefIncomplete from "./RefIncomplete";
import viewIcon from "../../../../assets/images/view-doc.svg";
import DownloadFile from "../../../../components/formComponent/DownloadFile";
import UploadFileIcon from "../../../../components/formComponent/UploadFileIcon";
import RefProof from "./RefProof";
import { SEND_MAIL_MODAL } from "../../../../components/customModal/ModalConstants";

const DetailList = (props) => {
  return (
    <div>
      <li>
        <h6>Employment/Agent Name :</h6>
        <p>{props?.data}</p>
      </li>
      <li>
        <h6>Company Name :</h6>
        <p>BetaGamaRay</p>
      </li>
      <li>
        <h6>Job Title :</h6>
        <p>Graphic Designer</p>
      </li>
      <li>
        <h6>In Probation Period :</h6>
        <p>No</p>
      </li>
      <li>
        <h6>Contract Type :</h6>
        <p>Permanent Full-Time</p>
      </li>
      <li>
        <h6>Position  :</h6>
        <p>Junior Graphic Designer</p>
      </li>
      <li>
        <h6>Annual Salary :</h6>
        <p>£275</p>
      </li>
      <li>
        <h6>Average Annual Bonus Commission :</h6>
        <p>£2345</p>
      </li>
      <li>
        <h6>Employer Signature :</h6>
        <p className="d-flex align-items-center ms-lg-0">
          signature.png
          <span>
            <img
              src={viewIcon}
              alt="view-icon"
              className="view-icon ms-3"
            />
          </span>
          <span className="ms-2 view-icon">
            <DownloadFile />
          </span>
          {/* <span className="ms-1 view-icon">
            <UploadFileIcon />
          </span>*/}
        </p>
      </li>
      <li style={{ border: 'none' }}><RefProof /></li>
    </div>
  );
};

const EmpRefContent = (props) => {
  const dispatch = useDispatch();

  const sendEmailHandler = () => {
    dispatch(mdActions.showModal({type: SEND_MAIL_MODAL}));
  }

  return (
    <div className={props?.className ? `app_progress mt-md-5 mt-4 ${props.className}`:"app_progress mt-md-5 mt-4"}>
      <div className="pro-head">
        <h5 className="text_lg-green text-center text-uppercase">
          {props.item} - Application Progress
        </h5>
      </div>
      <div className="pro-body px-lg-5 px-3">
        <div className="d-flex justify-content-between mt-4 align-items-center flex-md-row flex-column gap-3">
          <h3 className="para1 fw-600 mt-0" style={{ color: "#03565a" }}>
            Employer Application:
          </h3>
          <div className="d-flex flex-sm-row flex-column gap-2">
            <div className="bg_light2">Ready For Review : May 1, 2023</div>
            <div className="bg_light2">Provisional Result : Accepted</div>
          </div>
        </div>
        <ul className="app_pro-details">
          <DetailList data={props.item}/>
        </ul>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn_light2 btn_md" onClick={sendEmailHandler}>Draft an email</button>
          <button className="btn_filled btn_md">Submit</button>
        </div>
      </div>
    </div>
  );
};

const EmpRef = (props) => {
  let arr = [props.item.appName, "Jack", "Steven", "Jimmy"]
  const [actBtn, setActBtn] = useState(arr[0])

  return (
    <>
    

    <div className="panel_setting d-flex justify-content-center gap-md-4 gap-3 px-xl-5 px-3 flex-wrap">
      {
        arr?.map((item, i) => {
          return(
            <button
                className={
                    actBtn === item ? "btn_filled btn_sm" : "btn_light2 btn_sm"
                }
                onClick={() => {
                    setActBtn(item);
                }}
            >
                {item}
            </button>
          )
        })
      }
    </div>
  {/* {props.item.empRef === "Completed" ? (
        <EmpRefContent item={props.item}/>
      ) : (
        <RefIncomplete />
      )} */}
    {props.item.empRef === "Completed" ? 
        arr?.map((item, i) => {return <EmpRefContent className={item === actBtn ? "d-block" : "d-none"} item={item} key={i}/>}) : 
        arr?.map((item, i) => {return <RefIncomplete className={item === actBtn ? "d-block" : "d-none"} item={item} key={i}/> })}
    </>
  );
};

export default EmpRef;
