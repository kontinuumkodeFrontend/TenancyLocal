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
      name: "type",
      label: "Type",
      options: {
          sort: true,
          searchable: true,
      },
  }
  ,
  {
      name: "closingBalance",
      label: "Closing Balance",
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
      type: 'Fullterm',
      closingBalance: "£150000.00"
  },
  {
      tenancyReference: "CR84F02_2023-04-01",
      applicantName: "Samuel Doe",
      type: 'Fullterm',
      closingBalance: "£150000.00"
  }
  ,
  {
      tenancyReference: "CR84F02_2023-04-01",
      applicantName: "Samuel Doe",
      type: 'Fullterm',
      closingBalance: "£150000.00"
  }
];

const FailedProofTable = (props) => {
  const id = 10;
  const navigate = useNavigate();
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      navigate(`/agency/tenancy-applicants/${id}`, rowData);
      localStorage.setItem("tabKey", ViewTenanTab?.FOUR)
      localStorage.setItem("tabKeyInr", "QUATERLY")
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
}

export default FailedProofTable;