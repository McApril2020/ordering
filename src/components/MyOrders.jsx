import '../CSS/MyOrders.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 

function MyOrders() {
    const location = useLocation();
    const user = location.state;

    const [orders, setOrders] = useState([])

    useEffect(() => {
        
        const fetch_orders = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    withCredentials: true,
                    url: `http://localhost:4000/order/api/getorders/${user.id}`,
                })
                console.log(response);
                if(response.data.length > 0) {
                    setOrders(response.data)
                }
            } catch (error) {
                console.log('failed to fetch orders')
            }
        };

        fetch_orders();
    }, [])

    return (
        <>
            <div className="order-nav">
                <h2 className="order-logo">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Add ToBasket
                </h2>
                <div className='my-orders'>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={'/dashboard'}>
                        <h4>Dashboard</h4>
                    </Link>
                    <h2>My Orders</h2>
                </div>
            </div> 
        </>
    )
}

export default MyOrders;