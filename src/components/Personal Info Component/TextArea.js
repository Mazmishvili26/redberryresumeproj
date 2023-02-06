import React, { useState, useEffect } from "react";

function TextArea({
  watch,
  errors,
  setValues,
  values,
  trigger,
  setValue,
  register,
}) {
  // textArea validation

  const [textAreaBorder, setTextAreaBorder] = useState("1px solid #BCBCBC");

  const textAreaValue = watch("aboutMe");

  useEffect(() => {
    if (typeof textAreaValue === "string") {
      if (textAreaValue.length > 0) {
        setTextAreaBorder("1px solid #98E37E");
      } else {
        setTextAreaBorder("1px solid #BCBCBC");
      }
    }
  }, [textAreaBorder, textAreaValue?.length]);

  // localStorage for textarea

  const takeValueFromStoragetxt = localStorage.getItem("formValues");
  const localStorageValuetxt = takeValueFromStoragetxt
    ? JSON.parse(takeValueFromStoragetxt).aboutMe
    : "";

  const handleTextarea = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setValue("aboutMe", e.target.value);
    trigger(e.target.name);
  };

  useEffect(() => {
    setValue("aboutMe", localStorageValuetxt);
  }, []);

  return (
    <>
      {" "}
      <label className="aboutMe-title">ჩემ შესახებ (არასავალდებულო)</label>
      <textarea
        name="aboutMe"
        placeholder="ზოგადი ინფო შენს შესახებ"
        {...register("aboutMe")}
        style={{
          border: textAreaBorder,
        }}
        onChange={handleTextarea}
      ></textarea>
    </>
  );
}

export default TextArea;
