import React from "react";

import FirstStepResult from "./FirstStepResult";
import SecondStepResult from "./SecondStepResult";
import ThirdStepResult from "./ThirdStepResult";

function Results({ step }) {
  return (
    <>
      {step === 1 && <FirstStepResult />}
      {step === 2 && (
        <>
          <FirstStepResult />
          <SecondStepResult />
        </>
      )}
      {step === 3 && (
        <>
          <FirstStepResult />
          <SecondStepResult />
          <ThirdStepResult />
        </>
      )}
    </>
  );
}

export default Results;
