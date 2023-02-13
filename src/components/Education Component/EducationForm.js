import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import * as Yup from "yup";

// import components
import InputBox from "../Personal Info Component/InputBox";
import TextArea from "../Personal Info Component/TextArea";

// import assets
import vector from "../../assets/vector.png";
import DegreeList from "./DegreeList";
import DateInput from "../Experience Component/DateInput";

// api
const degreesAPI = "https://resume.redberryinternship.ge/api/degrees";

function EducationForm({
  watch,
  errors,
  register,
  setValue,
  values,
  setValues,
  formId,
  trigger,
  handleSubmit,
  setSchema,
  setDegreeId,
}) {
  const educationValue = watch(`education-${formId}`);
  const educationDate = watch(`educationDate-${formId}`);
  const educationDescriptionValue = watch(`educationDescription-${formId}`);

  useEffect(() => {
    if (
      (formId > 0 && educationValue?.length > 0) ||
      educationDate ||
      educationDescriptionValue?.length > 0
    ) {
      setSchema(
        Yup.object().shape({
          [`education-${formId}`]: Yup.string().required().min(2),
          [`educationDate-${formId}`]: Yup.string().required(),
          [`educationDescription-${formId}`]: Yup.string().required(),
          [`selectedOption-${formId}`]: Yup.string().required(),
        })
      );
    }

    if (formId === 0) {
      setSchema(
        Yup.object().shape({
          [`education-${formId}`]: Yup.string().required().min(2),
          [`educationDate-${formId}`]: Yup.string().required(),
          [`educationDescription-${formId}`]: Yup.string().required(),
          [`selectedOption-${formId}`]: Yup.string().required(),
        })
      );
    }
  }, [
    formId,
    educationValue?.length,
    educationDate,
    educationDescriptionValue?.length,
  ]);

  const [degrees, setDegrees] = useState([]);

  // getDegrees

  useEffect(() => {
    const getDegreeData = async function () {
      const response = await axios.get(degreesAPI);
      const data = response.data;
      setDegrees(data);
    };
    getDegreeData();
  }, []);

  // selectbox states

  const takeValueFromStorage = localStorage.getItem("formValues");
  const localStorageValue = takeValueFromStorage
    ? JSON.parse(takeValueFromStorage)[`selectedOption-${formId}`]
    : "";

  const [selectBoxValue, setSelectBoxValue] = useState(localStorageValue);
  const [isSelectboxOpen, setIsSelectboxOpen] = useState(false);
  const selectboxRef = useRef(null);

  useEffect(() => {
    setValues({ ...values, [`selectedOption-${formId}`]: selectBoxValue });
    setValue(`selectedOption-${formId}`, selectBoxValue);
    if (selectBoxValue) {
      selectboxRef.current.style.border = "1px solid rgb(152, 227, 126)";
    }
  }, [selectBoxValue, errors[`selectedOption-${formId}`]]);

  return (
    <div className={formId > 0 ? "educatin-new-form" : null}>
      <form onSubmit={handleSubmit}>
        <div className="userSchool-box">
          <InputBox
            labelTitle="სასწავლებელი"
            placeholderValue="სასწავლებელი"
            name={`education-${formId}`}
            registerValue={`education-${formId}`}
            inputWarningText="მინიმუმ 2 სიმბოლო"
            watch={watch}
            errors={errors}
            register={register}
            inputIndex={6}
            setValue={setValue}
            values={values}
            setValues={setValues}
            trigger={trigger}
            formId={formId}
          />
        </div>
        <div className="user-education-container">
          {/*  */}
          <div>
            <label className="selectBox-title">ხარისხი</label>
            <div
              ref={selectboxRef}
              className={
                errors[`selectedOption-${formId}`]
                  ? "select-box selectbox-error"
                  : "select-box"
              }
            >
              <p
                className={
                  selectBoxValue ? "selectBox-value active" : "selectBox-value"
                }
              >
                {selectBoxValue ? selectBoxValue : "აირჩიეთ ხარისხი"}
              </p>
              <img
                src={vector}
                className={
                  isSelectboxOpen
                    ? "selectBox-arrow close-dropdown"
                    : "selectBox-arrow"
                }
                onClick={() => setIsSelectboxOpen(!isSelectboxOpen)}
              />
            </div>
            {/*  */}
            <div
              className={
                isSelectboxOpen
                  ? "selectBox-dropdown open"
                  : "selectBox-dropdown"
              }
            >
              <ul className="degree-ul">
                {degrees.map((degree) => {
                  return (
                    <DegreeList
                      key={degree.id}
                      degree={degree}
                      setIsSelectboxOpen={setIsSelectboxOpen}
                      setSelectboxValue={setSelectBoxValue}
                      setDegreeId={setDegreeId}
                    />
                  );
                })}
              </ul>
            </div>
            <input
              type="hidden"
              name="selectedOption"
              {...register(`selectedOption-${formId}`)}
              value={selectBoxValue}
            />
          </div>

          {/*  */}
          <div className="education-date-box">
            <DateInput
              register={register}
              inputIndex={2}
              watch={watch}
              registerValue={`educationDate-${formId}`}
              name={`educationDate-${formId}`}
              labelText="დამთავრების რიცხვი"
              errors={errors}
              setValues={setValues}
              values={values}
              setValue={setValue}
              trigger={trigger}
            />
          </div>
        </div>

        <div className="education-description">
          <TextArea
            watch={watch}
            errors={errors}
            setValues={setValues}
            values={values}
            trigger={trigger}
            setValue={setValue}
            register={register}
            registerValue={`educationDescription-${formId}`}
            name={`educationDescription-${formId}`}
            placeholderValue="განათლების აღწერა"
            labelTitle="აღწერა"
            inputIndex={2}
            formId={formId}
          />
        </div>
      </form>
    </div>
  );
}

export default EducationForm;
