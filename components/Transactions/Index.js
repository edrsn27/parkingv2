import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import UnPark from "./UnPark";
import MUIDataTable from "mui-datatables";

export default function DataTable(props) {
  const { transactions, setTransactions } = props;
  const columns = [
    {
      name: "Unpark",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
       
            return (
              <UnPark
                dataIndex={dataIndex}
                setTransactions={setTransactions}
                transactions={transactions}
                data={transactions[dataIndex]}
              />
            );
        },
      },
    },
    { name: "id", label: "ID" ,width:100},
    { name: "carPlateNumber", label: "Plate Number", width: 130 },
    {
      name: "carType",
      label: "Car Type",
    },
    {
      name: "parkingSlotName",
      label: "Parking Slot",
    },
    {
      name: "parkingSlotType",
      label: "Parking Slot Type",
    },

    {
      name: "distance",
      label: "Distance",
    },
    {
      name: "fee",
      label: "Fee",
    },
    {
      name: "checkIn",
      label: "Check-in",
    },
    {
      name: "checkOut",
      label: "Check-out",
    },
  ];
  return (
    <div style={{ height: 500, width: "100%" }}>
      {transactions && (
        <MUIDataTable
          title={"Employee List"}
          data={transactions}
          columns={columns}
        />
      )}
    </div>
  );
}
