import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { ViewTenanTab } from "../../../../helper/constants/ViewTenancyConstant";

const columns = [
  {
    name: "tenancyReference",
    label: "Tenancy Reference",
    options: {
      sort: true,
      searchable: false,
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
    name: "status",
    label: "Status",
    options: {
      sort: true,
      searchable: false,
    },
  },
  {
    name: "tenancyAddress",
    label: "Tenancy Address",
    options: {
      sort: true,
      searchable: false,
    },
  },
  {
    name: "staff",
    label: "Staff",
    options: {
      sort: true,
      searchable: false,
    },
  },
];

const data = [
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Samuel Doe",
    email: "spacexLtd@example.com",
    mobile: "9978239238",
    status: "Hold",
    tenancyAddress: "23 New Drum Street London, London, England E1 7AY",
    staff: "XYZ Agency",
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    applicantName: "Samuel Doe",
    email: "spacexLtd@example.com",
    mobile: "9978239238",
    status: "Hold",
    tenancyAddress: "23 New Drum Street London, London, England E1 7AY",
    staff: "XYZ Agency",
  },
];

const AwaitRefTable = (props) => {
  const id = 10;
  const navigate = useNavigate();
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    navigate(`/agency/tenancy-applicants/${id}`, rowData);
    localStorage.setItem("tabKey", ViewTenanTab?.FOUR)
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

export default AwaitRefTable;
