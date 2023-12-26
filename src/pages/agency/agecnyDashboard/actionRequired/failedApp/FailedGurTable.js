import React from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mdActions } from "../../../../../store/modal-slice";
import TermIcon from "../../../../../assets/images/terminate-icon.svg";
import MailIcon from "../../../../../assets/images/mail-icon.svg";

import {
  SEND_MAIL_MODAL,
  TERMINATE_TENANCY_MODAL,
} from "../../../../../components/customModal/ModalConstants";
import { ViewTenanTab } from "../../../../../helper/constants/ViewTenancyConstant";

//Table Action
const Actions = () => {
  const dispatch = useDispatch();
  const terminateHandler = () => {
    dispatch(mdActions.showModal({type:TERMINATE_TENANCY_MODAL}));
  };
  const mailHandler = () => {
    dispatch(mdActions.showModal({type:SEND_MAIL_MODAL}));
  };

  return (
    <div className="table-actions">
      <div className="dash-action" onClick={terminateHandler}>
        <img src={TermIcon} alt="icon" />
      </div>
      <div className="dash-action" onClick={mailHandler}>
        <img src={MailIcon} alt="icon" />
      </div>
    </div>
  );
};

const columns = [
  {
    name: "tenancyReference",
    label: "Tenancy Reference",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "applicantName",
    label: "Applicant Name",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "guarantorName",
    label: "Guarantor Name",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "mobile",
    label: "Mobile",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "companyName",
    label: "Company Name",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "companyAddress",
    label: "Company Address",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "action",
    label: "Action",
    options: {
      sort: false,
      searchable: false,
      customBodyRenderLite: () => {
        //to render custom col options
        return <Actions />;
      },
    },
  },
];

const data = [
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Samuel Doe",
    guarantorName: "Sundar Pichai",
    email: "google@example.com",
    mobile: "9978239238",
    companyName: "Google",
    companyAddress: "3310 Passaic Street, Washington DC",
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Samuel Doe",
    guarantorName: "Sundar Pichai",
    email: "google@example.com",
    mobile: "9978239238",
    companyName: "Google",
    companyAddress: "3310 Passaic Street, Washington DC",
  },
];

const FailedGurTable = (props) => {
  const id = 10;
  const navigate = useNavigate();
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    navigate(`/agency/tenancy-applicants/${id}`, rowData);
    localStorage.setItem("tabKey", ViewTenanTab?.FOUR);
    localStorage.setItem("tabKeyInr", "GUR-REF")
  };

  

  const options = {
    filterType: "multiselect",
    viewColumns: false,
    print: false,
    responsive: "standard", //possible values: vertical, standard, simple
    selectableRows: false, //hide first col with checkboxes
    filter: true, //Filter
    search: true, //search
    download: true, //CSV
    selectableRowsHeader: false, //hide table head checkbox
    rowHover: true,
    onRowClick: handleRowClick,
    onCellClick: function (colData, cellMeta) {
      //to handle action buttons
      console.log(colData, cellMeta);
      if (cellMeta.colIndex === 7) {
        cellMeta.event.stopPropagation(); //to stop the onRowClick fun from firing for col 7
      }
    },
  };

  return (
    <>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
        className={props.className}
      />
    </>
  );
};

export default FailedGurTable;
