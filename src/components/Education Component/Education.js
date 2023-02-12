import React, { useEffect, useState } from "react";
import localforage from "localforage";
import "./Education.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// import components
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import EducationForm from "./EducationForm";
import FirstStepResult from "../Result Component/FirstStepResult";
import SecondStepResult from "../Result Component/SecondStepResult";
import ThirdStepResult from "../Result Component/ThirdStepResult";

// import assets
import logo from "../../assets/logo2.png";

function Education({
  step,
  setStep,
  setValues,
  values,
  saveFormId,
  experience,
  savePhotoValue,
  setResumeInfo,
  //
  resumeInfo,
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

  // educationComponent state and save to localstorage
  const [educationComponentCount, setEducationComponentCount] = useState(
    parseInt(localStorage.getItem("educationComponentCount")) || 1
  );

  useEffect(() => {
    localStorage.setItem("educationComponentCount", educationComponentCount);
  }, [educationComponentCount]);

  // educationComponent state and save to localstorage

  const [degreeId, setDegreeId] = useState(null);

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

  // creating education array of objects

  // adding objects in education array
  const [submitted, setSubmitted] = useState(false);

  const addForm = () => {
    setEducationComponentCount((count) => count + 1);
    setEducation([
      ...education,
      {
        degree_id: degreeId,
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

    const newEducation = [
      ...education,
      {
        degree_id: degreeId,
        institute: educationValue,
        degree: selectedOptionValue,
        due_date: educationDateValue,
        description: educationDescriptionValue,
      },
    ];
    // filter to avoid same object add in array
    setEducation(
      newEducation.filter(
        (edu, index, self) =>
          self.findIndex(
            (t) =>
              t.institute === edu.institute &&
              t.degree === edu.degree &&
              t.due_date === edu.due_date &&
              t.description === edu.description
          ) === index
      )
    );

    setSubmitted(true);
  };

  // for Success navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (!submitted) return;

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
          image: savePhotoValue,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setTimeout(() => {
          console.log(resp.data); // log the data to check if it contains what you expect
          setResumeInfo(resp.data);
        }, 0);
        navigate("/userResume");
        localStorage.clear();
        localforage.clear();
      })
      .catch((err) => alert("წარუმატებელი მცდელობა მიზეზი" + err));
    setSubmitted(false);
  }, [submitted, experience, education, values, resumeInfo]);

  return (
    <section
      className={
        educationComponentCount > 1
          ? "education-section auto-height"
          : "education-section"
      }
    >
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
                setDegreeId={setDegreeId}
              />
            ))}
            <button type="button" className="add-more-btn" onClick={addForm}>
              სხვა სასწავლებლის დამატება
            </button>
            <div className="stepper-btn-container">
              <button className="prev-btn">უკან</button>
              <button
                type="submit"
                id="next-btn"
                className="next-btn"
                onClick={nextPage}
              >
                დასრულება
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
          <img src={logo} className="logo-img" />
        </div>
      </div>
    </section>
  );
}

export default Education;
