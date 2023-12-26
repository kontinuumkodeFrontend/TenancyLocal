import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { mdActions } from "../../../store/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import DownloadIcon from "../../../assets/images/download-icon1.svg";
import DownloadCSV from "../../../components/customModal/DownloadCSV";
import AgencyLandTable from "./AgencyLandTable";
import {
  ADD_LANDLORD_MODAL,
  DOWNLOAD_CSV_MODAL,
} from "../../../components/customModal/ModalConstants";


const AgencyLandlord = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isCSVModal = useSelector((state) => state.modal.type);
  
  const csvModalHandler = () => {
    dispatch(mdActions.showModal({type: DOWNLOAD_CSV_MODAL}));
  };

  const landlordModalHandler = () => {
    dispatch(mdActions.showModal({type: ADD_LANDLORD_MODAL}));
  };

  useEffect(() => {
    //for closing CSV modal
    dispatch(mdActions.hideModal());
  }, [location.pathname]);

  return (
    <Container>
      <div className="panel_inner-pb mt-4">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="text-h5 text-start">Landlords</h5>
          <div className="d-flex gap-2 position-relative">
            <button className="btn_light" onClick={landlordModalHandler}>
              Add a Landlord
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
          <AgencyLandTable className="agencyLand-table" />
        </div>
      </div>
    </Container>
  );
};

export default AgencyLandlord;
