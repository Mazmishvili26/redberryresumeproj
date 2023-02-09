import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import "./Education.css";
import EducationForm from "./EducationForm";
import Results from "../Result Component/Results";
import ThirdStepResult from "../Result Component/ThirdStepResult";
import FirstStepResult from "../Result Component/FirstStepResult";
import SecondStepResult from "../Result Component/SecondStepResult";

function Education({ step, setStep, setValues, values }) {
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

  const [educationComponentCount, setEducationComponentCount] = useState(1);

  const addForm = () => {
    setEducationComponentCount((count) => count + 1);
  };

  const nextPage = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      setStep(step + 1);
    })();
  };

  return (
    <section className="education-section">
      <div className="education-container">
        <div className="left-side">
          <MultistepHeader step={step} />
          <div className="form-wrapper container">
            {Array.from({ length: educationComponentCount }, (_, i) => (
              <EducationForm
                key={i}
                formId={i}
                watch={watch}
                errors={errors}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
                register={register}
                setSchema={setSchema}
                handleSubmit={handleSubmit}
              />
            ))}
            <button type="button" className="add-more-btn" onClick={addForm}>
              სხვა სასწავლებლის დამატება
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
          <SecondStepResult values={values} formId={0} />
          {Array.from({ length: educationComponentCount }, (_, i) => (
            <ThirdStepResult />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
