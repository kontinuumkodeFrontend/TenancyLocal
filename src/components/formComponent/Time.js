import React, { useState, useEffect } from "react";
import moment from "moment";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

const Time = (props) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (props.time) {
      const parsedTime = moment(props.time, "h:mm a", true);

      if (parsedTime.isValid()) {
        // Convert the JavaScript Date back to a moment object
        const timeAsMoment = moment(parsedTime);
        setValue(timeAsMoment);
      } else {
        console.error("Invalid time format");
      }
    }
  }, [props.time]);

  // console.log(value, "This is the value of the time132454365")

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-us">
      <DemoContainer components={["DesktopTimePicker"]}>
        <DemoItem label={props.label}>
          <DesktopTimePicker
            value={value}
            onChange={(newValue) => { setValue(newValue); props.timeHandler(newValue.format("h:mm a"), props.label); }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Time;
