import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
const columns = [
  { field: "name", headerName: "NAME", width: 200 },
  {
    field: "isOccupied",
    headerName: "STATUS",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
         {params.row.isOccupied ? <Chip label="Occupied" color="warning" />:<Chip label="Open" color="primary" />} 
        </div>
      );
    },
  },
  {
    field: "type",
    headerName: "TYPE",
    width: 200,
    valueGetter: (params) =>
      `${
        params.row.type == "SP"
          ? params.row.type + "- SMALL PARKING"
          : params.row.type == "MP"
          ? params.row.type + "- MEDIUM PARKING"
          : params.row.type == "LP"
          ? params.row.type + "- LARAGE PARKING"
          : ""
      } `,
  },
];

export default function DataTable(props) {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>LIST OF PARKING SLOTS</h2>
      <DataGrid
        getRowId={(r) => r.name}
        rows={props.parkingSlots}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
