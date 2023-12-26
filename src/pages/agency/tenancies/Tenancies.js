import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import DownloadCSV from "../../../components/customModal/DownloadCSV";
import TenancyTable from "./TenancyTable";
import DownloadIcon from "../../../assets/images/download-icon1.svg";
import { DOWNLOAD_CSV_MODAL } from "../../../components/customModal/ModalConstants";
import { useLocation } from "react-router-dom";

const Tenancies = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isCSVModal = useSelector((state) => state.modal.type);
  const csvModalHandler = () => {
    dispatch(mdActions.showModal({ type: DOWNLOAD_CSV_MODAL }));
  };

  useEffect(() => {
    //for closing CSV modal
    dispatch(mdActions.hideModal());
  }, [location.pathname]);

  return (
    <Container>
      <div className="panel mt-4">
        <div className="panel_head d-flex justify-content-between align-items-start mb-4">
          <h5 className="text-h5 text-start">Tenancies</h5>
          <div className="position-relative">
            <button className="CSV-btn" onClick={csvModalHandler}>
              <img src={DownloadIcon} alt="icon" />
            </button>
            {isCSVModal === DOWNLOAD_CSV_MODAL && <DownloadCSV />}
          </div>
        </div>
        <div className="panel_center-sec pt-3">
          <div className="custom-table">
            <TenancyTable className="tenancy-table" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Tenancies;
