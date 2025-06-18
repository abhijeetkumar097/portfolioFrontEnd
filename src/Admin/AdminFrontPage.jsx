import React, { useEffect, useRef, useState } from 'react';
import './Admin.css';

function AdminFrontPage() {
  const [frontPages, setFrontPages] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const nameRef = useRef();
  const titleRef = useRef();
  const smallAboutRef = useRef();
  const aboutRef = useRef();
  const imgUrlRef = useRef();
  const cvUrlRef = useRef();
  const connectRef = useRef(); // JSON stringified key-value

  const fetchFrontPages = () => {
    fetch(import.meta.env.VITE_FPAGE_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch front page');
        return res.json();
      })
      .then((data) => setFrontPages(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch front page records.");
      });
  };

  useEffect(() => {
    fetchFrontPages();
  }, [success]);

  const Add = async (data, isAdd = true) => {
    await fetch(import.meta.env.VITE_FPAGE_URL_POST, {
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
        fetchFrontPages();
      })
      .catch(() => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });
  };

  const delte = async (item) => {
    await fetch(`${import.meta.env.VITE_FPAGE_URL_POST}/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server error');
        setSuccess("Deleted successfully!");
        setError('');
        fetchFrontPages();
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

      {/* Add New FrontPage Record */}
      <div className="admin-add">
        <form onSubmit={(e) => {
          e.preventDefault();
          let connectParsed = {};
          try {
            connectParsed = JSON.parse(connectRef.current.value);
          } catch (err) {
            setError("Connect must be valid JSON format.");
            return;
          }

          Add({
            name: nameRef.current.value,
            title: titleRef.current.value,
            smallAbout: smallAboutRef.current.value,
            about: aboutRef.current.value,
            imgUrl: imgUrlRef.current.value,
            cvUrl: cvUrlRef.current.value,
            connect: connectParsed,
          }, true);
        }}>
          <h3>Add Front Page</h3>
          <label>Name</label>
          <input type="text" ref={nameRef} required />
          <label>Title</label>
          <input type="text" ref={titleRef} required />
          <label>Small About</label>
          <input type="text" ref={smallAboutRef} required />
          <label>About</label>
          <input type="text" ref={aboutRef} required />
          <label>Image URL</label>
          <input type="text" ref={imgUrlRef} />
          <label>CV URL</label>
          <input type="text" ref={cvUrlRef} />
          <label>Connect (JSON)</label>
          <textarea ref={connectRef} placeholder='{"linkedin": "url", "github": "url"}' required />
          <button type="submit">Add</button>
        </form>
      </div>

      <hr />

      {/* Existing Front Page Records */}
      <div className="admin-element">
        {frontPages.map((item) => (
          <form
            key={item.id}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              let connectParsed = {};
              try {
                connectParsed = JSON.parse(form.connect.value);
              } catch (err) {
                setError("Invalid JSON in connect field.");
                return;
              }

              Add({
                id: item.id,
                name: form.name.value,
                title: form.title.value,
                smallAbout: form.smallAbout.value,
                about: form.about.value,
                imgUrl: form.imgUrl.value,
                cvUrl: form.cvUrl.value,
                connect: connectParsed,
              }, false);
            }}
          >
            <input type="text" name="name" defaultValue={item.name} required />
            <input type="text" name="title" defaultValue={item.title} required />
            <input type="text" name="smallAbout" defaultValue={item.smallAbout} required />
            <input type="text" name="about" defaultValue={item.about} required />
            <input type="text" name="imgUrl" defaultValue={item.imgUrl} />
            <input type="text" name="cvUrl" defaultValue={item.cvUrl} />
            <textarea name="connect" defaultValue={JSON.stringify(item.connect)} required />
            <button type="submit" className="button-edit">Edit</button>
            <button type="button" className="button-delete" onClick={() => {
              if (window.confirm("Are you sure you want to delete this front page entry?")) {
                delte(item);
              }
            }}>Delete</button>
          </form>
        ))}
      </div>
    </div>
  );
}

export default AdminFrontPage;
