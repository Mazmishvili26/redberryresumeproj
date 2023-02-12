import React from "react";

function UserExperience({ experience }) {
  const { description, due_date, employer, position, start_date } = experience;

  return (
    <div className="experience-card">
      <p>გამოცდილება</p>
      <div className="skills-box">
        <p>{position},</p>
        <p>{employer}</p>
      </div>
      <div className="user-date-box">
        <p>
          {start_date} - {due_date}
        </p>
      </div>
      <div className="user-description-box">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default UserExperience;
