import React, { useState } from "react";
import {
  Stack,
  OutlinedInput,
  MenuItem,
  Chip,
  Select,
  FormControl,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const names = [
  "tommi@piratepetey.co.uk - Applicant",
  "testbank@piratepetey.co.uk - Employment",
  "testmom@piratepetey.co.uk - Guarantor",
  "testlord@piratepetey.co.uk - Landlord"
];

const MultiSelect = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  return (

    <FormControl sx={{ m: 1, width: 500 }}>
      <Select
        multiple
        value={selectedNames}
        onChange={(e) => setSelectedNames(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedNames(
                    selectedNames.filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ justifyContent: "space-between" }}
          >
            {name}
            {selectedNames.includes(name) ? <CheckIcon color="success" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;