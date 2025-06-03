import React, { useEffect, useState } from 'react'

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
            console.log(data);
        })
        .catch((error) => {
            console.error("Error fetching ", error);
        })
    }, []);

  return (
    <div>FrontPage</div>
  )
}

export default FrontPage