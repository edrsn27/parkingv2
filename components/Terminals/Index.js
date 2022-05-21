import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// show terminals table for each parking slots
const columns = [
  { field: "id", headerName: "PARKING SLOT ID", width: 150 },
  { field: "name", headerName: "PARKING NAME", width: 150 },
  { field: "distance", headerName: "DISTANCE", width: 130 },
];

export default function DataTable(props) {
  return (
    <div style={{ height: 400, width: "100%", paddingTop: "100px" }}>
      <h3>{props.item.name}</h3>
      <DataGrid
        getRowId={(r) => props.terminal + r.name}
        rows={props.item.parkingSlots}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
