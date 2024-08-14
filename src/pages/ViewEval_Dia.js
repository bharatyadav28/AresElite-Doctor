import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DoctorMenu from "../components/layout/DoctorMenu";
import { GetEvalDiaForm } from "../features/apiCall";

const ViewEval_Dia = () => {
  const Eval_Dia_form = useSelector((state) => state.fetch_app.Eval_Dia_form);
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  const fetchData = async () => {
    try {
      await GetEvalDiaForm(dispatch, { appointmentId });
    } catch (error) {
      console.error("Error fetching evaluation details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, appointmentId]); // Removed 'navigate' from dependencies, as it's not being used in useEffect

  const renderTableData = (data) => {
    return data.map((item, index) => (
      <>
        {Object.entries(item).map(([label, value], index) => (
          <tr key={index}>
            <td>
              <strong>{label}</strong>
            </td>
            <td>{Array.isArray(value) ? value.join(", ") : value}</td>
          </tr>
        ))}
      </>
    ));
  };

  const renderFormData = (formData) => {
    if (isFetching || !formData) {
      return <div>Loading...</div>;
    }

    return (
      <Table className="table" bordered striped>
        <tbody>{renderTableData(formData)}</tbody>
      </Table>
    );
  };

  const renderDiagnosis = (formData) => {
    if (isFetching || !formData) {
      return <div>Loading...</div>;
    }

    return (
      <Table className="table" bordered striped>
        <tbody>{renderTableData(formData)}</tbody>
      </Table>
    );
  };

  return (
    <DoctorMenu>
      <div className="p-3 main-wrapper mt-2 booking-presc">
        <div className="frame" style={{ overflowY: "scroll" }}>
          <div className="recent-booking-head ">
            <div style={{ paddingLeft: "15px" }} className="form-cont">
              <h3 className="text-gradient text-uppercase">
                View Evaluation Form
                <h6>APPOINTMENT ID- {Eval_Dia_form?.evaluationForm?._id}</h6>
              </h3>
              <div className="mt-5 p-4 form-container">
                {renderFormData(Eval_Dia_form?.evaluationForm?.form)}
              </div>
            </div>
          </div>
          <br />
          <div className="recent-booking-head">
            <div style={{ paddingLeft: "15px" }} className="form-cont">
              <h3 className="text-gradient text-uppercase">
                View Diagnosis Form
                <h6>APPOINTMENT ID- {Eval_Dia_form?.diagnosisForm?._id}</h6>
              </h3>
              <div className="mt-5 p-4 form-container">
                {renderDiagnosis(Eval_Dia_form?.diagnosisForm?.form)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorMenu>
  );
};

export default ViewEval_Dia;
