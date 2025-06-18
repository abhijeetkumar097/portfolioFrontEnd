import React, { useEffect, useState } from 'react'
import './Skill.css'
function Skill() {
    const [skills, setSkill] = useState([]);

    useEffect(() => {
        const cacheSkills = sessionStorage.getItem('skills');
        
        if(cacheSkills) {
            setSkill(JSON.parse(cacheSkills));
        }
        else {
            fetch(import.meta.env.VITE_SKILL_URL)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => { setSkill(data); sessionStorage.setItem('skills', JSON.stringify(data));})
                .catch((error) => {
                    console.error(error);
            });
        }
    }, []);



    return (
        <fieldset className='container'>
            <legend>Skills</legend>
            {skills.map((skill, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                    <div className='circle'
                        style={{
                            background: `conic-gradient(${skill.proficiency > 33 ? 'green' : 'red'} ${skill.proficiency * 3.6}deg, #e0e0e0 0deg)`,
                        }}
                    >
                        <div className='inner-circle'>{skill.proficiency}%</div>

                    </div>
                    <div>{skill.name}</div>
                </div>
            ))}
        </fieldset>
    )
}

export default Skill