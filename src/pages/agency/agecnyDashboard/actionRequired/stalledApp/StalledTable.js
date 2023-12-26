import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mdActions } from "../../../../../store/modal-slice";
import TermIcon from "../../../../../assets/images/terminate-icon.svg";
import MailIcon from "../../../../../assets/images/mail-icon.svg";
import AddIcon from "../../../../../assets/images/extend-icon.svg";

import {
  EXTEND_APPLICATION_MODAL,
  SEND_MAIL_MODAL,
  TERMINATE_TENANCY_MODAL,
} from "../../../../../components/customModal/ModalConstants";
import { ViewTenanTab } from "../../../../../helper/constants/ViewTenancyConstant";
import { useState } from "react";
import Papa from "papaparse";

//Table Action
const Actions = () => {
  const dispatch = useDispatch();
  const extendHandler = () => {
    dispatch(mdActions.showModal({type:EXTEND_APPLICATION_MODAL}));
  };

  const terminateHandler = () => {
    dispatch(mdActions.showModal({type:TERMINATE_TENANCY_MODAL}));
  };
  const mailHandler = () => {
    dispatch(mdActions.showModal({type:SEND_MAIL_MODAL}));
  };

  return (
    <div className="table-actions">
      {/* <div className="dash-action" onClick={extendHandler}>
        <img src={AddIcon} alt="icon" />
      </div> */}
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
    email: "samueldoe@email.com",
    mobile: "9978239238",
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Megan Fox",
    email: "samueldoe@email.com",
    mobile: "9978239238",
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Rocky Rockstar",
    email: "rocky@email.com",
    mobile: "9978234238",
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Elon Musk",
    email: "samueldoe@email.com",
    mobile: "9974239238",
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Happy Singh",
    email: "happy@email.com",
    mobile: "9978239238",
  },
];

const StalledTable = (props) => {
  const id = 10;
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(data);
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    navigate(`/agency/tenancy-applicants/${id}`, rowData);
    localStorage.setItem("tabKey", ViewTenanTab?.SECOND)
};

  const handleFilterData = (_, filterList) => {
    let arr = []
    const filteredRows = data.filter((_, index) => {
      for (let colIndex = 0; colIndex < filterList.length; colIndex++) {
        if (filterList[colIndex][index] === false) {
          return false;
        }
      }
      return true;
    });

    // setFilteredData(filteredRows);
    console.log(filterList, "filteredRows", filteredRows);
  };

  // const handleFilterData = (data, filterList) => {
  //   const filteredRows = data?.filter((_, index) => {
  //     for (let colIndex = 0; colIndex < filterList.length; colIndex++) {
  //       if (filterList[colIndex][index] === true) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  //   console.log(filterList, "filteredRows", filteredRows, filterList.length);
  //   setFilteredData(filteredRows);
  // };

  const downloadCSV = () => {
    const csvContent = Papa.unparse(filteredData);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_data.csv';
    a.click();
    URL.revokeObjectURL(url);
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
    onFilterChange: handleFilterData,
    onRowClick: handleRowClick,
    onCellClick: function (colData, cellMeta) {
      //to handle action buttons
      console.log(colData, cellMeta, "cellMeta");
      if (cellMeta.colIndex === 4) {
        cellMeta.event.stopPropagation(); //to stop the onRowClick fun from firing for col 4
      }
    },
  };

  return (
    <>
    {/* <button onClick={downloadCSV}>Download CSV</button> */}
      <MUIDataTable
        data={filteredData}
        columns={columns}
        options={options}
        className={props.className}
      />
    </>
  );
};

export default StalledTable;
