import React from "react";
import { useNavigate } from "react-router-dom";

// import assets
import leftArrow from "../../assets/leftArrow.png";

function MultistepHeader({ step }) {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div className="multistep-header">
      <div className="left-arrow-box" onClick={handleReset}>
        <img src={leftArrow} alt="arrowIMG" />
      </div>
      <div className="multistepHeader-wrapper container">
        <div className="multistepHeader-content">
          {" "}
          <h2 className="multistepHeader-title">
            {" "}
            {step === 1 && "პირადი ინფო"}
            {step === 2 && "გამოცდილება"}
            {step === 3 && "განათლება"}
          </h2>
          <p className="multistepHeader-counter">
            {" "}
            {step === 1 && "1/3"}
            {step === 2 && "2/3"}
            {step === 3 && "3/3"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MultistepHeader;
