import React, { useEffect, useRef, useState } from 'react';
import './Admin.css';

function AdminProject() {
  const [projects, setProjects] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const nameRef = useRef();
  const descriptionRef = useRef();
  const imgUrlRef = useRef();
  const githubUrl1Ref = useRef();
  const githubUrl2Ref = useRef();
  const liveUrlRef = useRef();
  const techStackRef = useRef();

  const fetchProjects = () => {
    fetch(import.meta.env.VITE_PROJECT_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch project data');
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch project records.");
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [success]);

  const Add = async (data, isAdd = true) => {
    await fetch(import.meta.env.VITE_PROJECT_URL_POST, {
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
        fetchProjects();
      })
      .catch(() => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });

  };

  const delte = async (proj) => {
    await fetch(`${import.meta.env.VITE_PROJECT_URL_POST}/${proj.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server error');
        setSuccess("Deleted successfully!");
        setError('');
        fetchProjects();
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

      {/* Add New Project */}
      <div className="admin-add">
        <form onSubmit={(e) => {
          e.preventDefault();
          const techStackArray = techStackRef.current.value
            .split(',')
            .map((tech) => tech.trim())
            .filter((tech) => tech !== '');

          Add({
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            imgUrl: imgUrlRef.current.value,
            githubUrl1: githubUrl1Ref.current.value,
            githubUrl2: githubUrl2Ref.current.value,
            liveUrl: liveUrlRef.current.value,
            techStack: techStackArray,
          }, true);

          nameRef.current.value = "";
          descriptionRef.current.value = '';
          imgUrlRef.current.value = '';
          githubUrl1Ref.current.value = '';
          githubUrl2Ref.current.value = '';
          liveUrlRef.current.value = '';
          techStackRef.current.value = '';

        }}>
          <h3>Add Project</h3>
          <label>Name</label>
          <input type="text" ref={nameRef} required />
          <label>Description</label>
          <input type="text" ref={descriptionRef} />
          <label>Image URL</label>
          <input type="text" ref={imgUrlRef} />
          <label>GitHub URL 1</label>
          <input type="text" ref={githubUrl1Ref} />
          <label>GitHub URL 2</label>
          <input type="text" ref={githubUrl2Ref} />
          <label>Live URL</label>
          <input type="text" ref={liveUrlRef} />
          <label>Tech Stack (comma-separated)</label>
          <input type="text" ref={techStackRef} placeholder="React, Spring Boot, MongoDB" />
          <button type="submit">Add</button>
        </form>
      </div>

      <hr />

      {/* Existing Projects */}
      <div className="admin-element">
        {projects.map((proj) => (
          <form
            key={proj.id}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const techStackArray = form.techStack.value
                .split(',')
                .map((tech) => tech.trim())
                .filter((tech) => tech !== '');

              Add({
                id: proj.id,
                name: form.name.value,
                description: form.description.value,
                imgUrl: form.imgUrl.value,
                githubUrl1: form.githubUrl1.value,
                githubUrl2: form.githubUrl2.value,
                liveUrl: form.liveUrl.value,
                techStack: techStackArray,
              }, false);
            }}
          >
            <input type="text" name="name" defaultValue={proj.name} required />
            <input type="text" name="description" defaultValue={proj.description} />
            <input type="text" name="imgUrl" defaultValue={proj.imgUrl} />
            <input type="text" name="githubUrl1" defaultValue={proj.githubUrl1} />
            <input type="text" name="githubUrl2" defaultValue={proj.githubUrl2} />
            <input type="text" name="liveUrl" defaultValue={proj.liveUrl} />
            <input type="text" name="techStack" defaultValue={proj.techStack?.join(', ')} />
            <button type="submit" className="button-edit">Edit</button>
            <button type="button" className="button-delete" onClick={() => {
              if (window.confirm("Are you sure you want to delete this project?")) {
                delte(proj);
              }
            }}>Delete</button>
          </form>
        ))}
      </div>
    </div>
  );
}

export default AdminProject;
