import { useState } from 'react';
import '../CSS/Login.css';
import Alert from './Alert';
import Loader from './Loader';
import axios from 'axios';

function Login({setShowLogIn, setShowSignUp, setIsLogged}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [display_alert, setDisplay_alert] = useState(false);
    const [loader, setLoader] = useState(false);
    const [form, setForm] = useState(true);

    async function signin() {
        if(email != '' && password != '') {
            const fdata = {
                email,
                password
            }
            axios({
                method: 'post',
                withCredentials: true,
                url: 'http://localhost:4000/order/api/login',
                data: fdata
            }).then(response => {
                if(response.data.success) {
                    setForm(false)
                    setLoader(true)
                    setDisplay_alert(true)
                    setIsLogged(true)
                    setAlert(currState => ({
                        ...currState,
                        type: 'success',
                        message: response.data.message
                    }))
                    setTimeout(() => {
                        
                        setLoader(false);
                        setShowLogIn(false);
                    }, 3000)
                } 
                
            }).catch(err => {
                setDisplay_alert(true)
                setAlert(currState => ({
                    ...currState,
                    type: 'warning',
                    message: err.response?.data?.message
                }))
            })
        } else {
            console.log(email)
            console.log(password)
        } 
    }

    return (
        <>
            <div className="login-container">
                {form && (
                    <form className="login-form">
                        <div className="login-close">
                            <i className="fa fa-times" aria-hidden="true" onClick={() => {
                                setShowLogIn(false)
                            }}></i>
                        </div>
                        <p className="login-form-title">Sign in to your account</p>
                        <div className="login-input-container">
                            <input  className='login-input' type="text" placeholder="Enter Email" onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                        <div className="login-input-container">
                            <input className='login-input' type="password" placeholder="Enter Password" onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        </div>
                            <button type="submit" className="login-submit login-button" onClick={(e) => {
                                e.preventDefault();
                                signin();
                            }}>
                                Sign in
                            </button>

                        <p className="login-signup-link">
                            No account?
                            <span className='login-link' onClick={() => {
                                setShowLogIn(false)
                                setShowSignUp(true)
                            }}> Sign up</span>
                        </p>
                    </form>
                )}
                {loader && (<Loader />)}
                {display_alert && (<Alert alert={alert}/>)}
            </div>      
        </>
    )
}

export default Login;