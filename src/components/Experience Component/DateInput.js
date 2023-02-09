import React, { useEffect, useState } from "react";

function DateInput({
  register,
  inputIndex,
  watch,
  registerValue,
  name,
  errors,
  setValues,
  values,
  setValue,
  trigger,
  labelText,
}) {
  const [borderColors, setBorderColors] = useState(
    Array(3).fill("1px solid #BCBCBC")
  );

  const inputValue = watch(registerValue);
  const date = new Date(inputValue);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    if (typeof formattedDate === "string") {
      if (errors[registerValue]) {
        setBorderColors((prev) => {
          const newBorderColors = [...prev];
          newBorderColors[inputIndex] = "1px solid #EF5050";
          return newBorderColors;
        });
      } else if (inputValue) {
        setBorderColors((prev) => {
          const newBorderColors = [...prev];
          newBorderColors[inputIndex] = "1px solid #98E37E";
          return newBorderColors;
        });
      }
    }
  }, [errors[registerValue], borderColors[inputIndex], inputValue]);

  // save Date in localStorage

  const takeValueFromStorage = localStorage.getItem("formValues");
  const localStorageValue = takeValueFromStorage
    ? JSON.parse(takeValueFromStorage)[registerValue]
    : "";

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setValue(registerValue, e.target.value);
    // for trigger validation
    trigger(e.target.name);
    console.log(e.target.value);
  };

  useEffect(() => {
    setValue(registerValue, localStorageValue);
  }, []);

  return (
    <div className="date-box">
      <label className="dateLabel-title">{labelText}</label>
      <input
        type="date"
        name={name}
        {...register(registerValue)}
        style={{ border: borderColors[inputIndex] }}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateInput;
