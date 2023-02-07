import React from "react";
import "./Result.css";

// import assets
import email from "../../assets/email-icon.png";
import phone from "../../assets/phone-icon.png";

function FirstStepResult({ step, values, formId }) {
  console.log("val", values);

  return (
    <section className="result-section">
      <div className={step === 2 ? "userInfo-wrapper" : null}>
        <div className="userInfo-container">
          <div>
            {/*  */}
            <div className="userName-title-box">
              {values?.firstName && (
                <h4 className="userName-title">{values?.firstName}</h4>
              )}
              {values?.lastName && (
                <h4 className="userName-title">{values?.lastName}</h4>
              )}
            </div>
            {/*  */}
            <div className="contactInfo-container">
              {values?.email && (
                <div className="email-box">
                  <img src={email} alt="email-icon" />
                  <p className="email-title">{values?.email}</p>
                </div>
              )}
              {values?.phoneNumber && (
                <div className="phoneNumber-box">
                  <img src={phone} />
                  <p className="phone-title">{values?.phoneNumber}</p>
                </div>
              )}
            </div>
            {/*  */}
            {values?.aboutMe && (
              <div className="aboutMe-container">
                <h2 className="about-title">ჩემ შესახებ</h2>
                <p className="aboutMe-text">{values?.aboutMe}</p>
              </div>
            )}
          </div>

          {values?.fileUpload && (
            <div className="image-wrapper">
              <img src={values?.fileUpload} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FirstStepResult;
