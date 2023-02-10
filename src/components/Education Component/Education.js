import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultistepHeader from "../../pages/Multistep Page/MultistepHeader";
import "./Education.css";
import EducationForm from "./EducationForm";
import ThirdStepResult from "../Result Component/ThirdStepResult";
import FirstStepResult from "../Result Component/FirstStepResult";
import SecondStepResult from "../Result Component/SecondStepResult";
import axios from "axios";

function Education({
  step,
  setStep,
  setValues,
  values,
  saveFormId,
  experience,
}) {
  const [schema, setSchema] = useState(null);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [educationComponentCount, setEducationComponentCount] = useState(1);
  // selectboxvalue
  const [selectboxValue, setSelectboxValue] = useState(
    localStorage.getItem("selectboxValue") || ""
  );
  const [selectboxError, setSelectboxError] = useState(false);
  const [selectboxSuccess, setSelectboxSuccess] = useState(false);

  const addForm = () => {
    setEducationComponentCount((count) => count + 1);
  };

  // submit
  const nextPage = (e) => {
    e.preventDefault();
    if (!selectboxValue) {
      setSelectboxError(true);
    }
    if (selectboxValue) {
      handleSubmit(() => {
        axios
          .post(
            "https://resume.redberryinternship.ge/api/cvs",
            {
              name: values.firstName,
              surname: values.lastName,
              email: values.email,
              phone_number: values.phoneNumber,
              experiences: [
                {
                  position: "back-end developer",
                  employer: "Redberry",
                  start_date: "2019/09/09",
                  due_date: "2020/09/23",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum.",
                },
              ],
              educations: [
                {
                  institute: "თსუ",
                  degree: "სტუდენტი",
                  due_date: "2017/06/25",
                  description:
                    "სამართლის ფაკულტეტის მიზანი იყო მიგვეღო ფართო თეორიული ცოდნა სამართლის არსის, სისტემის, ძირითადი პრინციპების, სამართლებრივი სისტემების, ქართული სამართლის ისტორიული წყაროების, კერძო, სისხლის და საჯარო სამართლის სფეროების ძირითადი თეორიების, პრინციპებისა და რეგულირების თავისებურებების შესახებ.",
                },
              ],
              image: values.fileUpload,
            },

            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => console.log(err));
      })();
    }
  };

  useEffect(() => {
    if (selectboxValue) {
      setSelectboxError(false);
      setSelectboxSuccess(true);
    }
  }, [selectboxError, selectboxValue]);

  // saveSelectboxvalue in localStorage

  useEffect(() => {
    localStorage.setItem("selectboxValue", selectboxValue);
  }, [selectboxValue]);

  // localStorage.clear();

  return (
    <section className="education-section">
      <div className="education-container">
        <div className="left-side">
          <MultistepHeader step={step} />
          <div className="form-wrapper container">
            {Array.from({ length: educationComponentCount }, (_, i) => (
              <EducationForm
                key={i}
                formId={i}
                watch={watch}
                errors={errors}
                setValue={setValue}
                values={values}
                setValues={setValues}
                trigger={trigger}
                register={register}
                setSchema={setSchema}
                handleSubmit={handleSubmit}
                selectboxValue={selectboxValue}
                setSelectboxValue={setSelectboxValue}
                selectboxError={selectboxError}
                selectboxSuccess={selectboxSuccess}
              />
            ))}
            <button type="button" className="add-more-btn" onClick={addForm}>
              სხვა სასწავლებლის დამატება
            </button>
            <div className="stepper-btn-container">
              <button className="prev-btn">უკან</button>
              <button id="next-btn" className="next-btn" onClick={nextPage}>
                შემდეგი
              </button>
            </div>
          </div>
        </div>
        <div className="right-side">
          <FirstStepResult step={step} values={values} />
          {saveFormId.map((formIdValue) => (
            <SecondStepResult values={values} formId={formIdValue} />
          ))}
          {Array.from({ length: educationComponentCount }, (_, i) => (
            <ThirdStepResult values={values} formId={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
