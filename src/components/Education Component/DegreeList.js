import React from "react";

function DegreeList({
  degree,
  // setSelectboxValue,
  setOpenSelectboxDropdown,
  formId,
  //
  setIsSelectboxOpen,
  setSelectboxValue,
}) {
  const { title } = degree;

  // const handleSelectboxValue = (e) => {
  //   setSelectboxValue((prevState) => ({
  //     ...prevState,
  //     [`selectboxValue-${formId}`]: e.target.innerText,
  //   }));
  //   setOpenSelectboxDropdown(false);
  // };

  const handleSelectboxValue = (e) => {
    setSelectboxValue(e.target.innerText);
    setIsSelectboxOpen(false);
  };

  return <li onClick={handleSelectboxValue}>{title}</li>;
}

export default DegreeList;
