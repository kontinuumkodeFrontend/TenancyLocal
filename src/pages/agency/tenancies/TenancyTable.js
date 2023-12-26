import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mdActions } from "../../../store/modal-slice";
import { DELETE_TENANCY_MODAL } from "../../../components/customModal/ModalConstants";
import { AGENCY_TENANCY_LIST } from "../../../config/url";
import { get } from "../../../services/api";
import moment from "moment";
import { getAppStatusValue } from "../../../services/utils";

//Table Action
const Actions = () => {
    const dispatch = useDispatch();
    const id = sessionStorage.getItem("tenancyId");
    const deleteModalHandler = (e) => {
        e.preventDefault();
        dispatch(mdActions.showModal({ type: DELETE_TENANCY_MODAL, data: id }));
    }

    return (
        <div className="table-actions">
            <button className="action-bg" onClick={deleteModalHandler}>
                <div className="delete-btn" >
                    <DeleteIcon sx={{ color: "#FF3535" }} />
                </div>
            </button>
        </div>
    );
};

const colData = [
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
        name: "reference",
        label: "Reference",
        options: {
            sort: true,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "address",
        label: "Address",
        options: {
            sort: true,
            filter: false,
            searchable: true,
        },
    },
    {
        name: "progress",
        label: "Progress",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "timeUpdated",
        label: "Time Updated",
        options: {
            sort: false,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "startDate",
        label: "Start Date",
        options: {
            sort: true,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "endDate",
        label: "End Date",
        options: {
            sort: true,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "rentalAmount",
        label: "Rental amount",
        options: {
            sort: true,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "totalRent",
        label: "Total Rent",
        options: {
            sort: true,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "depositAmount",
        label: "Deposit Amount",
        options: {
            sort: true,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "holdingAmount",
        label: "Holding Amount",
        options: {
            sort: true,
            filter: false,
            searchable: false,
        },
    },
    {
        name: "tenants",
        label: "No. of Tenants",
        options: {
            sort: true,
            searchable: true,
        },
    },
    {
        name: "beds",
        label: "Beds",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "tenancyType",
        label: "Tenancy Type",
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
            searchable: true,
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
                //to render custom col options
                return <Actions />
            },
        },
    },
];

const TenancyTable = (props) => {
    const navigate = useNavigate();
    //fun when a row is clicked
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta, "this is rowData");
        navigate(`/agency/tenancy-applicants/${rowData[0]}`);
    };

    const isDataUpdated = useSelector(state => state.update.isUpdated);
    const [isLoading, setIsLoading] = useState(false);
    const [tenancyData, setTenancyData] = useState(false);
    const [tableData, setTableData] = useState([]);
    let token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const url = `${AGENCY_TENANCY_LIST}?token=${token}`;
            get(url, setTenancyData, setIsLoading);
        }
    }, [isDataUpdated]);

    useEffect(() => {
        if (!tenancyData) return;
        else {
            if (tenancyData?.saved && tenancyData?.tenancies?.data?.length > 0) {
                const data = tenancyData?.tenancies?.data;
                const newTableData = [];
                data?.forEach(item => {
                    newTableData.push({
                        id: item.id,
                        reference: item.reference,
                        address: item.pro_address,
                        progress: getAppStatusValue(item.status),
                        timeUpdated: moment(new Date(item.updated_at)).format('YYYY-MM-DD'),
                        startDate: item.t_start_date,
                        endDate: item.t_end_date,
                        rentalAmount: `£${item.monthly_amount}`,
                        parkingAmount: `£${item.parking_cost}`,
                        totalRent: `£${item.total_rent}`,
                        depositAmount: `£${item.deposite_amount}`,
                        holdingAmount: `£${item.holding_amount}`,
                        tenants: item.no_applicant,
                        beds: item.properties.bedroom,
                        tenancyType: item.renew_tenancy === 0 ? "New" : item.renew_tenancy === 1 ? "Renew " : "",
                        staff: `${item.users.name} ${item.users.l_name}`
                    });
                });
                setTableData(newTableData)
            }
        }

    }, [tenancyData]);

    console.log(tenancyData, "this is the tenancy list");

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
            if (cellMeta.colIndex === 15) {
                const tenancyId = tableData[cellMeta?.dataIndex].id;
                console.log(tenancyId, "this is tenancy id");
                sessionStorage.setItem("tenancyId", tenancyId);
                cellMeta.event.stopPropagation(); //to stop the onRowClick fun from firing for col 15
            }
        },
    };

    return (
        <MUIDataTable
            data={tableData}
            columns={colData}
            options={options}
            className={props.className}
        />
    );
};

export default TenancyTable;


