import React, { useState, useEffect } from "react";

// import assets
import error from "../../assets/error-icon.png";
import success from "../../assets/success-icon.png";

function InputBox({
  watch,
  errors,
  register,
  labelTitle,
  placeholderValue,
  name,
  registerValue,
  inputWarningText,
  inputIndex,
  values,
  setValues,
  setValue,
  trigger,
  formId,
  onChange,
  // localStorageValue,
}) {
  const [borderColors, setBorderColors] = useState(
    Array(5).fill("1px solid #BCBCBC")
  );

  const [noError, setNoError] = useState(false);

  const inputValue = watch(registerValue);

  useEffect(() => {
    setNoError(false);
    if (typeof inputValue === "string") {
      if (inputValue.length > 0) {
        if (errors[registerValue]) {
          setBorderColors((prev) => {
            const newBorderColors = [...prev];
            newBorderColors[inputIndex] = "1px solid #EF5050";
            return newBorderColors;
          });
        }
        if (!errors[registerValue]) {
          setNoError(true);
          setBorderColors((prev) => {
            const newBorderColors = [...prev];
            newBorderColors[inputIndex] = "1px solid #98E37E";
            return newBorderColors;
          });
        }
      }
    }

    if (typeof inputValue === "string") {
      if (inputValue.length === 0 && errors[registerValue]) {
        setBorderColors((prev) => {
          const newBorderColors = [...prev];
          newBorderColors[inputIndex] = "1px solid #EF5050";
          return newBorderColors;
        });
      }
    }
  }, [errors[registerValue], borderColors[inputIndex], inputValue?.length]);

  // localStorage

  const takeValueFromStorage = localStorage.getItem("formValues");
  const localStorageValue = takeValueFromStorage
    ? JSON.parse(takeValueFromStorage)[registerValue]
    : "";

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setValue(registerValue, e.target.value);
    // for trigger validation
    trigger(e.target.name);
    // onChange();
  };

  useEffect(() => {
    setValue(registerValue, localStorageValue);
  }, []);

  return (
    <div className="input-box">
      <label className="input-label-title" htmlFor={registerValue}>
        {labelTitle}
      </label>
      <input
        type="text"
        id={registerValue}
        name={name}
        placeholder={placeholderValue}
        style={{ border: borderColors[inputIndex] }}
        {...register(registerValue)}
        onChange={handleChange}
      />
      {errors[registerValue] && <img src={error} className="error-img" />}
      {noError && <img src={success} className="success-img" />}
      <span className="input-warning">{inputWarningText}</span>
    </div>
  );
}

export default InputBox;
