import axios from 'axios';
import { useState, useEffect } from 'react';
import Alert from './Alert';
import Loader from './Loader';
import '../CSS/Order.css';


function Order({setIsOrder, selected_data, setShowSignUp, setIsLogged, user}) {
    const [quantity, setQuantiy] = useState(1);
    const [fee, setFee] = useState(30);
    const [minus, setMinus] = useState(false);
    const [add, setAdd] = useState(true);
    const [ifLogged, setIfLogged] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [display_alert, setDisplay_alert] = useState(false);
    const [loader, setLoader] = useState(false);
    const [form, setForm] = useState(true);
    const [orderForm, setOrderForm] = useState(true);

    useEffect(() => {
        if(quantity > 1) {
            setMinus(true);
        }
        if(quantity <= 1) {
            setMinus(false);
        }
        if(quantity > selected_data.prodstock) {
            setAdd(false);
        }
        if(quantity <= selected_data.prodstock) {
            setAdd(true);
        }
    }, [quantity]);

    async function verify_auth() {
        let fdata = selected_data;
        fdata.quantity = quantity;
        fdata.fee = fee;
        fdata.total = selected_data.prodprice * quantity + fee
        fdata.user = user.user;

        axios({
            method: 'post',
            withCredentials: true,
            data: fdata,
            url: 'http://localhost:4000/order/api/order'
        }).then(response => {   
            if(response.data.insert) {
                setOrderForm(false);
                setLoader(true);
                setDisplay_alert(true);
                setAlert(currState => ({
                    ...currState,
                    type : 'success',
                    message: 'Order Submitted'
                }));

                setTimeout(() => {
                    setLoader(false);
                    setIsOrder(false)
                }, 3000)
            }
        }).catch(err => {
            if(!err.response.data.result) {
                setIfLogged(true)
            }
        })
    }

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
                    setIsLogged(true)
                    setForm(false);
                    setLoader(true);
                    setDisplay_alert(true);
                    setIfLogged(true);
                    setAlert(currState => ({
                        ...currState,
                        type : 'success',
                        message: response.data.message
                    }));

                    setTimeout(() => {
                        setLoader(false);
                        setIsOrder(false);
                    }, 3000)
                }
            }).catch(err => {
                setDisplay_alert(true);
                setAlert(currState => ({
                    ...currState,
                    type : 'warning',
                    message: err.response.data.message
                }));
            })
        } else {
            setDisplay_alert(true);
            setAlert(currState => ({
                ...currState,
                type : 'warning',
                message: 'Email and Password is Required!'
            }));
        } 
    }
    return(
        <>
            {!ifLogged ? (
                <div className="order-container">
                    {orderForm && (
                        <div>
                            <div className="card-container">
                                <label className="card-title">Your Order</label> 
                                <div className="products">
                                    <div className="icon-container">
                                        <i className="fa fa-cart-plus order-icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="prod-quantity">
                                        {minus && (
                                            <button className='prod-min'><i className="fa fa-minus" aria-hidden="true"  onClick={() => {
                                                setQuantiy(currState => currState - 1);
                                            }}></i></button>
                                        )}
                                        <small className='prod-count'> {quantity} </small>
                                        {add && (
                                            <button className='prod-plus'><i className="fa fa-plus" aria-hidden="true" onClick={() => {
                                                setQuantiy(currState => currState + 1);
                                            }}></i></button>
                                        )}
                                    </div>
                                    <div className="prod-info">
                                        <span className='prod-details'>{selected_data.prodname}</span><br />
                                        <small className='prod-details'>price : {selected_data.prodprice} Php</small><br />
                                        <small className='prod-details'>Code : {selected_data.prodcode}</small><br />
                                        <small className='prod-details'>Stock : {selected_data.prodstock}</small><br />
                                    </div>
                                </div>
                            </div>
                            <div className="sub-container">
                                <div className="card-container">
                                    <label className="card-title">Order Summary</label> 
                                    <div className="products">
                                        <div className="left-info">
                                            <span className='prod-details'>Item Name ...</span><br />
                                            <span className='prod-details'>Code ...</span><br />
                                            <span className='prod-details'>Item Price ...</span><br />
                                            <span className='prod-details'>{`Quantity ${selected_data.prodprice} X ${quantity}...`}</span><br />
                                            <span className='prod-details'>Shipping Fee ...</span><br />
                                            <h4 className='prod-total'>Total</h4>
                                        </div>
                                        <div className="right-info">
                                            <span className='prod-details'>selected_data.prodname</span><br />
                                            <span className='prod-details'>{selected_data.prodcode}</span><br />
                                            <span className='prod-details highlight'>{selected_data.prodprice} Php</span><br />
                                            <span className='prod-details highlight'>{selected_data.prodprice * quantity} Php</span><br />
                                            <span className='prod-details highlight'>{fee}.00 Php</span><br />
                                            <h4 className='prod-total'>{(selected_data.prodprice * quantity) + fee} Php</h4>
                                        </div>
                                    </div>
                                    <div className="orders-container">
                                        <button className='order-cancel' onClick={() => {
                                            setIsOrder(false)
                                        }}>Cancel</button>
                                        <button className='order-btn' onClick={() => {
                                            verify_auth();
                                        }}>Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {loader && (<Loader />)}
                    {display_alert && (<Alert alert={alert}/>)}
                 </div>
            ) : (
                <div className="order-container">
                    {form && (
                        <form className="order-form">
                            <div className="order-close">
                                <i className="fa fa-times" aria-hidden="true" onClick={() => {
                                    setIsOrder(false)
                                }}></i>
                            </div>
                            <small className="alert-message">You are not logged In...!</small>
                            <p className="order-form-title">Sign in to your account</p>
                            <div className="order-input-container">
                                <input  className='order-input' type="email" placeholder="Enter Email" onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                            <div className="order-input-container">
                                <input className='order-input' type="password" placeholder="Enter Password" onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                            </div>
                                <button type="submit" className="order-submit order-button" onClick={(e) => {
                                    e.preventDefault();
                                    signin();
                                }}>
                                    Sign in
                                </button>

                            <p className="order-signup-link">
                                No account?
                                <span className='order-link' onClick={() => {
                                    setIsOrder(false)
                                    setShowSignUp(true)
                                }}> Sign up</span>
                            </p>
                        </form>
                    )}
                    {loader && (<Loader />)}
                    {display_alert && (<Alert alert={alert}/>)}
                </div>
            )}
            
        </>
    )
}

export default Order;

