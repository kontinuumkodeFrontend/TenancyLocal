import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import StaffTable from "./StaffTable";
import { mdActions } from "../../../../store/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import DownloadCSV from "../../../../components/customModal/DownloadCSV";
import DownloadIcon from "../../../../assets/images/download-icon1.svg";

import {
  ADD_STAFF_MODAL,
  DOWNLOAD_CSV_MODAL,
} from "../../../../components/customModal/ModalConstants";

const Staff = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const addStaffHandler = () => {
    dispatch(mdActions.showModal({type: ADD_STAFF_MODAL}));
  };

  const isCSVModal = useSelector((state) => state.modal.type);

  const csvModalHandler = () => {
    dispatch(mdActions.showModal({type:DOWNLOAD_CSV_MODAL}));
  };

  useEffect(() => {
    //for closing CSV modal
    dispatch(mdActions.hideModal());
  }, [location.pathname]);


  return (
    <Container>
      <div className="panel mt-4">
        <div className="panel_head pb-4">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="text-h5 text-start">Agency Settings (Staff)</h5>
            <div className="d-flex gap-2 position-relative flex-wrap justify-content-end">
              <button className="btn_light" onClick={addStaffHandler}>
                Add Staff
              </button>
              <button className="CSV-btn" onClick={csvModalHandler}>
                <img src={DownloadIcon} alt="icon" />
              </button>
              {isCSVModal === DOWNLOAD_CSV_MODAL && <DownloadCSV />}
            </div>
          </div>
        </div>
        <div className="panel_center-sec pt-3">
          <div className="custom-table">
            <StaffTable className="staff-table" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Staff;
