import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Multistep.css";

// import components
import PersonalInfo from "../../components/Personal Info Component/PersonalInfo";
import Experience from "../../components/Experience Component/Experience";
import Education from "../../components/Education Component/Education";

const patternValue = /^[\u10A0-\u10FF\s]+$/;

const schema = Yup.object().shape({
  firstName: Yup.string().required().matches(patternValue).min(2),
  lastName: Yup.string().required().matches(patternValue).min(2),
});

function Multistep() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const [step, setStep] = useState(1);

  const formData = watch();

  // storedInputValues in localStorage
  const [values, setValues] = useState(
    JSON.parse(localStorage.getItem("formValues")) || {}
  );

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(values));
  }, [values]);

  //

  const [resume, setResume] = useState([]);

  useEffect(() => {
    setResume([
      {
        firstName: values.firstName,
      },
      {
        lastName: values.lastName,
      },
    ]);
  }, [values.firstName, values.lastName]);

  return (
    <section className="main-section">
      <p>{resume[0]?.firstName}</p>
      <p>{resume[1]?.lastName}</p>
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
        />
      )}
      {step === 2 && <Experience step={step} />}
      {step === 3 && <Education />}
    </section>
  );
}

export default Multistep;
