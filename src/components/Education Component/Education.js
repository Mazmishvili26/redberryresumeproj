import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import "./Education.css";
import EducationForm from "./EducationForm";
import ThirdStepResult from "../Result Component/ThirdStepResult";
import FirstStepResult from "../Result Component/FirstStepResult";
import SecondStepResult from "../Result Component/SecondStepResult";
import axios from "axios";

function Education({
  step,
  setStep,
  setValues,
  values,
  saveFormId,
  experience,
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

  const [educationComponentCount, setEducationComponentCount] = useState(1);

  // creating education array of objects
  const [education, setEducation] = useState([]);
  const educationValue = watch(`education-${educationComponentCount - 1}`);
  const selectedOptionValue = watch(
    `selectedOption-${educationComponentCount - 1}`
  );
  const educationDateValue = watch(
    `educationDate-${educationComponentCount - 1}`
  );
  const educationDescriptionValue = watch(
    `educationDescription-${educationComponentCount - 1}`
  );

  const addForm = () => {
    setEducationComponentCount((count) => count + 1);
    setEducation([
      ...education,
      {
        degree_id: 1,
        institute: educationValue,
        degree: selectedOptionValue,
        due_date: educationDateValue,
        description: educationDescriptionValue,
      },
    ]);
  };

  // submit
  const nextPage = (e) => {
    e.preventDefault();
    setEducation([
      ...education,
      {
        degree_id: 1,
        institute: educationValue,
        degree: selectedOptionValue,
        due_date: educationDateValue,
        description: educationDescriptionValue,
      },
    ]);
  };

  useEffect(() => {
    handleSubmit(() => {
      axios
        .post(
          "https://resume.redberryinternship.ge/api/cvs",
          {
            name: values.firstName,
            surname: values.lastName,
            email: values.email,
            phone_number: values.phoneNumber,
            experiences: experience,
            educations: education,
            image:
              "/storage/images/0rI7LyNRJRrokoSKUTb9EKvNuyYFKOvUmDQWoFt6.png",
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => console.log(err));
    })();
  }, [experience, education]);

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
          {saveFormId.map((formIdValue) => (
            <SecondStepResult values={values} formId={formIdValue} />
          ))}
          {Array.from({ length: educationComponentCount }, (_, i) => (
            <ThirdStepResult values={values} formId={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
