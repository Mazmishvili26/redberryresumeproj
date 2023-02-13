import React from "react";

function DegreeList({
  degree,
  // setSelectboxValue,
  setOpenSelectboxDropdown,
  formId,
  //
  setIsSelectboxOpen,
  setSelectboxValue,
  setDegreeId,
}) {
  const { id, title } = degree;

  const handleSelectboxValue = (e) => {
    setSelectboxValue(e.target.innerText);
    setIsSelectboxOpen(false);
    setDegreeId(id);
  };

  return <li onClick={handleSelectboxValue}>{title}</li>;
}

export default DegreeList;
