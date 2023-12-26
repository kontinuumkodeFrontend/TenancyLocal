import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";

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
        name: "landlordName",
        label: "Landlord Name",
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
        name: "expiryDate",
        label: "Fire Alarm Expiry",
        options: {
            sort: true,
            searchable: true,
        },
    }
];

const data = [
    {
        reference: "CR84F02_2023-04-01",
        landlordName: 'Elon Musk',
        address: 'Ross Vale Tyres 2 Waterside Park Harrison Street Ramsbottom, Bury Lancashire Bury England',
        expiryDate: "23/05/2027"
    },
    {
        reference: "CR84F02_2023-04-01",
        landlordName: 'Elon Musk',
        address: 'Ross Vale Tyres 2 Waterside Park Harrison Street Ramsbottom, Bury Lancashire Bury England',
        expiryDate: "23/05/2027"
    }
    ,{
        reference: "CR84F02_2023-04-01",
        landlordName: 'Elon Musk',
        address: 'Ross Vale Tyres 2 Waterside Park Harrison Street Ramsbottom, Bury Lancashire Bury England',
        expiryDate: "23/05/2027"
    }
    ,{
        reference: "CR84F02_2023-04-01",
        landlordName: 'Elon Musk',
        address: 'Ross Vale Tyres 2 Waterside Park Harrison Street Ramsbottom, Bury Lancashire Bury England',
        expiryDate: "23/05/2027"
    }
];

const FireAlarm = (props) => {
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

export default FireAlarm;
