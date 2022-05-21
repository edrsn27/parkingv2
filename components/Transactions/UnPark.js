import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import DateAndTimePicker from "./DateAndTimePicker";
import moment from "moment";
import { set } from "date-fns";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const {
    data,
    transactions,
    setTransactions,
    dataIndex,
    setParkingSlots,
    parkingSlots,
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // initial hrs differencial between park and unpark
  const [hrsDifferencial, setHrsDifferencial] = React.useState("");
  // set fee
  const [fee, setFee] = React.useState(0);
  // set rate per hour of the car
  const [ratePerHour, setRatePerHour] = React.useState(0);
  // set daysStayed of the car in the parking lot
  const [daysStayed, setDaysStayed] = React.useState(0);
  // set hrs stayed of the car in the parking lot
  const [hrsStayed, setHrsStayed] = React.useState(0);
  // initialized unpark timestamp
  const [dateTimeNow, setDateTimeNow] = React.useState();

  const unParkSubmit = () => {
    /* Check the hrs differencial between park and unpark */
    var end = moment(new Date(data.checkIn)); //check in
    var now = moment(dateTimeNow); // check out
    // subtract check in and check out timestamp as Hrs 
    var duration = moment.duration(now.diff(end));
    var hrs = duration.asHours();

    let hrsDifferencial = Math.ceil(hrs);
    setHrsDifferencial(hrsDifferencial);
    // set initial fee as 40
    setFee(40);
    // check rate per hour after exceeding 3hrs by type of car
    let ratePerHour =
      data.parkingSlotType == "SP"
        ? 20
        : data.parkingSlotType == "MP"
        ? 60
        : data.parkingSlotType == "LP"
        ? 100
        : "";
    setRatePerHour(ratePerHour);

    // initialized total fee
    let Datafee = 0;
    if (hrsDifferencial >= 24) {
      // if the car stayed 1 day or more
      let daysStayed = (hrsDifferencial / 24) >> 0;
      let hrsStayed = hrsDifferencial % 24;
      setDaysStayed(daysStayed);
      setHrsStayed(hrsStayed);

      Datafee = daysStayed * 5000 + hrsStayed * ratePerHour;
      setFee(Datafee);
    } else if (hrsDifferencial > 3) {
      // if the car stayed more than 3hrs
      setDaysStayed(0);
      let hrsStayed = hrsDifferencial - 3;
      setHrsStayed(hrsStayed);
      Datafee = 40 + hrsStayed * ratePerHour;
      setFee(Datafee);
    } else {
      // if the car stayed less than or equal to 3hrs
      setDaysStayed(0);
      setHrsStayed(0);
      Datafee = 40;
      setFee(Datafee);
    }

    // updating parking slot status to isOccupied false

    const parkingSlot = parkingSlots.find(
      (item) => item.name == data.parkingSlotName
    );

    const parkingSlotIndex = parkingSlots.indexOf(parkingSlot);
    // console.log("parkingSlotIndex",parkingSlotIndex)
    let newParkingSlots = [...parkingSlots];
    newParkingSlots[parkingSlotIndex].isOccupied = false;
    setParkingSlots(newParkingSlots);

    // END updating parking slot status to isOccupied false

    // update transactions data

    let newTransactions = [...transactions];
    // if returning vehicle within 3hrs (dont exclude 40 fee)
    if (newTransactions[dataIndex].isReturning == true) {
      Datafee = Datafee - 40;
      setFee(Datafee);
    }
    // update transactions data fee
    newTransactions[dataIndex].fee = Datafee;
    // update the check out of the vehicle
    newTransactions[dataIndex].checkOut = now;
    // update the transactions using react hooks 
    setTransactions(newTransactions);
    // update ui for Unpark component DateAndTimePicker.js
    setDateTimeNow("");
  };

  // same as unpark function but doesnt update the transactions
  const calculateFee = () => {
    var end = moment(new Date(data.checkIn)); //todays date
    var now = moment(dateTimeNow); // another date

    var duration = moment.duration(now.diff(end));
    var hrs = duration.asHours();

    let hrsDifferencial = Math.ceil(hrs);
    setHrsDifferencial(hrsDifferencial);
    setFee(40);
    let ratePerHour =
      data.parkingSlotType == "SP"
        ? 20
        : data.parkingSlotType == "MP"
        ? 60
        : data.parkingSlotType == "LP"
        ? 100
        : "";
    setRatePerHour(ratePerHour);
    let Datafee = 0;
    if (hrsDifferencial >= 24) {
      let daysStayed = (hrsDifferencial / 24) >> 0;
      let hrsStayed = hrsDifferencial % 24;
      setDaysStayed(daysStayed);
      setHrsStayed(hrsStayed);

      Datafee = daysStayed * 5000 + hrsStayed * ratePerHour;

      setFee(Datafee);
    } else if (hrsDifferencial > 3) {
      setDaysStayed(0);
      let hrsStayed = hrsDifferencial - 3;
      setHrsStayed(hrsStayed);
      Datafee = 40 + hrsStayed * ratePerHour;
      setFee(Datafee);
    } else {
      setDaysStayed(0);
      setHrsStayed(0);
      Datafee = 40;
      setFee(Datafee);
    }
    let newTransactions = [...transactions];
    if (newTransactions[dataIndex].isReturning == true) {
      Datafee = Datafee - 40;
      setFee(Datafee);
    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="warning"
        disabled={transactions[dataIndex].checkOut ? true : false}
      >
        UNPARK
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {"UNPARK - " + data.carPlateNumber}
          </Typography>
          <br />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Check In : {moment(data.checkIn).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Total Hours Stayed : {hrsDifferencial}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Days Stayed : {daysStayed}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hrs Stayed After (24hrs or 3hrs) : {hrsStayed}
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Parking Slot Type : {data.parkingSlotType}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            RATE PER HOUR : {ratePerHour}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            TOTAL FEE : {fee}
          </Typography>
          <DateAndTimePicker
            dateTimeNow={dateTimeNow}
            setDateTimeNow={setDateTimeNow}
          />

          <Stack spacing={2} direction="row">
            <Button variant="text" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="contained" onClick={calculateFee}>
              Calculate Fee
            </Button>
            <Button
              variant="contained"
              onClick={unParkSubmit}
              disabled={transactions[dataIndex].checkOut ? true : false}
            >
              Unpark
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
