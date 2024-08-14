import useEffect from "react";
import Form from "react-bootstrap/Form";

const SelectMenu = ({
  menuData,
  size,
  isLightBg,
  width,
  padding,
  value,
  handleChange,
  name,
  showTitle,
}) => {
  return (
    <Form.Select
      className="my-selectmenu"
      name={name}
      size={size ? size : ""}
      value={value}
      onChange={handleChange}
      style={{
        backgroundColor: !isLightBg ? "#E8E8E8" : "#FFFFFF",
        width: width && width,
        padding: padding && padding,
      }}
    >
      {!showTitle && <option value="" disabled hidden></option>}
      {menuData.map((item, index) => (
        <option
          key={index}
          value={item.value}
          style={{ backgroundColor: "#FFFFFF", padding: "5rem" }}
        >
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectMenu;
