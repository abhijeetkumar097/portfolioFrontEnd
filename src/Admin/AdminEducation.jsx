import React, { useEffect, useRef, useState } from 'react';
import './Admin.css';

function AdminEducation() {
  const [educations, setEducations] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const instituteNameRef = useRef();
  const degreeRef = useRef();
  const addressRef = useRef();
  const pincodeRef = useRef();
  const cgpaRef = useRef();
  const percentageRef = useRef();
  const descriptionRef = useRef();
  const durationRef = useRef();

  const fetchEducations = () => {
    fetch(import.meta.env.VITE_EDUCATION_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch education data');
        return res.json();
      })
      .then((data) => setEducations(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch education records.");
      });
  };

  useEffect(() => {
    fetchEducations();
  }, [success]);

  const Add = async (data, isAdd = true) => {
    await fetch(import.meta.env.VITE_EDUCATION_URL_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server error');
        setSuccess(isAdd ? 'Added successfully!' : 'Edited successfully!');
        setError('');
        fetchEducations();
      })
      .catch(() => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });
  };

  const delte = async (edu) => {
    await fetch(`${import.meta.env.VITE_EDUCATION_URL_POST}/${edu.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server error');
        setSuccess("Deleted successfully!");
        setError('');
        fetchEducations();
      })
      .catch(() => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });
  };

  return (
    <div>
      <div className="message">
        {success && <div style={{ color: 'lightgreen', display: 'flex' }}>{success}<button className='button-cross' onClick={() => setSuccess('')}>x</button></div>}
        {error && <div style={{ color: 'red', display: 'flex' }}>{error}<button className='button-cross' onClick={() => setError('')}>x</button></div>}
      </div>

      {/* Add New Education */}
      <div className="admin-add">
        <form onSubmit={(e) => {
          e.preventDefault();
          Add({
            instituteName: instituteNameRef.current.value,
            degree: degreeRef.current.value,
            address: addressRef.current.value,
            pincode: pincodeRef.current.value,
            cgpa: cgpaRef.current.value,
            percentage: percentageRef.current.value,
            description: descriptionRef.current.value,
            duration: durationRef.current.value,
          }, true);
        }}>
          <h3>Add Education</h3>
          <label>Institute Name</label>
          <input type="text" ref={instituteNameRef} required />
          <label>Degree</label>
          <input type="text" ref={degreeRef} required />
          <label>Address</label>
          <input type="text" ref={addressRef} required />
          <label>Pincode</label>
          <input type="text" ref={pincodeRef} required />
          <label>CGPA</label>
          <input type="text" ref={cgpaRef} />
          <label>Percentage</label>
          <input type="text" ref={percentageRef} />
          <label>Description</label>
          <input type="text" ref={descriptionRef} />
          <label>Duration</label>
          <input type="text" ref={durationRef} required />
          <button type="submit">Add</button>
        </form>
      </div>

      <hr />

      {/* Existing Education Records */}
      <div className="admin-element">
        {educations.map((edu) => (
          <form
            key={edu.id}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              Add({
                id: edu.id,
                instituteName: form.instituteName.value,
                degree: form.degree.value,
                address: form.address.value,
                pincode: form.pincode.value,
                cgpa: form.cgpa.value,
                percentage: form.percentage.value,
                description: form.description.value,
                duration: form.duration.value,
              }, false);
            }}
          >
            <input type="text" name="instituteName" defaultValue={edu.instituteName} required />
            <input type="text" name="degree" defaultValue={edu.degree} required />
            <input type="text" name="address" defaultValue={edu.address} required />
            <input type="text" name="pincode" defaultValue={edu.pincode} required />
            <input type="text" name="cgpa" defaultValue={edu.cgpa} />
            <input type="text" name="percentage" defaultValue={edu.percentage} />
            <input type="text" name="description" defaultValue={edu.description} />
            <input type="text" name="duration" defaultValue={edu.duration} required />
            <button type="submit" className="button-edit">Edit</button>
            <button type="button" className="button-delete" onClick={() => {
              if (window.confirm("Are you sure you want to delete this education record?")) {
                delte(edu);
              }
            }}>Delete</button>
          </form>
        ))}
      </div>
    </div>
  );
}

export default AdminEducation;
