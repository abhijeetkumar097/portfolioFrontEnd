import React, { useState, useRef } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userName = useRef();
    const { login } = useAuth();

    const handleSubmit = async (username, pass) => {
        setLoading(true);
        await fetch(import.meta.env.VITE_LOGIN_URL, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                userName: username,
                password: pass
            })
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Wrong Username or Password!");
            }
            setLoading(false);
            return response.json();
        })
        .then((data) => {
            login(data.token);
            navigate("/dashboard");
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        })
    }

  return (
    <div className='login_container'>
        
        <div className="message">{error && <div className='login_error'>{error}<button className='login-button-cross' onClick={() => setError('')}>x</button></div>}</div>
        
        <p>Login</p>
        <form className='login_form' onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(userName.current.value, e.target.password.value);
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name='username' ref={userName} placeholder='username' required/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='password' placeholder='password' required/>
            <button className='login_button' type='submit'>{loading ? "loading..." : "Login"}</button>
        </form>
    </div>
  )
}

export default Login