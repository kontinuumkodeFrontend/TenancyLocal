import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { get } from "../../services/api";
import { ADMIN_GET_AGENCIES } from "../../config/url";
import { toast } from "react-toastify";
import { formatDateToMMDDYYYY } from "../../services/utils";
import { useSelector } from "react-redux";
import TableSortLabel from "@mui/material/TableSortLabel";

function CustomTableHead(index, column, sortColumn) {
    return (
        <td className="tb-custom-header admin-table">
            <div>
                <input type="text" />
            </div>
            <div>
                <TableSortLabel
                    onClick={() => sortColumn(index)}
                    active={column.sortDirection !== 'none'}
                    direction={column.sortDirection || "asc"}
                >
                    {column.label}
                </TableSortLabel>
            </div>
        </td>
    );
}

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
            customHeadRender: ({ index, name, ...column }, sortColumn) => {
                // console.log(index, name, column, sortColumn, ">>>>");
                return CustomTableHead(index, column, sortColumn);
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            sort: true,
            searchable: false,
            customHeadRender: ({ index, name, ...column }, sortColumn) => {
                // console.log(index, name, column, sortColumn, ">>>>");
                return CustomTableHead(index, column, sortColumn);
            },
        },
    },
    {
        name: "tel",
        label: "Telephone no",
        options: {
            sort: true,
            searchable: true,
            customHeadRender: ({ index, name, ...column }, sortColumn) => {
                // console.log(index, name, column, sortColumn, ">>>>");
                return CustomTableHead(index, column, sortColumn);
            },
        },
    },
    {
        name: "email",
        label: "Email",
        options: {
            sort: true,
            searchable: true,
            customHeadRender: ({ index, name, ...column }, sortColumn) => {
                // console.log(index, name, column, sortColumn, ">>>>");
                return CustomTableHead(index, column, sortColumn);
            },
        },
    },
    {
        name: "login",
        label: "Last Login",
        options: {
            sort: true,
            searchable: false,
            customBodyRender: (value) => new Date(value).toLocaleDateString(),
            //   customSort: (data, colIndex, order) => {
            //     return data.sort((a, b) => {
            //       const dateA = new Date(a.data[colIndex]);
            //       const dateB = new Date(b.data[colIndex]);

            //       return (order === 'asc' ? dateA - dateB : dateB - dateA);
            //     });
            //   },
            customHeadRender: ({ index, name, ...column }, sortColumn) => {
                // console.log(index, name, column, sortColumn, ">>>>");
                return CustomTableHead(index, column, sortColumn);
            },
        },
    },
    {
        name: "avaCredit",
        label: "current available credits",
        options: {
            sort: true,
            searchable: false,
            customHeadRender: ({ index, name, ...column }, sortColumn) => {
                // console.log(index, name, column, sortColumn, ">>>>");
                return CustomTableHead(index, column, sortColumn);
            },
        },
    },
    {
        name: "usedCredit",
        label: "used credits",
        options: {
            sort: true,
            searchable: false,
            customHeadRender: ({ index, name, ...column }, sortColumn) => {
                // console.log(index, name, column, sortColumn, ">>>>");
                return CustomTableHead(index, column, sortColumn);
            },
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

    const isDataUpdated = useSelector((state) => state.update.isUpdated);
    console.log(isDataUpdated, "This is a data update");
    //fun when a row is clicked
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
        navigate(`agency/${rowData[0]}`, rowData);
    };
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

    const handleSort = (columnIndex) => {
        if (sortColumn === columnIndex) {
            // Toggle the sort direction if the same column is clicked again
            setSortDirection((prevDirection) =>
                prevDirection === "asc" ? "desc" : "asc"
            );
        } else {
            // Set the new column and default to ascending order
            setSortColumn(columnIndex);
            setSortDirection("asc");
        }
    };

    const options = {
        filterType: "multiselect",
        viewColumns: false,
        print: false,
        sort: true,
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

// const columns = [
//     {
//       name: 'name',
//       label: 'Name',
//       options: {
//         sort: true,
//         searchable: true,
//         customHeadRender: ({ index, ...column }, sortColumn, sortOrder, updateDirection) => {
//           return (
//             <th
//               key={index}
//               onClick={() => updateDirection(column.name)}
//               style={{ cursor: 'pointer' }}
//             >
//               {column.label} {sortColumn === column.name && sortOrder}
//             </th>
//           );
//         },
//       },
//     },
//     // Other columns without customHeadRender
//     {
//       name: 'status',
//       label: 'Status',
//       options: {
//         sort: true,
//         searchable: false,
//       },
//     },
//     // Add other columns similarly
//   ];

//   const options = {
//     filterType: 'multiselect',
//     viewColumns: false,
//     print: false,
//     selectableRows: false,
//     filter: false,
//     download: false, // CSV
//     search: false,
//   };

//   // Render your MUIDataTable component with the columns and options
//   <MUIDataTable data={[]} columns={columns} options={options} />;
