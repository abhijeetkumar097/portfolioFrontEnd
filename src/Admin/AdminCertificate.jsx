import React, { useEffect, useRef, useState } from 'react';
import './Admin.css'

function AdminCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const nameRef = useRef();
  const providerRef = useRef();
  const durationRef = useRef();
  const urlRef = useRef();
  

  // Fetch certificates on load
  const fetchCertificates = () => {
    fetch(import.meta.env.VITE_CERTIFICATE_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Network status was not ok");
        return response.json();
      })
      .then((data) => setCertificates(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch certificates.");
      });
  };

  useEffect(() => {
    fetchCertificates();
  }, [success]);

  // Add or Edit certificate
  const Add = async (data, isAdd = true) => {
    await fetch(import.meta.env.VITE_CERTIFICATE_URL_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) throw new Error("Server responded with error");
        setSuccess(isAdd ? "Added successfully!" : "Edited successfully!");
        setError('');
        fetchCertificates();
      })
      .catch((e) => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });
  };

  // Delete certificate
  const delte = async (certificate) => {
    await fetch(`${import.meta.env.VITE_CERTIFICATE_URL_POST}/${certificate.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Server responded with error");
        setSuccess("Deleted successfully!");
        setError('');
        fetchCertificates();
      })
      .catch((err) => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });
  };

  return (
    <div>
      <div className="message">
        {success && <div style={{ color: 'lightgreen', display:'flex' }}>{success}<button className='button-cross' onClick={() => setSuccess('')}>x</button></div>}
        {error && <div style={{ color: 'red', display:'flex'}}>{error}<button className='button-cross' onClick={() => setError('')}>x</button></div>}
      </div>
      

      {/* Add New Certificate */}
      <div className="admin-add">
        <form
            onSubmit={(e) => {
            e.preventDefault();
            Add({
                name: nameRef.current.value,
                provider: providerRef.current.value,
                duration: durationRef.current.value,
                url: urlRef.current.value,
            }, true);
            }}
        >
            <h3>Add Certificate</h3>
            <label htmlFor="name">Name</label>
            <input type="text" ref={nameRef} required/>
            <label>Provider</label>
            <input type="text" ref={providerRef} required />
            <label>Duration</label>
            <input type="text" ref={durationRef} required />
            <label>URL</label>
            <input type="text" ref={urlRef} required />
            <button type="submit">Add</button>
        </form>
      </div>

      <hr />
            
      {/* Existing Certificates */}
      <div className="admin-element">
        {certificates.map((certificate) => (
            <form
                key={certificate.id}
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    Add({
                    id: certificate.id,
                    name: certificate.name,
                    provider: form.provider.value,
                    duration: form.duration.value,
                    url: form.url.value,
                    }, false);
                }}
                >
                <input type="text" name='name' defaultValue={certificate.name}/>
                <input type="text" name="provider" defaultValue={certificate.provider} required />
                <input type="text" name="duration" defaultValue={certificate.duration} required />
                <input type="text" name="url" defaultValue={certificate.url} required />
                <button type="submit" className='button-edit'>Edit</button>
                <button
                        type="button"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this certificate?")) {
                                delte(certificate);
                            }
                        }}
                        className='button-delete'
                        >
                        Delete
                    </button>
            </form>
        ))}
      </div>
      
    </div>
  );
}

export default AdminCertificate;
