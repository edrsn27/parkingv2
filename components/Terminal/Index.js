import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect(props) {
  const { terminals, setSelectedTerminal } = props;
  const [input, setInput] = React.useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
    let obj = terminals.find((item) => item.name === event.target.value);

    setSelectedTerminal(obj);
  
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Terminal</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={input}
          label="Terminal"
          onChange={handleChange}
        >
          {terminals &&
            terminals.map((item, index) => {
              return (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
