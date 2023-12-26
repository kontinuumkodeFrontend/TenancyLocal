import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { mdActions } from "../../../store/modal-slice";
import ActionIcon from "../../../assets/images/property-add-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PROPERTY_MODAL, EDIT_LANDLORD_MODAL } from "../../../components/customModal/ModalConstants";
import { get } from "../../../services/api";
import { AGENCY_GET_LANDLORDS } from "../../../config/url";
import { toast } from "react-toastify";
import { propertyActions } from "../../../store/multiple-property-slice";

//Table Action
const Actions = () => {
    const dispatch = useDispatch();
    const editAppHandler = (event) => {
        // event.stopPropagation(); //to stop on cellClick fun from firing
        dispatch(mdActions.showModal({ type: ADD_PROPERTY_MODAL }));
        dispatch(propertyActions.emptyForm());
    };
    return (
        <button onClick={editAppHandler} className="btn_add-ten">
            <div className="table-actions">
                <div className="action-bg">
                    <img src={ActionIcon} alt="icon" style={{ width: "18px" }} />
                </div>
            </div>
        </button>
    );
};

const columns = [
    {
        name: "id",
        label: "Id",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: 'excluded',
        },
    },
    {
        name: "agencyId",
        label: "Agency Id",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: 'excluded',
        },
    },
    {
        name: "creatorId",
        label: "Creator Id",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: 'excluded',
        },
    },
    {
        name: "updatedAt",
        label: "Updated At",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: 'excluded',
        },
    },
    {
        name: "createdAt",
        label: "Created At",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: 'excluded',
        },
    },
    {
        name: "name",
        label: "Name",
        options: {
            sort: true,
            filter: false,
            searchable: true,
        },
    },
    {
        name: "companyName",
        label: "Company Name",
        options: {
            sort: true,
            filter: false,
            searchable: true,
        },
    },
    {
        name: "totalProperties",
        label: "Total Properties",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "noAvailable",
        label: "Number Available",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "noProcessing",
        label: "Number Processing",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "noLet",
        label: "Number Let",
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
            filter: false,
            searchable: false,
            customBodyRenderLite: () => {
                return <Actions />;
            },
        },
    },
];

const AgencyLandTable = (props) => {
    const dispatch = useDispatch();
    const isDataUpdated = useSelector(state => state.update.isUpdated);
    const [isLoading, setIsLoading] = useState(false);
    const [landlordData, setLandlordData] = useState(false);
    const [tableData, setTableData] = useState([]);
    let token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            const url = `${AGENCY_GET_LANDLORDS}?token=${token}`;
            get(url, setLandlordData, setIsLoading);
        }
    }, [isDataUpdated]);

    console.log(landlordData, "This is table data");

    useEffect(() => {
        if (landlordData?.content === "token_is_required") {
            toast.error("Token is required")
        } else {
            const data = landlordData?.landlords?.data;
            const newTableData = [];
            data?.forEach(item => {
                newTableData.push({
                    id: item.id,
                    agencyId: item.agency_id,
                    creatorId: item.creator_id,
                    updatedAt: item.updated_at,
                    createdAt: item.created_at,
                    name: `${item.f_name} ${item.l_name}`,
                    companyName: item.display_name,
                    totalProperties: item.total,
                    noAvailable: item.available,
                    noProcessing: item.processing,
                    noLet: item.let,
                });
            });
            setTableData(newTableData);
        }
    }, [landlordData]);

    //fun when a row is clicked
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta, "This is table data");
        sessionStorage.setItem('rowData', JSON.stringify({
            id: rowData[0],
            agencyId: rowData[1],
            creatorId: rowData[2],
            updatedAt: rowData[3],
            createdAt: rowData[4]
        }));
        dispatch(mdActions.showModal({ type: EDIT_LANDLORD_MODAL }));
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
            // console.log(colData, cellMeta, "coldata");
            if (cellMeta.colIndex === 11) {
                const landlordData = tableData[cellMeta.dataIndex];
                const currLandlord = JSON.stringify({
                    id: landlordData.id,
                    name: landlordData.name
                })
                sessionStorage.setItem("currLandlord", currLandlord);
                cellMeta.event.stopPropagation(); //to stop the onRowClick fun from firing for col 11(Action)
            }
        },
    };

    return (
        <>
            <MUIDataTable
                data={tableData}
                columns={columns}
                options={options}
                className={props.className}
            />
        </>
    );
};

export default AgencyLandTable;