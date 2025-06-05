import React, { useEffect, useState } from 'react'
import reactLogo from '../assets/1739182318351.jpg'
import './FrontPage.css'
function FrontPage() {
    const [page, setPage] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_FPAGE_URL)
        .then((response) => {
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            setPage(data);
        })
        .catch((error) => {
            console.error("Error fetching ", error);
        })
    }, []);

  return (
    //id, name, title, smallAbout, about, imgUrl, cvUrl, connect
    <div>
        {page.map((field) => (
            <>
            <div className='page-container'>
                <div className="page-img">
                    <img src={reactLogo} onError={(e) => {e.target.style.display = "none"}}/>
                    {/* <img src={field.imgUrl} onError={(e) => {e.target.style.display = "none"}}/> */}
                </div>
                <div className='page-name'>{field.name}</div>
                <div className="page-title">{field.title}</div>
                <div className="page-smallAbout">{field.smallAbout}</div>
                <div className="page-button">
                    <a href="/project"><button>View My Wrok</button></a>
                    <a href={field.cvUrl}><button>view Cv</button></a>
                    <a href="/contact"><button>Contact Me</button></a>
                </div>
                <div className='page-connect'>
                    {Object.entries(field.connect).map(([key, value], index) => (
                        <a href={value} key={index} target="_blank" rel="noopener noreferrer">
                            {key}
                        </a>
                    ))}
                </div>
            </div>
            <fieldset className='page-feildSet'>
                    <legend>About</legend>
                    <div>{field.about}</div>
                </fieldset>
        </>
        ))}
        
    </div>
  )
}

export default FrontPage