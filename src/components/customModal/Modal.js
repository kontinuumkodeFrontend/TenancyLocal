import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import ModalBackdrop from "./ModalBackdrop";
import ThanksModal from "./ThanksModal";
import TermsCondModal from "./TermsCondModal";
import DownloadModal from "./DownloadModal";
import CreateAgency from "./CreateAgency";
import CreditModal from "./CreditModal";
import ThanksCredit from "./ThanksCredit";
import DeleteAgency from "./DeleteAgency";
import LogoutModal from "./LogoutModal";
import ContactModal from "./ContactModal";
import RenewTenancy from "./RenewTenancy";
import ChangeNegotiator from "./ChangeNegotiator";
import EventModal from "./EventModal";
import GenerateAgreement from "./GenerateAgreement";
import ReviewAgreement from "./ReviewAgreement";
import CreateTenancy from "./CreateTenancy";
import TenSummary from "./AddApplicants/TenSummary";
import EditViewApp from "./EditViewApp";
import AddLandlord from "./AddLandlord";
import EditViewLand from "./EditViewLand";
import AddProperty from "./AddProperty";
import DuplicateProp from "./DuplicateProp";
import AddStaff from "./AddStaff";
import EditStaff from "./EditStaff";
import AddDocument from "./AddDocument";
import EditDocument from "./EditDocument";
import ResetAgreement from "./ResetAgreement";
import ExtendAppli from "./ExtendAppli";
import Terminate from "./Terminate";
import SendMail from "./SendMail";
import ViewComment from "./ViewComment";
import AlertModal from "./AlertModal";
import SaveComment from "./SaveComment";
import EnterEmail from "./EnterEmail";
import DeleteTenancy from "./DeleteTenancy";
import DeleteModal from "./DeleteModal";
import ViewEditProp from "./EditViewProp/ViewEditProp";
import AddMultiProperty from "./AddMultiProperty";
import AddApplicants from "./AddApplicants/AddApplicants";
import TenantsModal from "./AddTenants/TenantsModal";

import {
  CONTACT_MODAL,
  LOGOUT_MODAL,
  THANKS_MODAL,
  TERMS_MODAL,
  DOWNLOAD_MODAL,
  CREATE_AGENCY_MODAL,
  DELETE_AGENCY_MODAL,
  CREDIT_MODAL,
  THANKS_CREDIT_MODAL,
  RENEW_TENANCY_MODAL,
  CHANGE_NEGO_MODAL,
  EVENT_MODAL,
  GENERATE_AGREEMENT_MODAL,
  REVIEW_AGREEMENT_MODAL,
  VIEW_EDIT_PROP_MODAL,
  ADD_TENANCY_MODAL,
  ADD_TENANTS_MODAL,
  TENANCY_SUMMARY_MODAL,
  EDIT_VIEW_APP_MODAL,
  ADD_LANDLORD_MODAL,
  EDIT_LANDLORD_MODAL,
  ADD_PROPERTY_MODAL,
  DUPLICATE_PROP_MODAL,
  ADD_STAFF_MODAL,
  EDIT_STAFF_MODAL,
  ADD_DOC_MODAL,
  EDIT_DOC_MODAL,
  RESET_AGREEMENT_MODAL,
  EXTEND_APPLICATION_MODAL,
  TERMINATE_TENANCY_MODAL,
  SEND_MAIL_MODAL,
  VIEW_COMMENT_MODAL,
  ALERT_MODAL,
  SAVE_COMMENT_MODAL,
  ENTER_EMAIL_MODAL,
  DOWNLOAD_CSV_MODAL,
  DELETE_TENANCY_MODAL,
  DELETE_MODAL,
  ADD_MULTI_PROPERTY_MODAL,
  ADD_APPLICANTS_MODAL,
  ADD_TENANT_MODAL,
} from "./ModalConstants";

