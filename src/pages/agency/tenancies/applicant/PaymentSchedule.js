import React, { useState } from "react";
import EditIcon from "../../../../assets/images/edit-icon.svg";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CustomDate = () => {//to do 
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker />
    </LocalizationProvider>
  );
}

const PaymentSchedule = (props) => {
  const [isEditMode, setEditMode] = useState(false);

  const editModeHandler = () => {
    setEditMode(true);
  };

  const saveHandler = () => {
    setEditMode(false);
  };


  const EditComponent = (props) => {
    return (
      <div className="row mb-3" >
        <div className="col-4 my-auto">
          <p className="form-labels text-center">{props.item.date}</p>
        </div>
        <div className="col-4 my-auto">
          <p className="form-labels text-center">{props.item.amount}</p>
        </div>
        <div className="col-4">
          <button
            className="btn_light2 px-3 py-2 invert mx-auto"
            onClick={editModeHandler}
          >
            <img src={EditIcon} alt="edit-icon" className="icon-15 me-2" />
            Edit
          </button>
        </div>
      </div>
    );
  };

  const SaveComponent = (props) => {
    return (
      <div className="row mb-3 payment-save">
        <div className="col-4 my-auto">
          <input type="date" />
        </div>
        <div className="col-4 my-auto">
          <input type="number" placeholder="Enter Amount" />
        </div>
        <div className="col-4">
          <button className="btn_light2 px-4 py-2 mx-auto" onClick={saveHandler}>
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isEditMode && <SaveComponent item={props.item} />}
      {!isEditMode && <EditComponent item={props.item} />}
    </>
  );
};

export default PaymentSchedule;
