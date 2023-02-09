import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Experience.css";

// import components
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import FirstStepResult from "../Result Component/FirstStepResult";
import ExperienceForm from "./ExperienceForm";
import SecondStepResult from "../Result Component/SecondStepResult";

function Experience({ step, values, setValues, setStep }) {
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

  const addForm = () => {
    setComponentCount((count) => count + 1);
  };

  const nextPage = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      setStep(step + 1);
    })();
  };

  useEffect(() => {
    localStorage.setItem("componentCount", componentCount);
  }, [componentCount]);

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
            <SecondStepResult values={values} formId={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
