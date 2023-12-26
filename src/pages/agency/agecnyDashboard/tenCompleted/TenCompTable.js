import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";

const columns = [
  // {
  //   name: "tenancyReference",
  //   label: "Tenancy Reference",
  //   options: {
  //     sort: true,
  //     searchable: false,
  //   },
  // },
 
  // {
  //   name: "timeUpdated",
  //   label: "Time Updated",
  //   options: {
  //     sort: true,
  //     searchable: false,
  //   },
  // },
  {
      name: "tenancyReference",
      label: "Reference",
      options: {
        sort: true,
        searchable: false,
      },
    },
  {
    name: "address",
    label: "Address",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "applicantname",
    label: "Applicant Name",
    options: {
      sort: true,
      searchable: true,
    },
  },
  {
    name: "progressStatus",
    label: "Progress Status",
    options: {
      sort: true,
      searchable: false,
    },
  },
  {
    name: "startDate",
    label: "Start Date",
    options: {
      sort: true,
      searchable: false,
    },
  },
  {
    name: "endDate",
    label: "End Date",
    options: {
      sort: true,
      searchable: false,
    },
  }
  // {
  //   name: "totalRent",
  //   label: "Total Rent",
  //   options: {
  //     sort: true,
  //     searchable: false,
  //   },
  // },
  // {
  //   name: "depositAmount",
  //   label: "Deposit Amount",
  //   options: {
  //     sort: true,
  //     searchable: false,
  //   },
  // },
  // {
  //   name: "holdingAmount",
  //   label: "Holding Amount",
  //   options: {
  //     sort: true,
  //     searchable: false,
  //   },
  // },
  // {
  //   name: "numTenants",
  //   label: "No. of Tenants",
  //   options: {
  //     sort: true,
  //     searchable: false,
  //   },
  // },
  // {
  //   name: "beds",
  //   label: "Beds",
  //   options: {
  //     sort: true,
  //     searchable: true,
  //   },
  // },
  // {
  //   name: "tenancyType",
  //   label: "Tenancy Type",
  //   options: {
  //     sort: true,
  //     searchable: true,
  //   },
  // },
  // {
  //   name: "staff",
  //   label: "Staff",
  //   options: {
  //     sort: true,
  //     searchable: false,
  //   },
  // }
];

const data = [
  {
    tenancyReference: "CR84F02_2023-04-01",
    progressStatus: 'Awaiting TA Sending',
    address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
    applicantname: "james",
    startDate: "10/06/2023",
    endDate: '10/06/2023',
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    progressStatus: 'Awaiting TA Sending',
    address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
    applicantname: "Ban",
    startDate: "10/06/2023",
    endDate: '10/06/2023',
  },  {
    tenancyReference: "CR84F02_2023-04-01",
    progressStatus: 'Awaiting TA Sending',
    address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
    applicantname: "Carter",
    startDate: "10/06/2023",
    endDate: '10/06/2023',
  },
  {
    tenancyReference: "CR84F02_2023-04-01",
    progressStatus: 'Awaiting TA Sending',
    address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
    applicantname: "Sam",
    startDate: "10/06/2023",
    endDate: '10/06/2023',
  }
];

const TenCompTable = (props) => {
  const id = 10;
  const navigate = useNavigate();
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    navigate(`/agency/tenancy-applicants/${id}`, rowData);
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

export default TenCompTable;
