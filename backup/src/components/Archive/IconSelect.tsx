import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import Icon from "@mui/icons-material"; // Import the icon library

// Example icon names for selection
const iconNames = ["Home", "Settings", "Visibility", "Lock"];

function IconSelect() {
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedIcon(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="icon-select-label">Select Icon</InputLabel>
      <Select
        labelId="icon-select-label"
        id="icon-select"
        value={selectedIcon}
        onChange={handleChange}
        input={<OutlinedInput label="Select Icon" />}
      >
        {iconNames.map((iconName) => (
          <MenuItem key={iconName} value={iconName}>
            {/* Display the icon along with its name */}
            {React.createElement(Icon[iconName as keyof typeof Icon], {
              style: { marginRight: "10px" },
            })}
            {iconName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default IconSelect;
