import { useState, useEffect } from "react";
import Layout from "../components/layouts/HomePage";
import Terminal from "../components/Terminal/Index";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function Index() {
  const [terminals, setTerminals] = useState("");
  const [selectedTerminal, setSelectedTerminal] = useState("");
  const [parkingSlots, setParkingSlots] = useState("");
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!terminals && !parkingSlots) {
      const terminalData = [
        {
          name: "Terminal 1",
          parkingSlots: [
            { name: "A1", distance: 1 },
            { name: "A2", distance: 3 },
            { name: "A3", distance: 5 },
            { name: "A4", distance: 7 },
            { name: "A5", distance: 9 },
            { name: "A6", distance: 11 },
            { name: "A7", distance: 13 },
            { name: "A8", distance: 15 },
            { name: "A9", distance: 17 },
            { name: "A10", distance: 19 },
          ],
        },
        {
          name: "Terminal 2",
          parkingSlots: [
            { name: "A1", distance: 11 },
            { name: "A2", distance: 9 },
            { name: "A3", distance: 7 },
            { name: "A4", distance: 5 },
            { name: "A5", distance: 3 },
            { name: "A6", distance: 1 },
            { name: "A7", distance: 3 },
            { name: "A8", distance: 5 },
            { name: "A9", distance: 7 },
            { name: "A10", distance: 9 },
          ],
        },
        {
          name: "Terminal 3",
          parkingSlots: [
            { name: "A1", distance: 19 },
            { name: "A2", distance: 17 },
            { name: "A3", distance: 15 },
            { name: "A4", distance: 13 },
            { name: "A5", distance: 11 },
            { name: "A6", distance: 9 },
            { name: "A7", distance: 7 },
            { name: "A8", distance: 5 },
            { name: "A9", distance: 3 },
            { name: "A10", distance: 1 },
          ],
        },
      ];
      const parkingSlots = [
        { name: "A1", isOccupied: false, type: "SP" },
        { name: "A2", isOccupied: false, type: "MP" },
        { name: "A3", isOccupied: false, type: "LP" },
        { name: "A4", isOccupied: false, type: "SP" },
        { name: "A5", isOccupied: false, type: "MP" },
        { name: "A6", isOccupied: false, type: "LP" },
        { name: "A7", isOccupied: false, type: "MP" },
        { name: "A8", isOccupied: false, type: "LP" },
        { name: "A9", isOccupied: false, type: "SP" },
        { name: "A10", isOccupied: false, type: "MP" },
      ];

      setTerminals(terminalData);
      setParkingSlots(parkingSlots);
    }
  }, [terminals, parkingSlots]);

  return (
    <Layout>
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
    </Layout>
  );
}
