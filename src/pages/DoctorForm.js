import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Assuming you're using React Router
import { toast } from "react-toastify";
import DoctorMenu from "../components/layout/DoctorMenu";
import { SubmitForm } from "../features/apiCall";
import { FetchFailure, FetchStart, FetchSuccess } from "../features/fetchSlice";
import axios from "../utils/axios";
import { parseError } from "../utils/parseError";
import Step1 from "./Forms/Step1";
import Step2 from "./Forms/Step2";

const DoctorForm = ({ form }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [formFields, setFormFields] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetching = useSelector((state) => state.fetch_app.isFetching);

  const { appointmentId } = useParams();
  console.log(appointmentId);
  const fetchFormData = async () => {
    const token = localStorage.getItem("userToken");
    dispatch(FetchStart());
    try {
      const { data } = await axios.get(`/api/doctor/get-form`, {
        params: {
          name: form,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data?.doc?.obj);
      setFormFields(data?.doc?.obj);
      dispatch(FetchSuccess(data));
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage);

      dispatch(FetchFailure(errorMessage));
    }
  };
  useEffect(() => {
    fetchFormData();
  }, []);

  const handleNextStep = () => {
    if (currentStep === totalSteps) {
      handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    try {
      const bool = await SubmitForm(dispatch, {
        form,
        appointmentId,
        formData,
      });
      if (bool) {
        console.log("filledd");
        toast.success("Form Submitted Successfully !");
        navigate(-1);
        setFormData({});
        fetchFormData();
      }
    } catch (error) {
      toast.error("Unexpected Error !");
    }
  };

  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const isLargeDesktop = window.matchMedia("(min-width: 1900px)").matches;

  let formSize;
  if (isLargeDesktop) {
    formSize = 12;
  } else if (isDesktop) {
    formSize = 8;
  } else {
    formSize = 8;
  }

  const totalSteps = Math.ceil(formFields.length / formSize);

  return (
    <DoctorMenu>
      {currentStep === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          formFields={formFields.slice(0, formSize)}
          onNextStep={handleNextStep}
          onChange={handleFormChange}
          next={true}
          now={(currentStep / totalSteps) * 100}
          submit={currentStep === totalSteps}
          form_name={form}
          isFetching={isFetching}
        />
      )}

      {currentStep > 1 && currentStep <= totalSteps && (
        <Step2
          formData={formData}
          step={currentStep}
          formFields={formFields.slice(
            (currentStep - 1) * formSize,
            currentStep * formSize
          )}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          onChange={handleFormChange}
          next={true}
          prev={true}
          now={(currentStep / totalSteps) * 100}
          submit={currentStep === totalSteps}
          form_name={form}
          isFetching={isFetching}
        />
      )}
    </DoctorMenu>
  );
};

export default DoctorForm;
