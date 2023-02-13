import "./PersonalInfo.css";

// import assets
import logo from "../../assets/logo2.png";

// import components
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import FirstStepResult from "../Result Component/FirstStepResult";
import InputBox from "./InputBox";
import TextArea from "./TextArea";
import UploadPhoto from "./UploadPhoto";

function PersonalInfo({
  register,
  errors,
  handleSubmit,
  setStep,
  step,
  watch,
  setValue,
  values,
  setValues,
  trigger,
  setSavePhotoValue,
  setError,
}) {
  const nextPage = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      setStep(step + 1);
    })();
  };

  return (
    <section className="personalInfo-section">
      <div className="personalInfo-container">
        <div className="left-side">
          <MultistepHeader step={step} />
          <form onSubmit={nextPage} className="form-wrapper container">
            <div className="userInfo-container">
              <InputBox
                labelTitle="სახელი"
                placeholderValue="ანზორ"
                name="firstName"
                registerValue="firstName"
                inputWarningText="მინიმუმ 2 ასო, ქართული ასოები"
                watch={watch}
                errors={errors}
                register={register}
                inputIndex={0}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
                setError={setError}
              />
              <InputBox
                labelTitle="გვარი"
                placeholderValue="მუმლაძე"
                name="lastName"
                registerValue="lastName"
                inputWarningText="მინიმუმ 2 ასო, ქართული ასოები"
                watch={watch}
                errors={errors}
                register={register}
                inputIndex={1}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
              />
            </div>

            <div className="userPhoto-uploader">
              <UploadPhoto
                register={register}
                setValues={setValues}
                values={values}
                setValue={setValue}
                trigger={trigger}
                errors={errors}
                setSavePhotoValue={setSavePhotoValue}
              />
            </div>

            <div className="about-me-container">
              <TextArea
                watch={watch}
                errors={errors}
                setValues={setValues}
                values={values}
                trigger={trigger}
                setValue={setValue}
                register={register}
                registerValue="aboutMe"
                name="aboutMe"
                placeholderValue="ზოგადი ინფო შენ შესახებ"
                labelTitle="ჩემ შესახებ (არასავალდებულო)"
                inputIndex={0}
              />
            </div>

            <div className="user-email-box">
              <InputBox
                labelTitle="იმეილი"
                placeholderValue="anzorr666@redberry.ge"
                name="email"
                registerValue="email"
                inputWarningText="უნდა მთავრდებოდეს @redberry.ge-ით"
                watch={watch}
                errors={errors}
                register={register}
                inputIndex={2}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
              />
            </div>

            <div className="user-phone-box">
              <InputBox
                labelTitle="მობილურის ნომერი"
                placeholderValue="+995 551 12 34 56"
                name="phoneNumber"
                registerValue="phoneNumber"
                inputWarningText="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
                watch={watch}
                errors={errors}
                register={register}
                inputIndex={3}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
              />
            </div>

            <button type="submit" onClick={nextPage} className="next-btn">
              შემდეგი
            </button>
          </form>
        </div>
        <div className="right-side">
          <FirstStepResult step={step} values={values} />
          <img src={logo} className="logo-img" />
        </div>
      </div>
    </section>
  );
}

export default PersonalInfo;
