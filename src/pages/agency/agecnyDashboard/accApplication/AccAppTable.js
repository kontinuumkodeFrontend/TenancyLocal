import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileSaver from 'file-saver';

const AccAppTable = (props) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const id = 10;


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
      name: "landlordName",
      label: "Landlord",
      options: {
        sort: true,
        searchable: true,
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
      name: "progressStatus",
      label: "Progress",
      options: {
        sort: true,
        searchable: true,
      },
    },
    {
      name: "timeUpdated",
      label: "Last Updated",
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
    // {
    //   name: "endDate",
    //   label: "End Date",
    //   options: {
    //     sort: true,
    //     searchable: false,
    //   },
    // },
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
    //     searchable: false,
    //   },
    // },
    {
      name: "tenancyType",
      label: "Tenancy Type",
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
    }
  ];
  
  const data = [
    {
      tenancyReference: "CR84F02_2023-04-01",
      landlordName: "Samuel Doe",
      address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
      progressStatus: 'Awaiting TA Sending',
      timeUpdated: '10/06/2023',
      startDate: "10/06/2023",
      // endDate: '10/06/2023',
      // totalRent: '	£4100.00',
      // depositAmount: '	£4100.00',
      // holdingAmount: '	£4100.00',
      // numTenants: '2',
      // beds: '2',
      tenancyType: 'New',
      staff: 'Agency XYZ'
    },
    {
      tenancyReference: "CR84F02_2023-04-01",
      landlordName: "Samuel Doe",
      address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
      progressStatus: 'Awaiting TA Sending',
      timeUpdated: '10/06/2023',
      startDate: "10/06/2023",
      endDate: '10/06/2023',
      totalRent: '	£4100.00',
      depositAmount: '	£4100.00',
      holdingAmount: '	£4100.00',
      numTenants: '2',
      beds: '2',
      tenancyType: 'New',
      staff: 'Agency XYZ'
    },  {
      tenancyReference: "CR84F02_2023-04-01",
      landlordName: "Samuel Doe",
      address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
      progressStatus: 'Awaiting TA Sending',
      timeUpdated: '10/06/2023',
      startDate: "10/06/2023",
      endDate: '10/10/2023',
      totalRent: '	£4100.00',
      depositAmount: '	£4100.00',
      holdingAmount: '	£4100.00',
      numTenants: '2',
      beds: '2',
      tenancyType: 'New',
      staff: 'Agency XYZ'
    },
    {
      tenancyReference: "CR84F02_2023-04-01",
      landlordName: "Samuel Doe",
      address: 'Apartment 1002 Wiverton Tower 4 New Drum Street London, London, England E1 7AS',
      progressStatus: 'Awaiting TA Sending',
      timeUpdated: '10/06/2023',
      startDate: "10/05/2023",
      endDate: '10/06/2023',
      totalRent: '	£4100.00',
      depositAmount: '	£4100.00',
      holdingAmount: '	£4100.00',
      numTenants: '2',
      beds: '2',
      tenancyType: 'New',
      staff: 'Agency XYZ'
    }
  ];


  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData, rowMeta);
    navigate(`/agency/tenancy-applicants/${id}`, rowData);
  };


  const handleFilterChange = (data) => {
    setFilteredData(data);
  };

  const handleCSVDownload = (buildHead, buildBody, columns) => {
    const csvData = buildBody(filteredData, columns);
    const csvString = [buildHead(columns), ...csvData].join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'filtered_data.csv');
  };

  
  const options = {
    filterType: 'multiselect',
    viewColumns: false,
    print: false,
    responsive: 'standard',
    selectableRows: false,
    filter: true,
    search: true,
    download: true,
    selectableRowsHeader: false,
    rowHover: true,
    onFilterChange: handleFilterChange,
    downloadOptions: {
      downloadCSV: handleCSVDownload,
    },
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

export default AccAppTable;
