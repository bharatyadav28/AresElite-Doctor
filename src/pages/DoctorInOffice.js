import React from "react";
import DoctorMenu from "../components/layout/DoctorMenu";

const DoctorInOffice = () => {
  return (
    <DoctorMenu>
      <section className="w-100 vh-100 " style={{ backgroundColor: "grey" }}>
        <h2 className="text-center pt-5">
          Select the Evaluation <br />
          Location
        </h2>
        <div
          className="d-flex justify-content-between  "
          style={{ width: "60%", margin: "40px auto", gap: "20px" }}
        >
          <div className="eval-location">
            <h5>510 W. Carmel Dr. Carmel, IN 46032</h5>
            <img src="images/image 10.png" />
          </div>
          <div className="eval-location">
            <h5>510 W. Carmel Dr. Carmel, IN 46032</h5>
            <img src="images/image 10.png" />
          </div>
        </div>
        <button
          className="purple-button mt-5 m-auto text-center "
          type="submit"
          style={{ width: "332px", height: "62px" }}
        >
          Next
        </button>
      </section>
    </DoctorMenu>
  );
};

export default DoctorInOffice;
