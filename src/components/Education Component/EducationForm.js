import React, { useEffect, useState } from "react";
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
}) {
  const [openSelectboxDropdown, setOpenSelectboxDropdown] = useState(false);
  const [selectboxValue, setSelectboxValue] = useState("");
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    setSchema(
      Yup.object().shape({
        [`education-${formId}`]: Yup.string().required().min(2),
        [`educationDate-${formId}`]: Yup.string().required(),
        [`educationDescription-${formId}`]: Yup.string().required(),
      })
    );
  }, []);

  // getDegrees

  useEffect(() => {
    const getDegreeData = async function () {
      const response = await axios.get(degreesAPI);
      const data = response.data;
      setDegrees(data);
    };
    getDegreeData();
  }, []);

  return (
    <div>
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
          <div>
            <label className="selectBox-title">ხარისხი</label>
            <div className="select-box">
              <p
                className={
                  selectboxValue ? "selectBox-value active" : "selectBox-value"
                }
              >
                {selectboxValue ? selectboxValue : "აირჩიეთ ხარისხი"}
              </p>
              <img
                src={vector}
                className="selectBox-arrow"
                onClick={() => setOpenSelectboxDropdown(!openSelectboxDropdown)}
              />
            </div>
            <div
              className={
                openSelectboxDropdown
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
                      setSelectboxValue={setSelectboxValue}
                      setOpenSelectboxDropdown={setOpenSelectboxDropdown}
                    />
                  );
                })}
              </ul>
            </div>
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
