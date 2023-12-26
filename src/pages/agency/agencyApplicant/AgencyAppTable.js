import React from "react";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { mdActions } from "../../../store/modal-slice";
import ActionIcon from "../../../assets/images/user-edit.png";
import { useDispatch } from "react-redux";
import { EDIT_VIEW_APP_MODAL } from "../../../components/customModal/ModalConstants";

//Table Action
const Actions = () => {
    const dispatch = useDispatch();

    const editAppHandler = (event) => {
        event.stopPropagation(); //to stop on cellClick fun from firing
        dispatch(mdActions.showModal({type: EDIT_VIEW_APP_MODAL}));
    };

    return (
        <button onClick={editAppHandler} className="btn_add-ten">
            <div className="table-actions">
                <div className="action-bg">
                    <img src={ActionIcon} alt="icon" style={{ width: "25px" }} />
                </div>
            </div>
        </button>
    );
};

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
            searchable: true,
        },
    },
    {
        name: "tenancyAdd",
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
        reference: "CR84F02_2023-04-01",
        name: "John Doe",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "Lucy Smith",
        email: "john123@gmail.com",
        mobile: '8903457290',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "John Doe",
        email: "john123@gmail.com",
        mobile: '1457263892',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "Taylor Swift",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "John Doe",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "John Doe",
        email: "john123@gmail.com",
        mobile: '9865241638',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "John Doe",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "John Doe",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "Charlie Povirk",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "Rosh Dan",
        email: "rosh12@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "John Doe",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "Alex Roe",
        email: "john123@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },
    {
        reference: "CR84F02_2023-04-01",
        name: "James Hanry",
        email: "jjmes@gmail.com",
        mobile: '9967245670',
        status: 'Awaiting Application Form',
        tenancyAdd: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        staff: "Harman Agency",
    },

];

const AgencyAppTable = (props) => {
    const id = 10;
    //fun when a row is clicked
    const navigate = useNavigate();
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
        navigate(`/agency/tenancy-applicants/${id}`);
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
        onCellClick: function (colData, cellMeta) {
            //to handle applicants action button
            console.log(colData, cellMeta);
            if (cellMeta.colIndex === 7) {
                cellMeta.event.stopPropagation(); //to stop the onRowClick fun from firing for col 7
            }
        },
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

export default AgencyAppTable;
