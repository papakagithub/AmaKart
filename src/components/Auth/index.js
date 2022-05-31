import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Loader from '../UI/Loader'

const AuthIndex = ({ path }) => {
    const [details, setDetails] = useState({
        email: '',
        password: ''
    })
    const [loader, setLoader] = useState(false)
    const handleInput = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmission = (e) => {
        e.preventDefault();
        console.log(details);
        if (path === 'signup') {
            signupWithEmailPassword();
        }
    }

    const signupWithEmailPassword = async () => {
        setLoader(true);
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDf8IG_gI8Sn3Lt3ukrEtQnw9c9NgfKOEo', {
                email: details.email,
                password: details.password,
                returnSecureToken: true
            })
            console.log(response);
        } catch (error) {
            console.log(error.response);
        } finally{
            setLoader(false);
        }
    }
    return (
        <>
            <div className="auth-container">
                <div className="auth-container--box">
                    <div className="tab-selector">
                        <NavLink to={"/login"}><h3>Login</h3></NavLink>
                        <NavLink to={"/signup"}><h3>Signup</h3></NavLink>
                    </div>
                    <form autoComplete={"off"} onSubmit={handleSubmission}>
                        <div className="input-wrap">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter Email"
                                value={details.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={details.password}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="button-wrap">
                            <button className="login-btn">
                                {path === 'login' ? 'Login' : 'Signup'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {loader&&<Loader/>}
        </>
    )
}

export default AuthIndex