import React, { useRef } from "react";

// import assets
import close from "../../assets/close.png";

function SuccessMessage() {
  const handleClose = () => {
    elementRef.current.style.display = "none";
  };

  const elementRef = useRef(null);

  return (
    <div className="resume-msg-container" ref={elementRef}>
      <img
        src={close}
        alt="closeIMG"
        className="closeResume-img"
        onClick={handleClose}
      />
      <h2 className="resume-success-text">რეზიუმე წარმატებით დაემატა</h2>
    </div>
  );
}

export default SuccessMessage;
