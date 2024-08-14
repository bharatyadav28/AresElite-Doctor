import React from "react";
import { Form } from "react-bootstrap";

const MonthlyPlanOption = ({
  id,
  label,
  value,
  checked,
  onChange,
  className,
}) => {
  return (
    <Form.Check
      type="radio"
      id={id}
      label={label}
      value={value}
      checked={checked}
      onChange={onChange}
      className={`doctor-user ${checked ? "checked" : ""} ${className}`}
    />
  );
};

export default MonthlyPlanOption;
