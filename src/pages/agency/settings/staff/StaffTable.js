import React from "react";
import MUIDataTable from "mui-datatables";
import { mdActions } from "../../../../store/modal-slice";
import { useDispatch } from "react-redux";
import { EDIT_STAFF_MODAL } from "../../../../components/customModal/ModalConstants";

const columns = [
  {
    name: "name",
    label: "Name",
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
    name: "status",
    label: "Status",
    options: {
      sort: true,
      searchable: false,
    },
  },
  {
    name: "lastAction",
    label: "Last Action",
    options: {
      sort: true,
      searchable: false,
    },
  },
  {
    name: "lastActionDate",
    label: "Last Action Date",
    options: {
      sort: true,
      searchable: false,
    },
  },
];

const data = [
  {
    name: "John Doe",
    email: "john123@gmail.com",
    status: "Active",
    lastAction: "No Action",
    lastActionDate: "04/04/2023",
  },
  {
    name: "John Doe",
    email: "john123@gmail.com",
    status: "Active",
    lastAction: "No Action",
    lastActionDate: "04/04/2023",
  },
  {
    name: "John Doe",
    email: "john123@gmail.com",
    status: "Active",
    lastAction: "No Action",
    lastActionDate: "04/04/2023",
  },
  {
    name: "John Doe",
    email: "john123@gmail.com",
    status: "Active",
    lastAction: "No Action",
    lastActionDate: "04/04/2023",
  },
  {
    name: "John Doe",
    email: "john123@gmail.com",
    status: "Active",
    lastAction: "No Action",
    lastActionDate: "04/04/2023",
  },
];

const StaffTable = (props) => {
  const dispatch = useDispatch();
  // const id = 10;
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    dispatch(mdActions.showModal({type: EDIT_STAFF_MODAL}));
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

export default StaffTable;
