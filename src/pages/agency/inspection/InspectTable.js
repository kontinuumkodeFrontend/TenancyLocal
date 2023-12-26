import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import CustomSwitch from "../../../components/formComponent/CustomSwitch";
import { useDispatch } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import { ALERT_MODAL, VIEW_COMMENT_MODAL } from "../../../components/customModal/ModalConstants";


//Table Action
const Actions = () => {
    const dispatch = useDispatch();
    const commentHandler = () => {
        dispatch(mdActions.showModal({type: VIEW_COMMENT_MODAL}));
    }
    const alertHandler = () => {
        dispatch(mdActions.showModal({type: ALERT_MODAL}));
    }
    return (
        <div className="table-actions">
            <div className="action-bg">
                <button onClick={commentHandler}>
                    <VisibilityIcon sx={{ color: "#03565A" }} />
                </button>
            </div>
            <div className="action-bg p-0">
                <CustomSwitch isChecked={false} handlerFun={alertHandler} />
            </div>
        </div>
    );
};
//Table CheckBox
const CheckBox = () => {
    return (
        <Checkbox />
    );
};


export const columns = [
    {
        name: "",
        options: {
            sort: false,
            filter: false,
            searchable: false,
            customBodyRenderLite: (dataIndex) => {
                //to render custom col options
                return <CheckBox />;
            },
        },
    },
    {
        name: "reference",
        label: "Reference",
        options: {
            filter: true,
            sort: true,
            searchable: false,
        },
    },
    {
        name: "address",
        label: "Address",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "inspectionMonth",
        label: "Interim Inspection Month",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "scheduleInsDate",
        label: "Scheduled Inspection Date",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "emailNoticeDate",
        label: "Email Notice Date",
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
            filter: false,
            customBodyRenderLite: (dataIndex) => {
                //to render custom col options
                return <Actions />;
            },
        },
    },
];


export const data = [
    {
        reference: "CR84F02_2023-04-01",
        address: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        inspectionMonth: "May",
        scheduleInsDate: "01/04/2023",
        emailNoticeDate: "29/12/2023",
    },
    {
        reference: "CR84F02_2023-04-01",
        address: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        inspectionMonth: "May",
        scheduleInsDate: "01/04/2023",
        emailNoticeDate: "29/12/2023",
    },
    {
        reference: "CR84F02_2023-04-01",
        address: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        inspectionMonth: "May",
        scheduleInsDate: "01/04/2023",
        emailNoticeDate: "29/12/2023",
    },
    {
        reference: "CR84F02_2023-04-01",
        address: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        inspectionMonth: "May",
        scheduleInsDate: "01/04/2023",
        emailNoticeDate: "29/12/2023",
    },
    {
        reference: "CR84F02_2023-04-01",
        address: "Flat 2 84 Clyde Road Manchester, Manchester, England M20 2JN",
        inspectionMonth: "May",
        scheduleInsDate: "01/04/2023",
        emailNoticeDate: "29/12/2023",
    },
];

const InspectTable = (props) => {
    const id = 10;

    const options = {
        filterType: "multiselect",
        viewColumns: false,
        print: false,
        responsive: "standard", //possible values: vertical, standard, simple
        selectableRows: false,
        filter: true, //hide Filter
        search: true,
        download: true, //hide CSV
        selectableRowsHeader: false, //hide table head cehckbox
        rowHover: false,
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

export default InspectTable;


