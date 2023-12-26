import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { ViewTenanTab } from "../../../../helper/constants/ViewTenancyConstant";

// const columns = [
//     {
//         name: "reference",
//         label: "Reference",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     },
//     {
//         name: "name",
//         label: "Name",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     },
//     {
//         name: "mobile",
//         label: "Mobile",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     },
//     {
//         name: "email",
//         label: "Email",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     },
//     {
//         name: "tenancyAddress",
//         label: "Tenancy Address",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     },
//     {
//         name: "status",
//         label: "Status",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     },
//     {
//         name: "staff",
//         label: "Staff",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     },
//     {
//         name: "expiryDate",
//         label: "Right to rent expiry",
//         options: {
//             sort: true,
//             searchable: true,
//         },
//     }
// ];

// const data = [
//     {
//         reference: "CR84F02_2023-04-01",
//         name: 'Elon Musk',
//         email: 'elonmusk@example.com',
//         mobile: '1234567890',
//         staff: 'Lorem Ipsum',
//         status: 'Stalled at Awaiting Application Form',
//         tenancyAddress: 'Ross Vale Tyres 2 Waterside Park Harrison Street Ramsbottom, Bury Lancashire Bury England',
//         expiryDate: "23/05/2027"
//     },
// ];
const columns = [
    {
        name: "reference",
        label: "Reference",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "name",
        label: "Name",
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
        name: "email",
        label: "Email",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "tenancyAddress",
        label: "Tenancy Address",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "expiryDate",
        label: "Right to rent expiry",
        options: {
            sort: true,
            searchable: true,
        },
    },
   
];
const data = [
    {
        reference: "CR84F02_2023-04-01",
        name: 'Elon Musk',
        email: 'elonmusk@example.com',
        mobile: '1234567890',
        tenancyAddress: 'Ross Vale Tyres 2 Waterside Park Harrison Street Ramsbottom, Bury Lancashire Bury England',
        expiryDate: "23/05/2027",

    },
];

const ExpiredTable = (props) => {
    const id = 10;
    const navigate = useNavigate();
    //fun when a row is clicked
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
        navigate(`/agency/tenancy-applicants/${id}`, rowData);
        localStorage.setItem("tabKey", ViewTenanTab?.SECOND)
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

export default ExpiredTable;
