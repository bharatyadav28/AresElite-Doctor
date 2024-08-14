import React from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";

const Step2 = ({
  formData,
  step,
  formFields,
  onPrevStep,
  onNextStep,
  onChange,
  next,
  prev,
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
        {form_name === "Prescription" ? (
          <>Prescription Form</>
        ) : form_name === "Evaluation" ? (
          <>Evaluation Form</>
        ) : (
          <>Diagnosis Form</>
        )}
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
      />{" "}
      {/* <h5 className="mb-4">Step {step} </h5> */}
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
                  <Row key={index} className="mb-4">
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
                          <div className="d-flex " style={{ gap: "20px" }}>
                            {field.options &&
                              field.options.map((option, optionIndex) => (
                                <Form.Check
                                  key={optionIndex}
                                  type="checkbox"
                                  label={option}
                                  id={`${field.key}-${optionIndex}`}
                                  checked={formData[field.key]?.includes(
                                    option
                                  )}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    let updatedOptions;
                                    if (Array.isArray(formData[field.key])) {
                                      updatedOptions = [...formData[field.key]];
                                      if (isChecked) {
                                        updatedOptions.push(option);
                                      } else {
                                        updatedOptions = updatedOptions.filter(
                                          (item) => item !== option
                                        );
                                      }
                                    } else {
                                      updatedOptions = [option];
                                    }
                                    handleChange(field.key, updatedOptions);
                                  }}
                                />
                              ))}
                          </div>
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
                      <Col md={6}>
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
                            <div>
                              {formFields[index + 1].options &&
                                formFields[index + 1].options.map(
                                  (option, optionIndex) => (
                                    <Form.Check
                                      key={optionIndex}
                                      type="checkbox"
                                      label={option}
                                      id={`${
                                        formFields[index + 1].key
                                      }-${optionIndex}`}
                                      checked={formData[
                                        formFields[index + 1].key
                                      ]?.includes(option)}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        let updatedOptions;
                                        if (
                                          Array.isArray(
                                            formData[formFields[index + 1].key]
                                          )
                                        ) {
                                          updatedOptions = [
                                            ...formData[
                                              formFields[index + 1].key
                                            ],
                                          ];
                                          if (isChecked) {
                                            updatedOptions.push(option);
                                          } else {
                                            updatedOptions =
                                              updatedOptions.filter(
                                                (item) => item !== option
                                              );
                                          }
                                        } else {
                                          updatedOptions = [option];
                                        }
                                        handleChange(
                                          formFields[index + 1].key,
                                          updatedOptions
                                        );
                                      }}
                                    />
                                  )
                                )}
                            </div>
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
        {prev && (
          <button onClick={onPrevStep} className="purple-button w-25 mr-2">
            PREVIOUS
          </button>
        )}
        {next && (
          <button onClick={onNextStep} className="purple-button w-25">
            {submit ? (
              <>{isFormFetching ? <Spinner /> : <>SUBMIT</>}</>
            ) : (
              <>NEXT</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2;
