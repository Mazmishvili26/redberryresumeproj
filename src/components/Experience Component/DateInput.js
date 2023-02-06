import React, { useState } from "react";

function DateInput({ register, inputIndex }) {
  const [borderColors, setBorderColors] = useState(
    Array(2).fill("1px solid #BCBCBC")
  );

  return (
    <input
      type="date"
      {...register("startDate")}
      style={{ border: borderColors[inputIndex] }}
    />
  );
}

export default DateInput;
