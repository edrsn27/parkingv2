import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "NAME", width: 200 },
  { field: "isOccupied", headerName: "IS OCCUPIED", width: 200 },
  { field: "type", headerName: "TYPE", width: 200 },
];

export default function DataTable(props) {
  return (
    <div style={{ height: 400, width: "100%" }}>
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
