import React, { useEffect, useState } from 'react'
import './Education.css'

function Education() {
  const [educations, setEducation] = useState([]);

  useEffect(() => {
    const cacheEducation = sessionStorage.getItem('education');

    if(cacheEducation) {
      setEducation(JSON.parse(cacheEducation));
    }
    else {
        fetch(import.meta.env.VITE_EDUCATION_URL)
        .then((response) => {
          if(!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json();
        })
        .then((data) => {
          setEducation(data);
          sessionStorage.setItem('education', JSON.stringify(data));
        })
        .catch((err) => {
          console.error(err);
        })
      }
  }, []);

  return (
    //instituteName;address;pincode;cgpa;percentage;description;duration;
    <fieldset className='edu-container'>
      <legend>Education</legend>
      {educations.map((education) => (
        <div key={education.id} className='edu-item'>
          <div className='edu-institue'><b>{education.instituteName} <span>({education.duration})</span></b></div>
          {education.address ? <div className='edu-address'><i>{education.address} {education.pincode ? <span>, {education.pincode}</span>: null}</i></div> : null}
          <div className='edu-degree'>{education.degree}</div>
          {education.cgpa ? <div className='edu-grade'>CGPA: {education.cgpa}</div> : null}
          {education.percentage ? <div className='edu-grade'>Percentage: {education.percentage}</div> : null}
          <div className='edu-description'>{education.description}</div>
        </div>
      ))}
    </fieldset>

  )
}

export default Education
