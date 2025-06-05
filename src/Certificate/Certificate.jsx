import React, { useEffect, useState } from 'react'
import './Certificate.css'
function Certificate() {
    const [certificates, setCertificate] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_CERTIFICATE_URL)
        .then((response) => {
            if(!response.ok) {
                throw new Error("Network status was not ok");
            }
            return response.json();
        })
        .then((data) => {
            setCertificate(data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);

  return (
    //name, provider, duration, url

    <fieldset className='certificate-container'>
        <legend>Certificate</legend>
        {certificates.map((certificate, index) => (
            <div key={index} className='certificate-item'>
                <div className='certificate-name'>{certificate.name} <span>({certificate.duration})</span></div>
                <div className='certificate-provider'>{certificate.provider}</div>
                <div>
                    <iframe src={`${certificate.url}/preview`}></iframe>
                </div>
            </div>
        ))}
    </fieldset>
    

    
  )
}

export default Certificate