import React, { useState, useEffect } from 'react'
import './Project.css'
function Project() {
    const [projects, setProject] = useState([]);

    useEffect(() => {
            fetch(import.meta.env.VITE_PROJECT_URL)
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Network status was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProject(data);
            })
            .catch((error) => {
                console.error(error);
            })
        }, []);

  return (
    //id, name, description, imgUrl, githubUrl1, githubUrl2, liveUrl, techStack
    <fieldset className='project-container'>
        <legend>Project</legend>
        {projects.map((project, index) => (
            <div key={index} className="project-item">
                <div className="project-img">
                    {/* <img src={project.imgUrl} onError={(e) => {e.target.style.display = 'none';}}/> */}
                    <img src="src\assets\react.svg" onError={(e) => {e.target.style.display = 'none';}}/>
                </div>
                <div className='project-name'>{project.name}</div>
                <div className='project-desc'>{project.description}</div>
                <div className='project-tech'>
                    {project.techStack.map((tech, index) => (
                        <span>{tech}</span>
                    ))}
                </div>
                <div className="project-url">
                    {project.githubUrl1 ? <span><a href={project.githubUrl1}>github{"\u2794"}</a></span> : null}
                    {project.githubUrl2 ? <span><a href={project.githubUrl2}>github{"\u2794"}</a></span> : null}
                    {project.liveUrl ? <span><a href={project.liveUrl}>Live{"\u2794"}</a></span> : null}
                </div>
            </div>
        ))}
    </fieldset>
  )
}

export default Project