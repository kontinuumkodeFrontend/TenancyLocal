import React from "react";


const Financial = () => {
  return (
    <div className="panel_form panel_center-mid  mt-4 justify-content-center">
      <form className="flex-60">
        <div
          className="input-box"
        >
          <label className="form-labels">Default deposit amount is <span className="label-sm">2.0</span> times the</label>
          <select defaultValue='Select Period'>
            <option value='default'>Select Period</option>
            <option value='1'>Weekly</option>
            <option value='2'>Monthly</option>
          </select>
        </div>
        <div
          className="input-box mt-3"
        >
          <label className="form-labels">Calculate daily rent using the</label>
          <select defaultValue='Select Period'>
            <option value='default'>Select Period</option>
            <option value='1'>Yearly rent/365 x Days</option>
          </select>
        </div>
        <button className="btn_filled btn_sm mt-4 mx-auto">Save Requirements</button>
      </form>
    </div>
  );
};

export default Financial;
