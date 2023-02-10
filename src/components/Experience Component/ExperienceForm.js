import React, { useEffect, useState } from "react";
import * as Yup from "yup";

// import components
import InputBox from "../Personal Info Component/InputBox";
import DateInput from "./DateInput";
import TextArea from "../Personal Info Component/TextArea";

function ExperienceForm({
  values,
  setValues,
  formId,
  onChange,
  watch,
  errors,
  handleSubmit,
  register,
  trigger,
  setSchema,
  setValue,
  componentCount,
  setExperience,
}) {
  const positionValue = watch(`position-${formId}`);
  const employerValue = watch(`employer-${formId}`);
  const startDate = watch(`startDate-${formId}`);
  const endDate = watch(`endDate-${formId}`);
  const description = watch(`description-${formId}`);

  // const [experience, setExperience] = useState([]);

  useEffect(() => {
    setExperience((prevExperience) => {
      const existingExperience = prevExperience.find(
        (exp) => exp.formId === formId
      );
      if (existingExperience) {
        return prevExperience.map((exp) =>
          exp.formId === formId
            ? {
                formId,
                position: positionValue,
                employer: employerValue,
                start_date: startDate,
                end_date: endDate,
                description: description,
              }
            : exp
        );
      } else {
        return [
          ...prevExperience,
          {
            formId,
            position: positionValue,
            employer: employerValue,
            start_date: startDate,
            end_date: endDate,
            description: description,
          },
        ];
      }
    });
  }, [formId, positionValue, employerValue, startDate, endDate, description]);

  // localStorage.clear();

  useEffect(() => {
    if (
      (formId > 0 && positionValue?.length > 0) ||
      employerValue?.length > 0 ||
      startDate?.length > 0 ||
      endDate?.length > 0 ||
      description?.length > 0
    ) {
      setSchema(
        Yup.object().shape({
          [`position-${formId}`]: Yup.string().required().min(2),
          [`employer-${formId}`]: Yup.string().required().min(2),
          [`startDate-${formId}`]: Yup.string().required(),
          [`endDate-${formId}`]: Yup.string().required(),
          [`description-${formId}`]: Yup.string().required(),
        })
      );
    }

    if (formId === 0) {
      setSchema(
        Yup.object().shape({
          [`position-${formId}`]: Yup.string().required().min(2),
          [`employer-${formId}`]: Yup.string().required().min(2),
          [`startDate-${formId}`]: Yup.string().required(),
          [`endDate-${formId}`]: Yup.string().required(),
          [`description-${formId}`]: Yup.string().required(),
        })
      );
    }
  }, [
    formId,
    positionValue?.length,
    employerValue?.length,
    startDate?.length,
    endDate?.length,
    description?.length,
  ]);

  return (
    <div className={formId > 0 && "added-experience-box"}>
      <form onSubmit={handleSubmit}>
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
            inputIndex={4}
            setValue={setValue}
            values={values}
            setValues={setValues}
            trigger={trigger}
            formId={formId}
            onChange={onChange}
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
            inputIndex={5}
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
            inputIndex={1}
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
      </form>
    </div>
  );
}

export default ExperienceForm;
