import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

// parkingSlots: [
//     { name: "A1", distance: 11 },
//     { name: "A2", distance: 9 },
//     { name: "A3", distance: 7 },
//     { name: "A4", distance: 5 },
//     { name: "A5", distance: 3 },
//     { name: "A6", distance: 1 },
//     { name: "A7", distance: 3 },
//     { name: "A8", distance: 5 },
//     { name: "A9", distance: 7 },
//     { name: "A10", distance: 9 },
//   ],
// },
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
