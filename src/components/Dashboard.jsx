import '../CSS/Dashboard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Products from './Products';
import Order from './Order';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import Alert from './Alert';
import axios from 'axios';

function Dashboard() {

    const arr = [
        {
            id: 1,
            catergory: 'Food',
            icon: ''
        },
        {
            id: 21,
            catergory: "Men's Cloth",
            icon: ''
        },
        {
            id: 3,
            catergory: 'For Women',
            icon: ''
        },
        {
            id: 4,
            catergory: 'Tools',
            icon: ''
        },
        {
            id: 5,
            catergory: 'Shoes',
            icon: ''
        },
    ];

    const [isOrder, setIsOrder] = useState(false)
    const [categories, setCategories] = useState(arr);
    const [datas, setData] = useState([]); 
    const [selected_data, setSelectedData] = useState({});
    const [loading, setLoading] = useState(false); 
    const [offset, setoffset] = useState(0); 
    const loaderRef = useRef(null);
    const [showLogin, setShowLogIn] = useState(false);
    const [showSignup, setShowSignUp] = useState(false);
    const [showAlert, setShowAlert] = useState(false) 
    const [user, setUser] = useState({}) 
    const [isLogged, setIsLogged] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    
    // FETCH USER
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios({
                    method: 'post',
                    withCredentials: true,
                    url: 'http://localhost:4000/order/api/loggedUser',
                })
                if(response?.data.result) {
                    setIsLogged(true);
                    setUser(currState => ({
                        ...currState,
                        user : response.data.token
                    }));
                }
                
            } catch (error) {
                setIsLogged(false);
            }
        }
        fetchUser();
    }, [isLogged])

    // FETCH STAGGERED DATA
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setoffset((prevSet) => prevSet + 10); 
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current); 
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current); 
            }
        };
    }, [loading]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 

            const fdata = {
                offset,
                limit: 20,
            };

            try {
                const response = await axios({
                    method: 'post',
                    withCredentials: true,
                    url: 'http://localhost:4000/order/api/products',
                    data: fdata,
                });

                if (response.data.length > 0) {
                    setData((prevData) => [
                        ...prevData,
                        ...response.data
                        .filter((item) => !prevData.some((prevItem) => prevItem.id === item.id))
                        .map(itm => ({
                            ...itm,
                            isShow: false
                        }))
                    ]);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

    }, [offset]); // This will re-trigger every time offset changes

    async function logout() {
        try {
            setLoggingOut(true);
            const response = await axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:4000/order/api/logout',
            })
            setIsLogged(false);
            setTimeout(() => {
                setLoggingOut(false);
            }, 3000)
        } catch (error) {
            console.log('Failed to Logout')
        }
    }

    return (
        <>
            <div className="nav">
                {showSignup && (<Signup setShowSignUp={setShowSignUp} setShowLogIn={setShowLogIn}/>)}
                {showLogin && (<Login setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp} setIsLogged={setIsLogged}/>)}
                {isOrder && (
                            <Order 
                                setIsOrder={setIsOrder} 
                                selected_data={selected_data} 
                                setShowSignUp={setShowSignUp} 
                                setIsLogged={setIsLogged}
                                user={user}/>
                        )
                }
                {loggingOut && (<Logout /> )}
                <h2 className="logo">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Add ToBasket
                </h2>
                <div className="account-container">
                    <div className="others">
                        <span className='other-sub'>Advertisement</span>
                        <span className='other-sub'>Pay</span>
                        <span className='other-sub'>Shops</span>
                        {isLogged && (
                            // CONTINUE TO DEVELOP ADD AUTH FOR VIEWING THE ORDERS
                            <Link to={`/myorders/${user.user?.username}`} state={user.user}>
                                <span className='other-sub'>My Orders</span>
                            </Link>
                        )}
                    </div>
                    <div className="group-search">
                        <i className="fa fa-search search-icon" aria-hidden="true"></i>
                        <input
                            id="query"
                            className="input-search"
                            type="search"
                            placeholder="Search..."
                            name="searchbar"
                        />
                    </div>
                    {/* <Link to='/login' style={{ textDecoration: 'none' }}>
                        <h3 className='my-account'>My Account</h3>
                    </Link> */}
                    {isLogged ? (
                            <div className="login-account">
                                <span className='log-out' onClick={logout}>Logout</span>
                                <span className='user-account'>Welcome {user.user?.username}</span>
                            </div>
                        ) 
                            : (
                            <div className="my-account">
                                <p onClick={() => {
                                    setShowLogIn(true)
                                }}>Log In</p>
                                <p onClick={() => {
                                    setShowSignUp(true)
                                }}>Sign Up</p>
                            </div>
                        
                        )}
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                </div>
            </div>
            <div className="category">
                {categories.map((cat, index) => (
                    <div className="card-category" key={index}>
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        <div className="card__content">
                            <p className="card__title">{cat.catergory}</p>
                            <p className="card__description">
                                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="item-container">
                <Products 
                    loading={loading} 
                    datas={datas} 
                    setIsOrder={setIsOrder}
                    setSelectedData={setSelectedData}
                />
            </div>
            {loading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <span>Loading...</span>
                </div>
            )}
            {/* Invisible loader at the bottom of the page */}
            <div ref={loaderRef} style={{ height: '10px' }}></div>
            
        </>
    );
}

export default Dashboard;
