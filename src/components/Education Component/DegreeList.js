import React from "react";

function DegreeList({ degree, setSelectboxValue, setOpenSelectboxDropdown }) {
  const { title } = degree;

  const handleSelectboxValue = (e) => {
    setSelectboxValue(e.target.innerText);
    setOpenSelectboxDropdown(false);
  };

  return <li onClick={handleSelectboxValue}>{title}</li>;
}

export default DegreeList;
