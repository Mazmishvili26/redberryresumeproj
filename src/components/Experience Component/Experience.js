import React from "react";
import "./Experience.css";

// import components
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import Result from "../Result Component/Result";
import InputBox from "../Personal Info Component/InputBox";
import DateInput from "./DateInput";

function Experience({
  step,
  resumeInfo,
  handleSubmit,
  watch,
  errors,
  register,
  setValue,
  values,
  setValues,
  trigger,
  setStep,
}) {
  const handleNext = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      setStep(step + 1);
    })();
  };

  return (
    <section className="experience-section">
      <div className="experience-container">
        <div className="left-side">
          <MultistepHeader step={step} />
          <form onSubmit={handleNext} className="form-wrapper container">
            <div className="userPosition-box">
              <InputBox
                labelTitle="თანამდებობა"
                placeholderValue="დეველოპერი, დიზაინერი, ა.შ."
                name="position"
                registerValue="position"
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
                name="employer"
                registerValue="employer"
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
              <DateInput register={register} inputIndex={0} />
              {/* <DateInput register={register} /> */}
            </div>

            <button onClick={handleNext}>next</button>
          </form>
        </div>
        <div className="right-side">
          <Result step={step} resumeInfo={resumeInfo} />
        </div>
      </div>
    </section>
  );
}

export default Experience;
