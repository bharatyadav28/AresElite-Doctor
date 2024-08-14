import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAlls,GetServiceTypes } from "../../features/apiCall";
import { Suspense } from "react";
import Loader from "./Components/Loader";

const ServiceOption = ({ service, label, description, price, time }) => {
  const { selectedService, handleServiceChange } = service;
  return (
    <label
      htmlFor={label}
      className={`radio-label ${selectedService === label ? "checked" : ""}`}
    >
      <div className="d-flex flex-row justify-content-between w-100 p-2">
        <div className="d-flex flex-column text-left">
          <h6>{description}</h6>
          <span>
            <i class="fa-solid fa-clock" /> {time} mins Meeting
          </span>
        </div>
        <h4>{price}$</h4>
      </div>
      <input
        type="radio"
        name={label}
        id={label}
        onChange={() => handleServiceChange(label)}
        checked={selectedService === label}
      />
    </label>
  );
};


const DoctorServices = () => {
  
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serviceTypeArray, setserviceTypeArray] = useState([])
  const handleServicetype=async()=>{
     const {serviceType}= await GetServiceTypes(dispatch)
     setserviceTypeArray(serviceType)
     console.log(serviceType)

  }
  useEffect(()=>{
   handleServicetype()
   },[])
  const services = [
    {
      label: "SportsVision",
      description: "Sports Vision Performance Evaluation",
      price: "$349",
      time: "90",
    },
    {
      label: "ConcussionEval",
      description: "Post Concussion Evaluation",
      price: "$199",
      time: "60",
    },
    {
      label: "MedicalOfficeVisit",
      description: "Medical/Office Visit",
      price: " $50",
      time: "30",
    },
    {
      label: "Consultation",
      description: "Consultation Call",
      price: " Free",
      time: "15",
    },
    {
      label: "TrainingSessions",
      description: "Add Training Sessions",
      price: " $199",
      time: "90",
    },
  ];

  // Function to handle service change
  const handleServiceChange = (service) => {
    setSelectedService(service);
  
  };

  const { isFetching } = useSelector((state) => state.auth);

  useEffect(() => {
    const clientId = localStorage.getItem("client_id");
    if (!clientId) {
      navigate("/doctor/dashboard");
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (!selectedService) {
      alert("Please select a service.");
      return;
    }
    const selectedServiceObject = serviceTypeArray.find(
      (service) => service.alias === selectedService
    );
    console.log("-->",selectedServiceObject)
      localStorage.setItem("selectedServiceTime", selectedServiceObject.duration);
  

    localStorage.setItem("selectedService", selectedService);
    switch (selectedService) {
      case "SportsVision":
        // Logic for SportsVision service
        fetchAvailable();

        navigate("/doctor/dashboard/appointment");
        break;

      case "TrainingSessions":
        // Logic for TrainingSessions service
        // You can navigate or perform other actions specific to this service
        navigate("/doctor/dashboard/doctor-service-selection/training");

        break;

      case "ConcussionEval":
        fetchAvailable();

        // Logic for ConcussionEval service
        navigate("/doctor/dashboard/appointment");

        // You can navigate or perform other actions specific to this service
        break;

      case "MedicalOfficeVisit":
        fetchAvailable();

        // Logic for MedicalOfficeVisit service
        navigate("/doctor/dashboard/appointment");

        // You can navigate or perform other actions specific to this service
        break;

      case "Consultation":
        fetchAvailable();

        // Logic for Consultation service
        navigate("/doctor/dashboard/appointment");

        // You can navigate or perform other actions specific to this service
        break;

      default:
        // Handle any other cases or provide a default action
        fetchAvailable();

        // Logic for Consultation service
        navigate("/doctor/dashboard/appointment");

        break;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchAvailable = async () => {
    try {
      await getAlls(dispatch);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // Handle error, perhaps show an error toast
    }
  };

  fetchAvailable();

  return (
    <>
      {/* <button onClick={handleGoBack} className="m-2 p-0 mb-4 " id="back_bt">
        <img src="/images/icons/backdark.svg" alt="back" width={30} />
      </button> */}

      <section
        className="text-center d-flex flex-column justify-content-center align-items-center doctor-service-container"
        style={{ maxHeight:"fit-content" ,padding:"10px" }}
      >
        <div className="text-left mb-3" style={{ width: "400px" }}>
          <h4 className="mb-0">Select type of Service</h4>
          <p className="text-muted">
            Please Select a type of Service for a user
          </p>
        </div>
        <Form className="d-flex flex-wrap justify-content-center gap-3" style={{overflowX:"scroll",height:"370px"}}>
          {isFetching?<><Loader/></>:
          <>
          {serviceTypeArray.map((service, index) => (
            
            <ServiceOption
              key={index}
              service={{ selectedService, handleServiceChange }}
              label={service.alias}
              description={service.name}
              price={service.cost}
              time={service.duration}
            />
            
          ))}
          </>
         }
        </Form>
        <div style={{position:"absolute", bottom:"30px"}}>
        {isFetching ? (
          <button className="purple-button c-b">
            <Spinner animation="border" variant="light" />
          </button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="purple-button"
            style={{ width: "332px", height: "62px" }}
            disabled={!selectedService}
          >
            Continue
          </Button>
        )}
        </div>
      </section>
    </>
  );
};

export default DoctorServices;
