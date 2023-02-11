import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Experience.css";

// import components
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import FirstStepResult from "../Result Component/FirstStepResult";
import ExperienceForm from "./ExperienceForm";
import SecondStepResult from "../Result Component/SecondStepResult";

function Experience({
  step,
  values,
  setValues,
  setStep,
  saveFormId,
  setSaveFormId,
  addExperience,
  experience,
  setExperience,
}) {
  const [schema, setSchema] = useState(null);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [componentCount, setComponentCount] = useState(
    parseInt(localStorage.getItem("componentCount")) || 1
  );

  // ---------------------------------------------

  const positionValue = watch(`position-${componentCount - 1}`);
  const employerValue = watch(`employer-${componentCount - 1}`);
  const startDate = watch(`startDate-${componentCount - 1}`);
  const endDate = watch(`endDate-${componentCount - 1}`);
  const description = watch(`description-${componentCount - 1}`);

  const addForm = () => {
    setComponentCount((count) => count + 1);
    setSaveFormId((prevSaveFormId) => [...prevSaveFormId, componentCount]);
    // creating experience Array of objects to send backend
    setExperience([
      ...experience,
      {
        position: positionValue,
        employer: employerValue,
        start_date: startDate,
        due_date: endDate,
        description: description,
      },
    ]);
  };

  const nextPage = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      setStep(step + 1);
    })();
  };

  useEffect(() => {
    localStorage.setItem("componentCount", componentCount);
    localStorage.setItem("experienceFormId", JSON.stringify(saveFormId));
  }, [componentCount, saveFormId]);

  return (
    <section className="experience-section">
      <div className="experience-container">
        <div className="left-side">
          <MultistepHeader step={step} />
          <div className="form-wrapper container">
            {Array.from({ length: componentCount }, (_, i) => (
              <ExperienceForm
                key={i}
                formId={i}
                values={values}
                setValues={setValues}
                defaultValues={{ description: "" }}
                setSchema={setSchema}
                //
                handleSubmit={handleSubmit}
                watch={watch}
                errors={errors}
                register={register}
                setValue={setValue}
                trigger={trigger}
                componentCount={componentCount}
                //
                value={values}
                // experience={experience}
                // setExperience={setExperience}
              />
            ))}

            <button type="button" className="add-more-btn" onClick={addForm}>
              მეტი გამოცდილების დამატება
            </button>
            <div className="stepper-btn-container">
              <button className="prev-btn">უკან</button>
              <button id="next-btn" className="next-btn" onClick={nextPage}>
                შემდეგი
              </button>
            </div>
          </div>
        </div>
        <div className="right-side">
          <FirstStepResult step={step} values={values} />
          {Array.from({ length: componentCount }, (_, i) => (
            <SecondStepResult values={values} formId={i} watch={watch} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
