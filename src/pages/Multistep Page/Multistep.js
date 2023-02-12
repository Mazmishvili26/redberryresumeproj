import React, { useEffect, useState } from "react";
import localforage from "localforage";
import { useForm } from "react-hook-form";
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

function Multistep({ resumeInfo, setResumeInfo }) {
  const [step, setStep] = useState(1);

  const schema = Yup.object().shape({
    firstName: Yup.string().required().matches(fullNameRegex).min(2),
    lastName: Yup.string().required().matches(fullNameRegex).min(2),
    fileUpload: Yup.string().required(),
    email: Yup.string().required().matches(emailRegex),
    phoneNumber: Yup.string().required().matches(phoneRegEx),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  // -------------------------------------------------------------------------------

  // savePhotoValue to send backend with localForage
  const [savePhotoValue, setSavePhotoValue] = useState(null);

  useEffect(() => {
    localforage.getItem("photoName").then((value) => {
      setSavePhotoValue(value || []);
    });
  }, []);

  useEffect(() => {
    localforage.setItem("photoName", savePhotoValue);
  }, [savePhotoValue]);

  // -------------------------------------------------------------------------------

  // formIDsaver in experience component, for when user add newForm and refresh the added form should still be.
  const [saveFormId, setSaveFormId] = useState(
    JSON.parse(localStorage.getItem("experienceFormId")) || [0]
  );

  // -------------------------------------------------------------------------------

  // experienceComponent array to send backend
  const [experience, setExperience] = useState([]);

  // -------------------------------------------------------------------------------

  // localStorage configuration

  const [values, setValues] = useState(
    JSON.parse(localStorage.getItem("formValues")) || {}
  );

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(values));
  }, [values]);

  // localStorage configuratio

  // -------------------------------------------------------------------------------

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
          //
          setSavePhotoValue={setSavePhotoValue}
        />
      )}
      {step === 2 && (
        <Experience
          step={step}
          values={values}
          setValues={setValues}
          setStep={setStep}
          saveFormId={saveFormId}
          setSaveFormId={setSaveFormId}
          // setExperience={setExperience}
          experience={experience}
          setExperience={setExperience}
        />
      )}
      {step === 3 && (
        <Education
          step={step}
          setStep={setStep}
          setValues={setValues}
          values={values}
          saveFormId={saveFormId}
          //
          experience={experience}
          savePhotoValue={savePhotoValue}
          setResumeInfo={setResumeInfo}
          //
          resumeInfo={resumeInfo}
        />
      )}
    </section>
  );
}

export default Multistep;
