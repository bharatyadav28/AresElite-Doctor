import { colors } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";

function CustomDropdown({
  menuData,
  value,
  handleSelect,
  width,
  menuWidth,
  titleWidth,
  bgColor,
  textColor,
  titleSize,
}) {
  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        id="dropdown-basic"
        style={{ width: width, overflow: "hidden", backgroundColor: bgColor }}
      >
        <div
          style={{
            width: titleWidth,
            overflow: "hidden",
            color: textColor,
            fontSize: titleSize,
          }}
        >
          {" "}
          {menuData.label ? (
            menuData.label
          ) : value ? (
            value
          ) : (
            <span>&nbsp;</span>
          )}{" "}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: menuWidth ? menuWidth : "100%" }}>
        {menuData.map((item, index) => (
          <Dropdown.Item
            key={index}
            eventKey={item.value}
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
