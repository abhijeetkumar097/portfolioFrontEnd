import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext';

function AdminUpdate() {
    const [detail, setDetail] = useState(
        {
            id: "",
            userName: "",
            password: ""
        }
    );
    const { isAuthenticated } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const fetchDetails = () => {
        fetch(import.meta.env.VITE_USER_URL, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then((response) => {
            if(!response.ok) throw new Error("Network status was not ok");
            return response.json();
        })
        .then((data) => {
            setDetail(data)
        })
        .catch((err) => {
            setError(err.message);
            setSuccess("");
        })
    };

    useEffect(() => {
        fetchDetails();
    }, [isAuthenticated]);

    const updateDetails = async (detail) => {
        setLoading(true);
        await fetch(`${import.meta.env.VITE_USER_URL}/${detail.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(detail)
        })
        .then((response) => {
            if(!response.ok) throw new Error("Network status was not ok");
            setSuccess("Updated Successfully");
            setLoading(false);
            setError("");
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
            setSuccess("");
        })
    };

    const checkPassword = (pass1, pass2) => {
        if(pass1 === pass2) return true;
        setError("Passwords should be same");
        setSuccess("");
        return false;
    }

  return (
    <div>
        <div className="message">
            {success && <div style={{ color: 'lightgreen', display: 'flex' }}>{success}<button className='button-cross' onClick={() => setSuccess('')}>x</button></div>}
            {error && <div style={{ color: 'red', display: 'flex' }}>{error}<button className='button-cross' onClick={() => setError('')}>x</button></div>}
        </div>

        <div className='admin-add'>
            <form onSubmit={ (e) => {
            e.preventDefault();
            const form = e.target;
            const pass1 = form.pass1.value;
            const pass2 = form.pass2.value;
            if(checkPassword(pass1, pass2)){
                const updatedDetails = {...detail, password : pass1};
                form.pass1.value = null;
                form.pass2.value = null;
                updateDetails(updatedDetails);
            }
        }}>
            <input type="text" value={detail.userName} readOnly />
            <input type={showPassword ? "text" : "password"} name="pass1" id="pass1" placeholder='New Password' required/>
            <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
            >{showPassword ? "🙈" : "👁️"}</span>
            <input type={showPassword ? "text" : "password"} name="pass2" id="pass2" placeholder='Confirm Passowrd' required/>
            <button type='submit'>{loading ? "Updating..." : "Update"}</button>
        </form>
        </div>
        
    </div>
  )
}

export default AdminUpdate