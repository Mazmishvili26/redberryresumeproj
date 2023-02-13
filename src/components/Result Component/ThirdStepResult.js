import React from "react";

function ThirdStepResult({ values, formId }) {
  const educationValue = values[`education-${formId}`];
  const selectedOptionValue = values[`selectedOption-${formId}`];
  const educationDateValue = values[`educationDate-${formId}`];
  const educationDescriptionValue = values[`educationDescription-${formId}`];

  if (
    educationValue?.length > 0 ||
    selectedOptionValue ||
    educationDateValue ||
    educationDescriptionValue?.length > 0
  ) {
    return (
      <section
        className={
          formId === 0
            ? "third-result-section add-line"
            : "third-result-section"
        }
      >
        {" "}
        <h4 className="result-title">განათლება</h4>
        <div className="profession-container">
          <p className="position-title">
            {values[`education-${formId}`]}{" "}
            {educationValue?.length > 0 && selectedOptionValue ? "," : null}
          </p>
          <p className="employee-title">{values[`selectedOption-${formId}`]}</p>
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
}

export default ThirdStepResult;