const Modal = () => {
  const modalType = useSelector((state) => state.modal.type);
  const [shouldShowIndicator, setShouldShowIndicator] = useState(false);

  useEffect(() => {
    // Function to check if the modal content exceeds the screen height
    const isModalContentScrollable = () => {
      const modalContent = document.querySelector('.modal_wrapper');
      if (modalContent) {
        const screenHeight = modalContent.innerHeight;
        const contentHeight = modalContent.scrollHeight;
        console.log(modalContent, screenHeight, contentHeight, "this is modal content");
        return contentHeight > screenHeight;
      }
      return false;
    };
    // Update the state based on whether the indicator should be shown
    setShouldShowIndicator(isModalContentScrollable());
  }, [modalType]);


  const ModalOverlay = () => {
    return (
      <div
        className={
          modalType === CREDIT_MODAL ||
            modalType === DELETE_AGENCY_MODAL ||
            modalType === DOWNLOAD_MODAL ||
            modalType === LOGOUT_MODAL ||
            modalType === GENERATE_AGREEMENT_MODAL ||
            modalType === ALERT_MODAL
            ? "modal_wrapper modal_wrapper-3"
            : "modal_wrapper"
        }
      >
        {modalType === CONTACT_MODAL && <ContactModal />}
        {modalType === LOGOUT_MODAL && <LogoutModal />}
        {modalType === THANKS_MODAL && <ThanksModal />}
        {modalType === TERMS_MODAL && <TermsCondModal />}
        {modalType === DOWNLOAD_MODAL && <DownloadModal />}
        {modalType === CREATE_AGENCY_MODAL && <CreateAgency />}
        {modalType === DELETE_AGENCY_MODAL && <DeleteAgency />}
        {modalType === CREDIT_MODAL && <CreditModal />}
        {modalType === THANKS_CREDIT_MODAL && <ThanksCredit />}
        {modalType === RENEW_TENANCY_MODAL && <RenewTenancy />}
        {modalType === CHANGE_NEGO_MODAL && <ChangeNegotiator />}
        {modalType === EVENT_MODAL && <EventModal />}
        {modalType === GENERATE_AGREEMENT_MODAL && <GenerateAgreement />}
        {modalType === REVIEW_AGREEMENT_MODAL && <ReviewAgreement />}
        {modalType === VIEW_EDIT_PROP_MODAL && <ViewEditProp />}
        {modalType === ADD_TENANCY_MODAL && <CreateTenancy />}
        {modalType === ADD_APPLICANTS_MODAL && <AddApplicants />}
        {modalType === TENANCY_SUMMARY_MODAL && <TenSummary />}
        {modalType === EDIT_VIEW_APP_MODAL && <EditViewApp />}
        {modalType === ADD_LANDLORD_MODAL && <AddLandlord />}
        {modalType === EDIT_LANDLORD_MODAL && <EditViewLand />}
        {modalType === ADD_PROPERTY_MODAL && <AddProperty />}
        {modalType === DUPLICATE_PROP_MODAL && <DuplicateProp />}
        {modalType === ADD_STAFF_MODAL && <AddStaff />}
        {modalType === EDIT_STAFF_MODAL && <EditStaff />}
        {modalType === ADD_DOC_MODAL && <AddDocument />}
        {modalType === EDIT_DOC_MODAL && <EditDocument />}
        {modalType === RESET_AGREEMENT_MODAL && <ResetAgreement />}
        {modalType === EXTEND_APPLICATION_MODAL && <ExtendAppli />}
        {modalType === TERMINATE_TENANCY_MODAL && <Terminate />}
        {modalType === SEND_MAIL_MODAL && <SendMail label="Send Email" />}
        {modalType === VIEW_COMMENT_MODAL && <ViewComment />}
        {modalType === ALERT_MODAL && <AlertModal />}
        {modalType === SAVE_COMMENT_MODAL && <SaveComment />}
        {modalType === ENTER_EMAIL_MODAL && <EnterEmail />}
        {modalType === DELETE_TENANCY_MODAL && <DeleteTenancy />}
        {modalType === DELETE_MODAL && <DeleteModal />}
        {modalType === ADD_MULTI_PROPERTY_MODAL && <AddMultiProperty />}
        {shouldShowIndicator && (
          <div className="scroll-indicator">
            <KeyboardArrowDownIcon />
          </div>
        )}
      </div>
    );
  };

  //render download csv modal next to the csv btn
  if (modalType !== DOWNLOAD_CSV_MODAL) {
    return (
      <>
        {createPortal(
          <ModalBackdrop />,
          document.getElementById("backdrop-root")
        )}
        {createPortal(
          <ModalOverlay />,
          document.getElementById("overlay-root")
        )}
      </>
    );
  } else {
    return;
  }
};

export default Modal;