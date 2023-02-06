import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import "./Experience.css";

// import components
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import Result from "../Result Component/Result";
import ExperienceForm from "./ExperienceForm";
import SecondStepResult from "./SecondStepResult";

function Experience({
  step,
  resumeInfo,
  handleSubmit,
  watch,
  errors,
  register,
  setValue,
  values,
  setValues,
  trigger,
  setStep,
  saveFormID,
  setSaveFormID,
}) {
  const [componentCount, setComponentCount] = useState(1);

  const addForm = () => {
    setComponentCount((count) => count + 1);
  };

  return (
    <section className="experience-section">
      <div className="experience-container">
        <div className="left-side">
          <MultistepHeader step={step} />

          {Array.from({ length: componentCount }, (_, i) => (
            <ExperienceForm
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              values={values}
              trigger={trigger}
              setValues={setValues}
              handleSubmit={handleSubmit}
              setStep={setStep}
              step={step}
              key={i}
              formId={i}
              defaultValues={{ description: "" }}
              setSaveFormID={setSaveFormID}
              resumeInfo={resumeInfo}
              saveFormID={saveFormID}
            />
          ))}

          <button type="button" className="add-more-btn" onClick={addForm}>
            მეტი გამოცდილების დამატება
          </button>
        </div>
        <div className="right-side">
          <Result
            step={step}
            resumeInfo={resumeInfo}
            values={values}
            saveFormID={saveFormID}
          />
          {Array.from({ length: componentCount }, (_, i) => (
            <SecondStepResult values={values} formId={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
