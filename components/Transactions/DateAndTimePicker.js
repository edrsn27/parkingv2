import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Typography from "@mui/material/Typography";
import moment from "moment";
export default function MaterialUIPickers(props) {
  const { dateTimeNow, setDateTimeNow } = props;
  const [value, setValue] = React.useState(new Date(moment().format()));

  const handleChange = (newValue) => {
    setValue(newValue);
    setDateTimeNow(newValue)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <br />

        <DateTimePicker
          label="Date&Time Unpark"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <br />
      </Stack>
    </LocalizationProvider>
  );
}
