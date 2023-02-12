import React from "react";

function UserEducation({ education }) {
  console.log("edu", education);

  const { degree, description, due_date, institute } = education;

  return (
    <div className="education-card">
      <p>განათლება</p>
      <div className="skills-box">
        <p>{institute},</p>
        <p>{degree}</p>
      </div>
      <div className="user-date-box">
        <p>{due_date}</p>
      </div>
      <div className="user-description-box">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default UserEducation;
