import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { SubmitDrillForm } from "../../features/apiCall";

const DrillForm = ({ activity, index, total }) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (activity?.form) {
      const updatedFormData = activity.form.map((item) => ({
        ...item,
        value: item.value || "", // Set value to existing value or empty string
      }));
      setFormData(updatedFormData);
    }
  }, [activity]);

  const handleInputChange = (e, key) => {
    const updatedFormData = formData.map((item) =>
      item.key === key ? { ...item, value: e.target.value } : item
    );
    setFormData(updatedFormData);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data submitted:", formData);

      const success = await SubmitDrillForm(dispatch, {
        activityId: activity._id,
        formData,
      });
       window.location.reload()
    } catch (error) {
      toast.error("Unexpected Error !");
    }
  };

  return (
    <>
      <div style={{ fontSize: "20px" }}>
        <h5>NeuroTrainer (Calibration)</h5>
        <span style={{ color: "rgb(178 170 170)", fontSize: "16px" }}>
          Drill {index} of {total}
        </span>
      </div>
      <Container>
        <Form onSubmit={handleSubmit}>
          {formData.map((field, index) => (
            <Form.Group key={index} controlId={field.key} className="mb-4">
              <Form.Label>{field.label}</Form.Label>
              {field.type === "text" && (
                <Form.Control
                  type="text"
                  name={field.key}
                  value={field.value || ""}
                  onChange={(e) => handleInputChange(e, field.key)}
                  placeholder={`Enter ${field.label}`}
                />
              )}
              {field.type === "multipleChoice" && (
                <Form.Control
                  as="select"
                  name={field.key}
                  value={field.value || ""}
                  onChange={(e) => handleInputChange(e, field.key)}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              )}
              {field.type === "checkBox" && (
                <Select
                  isMulti
                  options={field.options.map((option, optionIndex) => ({
                    value: option,
                    label: option,
                  }))}
                  value={
                    Array.isArray(field.value)
                      ? field.value.map((value) => ({
                          value,
                          label: value,
                        }))
                      : []
                  }
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [];
                    handleInputChange(
                      { target: { value: selectedValues } },
                      field.key
                    );
                  }}
                />
              )}
            </Form.Group>
          ))}
          {/* Button for completion */}
          <div className="w-100 d-flex mt-4">
            {" "}
            <button
              className="purple-button m-auto"
              type="submit"
              style={{ width: "170px" }}
            >
              Complete
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default DrillForm;
