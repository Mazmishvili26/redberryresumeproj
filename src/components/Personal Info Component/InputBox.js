import React, { useState, useEffect } from "react";

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
}) {
  const [borderColors, setBorderColors] = useState(
    Array(2).fill("1px solid #BCBCBC")
  );

  const inputValue = watch(registerValue);

  useEffect(() => {
    if (typeof inputValue === "string") {
      if (inputValue.length > 0) {
        if (errors[registerValue]) {
          setBorderColors((prev) => {
            const newBorderColors = [...prev];
            newBorderColors[inputIndex] = "1px solid #EF5050";
            return newBorderColors;
          });
        } else {
          setBorderColors((prev) => {
            const newBorderColors = [...prev];
            newBorderColors[inputIndex] = "1px solid #98E37E";
            return newBorderColors;
          });
        }
      }
    }

    if (typeof inputValue === "string") {
      if (inputValue.length === 0) {
        setBorderColors((prev) => {
          const newBorderColors = [...prev];
          newBorderColors[inputIndex] = "1px solid #EF5050";
          return newBorderColors;
        });
      }
    }
  }, [errors[registerValue], borderColors[inputIndex]]);

  // localStorage
  const takeValueFromStorage = localStorage.getItem("formValues");
  const value = takeValueFromStorage
    ? JSON.parse(takeValueFromStorage)[registerValue]
    : "";

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setValue(registerValue, e.target.value);
    // for trigger validation
    trigger(e.target.name);
  };

  useEffect(() => {
    setValue(registerValue, value);
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
      <span className="input-warning">{inputWarningText}</span>
    </div>
  );
}

export default InputBox;
