import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Dropdown, Button, Container, Row, Col } from 'react-bootstrap';
import { IoChevronBackCircle } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = ({ clientId, sessions, closePopup }) => {
  const [selectedSession, setSelectedSession] = useState(-1);
  const popupStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: "100",
  };

  const popupInnerStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxHeight: '90vh', 
    overflowY: 'auto', 
  };

  const fieldStyle = {
    width: '400px',
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentQuestionType, setCurrentQuestionType] = useState('');
  const [currentOptions, setCurrentOptions] = useState([]);

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setCurrentQuestionType(e);
    setCurrentOptions([]);
  };

  const addOption = () => {
    setCurrentOptions([...currentOptions, { id: currentOptions.length + 1, value: '' }]);
  };

  const handleOptionChange = (index, e) => {
    setCurrentOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index].value = e.target.value;
      return updatedOptions;
    });
  };

  const removeOption = (index) => {
    setCurrentOptions((prevOptions) => {
      return prevOptions.filter((option, i) => index !== i);
    });
  };

  const addQuestion = () => {
    if (currentQuestion && currentQuestionType) {
      const newQuestion = {
        question: currentQuestion,
        type: currentQuestionType,
        options: currentOptions.map(option => option.value),
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion('');
      setCurrentQuestionType('');
      setCurrentOptions([]);
    } else {
      alert('Please enter both question and select question type');
    }
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      dropdown: form.elements.dropdown.value,
      textField: form.elements.textField.value,
      questions: questions,
    };
    console.log(data);
    let formData=[]
    data?.questions?.map((val,index)=> {
      let obj={}
      obj.label=val.question
      obj.type_of_field=val.type
      obj.options= val.options
      obj.value=""
      console.log(obj);
      formData.push(obj)
    })

    // console.log(formData);
    try{
      const res= await fetch("http://localhost:5000/api/doctor/offlineDrillForm",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
        sessionIndex:selectedSession,
        drillTitle: data.textField,
        clientId:clientId,
        form:formData
      })
      });
      if(!res.ok){
        throw new Error("Network Problem!")
      }
      const resData= await res.json()
      showToastMessage()
      
    }catch(err){
      console.log(err);
    }
    window.location.reload()
    closePopup(); // Close the popup on successful submission
  };

 

  const handleOptions = (event) => {
    setSelectedSession(event.target.value);
  }

  return (
    <div style={popupStyle}>
    <div style={popupInnerStyle}>
      <Form onSubmit={handleSubmit} className="p-3" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <IoChevronBackCircle style={{ fontSize: "1.8rem", cursor: "pointer" }} onClick={closePopup} />
          <div className="text-primary" style={{ fontWeight: "bold" }}>Create Drill</div>
        </div>
        <Form.Group controlId="formDropdown">
          <Form.Control as="select" value={selectedSession} onChange={handleOptions} name="dropdown" style={fieldStyle} required>
            <option value="">Select Session</option>
            {sessions?.map((_, i) => (
              <option key={i} value={i}>
                {i + 1}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formTextField">
          <Form.Control
            type="text"
            name="textField"
            placeholder="Enter Heading"
            style={fieldStyle}
            required
          />
        </Form.Group>
        <Form.Group controlId="formQuestion" style={{ display: 'flex', gap: '10px' }}>
          <Form.Control
            type="text"
            placeholder="Enter your question"
            value={currentQuestion}
            onChange={handleQuestionChange}
          />
          <Dropdown onSelect={handleQuestionTypeChange}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {currentQuestionType || 'Select Type'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="checkBox">checkbox</Dropdown.Item>
              <Dropdown.Item eventKey="multipleChoice">Multiple Choice</Dropdown.Item>
              <Dropdown.Item eventKey="text">Text</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {(currentQuestionType === 'checkBox' || currentQuestionType === 'multipleChoice') && (
          <Form.Group controlId="formOptions">
            <Form.Label>{currentQuestionType === 'checkBox' ? 'Options' : 'Choices'}</Form.Label>
            {currentOptions.map((option, index) => (
              <Row key={option.id} className="align-items-center mb-2">
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.value}
                    onChange={(e) => handleOptionChange(index, e)}
                    required
                  />
                </Col>
                <Col sm={4}>
                  <Button variant="danger" onClick={() => removeOption(index)}>Remove</Button>
                </Col>
              </Row>
            ))}
            <Button style={{marginLeft:"10px"}} variant="success" onClick={addOption}>Add Option</Button>
          </Form.Group>
        )}
        {currentQuestionType === 'text' && <p>This question type requires no additional options.</p>}
        <div className="mt-4">
          {questions.map((q, index) => (
            <div key={index} className="mb-3">
              <h5>{q.question}</h5>
              <p>Type: {q.type}</p>
              <div style={{ display:"flex",justifyContent:"center",gap:"20px"}}>
              {q.options.length > 0 && (
                <ol>
                  {q.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ol>
              )}
              </div>
              <Button variant="danger"  onClick={() => removeQuestion(index)}>Remove Question</Button>
            </div>
          ))}
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="primary" onClick={addQuestion}>Add Question</Button>
          <Button type="submit" style={{ backgroundColor:"#800080",border:"none"}} >Submit</Button>
        </div>
      </Form>
    </div>
    <ToastContainer />
  </div>
  );
};

export default Popup;
