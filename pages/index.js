import { useState, useEffect } from "react";
import Layout from "../components/layouts/HomePage";
import Grid from "@mui/material/Grid";

import Car from "../components/Car/Index";
import Terminal from "../components/Terminal/Index";
import Button from "@mui/material/Button";
import moment from "moment";
import Transactions from "../components/Transactions/Index";
import ParkingSlots from "../components/ParkingSlots/Index";
import EntryPoints from "../components/Terminals/Index";
import Alert from "@mui/material/Alert";
export default function Index() {
  // show current time and date
  var [date, setDate] = useState(new Date());

  // alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");
  //transactions
  const [transactions, setTransactions] = useState([]);
  // terminals
  const [terminals, setTerminals] = useState("");
  const [selectedTerminal, setSelectedTerminal] = useState("");
  // parking slots
  const [parkingSlots, setParkingSlots] = useState("");

  // carType
  const [carType, setCarType] = useState("");
  const [carPlateNumber, setCarPlateNumber] = useState("");

  function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  const submitPark = () => {
    setShowAlert(false);
    setAlertText("");
    setAlertType("");
    if (selectedTerminal && carType && carPlateNumber) {
      // check if plate number is already;
      let checkPlate = transactions.find(
        (item) => carPlateNumber == item.carPlateNumber && item.checkOut == null
      );
      if (!checkPlate) {
        // check if returning before 1hr
        let checkLastTransaction = transactions.find(
          (item) => carPlateNumber == item.carPlateNumber
        );
        console.log(checkLastTransaction);
        let isReturning = false;
        if (checkLastTransaction) {
          var end = moment(new Date()); //todays date
          var now = moment(checkLastTransaction.checkOut); // another date

          var duration = moment.duration(end.diff(now));
          var minutes = duration.asMinutes();
          console.log(minutes);
          if (minutes < 60) {
            isReturning = true;
          }
        }

        let data = {
          carType: carType,
          carPlateNumber: carPlateNumber,
          terminal: selectedTerminal.name,
        };

        let acceptedParkingType = "";
        if (carType == "S") {
          acceptedParkingType = ["SP", "MP", "LP"];
        } else if (carType == "M") {
          acceptedParkingType = ["MP", "LP"];
        } else if (carType == "L") {
          acceptedParkingType = ["LP"];
        }
        let availableParkingSpot = "";

        availableParkingSpot = parkingSlots.filter((slot) => {
          return (
            slot.isOccupied == false && acceptedParkingType.includes(slot.type)
          );
        });

        // filter the available parking spot
        let myArrayFiltered = selectedTerminal.parkingSlots.filter((el) => {
          return availableParkingSpot.some((f) => {
            return f.name === el.name;
          });
        });

        myArrayFiltered.sort(function (a, b) {
          return a.distance - b.distance;
        });
        let nearestParkingSpace = myArrayFiltered[0];
        if (nearestParkingSpace) {
          let index = findWithAttr(
            parkingSlots,
            "name",
            nearestParkingSpace.name
          ); // returns 0
          let newParkingSlots = [...parkingSlots];
          newParkingSlots[index].isOccupied = true;
          setParkingSlots(newParkingSlots);

          let transactionData = {
            id:
              carType +
              moment().format("YYYY-MM-DD-") +
              (transactions.length + 1),
            carPlateNumber: carPlateNumber,
            carType: carType,
            checkIn: isReturning
              ? checkLastTransaction.checkIn
              : moment().format(),
            checkOut: null,
            parkingSlotName: nearestParkingSpace.name,
            fee: "",
            distance: nearestParkingSpace.distance,
            parkingSlotType: parkingSlots.find(
              (item) => nearestParkingSpace.name == item.name
            ).type,
            isReturning: isReturning,
          };

          let newTransactions = [...transactions];
          newTransactions.unshift(transactionData);

          setTransactions(newTransactions);
          setShowAlert(true);
          setAlertText("Success! TicketID - " + transactionData.id);
          setAlertType("success");
        } else {
          setShowAlert(true);
          setAlertText("No parking slot available");
          setAlertType("error");
        }
      } else {
        setShowAlert(true);
        setAlertText("Car already inside the parking lot");
        setAlertType("error");
      }
    } else if (!selectedTerminal) {
      setShowAlert(true);
      setAlertText("Select a Entry Point/Terminal");
      setAlertType("error");
    } else if (!carType) {
      setShowAlert(true);
      setAlertText("Select type of the car");
      setAlertType("error");
    } else if (!carPlateNumber) {
      setShowAlert(true);
      setAlertText("Input car plate number");
      setAlertType("error");
    }
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!terminals && !parkingSlots) {
      const terminalData = [
        {
          name: "Terminal 1",
          parkingSlots: [
            { id: 1, name: "A1", distance: 1 },
            { id: 2, name: "A2", distance: 3 },
            { id: 3, name: "A3", distance: 5 },
            { id: 4, name: "A4", distance: 7 },
            { id: 5, name: "A5", distance: 9 },
            { id: 6, name: "A6", distance: 11 },
            { id: 7, name: "A7", distance: 13 },
            { id: 8, name: "A8", distance: 15 },
            { id: 9, name: "A9", distance: 17 },
            { id: 10, name: "A10", distance: 19 },
          ],
        },
        {
          name: "Terminal 2",
          parkingSlots: [
            { id: 1, name: "A1", distance: 11 },
            { id: 2, name: "A2", distance: 9 },
            { id: 3, name: "A3", distance: 7 },
            { id: 4, name: "A4", distance: 5 },
            { id: 5, name: "A5", distance: 3 },
            { id: 6, name: "A6", distance: 1 },
            { id: 7, name: "A7", distance: 3 },
            { id: 8, name: "A8", distance: 5 },
            { id: 9, name: "A9", distance: 7 },
            { id: 10, name: "A10", distance: 9 },
          ],
        },
        {
          name: "Terminal 3",
          parkingSlots: [
            { id: 1, name: "A1", distance: 19 },
            { id: 2, name: "A2", distance: 17 },
            { id: 3, name: "A3", distance: 15 },
            { id: 4, name: "A4", distance: 13 },
            { id: 5, name: "A5", distance: 11 },
            { id: 6, name: "A6", distance: 9 },
            { id: 7, name: "A7", distance: 7 },
            { id: 8, name: "A8", distance: 5 },
            { id: 9, name: "A9", distance: 3 },
            { id: 10, name: "A10", distance: 1 },
          ],
        },
      ];
      const parkingSlots = [
        { id: 1, name: "A1", isOccupied: false, type: "SP" },
        { id: 2, name: "A2", isOccupied: false, type: "MP" },
        { id: 3, name: "A3", isOccupied: false, type: "LP" },
        { id: 4, name: "A4", isOccupied: false, type: "SP" },
        { id: 5, name: "A5", isOccupied: false, type: "MP" },
        { id: 6, name: "A6", isOccupied: false, type: "LP" },
        { id: 7, name: "A7", isOccupied: false, type: "MP" },
        { id: 8, name: "A8", isOccupied: false, type: "LP" },
        { id: 9, name: "A9", isOccupied: false, type: "SP" },
        { id: 10, name: "A10", isOccupied: false, type: "MP" },
      ];

      setTerminals(terminalData);
      setParkingSlots(parkingSlots);
    }
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [terminals, parkingSlots]);

  return (
    <Layout>
      <br />
      <h1>00 Parking Lot</h1>
      <p> Time : {date.toLocaleTimeString()}</p>
      <p> Date : {date.toLocaleDateString()}</p>

      {showAlert && <Alert severity={alertType}>{alertText}</Alert>}
      <br />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Terminal
            terminals={terminals}
            setTerminals={setTerminals}
            selectedTerminal={selectedTerminal}
            setSelectedTerminal={setSelectedTerminal}
          />
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Car
            setCarType={setCarType}
            setCarPlateNumber={setCarPlateNumber}
            carPlateNumber={carPlateNumber}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button variant="contained" onClick={submitPark}>
            Park
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
            setParkingSlots={setParkingSlots}
            parkingSlots={parkingSlots}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ParkingSlots parkingSlots={parkingSlots} />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <br />
          <br />
          <h1>TERMINALS DISTANCE TO PARKING SLOTS</h1>
          {terminals &&
            terminals.map((item, index) => {
              return (
                <EntryPoints item={item} key={index} terminal={item.name} />
              );
            })}
        </Grid>
      </Grid>
    </Layout>
  );
}
