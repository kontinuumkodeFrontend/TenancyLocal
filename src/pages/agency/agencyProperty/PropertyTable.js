import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { mdActions } from "../../../store/modal-slice";
import PropertyIcon from "../../../assets/images/property-action-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TENANCY_MODAL,
  VIEW_EDIT_PROP_MODAL,
} from "../../../components/customModal/ModalConstants";
import { AGENCY_GET_PROPERTIES } from "../../../config/url";
import { get } from "../../../services/api";
import { toast } from "react-toastify";
import { tenancyActions } from "../../../store/tenancy-slice";
import { getPropStatus } from "../../../services/utils";
//Table Action
const Actions = ({ rowData }) => {
  const dispatch = useDispatch();
  const addTenancyHandler = (event) => {
    // event.stopPropagation(); //to stop on cellClick fun from firing
    event.preventDefault();
    dispatch(mdActions.showModal({ type: ADD_TENANCY_MODAL, data: rowData }));
    dispatch(tenancyActions.emptyForm());
  };

  return (
    <>
      <button onClick={addTenancyHandler} className="btn_add-ten">
        <div className="table-actions">
          <div className="action-bg">
            <img src={PropertyIcon} alt="icon" style={{ width: "25px" }} />
          </div>
        </div>
      </button>
    </>
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
      display: "excluded",
    },
  },
  {
    name: "agencyId",
    label: "Agency Id",
    options: {
      sort: false,
      searchable: false,
      filter: false,
      display: "excluded",
    },
  },
  {
    name: "reference",
    label: "Reference",
    options: {
      sort: true,
      filter: false,
      searchable: true,
    },
  },
  {
    name: "landlordName",
    label: "Landlord Name",
    options: {
      sort: true,
      filter: false,
      searchable: true,
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
    name: "postCode",
    label: "Post Code",
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
    name: "avaFrom",
    label: "Available From",
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
    name: "parkingAmount",
    label: "Parking amount",
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
    name: "beds",
    label: "Beds",
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
        return (
          <Actions />
        );
      },
    },
  }
];

const PropertyTable = (props) => {

  const isDataUpdated = useSelector(state => state.update.isUpdated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [propertiesData, setProperties] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState(colData);
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const url = `${AGENCY_GET_PROPERTIES}?token=${token}`;
      get(url, setProperties, setIsLoading);
    }
  }, [isDataUpdated]);

  useEffect(() => {
    if (propertiesData?.properties?.data.length > 0) {
      const updatedColumns = [...columns];

      // Find the index of the "Action" column
      const actionColumnIndex = updatedColumns.findIndex(
        (column) => column.name === "action"
      );
      updatedColumns[actionColumnIndex] = {
        name: "action",
        label: "Action",
        options: {
          sort: false,
          searchable: false,
          customBodyRenderLite: (dataIndex) => {
            const rowData = propertiesData?.properties?.data[dataIndex];
            const showAction = (rowData.previous_status === 0 && rowData.status === 3) || (rowData.previous_status === 0 && rowData.status === 1)
            return showAction ? <Actions rowData={rowData} /> : <></>
          },
        },
      };
      setColumns(updatedColumns);
    }
  }, [propertiesData]);

  useEffect(() => {
    if (propertiesData?.content === "token_is_required") {
      toast.error("Token is required");
    } else {
      const data = propertiesData?.properties?.data;
      const newTableData = [];
      data?.forEach((item) => {
        newTableData.push({
          id: item.id,
          agencyId: item.agency_id,
          reference: item.property_ref,
          landlordName: `${item.landlords.f_name} ${item.landlords.l_name}`,
          address: `${item.street}, ${item.town}, ${item.country}`,
          postCode: item.post_code,
          status: getPropStatus(item.status),
          avaFrom: item.available_from,
          rentalAmount: `£${item.monthly_rent}`,
          parkingAmount: `£${item.parking_cost}`,
          totalRent: `£${item.total_rent}`,
          depositAmount: `£${item.deposite_amount}`,
          holdingAmount: `£${item.holding_fee_amount}`,
          beds: item.bedroom,
          previousStatus: item.previous_status,
          statusNo: item.status,
        });
      });
      setTableData(newTableData);
    }
  }, [propertiesData]);
  //fun when a row is clicked
  const handleRowClick = (rowData, rowMeta, e) => {
    e.preventDefault();
    console.log(rowData, rowMeta, "This is table");
    sessionStorage.setItem("propId", rowData[0]);
    dispatch(mdActions.showModal({ type: VIEW_EDIT_PROP_MODAL }));
  };

  const options = {
    filterType: "multiselect",
    viewColumns: false,
    print: false,
    responsive: "standard", //possible values: vertical, standard, simple
    selectableRows: false, //hide first col with checkboxes
    filter: true, //Filter
    search: true, //search
    download: false, //CSV
    selectableRowsHeader: false, //hide table head checkbox
    rowHover: true,
    onRowClick: handleRowClick,
    onCellClick: function (colData, cellMeta) {
      //to handle add tencancy button action
      if (cellMeta.colIndex === 14) {
        cellMeta.event.stopPropagation(); //to stop the onRowClick fun from firing for col 14
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

export default PropertyTable;
