import React, { useEffect } from "react";
import "./Resume.css";

// import assets
import email from "../../assets/email-icon.png";
import phone from "../../assets/phone-icon.png";
import UserEducation from "./UserEducation";
import UserExperience from "./UserExperience";

function Resume({ resumeInfo }) {
  useEffect(() => {
    console.log("resume", resumeInfo);
  }, [resumeInfo]);

  const { educations, experiences } = resumeInfo;

  return (
    <section className="user-resume-section">
      <div className="user-resume-container">
        <div className="personal-info-wrapper">
          <div className="personal-info-container">
            <div className="personal-info-leftSide">
              <h2 className="user-fullname-title">
                {resumeInfo.name + " " + resumeInfo.surname}
              </h2>
              <div className="user-social-container">
                <div className="userEmail-title-box">
                  <img src={email} alt="emailIcon" />
                  <p className="user-email-title">{resumeInfo.email}</p>
                </div>
                <div className="userPhone-title-box">
                  <img src={phone} alt="phoneIcon" />
                  <p className="user-phone-title">{resumeInfo.phone_number}</p>
                </div>
              </div>
              <div className="user-description-container">
                <h4 className="about-me-title">ჩემ შესახებ</h4>
                <span className="user-description-text">
                  ძალიან მიყვარს დიზაინის კეთება. დილით ადრე რომ ავდგები
                  გამამხნევებელი ვარჯიშების მაგიერ დიზაინს ვაკეთებ.{" "}
                </span>
              </div>
            </div>
            <div className="personal-info-rightSide">
              <img
                src={"https://resume.redberryinternship.ge" + resumeInfo.image}
                alt="resume-img"
                className="user-resume-img"
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="userExperience-container">
          {experiences?.map((experience) => {
            return (
              <UserExperience key={experience.id} experience={experience} />
            );
          })}
        </div>
        {/*  */}
        <div className="userEducation-container">
          {educations?.map((education) => {
            return <UserEducation key={education.id} education={education} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Resume;
