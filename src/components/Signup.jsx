import axios from 'axios';
import { useState } from 'react';
import Alert from './Alert';
import Loader from './Loader';
import '../CSS/Signup.css';
import { debounce } from 'lodash';
import { useCallback } from 'react';

function Signup({setShowSignUp, setShowLogIn}) {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [display_alert, setDisplay_alert] = useState(false);
    const [loader, setLoader] = useState(false);
    const [form, setForm] = useState(true);

    const signin = useCallback(
        debounce(async function() {
            const fdata = {
                email,
                firstname: first_name,
                lastname: last_name,
                username,
                password
            }
    
            axios({
                method: 'post',
                withCredentials: true,
                url: 'http://localhost:4000/order/api/signup',
                data: fdata
            }).then(response => {
                if(response.data.isExist) {
                    setDisplay_alert(true)
                    setAlert(currState => ({
                        ...currState,
                        type: 'warning',
                        message: response.data.message
                    }))
                } else {
                    console.log(response.data)
                    setForm(false);
                    setLoader(true);
                    setDisplay_alert(true);
                    setAlert(currState => ({
                        ...currState,
                        type: 'success',
                        message: response.data.message
                    }))
                    setTimeout(() => {
                        setLoader(false);
                        setShowSignUp(false);
                    }, 3000)
                }
            }).catch(err => {
                setDisplay_alert(true)
                setAlert(currState => ({
                    ...currState, 
                    type: 'warning',
                    message: err.response.data.message
                }));
            })
        }, 300),
        [email, first_name, last_name, username, password]
    );
    

    const handleSubmit = (e) => {
        e.preventDefault();
        signin();
    }

    return (
        <>
            <div className="signup-container">
                {form && (
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-close">
                            <i className="fa fa-times" aria-hidden="true" onClick={() => {
                                setShowSignUp(false)
                            }}></i>
                        </div>
                        <p className="signup-form-title">Create your Account</p>
                        <div className="signup-input-container">
                            <input  className='signup-input' type="email" placeholder="Email" onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                        <div className="signup-input-container">
                            <input  className='signup-input' type="text" placeholder="First Name" onChange={(e) => {
                                setFirstName(e.target.value)
                            }}/>
                        </div>
                        <div className="signup-input-container">
                            <input  className='signup-input' type="text" placeholder="Last Name" onChange={(e) => {
                                setLastName(e.target.value)
                            }}/>
                        </div>
                        <div className="signup-input-container">
                            <input  className='signup-input' type="text" placeholder="Username" onChange={(e) => {
                                setUsername(e.target.value)
                            }}/>
                        </div>
                        <div className="signup-input-container">
                            <input className='signup-input' type="password" placeholder="Password" onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        </div>
                        <button type="submit" className="signup-submit signup-button">
                            Sign Up
                        </button>
                        <p className='signup-account' onClick={() => {
                            setShowSignUp(false)
                            setShowLogIn(true)
                        }}>I already have an account!</p>
                    </form>
                )}
                {loader && (<Loader />)}
                {display_alert && (<Alert alert={alert}/>)}
            </div>
        </>
    )
}

export default Signup;