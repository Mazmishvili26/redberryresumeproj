import React, { useCallback, useState, useEffect } from "react";
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import InputBox from "./InputBox";
import "./PersonalInfo.css";

function PersonalInfo({
  register,
  errors,
  handleSubmit,
  setStep,
  step,
  watch,
  setValue,
  values,
  setValues,
  trigger,
}) {
  const nextPage = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      setStep(step + 1);
    })();
  };

  return (
    <section className="personalInfo-section">
      <div className="personalInfo-container">
        <div className="left-side">
          <MultistepHeader step={step} />
          <form onSubmit={nextPage} className="form-wrapper container">
            <div className="userInfo-container">
              <InputBox
                labelTitle="სახელი"
                placeholderValue="ანზორ"
                name="firstName"
                registerValue="firstName"
                inputWarningText="მინიმუმ 2 ასო, ქართული ასოები"
                watch={watch}
                errors={errors}
                register={register}
                inputIndex={0}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
              />
              <InputBox
                labelTitle="გვარი"
                placeholderValue="მუმლაძე"
                name="lastName"
                registerValue="lastName"
                inputWarningText="მინიმუმ 2 ასო, ქართული ასოები"
                watch={watch}
                errors={errors}
                register={register}
                inputIndex={1}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
              />
            </div>

            <div className="userPhoto-uploader">
              <input
                type="file"
                name="fileUpload"
                id="fileUpload"
                // ref={register("fileUpload")}
                // onChange={(e) =>
                //   setFiles(URL.createObjectURL(e.target.files[0]))
                // }
                style={{ display: "none" }}
              />
              <p className="uploadPhoto-title">პირადი ფოტოს ატვირთვა</p>
              <label htmlFor="fileUpload" className="fileUpload-btn">
                ატვირთვა
              </label>
            </div>

            <button type="submit" onClick={nextPage}>
              next
            </button>
          </form>
        </div>
        <div className="right-side"></div>
      </div>
    </section>
  );
}

export default PersonalInfo;
