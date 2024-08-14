import React from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";
import Select from "react-select";

const Step1 = ({
  formData,
  formFields,
  onNextStep,
  onChange,
  next,
  now,
  submit,
  form_name,
  isFetching,
}) => {
  const isFormFetching = useSelector((state) => state.forms.isFormFetching);

  const handleChange = (fieldName, value) => {
    onChange(fieldName, value);
  };

  return (
    <div className="mt-4 client-form">
      <h2 className="text-center">
        <>
          {form_name === "Prescription" ? (
            <>Prescription Form</>
          ) : form_name === "Evaluation" ? (
            <>Evaluation Form</>
          ) : (
            <>Diagnosis Form</>
          )}
        </>
      </h2>
      <ProgressBar
        now={now}
        label={`${now}%`}
        visuallyHidden
        style={{
          height: "7px",
          margin: "auto",
          marginBottom: "40px",
          marginTop: "20px",
          width: "500px",
        }}
      />
      <Form onSubmit={(e) => e.preventDefault()} className="form-form">
        {isFetching ? (
          <div className="text-center m-auto w-100 h-100 mt-5">
            <Spinner />
          </div>
        ) : (
          <>
            {formFields.map(
              (field, index) =>
                index % 2 === 0 && (
                  <Row key={index} className="mb-4" style={{ gap: "30px" }}>
                    <Col style={{ borderRight: "2px" }}>
                      <Form.Group controlId={field.key}>
                        <Form.Label className="forms-label">
                          {field.label}
                        </Form.Label>
                        {field.type === "multipleChoice" ? (
                          <Form.Control
                            as="select"
                            value={formData[field.key] || ""}
                            onChange={(e) =>
                              handleChange(field.key, e.target.value)
                            }
                          >
                            <option value="">Select an option</option>
                            {field.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Control>
                        ) : field.type === "checkBox" ? (
                          <Select
                            isMulti
                            options={field.options.map((option, index) => ({
                              value: option,
                              label: option,
                            }))}
                            onChange={(selectedOptions) => {
                              const selectedValues = selectedOptions.map(
                                (option) => option.value
                              );
                              handleChange(field.key, selectedValues);
                            }}
                          />
                        ) : field.type === "text" ? (
                          <Form.Control
                            type="text"
                            value={formData[field.key] || ""}
                            onChange={(e) =>
                              handleChange(field.key, e.target.value)
                            }
                          />
                        ) : null}
                      </Form.Group>
                    </Col>
                    {formFields[index + 1] && (
                      <Col style={{ borderRight: "2px" }}>
                        <Form.Group controlId={formFields[index + 1].key}>
                          <Form.Label className="forms-label">
                            {formFields[index + 1].label}
                          </Form.Label>
                          {formFields[index + 1].type === "multipleChoice" ? (
                            <Form.Control
                              as="select"
                              value={formData[formFields[index + 1].key] || ""}
                              onChange={(e) =>
                                handleChange(
                                  formFields[index + 1].key,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select an option</option>
                              {formFields[index + 1].options.map(
                                (option, optionIndex) => (
                                  <option key={optionIndex} value={option}>
                                    {option}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          ) : formFields[index + 1].type === "checkBox" ? (
                            <Select
                              isMulti
                              options={field.options.map((option, index) => ({
                                value: option,
                                label: option,
                              }))}
                              onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions.map(
                                  (option) => option.value
                                );
                                handleChange(field.key, selectedValues);
                              }}
                            />
                          ) : formFields[index + 1].type === "text" ? (
                            <Form.Control
                              type="text"
                              value={formData[formFields[index + 1].key] || ""}
                              onChange={(e) =>
                                handleChange(
                                  formFields[index + 1].key,
                                  e.target.value
                                )
                              }
                            />
                          ) : null}
                        </Form.Group>
                      </Col>
                    )}
                  </Row>
                )
            )}
          </>
        )}
      </Form>
      <div className="w-100 mt-4" style={{ display: "ruby-text" }}>
        <button onClick={onNextStep} className="purple-button w-25">
          {submit ? (
            <>{isFormFetching ? <Spinner /> : <>SUBMIT</>}</>
          ) : (
            <>NEXT</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step1;
