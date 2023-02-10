import React from "react";

function SecondStepResult({ values, formId, watch }) {
  const positionLength = values[`position-${formId}`]?.length;
  const employerLength = values[`employer-${formId}`]?.length;
  const startDateValue = values[`startDate-${formId}`];
  const endDateValue = values[`endDate-${formId}`];
  const descriptionLength = values[`description-${formId}`]?.length;

  if (
    positionLength > 0 ||
    employerLength > 0 ||
    startDateValue ||
    endDateValue ||
    descriptionLength > 0
  ) {
    return (
      <>
        <section className="second-result-section">
          <>
            {" "}
            <h4 className="result-title">გამოცდილება</h4>
            <div className="profession-container">
              {positionLength > 0 && (
                <p className="position-title">
                  {values[`position-${formId}`]},
                </p>
              )}
              {employerLength > 0 && (
                <p className="employee-title">{values[`employer-${formId}`]}</p>
              )}
            </div>
            <div className="date-container">
              <p>
                {values[`startDate-${formId}`]}{" "}
                {startDateValue && endDateValue ? "-" : null}{" "}
                {values[`endDate-${formId}`]}
              </p>
            </div>
            <div className="description-container">
              <p>{values[`description-${formId}`]}</p>
            </div>
          </>
        </section>
      </>
    );
  }
}

export default SecondStepResult;
