import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CircularJSON from "circular-json";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Multistep.css";

// import components
import PersonalInfo from "../../components/Personal Info Component/PersonalInfo";
import Experience from "../../components/Experience Component/Experience";
import Education from "../../components/Education Component/Education";

const fullNameRegex = /^[\u10A0-\u10FF\s]+$/;
const emailRegex = /[a-z0-9]+@redberry.ge$/;
const phoneRegEx = /^(\+995)(79\d{7}|5\d{8})$/;

function Multistep() {
  const [step, setStep] = useState(1);

  const schema = Yup.object().shape({
    firstName: Yup.string().required().matches(fullNameRegex).min(2),
    lastName: Yup.string().required().matches(fullNameRegex).min(2),
    fileUpload: Yup.string().required(),
    email: Yup.string().required().matches(emailRegex),
    phoneNumber: Yup.string().required().matches(phoneRegEx),
    position: step === 2 && Yup.string().required().min(2),
    employer: step === 2 && Yup.string().required().min(2),
    startDate: step === 2 && Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  // store errors in localStorage

  // const [localStorageErrors, setLocalStorageErrors] = useState(
  //   JSON.parse(localStorage.getItem("errors")) || {}
  // );

  // useEffect(() => {
  //   if (
  //     performance.navigation.type === 1 &&
  //     !Object.keys(errors).length === 0
  //   ) {
  //     setLocalStorageErrors({ ...errors });
  //   }
  // }, [Object.keys(errors).length]);

  // useEffect(() => {
  //   localStorage.setItem("errors", CircularJSON.stringify(localStorageErrors));
  // }, [localStorageErrors]);

  // console.log("erora", localStorageErrors);

  // localStorage configuration

  const [values, setValues] = useState(
    JSON.parse(localStorage.getItem("formValues")) || {}
  );

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(values));
  }, [values]);

  const [resumeInfo, setResumeInfo] = useState([]);

  useEffect(() => {
    setResumeInfo([
      {
        firstName: values.firstName,
      },
      {
        lastName: values.lastName,
      },
      { fileUpload: values.fileUpload },
      { email: values.email },
      { phoneNumber: values.phoneNumber },
      { aboutMe: values.aboutMe },
    ]);
  }, [
    values.firstName,
    values.lastName,
    values.fileUpload,
    values.email,
    values.phoneNumber,
    values.aboutMe,
  ]);

  // localStorage configuration

  return (
    <section className="main-section">
      {step === 1 && (
        <PersonalInfo
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          setStep={setStep}
          step={step}
          watch={watch}
          setValue={setValue}
          setValues={setValues}
          values={values}
          trigger={trigger}
          resumeInfo={resumeInfo}
        />
      )}
      {step === 2 && (
        <Experience
          step={step}
          resumeInfo={resumeInfo}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
          values={values}
          setValues={setValues}
          trigger={trigger}
          setStep={setStep}
        />
      )}
      {step === 3 && <Education />}
    </section>
  );
}

export default Multistep;
