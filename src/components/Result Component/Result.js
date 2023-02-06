import React from "react";
import "./Result.css";

// import assets
import email from "../../assets/email-icon.png";
import phone from "../../assets/phone-icon.png";

function Result({ step, resumeInfo }) {
  return (
    <section className="result-section">
      <div className={step === 2 ? "userInfo-wrapper" : null}>
        <div className="userInfo-container">
          <div>
            {/*  */}
            <div className="userName-title-box">
              <h4 className="userName-title">
                {resumeInfo[0]?.firstName + " " + resumeInfo[1]?.lastName}
              </h4>
            </div>
            {/*  */}
            <div className="contactInfo-container">
              {resumeInfo[3]?.email && (
                <div className="email-box">
                  <img src={email} alt="email-icon" />
                  <p className="email-title">{resumeInfo[3]?.email}</p>
                </div>
              )}
              {resumeInfo[4]?.phoneNumber && (
                <div className="phoneNumber-box">
                  <img src={phone} />
                  <p className="phone-title">{resumeInfo[4]?.phoneNumber}</p>
                </div>
              )}
            </div>
            {/*  */}
            {resumeInfo[5]?.aboutMe && (
              <div className="aboutMe-container">
                <h2 className="about-title">ჩემ შესახებ</h2>
                <p className="aboutMe-text">{resumeInfo[5]?.aboutMe}</p>
              </div>
            )}
          </div>

          {resumeInfo[2]?.fileUpload && (
            <div className="image-wrapper">
              <img src={resumeInfo[2]?.fileUpload} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Result;
