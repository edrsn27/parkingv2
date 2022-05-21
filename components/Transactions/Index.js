import * as React from "react";
import UnPark from "./UnPark";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import Typography from "@mui/material/Typography";
// show transactions data table
export default function DataTable(props) {
  const {
    transactions,
    setTransactions,
    setParkingSlots,
    parkingSlots,
  } = props;

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
              setParkingSlots={setParkingSlots}
              parkingSlots={parkingSlots}
            />
          );
        },
      },
    },
    { name: "id", label: "ID", width: 100 },
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
      name: "isReturning",
      label: "Is Returning Car",
      options: {
        customBodyRender: (value) => {
          if (value == null) return "";
          return value ? "Returned before 1hr of last checkout" : "";
        },
      },
    },
    {
      name: "checkIn",
      label: "Check-in",
      options: {
        customBodyRender: (value) => {
          if (value == null) return "";
          return (
            <Typography component={"span"} noWrap={true}>
              {moment(value).format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
          );
        },
      },
    },
    {
      name: "checkOut",
      label: "Check-out",
      options: {
        customBodyRender: (value) => {
          if (value == null) return "";
          return (
            <Typography component={"span"} noWrap={true}>
              {moment(value).format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
          );
        },
      },
    },
  ];
  return (
    <div style={{ height: "auto", width: "100%" }}>
      {transactions && (
        <MUIDataTable
          title={"List of Transactions"}
          data={transactions}
          columns={columns}
        />
      )}
    </div>
  );
}
