import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CustomDropdown({
  menuData,
  value,
  handleSelect,
  width,
  titleWidth,
  bgColor,
  textColor,
  titleSize,
}) {
  return (
    <Select
      value={value}
      onChange={(e) => handleSelect(e.target.value)}
      displayEmpty
      sx={{
        width: width,
        backgroundColor: bgColor || "#f4f4f4",
        color: textColor,
        fontSize: titleSize,
        height: "2.5rem",
        "&.Mui-selected": {
          backgroundColor: "black !important", // Change the background color of selected item
          color: "blue", // Change the text color of the selected item
        },

        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(228, 219, 233, 0.25)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(228, 219, 233, 0.25)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(228, 219, 233, 0.25)",
        },
      }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 240, // max height for menu
          },
        },
      }}
    >
      <MenuItem key={"empty"} value="" style={{ display: "hidden" }}>
        &nbsp;
      </MenuItem>
      {menuData?.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}
