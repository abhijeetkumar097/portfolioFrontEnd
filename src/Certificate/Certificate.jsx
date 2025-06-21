import React, { useEffect, useState } from 'react'
import './Certificate.css'
function Certificate() {
    const [certificates, setCertificate] = useState([]);

   useEffect(() => {
     const cacheCertificate = sessionStorage.getItem('certificates');
 
     if(cacheCertificate) {
       setCertificate(JSON.parse(cacheCertificate));
     }
     else {
         fetch(import.meta.env.VITE_CERTIFICATE_URL)
         .then((response) => {
           if(!response.ok) {
             throw new Error("Network response was not ok")
           }
           return response.json();
         })
         .then((data) => {
           setCertificate(data);
           sessionStorage.setItem('certificates', JSON.stringify(data));
         })
         .catch((err) => {
           console.error(err);
         })
       }
   }, []);

  return (
    //name, provider, duration, url

    <fieldset className='certificate-container'>
        <legend>Certificate</legend>
        {certificates.map((certificate, index) => (
            <div key={index} className='certificate-item'>
              <div className="cert-inner-container">
                  <div className='certificate-info'>
                      <div className='certificate-name'>{certificate.name}</div>
                      <div className='certificate-duration'>{certificate.duration}</div>
                      <div className='certificate-provider'>{certificate.provider}</div>
                  </div>
        
                  <div className='certificate-view'>
                      <a href={`${certificate.url}`}><button>View</button></a>
                  </div>
              </div>
            </div>
        ))}
    </fieldset>
    

    
  )
}

export default Certificate