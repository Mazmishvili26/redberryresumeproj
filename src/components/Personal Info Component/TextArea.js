import React, { useState, useEffect } from "react";

function TextArea({
  watch,
  errors,
  setValues,
  values,
  trigger,
  setValue,
  register,
  registerValue,
  name,
  placeholderValue,
  labelTitle,
  inputIndex,
  formId,
}) {
  // textArea validation

  const [textAreaBorder, setTextAreaBorder] = useState(
    Array(2).fill("1px solid #BCBCBC")
  );

  const textAreaValue = watch(registerValue);

  useEffect(() => {
    if (typeof textAreaValue === "string") {
      if (textAreaValue.length > 0 && registerValue !== "description") {
        setTextAreaBorder((prev) => {
          const newBorderColors = [...prev];
          newBorderColors[inputIndex] = "1px solid #98E37E";
          return newBorderColors;
        });
      } else {
        setTextAreaBorder((prev) => {
          const newBorderColors = [...prev];
          newBorderColors[inputIndex] = "1px solid #BCBCBC";
          return newBorderColors;
        });
      }
      // second textArea validation
      if (
        registerValue === "description" &&
        typeof textAreaValue === "string"
      ) {
        if (textAreaValue.length > 0) {
          if (errors[registerValue]) {
            setTextAreaBorder((prev) => {
              const newBorderColors = [...prev];
              newBorderColors[inputIndex] = "1px solid #EF5050";
              return newBorderColors;
            });
          }
          if (!errors[registerValue]) {
            setTextAreaBorder((prev) => {
              const newBorderColors = [...prev];
              newBorderColors[inputIndex] = "1px solid #98E37E";
              return newBorderColors;
            });
          }
        }
      }
    }
    if (
      typeof textAreaValue === "string" &&
      registerValue === `description-${formId}`
    ) {
      if (textAreaValue.length === 0 && errors[registerValue]) {
        setTextAreaBorder((prev) => {
          const newBorderColors = [...prev];
          newBorderColors[inputIndex] = "1px solid red";
          return newBorderColors;
        });
      }
    }
  }, [
    textAreaBorder[inputIndex],
    textAreaValue?.length,
    errors[registerValue],
  ]);

  // localStorage for textarea

  const takeValueFromStoragetxt = localStorage.getItem("formValues");
  const localStorageValuetxt = takeValueFromStoragetxt
    ? JSON.parse(takeValueFromStoragetxt)[registerValue]
    : "";

  const handleTextarea = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setValue(registerValue, e.target.value);
    trigger(e.target.name);
  };

  useEffect(() => {
    setValue(registerValue, localStorageValuetxt);
  }, []);

  return (
    <>
      {" "}
      <label className="aboutMe-title">{labelTitle}</label>
      <textarea
        name={name}
        placeholder={placeholderValue}
        {...register(registerValue)}
        style={{
          border: textAreaBorder[inputIndex],
        }}
        onChange={handleTextarea}
      ></textarea>
    </>
  );
}

export default TextArea;
