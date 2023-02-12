import React, { useEffect, useState } from "react";

// import assets

import error from "../../assets/error-icon.png";

function UploadPhoto({
  register,
  setValue,
  setValues,
  values,
  trigger,
  errors,
  //
  setSavePhotoValue,
}) {
  // for File Upload validation

  const takeValueFromStorage = localStorage.getItem("formValues");
  const localStorageValue = takeValueFromStorage
    ? JSON.parse(takeValueFromStorage).fileUpload
    : "";

  const handleFileChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
    // save photo in localstorage
    const file = e.target.files[0];
    setSavePhotoValue(file);
    // save photo in localstorage

    setValue("fileUpload", e.target.files);
    trigger("fileUpload");
  };

  useEffect(() => {
    setValue("fileUpload", localStorageValue);
  }, []);

  // for File Upload

  return (
    <>
      <input
        type="file"
        name="fileUpload"
        id="fileUpload"
        {...register("fileUpload", { required: true })}
        onChange={(e) => handleFileChange(e)}
        style={{ display: "none" }}
      />
      <p className="uploadPhoto-title">პირადი ფოტოს ატვირთვა</p>
      <label htmlFor="fileUpload" className="fileUpload-btn">
        ატვირთვა
      </label>
      {errors.fileUpload && <img src={error} />}
    </>
  );
}

export default UploadPhoto;
