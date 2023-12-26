import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { mdActions } from "../../store/modal-slice";
import AdminTable from "./AdminTable";
import {
  CREATE_AGENCY_MODAL,
  DOWNLOAD_CSV_MODAL,
} from "../../components/customModal/ModalConstants";
import DownloadIcon from "../../assets/images/download-icon1.svg";
import DownloadCSV from "../../components/customModal/DownloadCSV";

const Admin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isCSVModal = useSelector((state) => state.modal.type);

  const modalHandler = () => {
    //Open create Agency modal
    dispatch(mdActions.showModal({type: CREATE_AGENCY_MODAL}));
  };

  const csvModalHandler = () => {
    dispatch(mdActions.showModal({type: DOWNLOAD_CSV_MODAL}));
  };
  useEffect(() => {
    //for closing CSV modal
    dispatch(mdActions.hideModal());
  }, [location.pathname]);

  return (
    <Container className="pt-md-5 pt-4">
      <div className="d-flex justify-content-between align-items-sm-start align-items-center mb-4">
        <h5 className="text-h5">Agencies</h5>
        <div className="d-flex gap-2 position-relative">
          <button className="btn_light" onClick={modalHandler}>
            Add an Agency
          </button>
          <button className="CSV-btn" onClick={csvModalHandler}>
            <img src={DownloadIcon} alt="icon" />
          </button>
          {isCSVModal === DOWNLOAD_CSV_MODAL && <DownloadCSV />}
        </div>
      </div>
      <div className="custom-table">
        <AdminTable className="admin-agency-table" />
      </div>
    </Container>
  );
};

export default Admin;
