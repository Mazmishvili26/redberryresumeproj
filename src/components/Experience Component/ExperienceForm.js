import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// import components
import InputBox from "../Personal Info Component/InputBox";
import DateInput from "./DateInput";
import TextArea from "../Personal Info Component/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import Result from "../Result Component/Result";
import SecondStepResult from "./SecondStepResult";

function ExperienceForm({
  values,
  setValues,
  setStep,
  step,
  handleNext,
  formId,
  setSaveFormID,
  resumeInfo,
}) {
  const schema = Yup.object().shape({
    [`position-${formId}`]: Yup.string().required().min(2),
    [`employer-${formId}`]: Yup.string().required().min(2),
    [`startDate-${formId}`]: Yup.string().required(),
    [`endDate-${formId}`]: Yup.string().required(),
    [`description-${formId}`]: Yup.string().required(),
  });

  useEffect(() => {
    setSaveFormID(formId);
  }, [formId]);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const nextPage = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      setStep(step + 1);
    })();
  };
  return (
    <div>
      <form onSubmit={handleNext} className="form-wrapper container">
        {" "}
        <div className="userPosition-box">
          <InputBox
            labelTitle="თანამდებობა"
            placeholderValue="დეველოპერი, დიზაინერი, ა.შ."
            name={`position-${formId}`}
            registerValue={`position-${formId}`}
            inputWarningText="მინიმუმ 2 სიმბოლო"
            watch={watch}
            errors={errors}
            register={register}
            inputIndex={0}
            setValue={setValue}
            values={values}
            setValues={setValues}
            trigger={trigger}
          />
        </div>
        <div className="employer-box">
          <InputBox
            labelTitle="დამსაქმებელი"
            placeholderValue="დამსაქმებელი"
            name={`employer-${formId}`}
            registerValue={`employer-${formId}`}
            inputWarningText="მინიმუმ 2 სიმბოლო"
            watch={watch}
            errors={errors}
            register={register}
            inputIndex={0}
            setValue={setValue}
            values={values}
            setValues={setValues}
            trigger={trigger}
          />
        </div>
        <div className="date-input-wrapper">
          <DateInput
            register={register}
            inputIndex={0}
            watch={watch}
            registerValue={`startDate-${formId}`}
            name={`startDate-${formId}`}
            labelText="დაწყების რიცხვი"
            errors={errors}
            setValues={setValues}
            values={values}
            setValue={setValue}
            trigger={trigger}
          />
          <DateInput
            register={register}
            inputIndex={0}
            watch={watch}
            registerValue={`endDate-${formId}`}
            name={`endDate-${formId}`}
            labelText="დაწყების რიცხვი"
            errors={errors}
            setValues={setValues}
            values={values}
            setValue={setValue}
            trigger={trigger}
          />
        </div>
        <div className="description-box">
          <TextArea
            watch={watch}
            errors={errors}
            setValues={setValues}
            values={values}
            trigger={trigger}
            setValue={setValue}
            register={register}
            registerValue={`description-${formId}`}
            name={`description-${formId}`}
            placeholderValue="როლი თანამდებობაზე და ზოგადი აღწერა"
            labelTitle="აღწერა"
            inputIndex={1}
            formId={formId}
          />
        </div>
        <button onClick={nextPage}>next</button>
      </form>
      {/* aq ro rame */}
    </div>
  );
}

export default ExperienceForm;
