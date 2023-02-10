import React from "react";

function ThirdStepResult({ values, formId }) {
  return (
    <section
      className={
        formId === 0 ? "third-result-section add-line" : "third-result-section"
      }
    >
      {" "}
      <h4 className="result-title">განათლება</h4>
      <div className="profession-container">
        <p className="position-title">{values[`education-${formId}`]},</p>
        <p className="employee-title">xarisxi</p>
      </div>
      <div className="date-container">
        <p>{values[`educationDate-${formId}`]}</p>
      </div>
      <div className="description-container">
        <p>{values[`educationDescription-${formId}`]}</p>
      </div>
    </section>
  );
}

export default ThirdStepResult;
