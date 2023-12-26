import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { get } from "../../services/api";
import { ADMIN_GET_AGENCIES } from "../../config/url";
import { toast } from "react-toastify";
import { formatDateToMMDDYYYY } from "../../services/utils";
import { useSelector } from "react-redux";

const columns = [
    {
        name: "id",
        label: "Id",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: "excluded",
        },
    },
    {
        name: "updatedAt",
        label: "Updated At",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: "excluded",
        },
    },
    {
        name: "createdAt",
        label: "Created At",
        options: {
            sort: false,
            searchable: false,
            filter: false,
            display: "excluded",
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
        name: "status",
        label: "Status",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "tel",
        label: "Telephone no",
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
        name: "login",
        label: "Last Login",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "avaCredit",
        label: "current available credits",
        options: {
            sort: true,
            searchable: false,
        },
    },
    {
        name: "usedCredit",
        label: "used credits",
        options: {
            sort: true,
            searchable: false,
        },
    },
];

const AdminTable = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("authRole");
    const [isLoading, setIsLoading] = useState(false);
    const [agencyData, setAgecnyData] = useState(null);
    const [tableData, setTableData] = useState();

    const isDataUpdated = useSelector(state => state.update.isUpdated);
    console.log(isDataUpdated, "This is a data update")
    //fun when a row is clicked
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
        navigate(`agency/${rowData[0]}`, rowData);
    };

    const options = {
        filterType: "multiselect",
        viewColumns: false,
        print: false,
        selectableRows: false,
        filter: true,
        download: true, //CSV
        onRowClick: handleRowClick,
    };

    useEffect(() => {
        if (token && role === "2") {
            const url = `${ADMIN_GET_AGENCIES}?token=${token}`;
            get(url, setAgecnyData, setIsLoading);
        }
    }, [isDataUpdated]);

    useEffect(() => {
        if (agencyData?.content === "token_is_required") {
            toast.error("Token is required");
        } else {
            const data = agencyData?.agencies?.data;
            const newTableData = [];
            data?.forEach((item) => {
                newTableData.push({
                    id: item.id,
                    updatedAt: item.updated_at,
                    createdAt: item.created_at,
                    name: item.name,
                    status: item.status === 1 ? "Authorized" : "Un Authorized",
                    tel: item.phone,
                    email: item.email,
                    login: formatDateToMMDDYYYY(new Date(item.last_login)),
                    avaCredit: item.total_credit - item.used_credit,
                    usedCredit: item.used_credit,
                });
            });
            setTableData(newTableData);
        }
    }, [agencyData]);

    console.log(agencyData, "this is table data!!!");

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

export default AdminTable;
