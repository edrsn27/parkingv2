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
export default function Index() {
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
    if (selectedTerminal && carType && carPlateNumber) {
      // check if plate number is already;
      let checkPlate = transactions.find(
        (item) => carPlateNumber == item.carPlateNumber && item.checkOut == null
      );
      if (!checkPlate) {
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
          console.log(nearestParkingSpace);
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
            checkIn: moment().format(),
            checkOut: null,
            parkingSlotName: nearestParkingSpace.name,
            fee: "",
            distance: nearestParkingSpace.distance,
            parkingSlotType: parkingSlots.find(
              (item) => nearestParkingSpace.name == item.name
            ).type,
          };

          // setTransactions([...transactions, transactionData]);
          let newTransactions = [...transactions];
          newTransactions.unshift(transactionData);
          console.log(newTransactions);
          setTransactions(newTransactions);
        } else {
          alert("No parking slot available");
        }
      } else {
        alert("Unpark first the Car");
      }
    } else if (!selectedTerminal) {
      alert("select terminal");
    } else if (!carType) {
      alert("select car type");
    } else if (!carPlateNumber) {
      alert("input plate number");
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
  }, [terminals, parkingSlots]);

  return (
    <Layout>
      <br />
      <h1>00 Parking Lot</h1>
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
