import { Link } from "react-router-dom";
import "./Resume.css";

// import assets
import email from "../../assets/email-icon.png";
import phone from "../../assets/phone-icon.png";
import leftArrow from "../../assets/leftArrow.png";
import logo from "../../assets/logo2.png";

// import components
import UserEducation from "./UserEducation";
import UserExperience from "./UserExperience";
import SuccessMessage from "./SuccessMessage";

function Resume({ resumeInfo }) {
  const { educations, experiences } = resumeInfo;

  return (
    <section className="user-resume-section">
      <Link to="/">
        <div className="left-arrow-box">
          <img src={leftArrow} alt="arrowIMG" />
        </div>
      </Link>
      <SuccessMessage />
      {/*  */}
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
              {resumeInfo.about_me && (
                <div className="user-description-container">
                  <h4 className="about-me-title">ჩემ შესახებ</h4>
                  <span className="user-description-text">
                    {resumeInfo.about_me}
                  </span>
                </div>
              )}
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
        {/*  */}
        <img src={logo} className="logoIMG" />
      </div>
    </section>
  );
}

export default Resume;
