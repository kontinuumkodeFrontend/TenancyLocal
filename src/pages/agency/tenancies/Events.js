import React from 'react'
import MUIDataTable from "mui-datatables";
import { useDispatch } from 'react-redux';
import { mdActions } from '../../../store/modal-slice';
import { EVENT_MODAL } from '../../../components/customModal/ModalConstants';

const columns = [
    {
        name: "date",
        label: "Date",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "eventType",
        label: "Event type",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "description",
        label: "Description",
        options: {
            sort: true,
            searchable: true,
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
    {
        name: "applicants",
        label: "Applicants",
        options: {
            sort: true,
            searchable: false,
        },
    },
];

const data = [
    {
        date: '01/04/2023',
        eventType: 'Chase Email',
        description: 'Chase email sent to applicants and references',
        staff: 'Sent By System',
        applicants: 'dj3@yopmail.com',
    },
    {
        date: '01/04/2023',
        eventType: 'Chase Email',
        description: 'Chase email sent to applicants and references',
        staff: 'Sent By System',
        applicants: 'dj3@yopmail.com',
    },
    {
        date: '01/04/2023',
        eventType: 'Chase Email',
        description: 'Chase email sent to applicants and references',
        staff: 'Sent By System',
        applicants: 'dj3@yopmail.com',
    },
    {
        date: '01/04/2023',
        eventType: 'Chase Email',
        description: 'Chase email sent to applicants and references',
        staff: 'Sent By System',
        applicants: 'dj3@yopmail.com',
    },
    {
        date: '01/04/2023',
        eventType: 'Agreement generate',
        description: 'Agreement generated for this tenancy',
        staff: 'Sent By System',
        applicants: 'dj3@yopmail.com',
    },
    {
        date: '01/04/2023',
        eventType: 'Chase Email',
        description: 'Chase email sent to applicants and references',
        staff: 'Sent By System',
        applicants: 'dj3@yopmail.com',
    },

];

const Events = () => {

    const dispatch = useDispatch();

    //fun when a row is clicked
    const handleRowClick = (rowData, rowMeta) => {
        // console.log(rowData, rowMeta);
        dispatch(mdActions.showModal({type: EVENT_MODAL}));
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
        <div className='custom-table'>
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
                className='event-table mt-2'
            /></div>
    )
}

export default Events