import React, { useEffect, useRef, useState } from 'react';
import './Admin.css';

function AdminSkill() {
  const [skills, setSkills] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [groupView, setGroupView] = useState(true); // Toggle state

  const typeRef = useRef();
  const nameRef = useRef();
  const proficiencyRef = useRef();

  const fetchSkills = () => {
    fetch(import.meta.env.VITE_SKILL_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch skills');
        return res.json();
      })
      .then((data) => setSkills(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch skill records.");
      });
  };

  useEffect(() => {
    fetchSkills();
  }, [success]);

  const Add = async (data, isAdd = true) => {
    await fetch(import.meta.env.VITE_SKILL_URL_POST, {
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
        fetchSkills();
      })
      .catch(() => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });
  };

  const delte = async (skill) => {
    await fetch(`${import.meta.env.VITE_SKILL_URL_POST}/${skill.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server error');
        setSuccess("Deleted successfully!");
        setError('');
        fetchSkills();
      })
      .catch(() => {
        setError("Something went wrong, try again later...");
        setSuccess('');
      });
  };

  // Group skills by type
  const groupedSkills = skills.reduce((acc, skill) => {
    acc[skill.type] = acc[skill.type] || [];
    acc[skill.type].push(skill);
    return acc;
  }, {});

  // Extract unique types for suggestion dropdown
  const uniqueTypes = [...new Set(skills.map(skill => skill.type))];

  return (
    <div>
      {/* Messages */}
      <div className="message">
        {success && <div style={{ color: 'lightgreen', display: 'flex' }}>{success}<button className='button-cross' onClick={() => setSuccess('')}>x</button></div>}
        {error && <div style={{ color: 'red', display: 'flex' }}>{error}<button className='button-cross' onClick={() => setError('')}>x</button></div>}
      </div>

      {/* Toggle View */}
      <div style={{ margin: '1rem 0' }}>
        <label><input type="radio" checked={groupView} onChange={() => setGroupView(true)} /> Group by Type</label>
        <label style={{ marginLeft: '1rem' }}><input type="radio" checked={!groupView} onChange={() => setGroupView(false)} /> Flat View</label>
      </div>

      {/* Add Skill */}
      <div className="admin-add">
        <form onSubmit={(e) => {
          e.preventDefault();
          Add({
            type: typeRef.current.value,
            name: nameRef.current.value,
            proficiency: parseInt(proficiencyRef.current.value),
          }, true);
        }}>
          <h3>Add Skill</h3>
          <label>Type</label>
          <input type="text" ref={typeRef} list="type-suggestions" required />
          <datalist id="type-suggestions">
            {uniqueTypes.map((type, idx) => <option key={idx} value={type} />)}
          </datalist>

          <label>Name</label>
          <input type="text" ref={nameRef} required />

          <label>Proficiency (0 - 100)</label>
          <input type="number" ref={proficiencyRef} min="0" max="100" required />

          <button type="submit">Add</button>
        </form>
      </div>

      <hr />

      {/* Skills Display */}
      <div className="admin-element">
        {groupView ? (
          Object.keys(groupedSkills).map((type) => (
            <div key={type}>
              <h3>{type}</h3>
              {groupedSkills[type].map((skill) => (
                <SkillForm key={skill.id} skill={skill} onEdit={Add} onDelete={delte} />
              ))}
              <hr />
            </div>
          ))
        ) : (
          skills.map((skill) => (
            <SkillForm key={skill.id} skill={skill} onEdit={Add} onDelete={delte} />
          ))
        )}
      </div>
    </div>
  );
}

// Reusable skill form
function SkillForm({ skill, onEdit, onDelete }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        onEdit({
          id: skill.id,
          type: form.type.value,
          name: form.name.value,
          proficiency: parseInt(form.proficiency.value),
        }, false);
      }}
    >
      <input type="text" name="type" defaultValue={skill.type} required />
      <input type="text" name="name" defaultValue={skill.name} required />
      <input type="number" name="proficiency" defaultValue={skill.proficiency} min="0" max="100" required />
      <button type="submit" className="button-edit">Edit</button>
      <button type="button" className="button-delete" onClick={() => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
          onDelete(skill);
        }
      }}>Delete</button>
    </form>
  );
}

export default AdminSkill;
