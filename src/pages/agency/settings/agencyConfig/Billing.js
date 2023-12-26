import React from "react";
const DetailList = () => {
  return (
    <>
      <li>
        <h6>Total Credits :</h6>
        <p>60</p>
      </li>
      <li>
        <h6>Used Credits :</h6>
        <p>17</p>
      </li>
      <li>
        <h6>Buy Credits :</h6>
        <div className="input-box flex-20">
          <input type="number" placeholder="Enter credits" defaultValue="" />
        </div>
      </li>
    </>
  );
};

const Billing = () => {
  return (
    <div className="panel_form panel_center-mid mt-4  justify-content-center">
      <ul className="app_pro-details flex-80 mt-0">
        <DetailList />
      </ul>
      <div className="modal_footer d-flex mt-3 justify-content-center gap-3 flex-wrap">
        <button className="btn_filled btn_sm">Buy Credits</button>
        <button className="btn_stroke2 btn_sm">Cancel</button>
      </div>
    </div>
  );
};

export default Billing;
