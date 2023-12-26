import React from "react";
import { useDispatch } from "react-redux";
import { mdActions } from "../../store/modal-slice";
import Close from "../../assets/images/close.png";
import Input from "../formComponent/Input";

const ExtendAppli = () => {
  const dispatch = useDispatch();
  const hideModalHandler = () => {
    dispatch(mdActions.hideModal());
  };

  return (
    <div className="custom-modal bg-after">
      <div className="modal_head border-after d-flex justify-content-center mb-4">
        <h5 className="text-h5">Extend Application Deadline</h5>
        <button className="modal_close" onClick={hideModalHandler}>
          <img src={Close} alt="img" />
        </button>
      </div>
      <div className="modal_body mt-5">
          <Input
            type="text"
            placeholder="Enter number of days"
            label="Extend by number of days"
            defaultValue=""
            disabled={false}
            prepend={false}
            className="flex-100"
          />
      </div>
      <div className="modal_footer text-center mt-4">
        <button className="btn_filled btn_sm" onClick={hideModalHandler}>
          Submit
        </button>
      </div>

    </div>
  );
};

export default ExtendAppli;
