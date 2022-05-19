import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import UnPark from "./UnPark";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "carPlateNumber", headerName: "Plate Number", width: 130 },
  {
    field: "carType",
    headerName: "Car Type",
    width: 130,
    valueGetter: (params) =>
      `${
        params.row.carType == "S"
          ? "Small"
          : params.row.carType == "M"
          ? "Medium"
          : params.row.carType == "L"
          ? "Large"
          : ""
      }`,
  },
  {
    field: "parkingSlotName",
    headerName: "Parking Slot",
    type: "string",
    width: 120,
  },
  {
    field: "parkingSlotType",
    headerName: "Parking Slot Type",
    type: "string",
    width: 120,
  },

  {
    field: "distance",
    headerName: "Distance",
    type: "number",
    width: 90,
  },
  {
    field: "checkIn",
    headerName: "Check-in",
    sortable: true,
    width: 200,
  },
  {
    field: "checkOut",
    headerName: "Check-out",
    sortable: true,
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking
      };

      return <UnPark data={params.row} />;
    },
  },
];

export default function DataTable(props) {
  const { transactions } = props;
  console.log(transactions);
  return (
    <div style={{ height: 500, width: "100%" }}>
      {transactions && (
        <DataGrid
          height={300}
          rows={transactions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              onClick: (event, rowData) => alert("You saved " + rowData.name),
            },
            {
              icon: "delete",
              tooltip: "Delete User",
              onClick: (event, rowData) =>
                confirm("You want to delete " + rowData.name),
            },
          ]}
        />
      )}
    </div>
  );
}
