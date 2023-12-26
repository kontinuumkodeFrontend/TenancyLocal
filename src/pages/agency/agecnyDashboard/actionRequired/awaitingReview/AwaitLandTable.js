import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { ViewTenanTab } from "../../../../../helper/constants/ViewTenancyConstant";

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
    name: "landlordName",
    label: "Landlord Name",
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
    name: "timePassed",
    label: "Time Passed",
    options: {
      sort: true,
      searchable: true,
    },
  }
];

const data = [
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Samuel Doe",
    landlordName: 'Elon Musk',
    email: 'spacexLtd@example.com',
    mobile: "9978239238",
    timePassed: '2 days'
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Samuel Doe",
    landlordName: 'Elon Musk',
    email: 'spacexLtd@example.com',
    mobile: "9978239238",
    timePassed: '2 days'
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Samuel Doe",
    landlordName: 'Elon Musk',
    email: 'spacexLtd@example.com',
    mobile: "9978239238",
    timePassed: '2 days'
  }
];

const AwaitLandTable = (props) => {
  const id = 10;
  const navigate = useNavigate();
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    navigate(`/agency/tenancy-applicants/${id}`, rowData);
    localStorage.setItem("tabKey", ViewTenanTab?.FOUR)
    localStorage.setItem("tabKeyInr", "LAND-REF")
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

export default AwaitLandTable;
