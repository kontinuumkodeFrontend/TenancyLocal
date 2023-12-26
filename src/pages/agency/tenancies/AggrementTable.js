import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import { DELETE_TENANCY_MODAL } from "../../../components/customModal/ModalConstants";
import { RemoveRedEye } from "@mui/icons-material";

//Table Action
const Actions = () => {
    const dispatch = useDispatch();

    const deleteModalHandler = () => {
        dispatch(mdActions.showModal({type: DELETE_TENANCY_MODAL}));
    }

    return (
        <div className="table-actions">
           
                <button className="btn_light2 btn_sm">
                    View
                </button>
                <button className="btn_light2 btn_sm">
                    Sign
                </button>
        </div>
    );
};

const columns = [
    {
        name: "aggrementtype",
        label: "Agreement Type",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "date",
        label: "Date",
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
        aggrementtype: "Extend Tenancy",
        date: "02-09-2023",
    },
    {
        aggrementtype: "Terminate Tenancy",
        date: "02-09-2023",
    },
    {
        aggrementtype: "Terminate Tenancy",
        date: "02-09-2023",
    },
    {
        aggrementtype: "Tenancy Agreement",
        date: "02-09-2023",
    },
    {
        aggrementtype: "Extend Tenancy",
        date: "02-09-2023",
    }
];

const AggrementTable = (props) => {
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
        onCellClick: function (colData, cellMeta) {
            //to handle action button
            console.log(colData, cellMeta);
            if (cellMeta.colIndex === 13) {
                cellMeta.event.stopPropagation(); //to stop the onRowClick fun from firing for col 13
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

export default AggrementTable;


