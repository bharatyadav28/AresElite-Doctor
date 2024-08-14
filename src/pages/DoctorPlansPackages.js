import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BootstrapModal from "../components/layout/Components/BootstrapModal";
import Loader from "../components/layout/Components/Loader";
import DoctorMenu from "../components/layout/DoctorMenu";
import { GetPlans, Plans } from "../features/apiCall";
import "../styles/doctorplans.css";

const DoctorPlansPackages = () => {
  const Get_Plans = useSelector((state) => state.fetch_app.Get_Plans);
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ClientId } = useParams();

  const fetchData = async () => {
    try {
      await GetPlans(dispatch);
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, navigate]);

  return (
    <DoctorMenu>
      <section className="text-center w-100 vh-100 plans-par-cont">
        <h2 className="font-weight-bold  plan-title">
          <span> Powerful features for</span>
          <br />{" "}
          <span className="color-purple font-weight-bold text-gradient2">
            Powerful Athletes
          </span>
        </h2>
        <p className=" mb-5">Choose a plan that’s right for you</p>

        <div className="d-flex  plan-container ">
          {isFetching ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {" "}
              {Get_Plans.map((plan, index) => (
                <PlanSingle key={index} planData={plan} ClientId={ClientId} />
              ))}
            </>
          )}
        </div>
      </section>
    </DoctorMenu>
  );
};

export default DoctorPlansPackages;
const PlanSingle = ({ planData, ClientId }) => {
  const { name, billing, features, buttonText, phases } = planData;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    navigate("/doctor/dashboard/recent-evaluation2");
  };
  const [showModal2, setShowModal2] = useState(false);
  const handleSubmit = () => {
    setShowModal(true);
  };
  const handleClose2 = () => {
    setShowModal2(false);
    navigate("/doctor/dashboard/recent-evaluation2");
  };
  return (
    <div className="plan-single-cont">
      <div className="m-4 ">
        {/* <div className={`icon-cont-${icon} m-auto`}>
          <img src={`/images/icons/${icon}.svg`} alt={icon} />
        </div> */}
        <h2 className="text-dark text-start">{name}</h2>
        {/* <h1 className="color-purple text-start" style={{ fontSize: "60px" }}>
          {price}
          <span
            style={{
              fontSize: "12px",
              fontWeight: "300",
              letterSpacing: "1px",
              marginLeft: "7px",
            }}
          >
            per Month
          </span>
        </h1> */}
        {/* <p>{billing}</p> */}
      </div>

      <table className="table table-borderless">
        <tbody>
          {features.map((feature, index) => (
            <tr key={index}>
              <td>
                <img src="/images/icons/tick.svg" alt="tick" />
              </td>
              <td>{feature}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="">
        <button onClick={handleSubmit} className="purple-button plan-bt">
          SELECT PLAN{" "}
        </button>
        <BootstrapModal
          showModal={showModal}
          handleClose={handleClose}
          modalTitle={""}
          modalContent={
            <ModalContent
              name={name}
              phases={phases}
              handleClose={handleClose}
              ClientId={ClientId}
              setShowModal={setShowModal}
              setShowModal2={setShowModal2}
            />
          }
          className="plans-phases-modal"
        />
        <BootstrapModal
          showModal={showModal2}
          handleClose={handleClose2}
          modalTitle={""}
          modalContent={<SubmitPlan />}
        />
      </div>
    </div>
  );
};
const ModalContent = ({
  name,
  phases,
  handleClose,
  ClientId,
  setShowModal,
  setShowModal2,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(null);
  const handleGoBack = () => {
    console.log("Going back");
    navigate(-1);
  };
  const handleSubmit = async () => {
    console.log(ClientId);
    if (selectedPhaseIndex !== null) {
      const selectedPhase = phases[selectedPhaseIndex];
      const params = {
        name,
        phase: selectedPhase,
        ClientId,
      };

      try {
        const data = await Plans(dispatch, params);
        if (data) {
          setShowModal2(true);
        }
      } catch (error) {}
    } else {
      // Handle case where no phase is selected
      console.log("No phase selected");
    }
  };

  const handleChange = (index) => {
    setSelectedPhaseIndex(index);
  };

  return (
    <section className="text-center">
      <button onClick={handleClose} className="m-2 p-0 mb-4" id="back_bt_plan">
        <img src="/images/icons/backdark.svg" alt="back" width={30} />
      </button>

      <div>
        <h3>{name}</h3>
        <div className="">
          <div className="text-left ml-5 mt-3">
            <h6>Select program</h6>
            <p className="email " style={{ fontSize: "13px" }}>
              Select program to Continue intermediate program
            </p>
          </div>

          <div className="d-flex flex-column align-items-center">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`d-flex align-items-center flex-column phase-container  h-auto `}
              >
                <label
                  className={`radio-label${
                    selectedPhaseIndex === index ? " selected" : ""
                  }`}
                >
                  <div>
                    <h6 className="text-dark">
                      {phase.name} <span>&#183;</span>{" "}
                      <span className="text-muted price-phase">
                        ${phase.cost}/month
                      </span>
                    </h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Scelerisque nisl
                      lectus sed odio adipiscing etc.
                    </p>
                  </div>
                  <input
                    type="radio"
                    onChange={() => handleChange(index)}
                    checked={selectedPhaseIndex === index}
                  />
                </label>
              </div>
            ))}
            <button onClick={handleSubmit} className="purple-button plan-bt ">
              START PLAN
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SubmitPlan = () => {
  const navigate = useNavigate();

  return (
    <section
      className="text-center d-flex flex-column flex-wrap align-items-center justify-content-center "
      style={{
        height: "75vh",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "10px 50px ",
      }}
    >
      <img
        src="/images/icons/payments.png"
        alt="payment-icon"
        className="mb-4"
        width={200}
        height={200}
      />
      <div className="d-flex check-your-box-texts">
        <h5>Payment request sent!!</h5>
        <p>
          Payment request bas been sent successfully to the client,
          <br /> Please ask client to complete the payment process.
        </p>
      </div>
      <Button
        onClick={() => navigate("/doctor/dashboard")}
        className="purple-button"
        style={{ width: "332px", height: "62px" }}
      >
        Continue
      </Button>
    </section>
  );
};
