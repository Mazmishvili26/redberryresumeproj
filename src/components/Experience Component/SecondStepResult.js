import React from "react";

function SecondStepResult({ values, formId }) {
  return (
    <section className="second-result-section">
      <h4 className="result-title">გამოცდილება</h4>
      <div className="profession-container">
        <p className="position-title">{values[`position-${formId}`]},</p>
        <p className="employee-title">{values[`employer-${formId}`]}</p>
      </div>
      <div className="date-container">
        <p>{values[`startDate-${formId}`]} - </p>
        <p>{values[`endDate-${formId}`]}</p>
      </div>
    </section>
  );
}

export default SecondStepResult;
