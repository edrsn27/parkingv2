import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
export default function BasicTextFields(props) {
  const { setCarType, setCarPlateNumber, carPlateNumber } = props;
  const [input, setInput] = React.useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
    setCarType(event.target.value);
  };

  const carType = [
    {
      value: "S",
      label: "Small",
    },
    {
      value: "M",
      label: "Medium",
    },
    {
      value: "L",
      label: "Large",
    },
  ];
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Car Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={input}
          label="Terminal"
          onChange={handleChange}
        >
          {carType &&
            carType.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
        </Select>
        <br />
        <TextField
          id="outlined-basic"
          label="Plate Number"
          variant="outlined"
          value={carPlateNumber}
          onChange={(e) => setCarPlateNumber(e.target.value)}
        />
        <Typography variant="caption" display="block" gutterBottom>
          For car with same plate number (eg. government official owned car)
          input any unique identifier
        </Typography>
      </FormControl>
    </Box>
  );
}
