import Loader from './Loader';
import axios from 'axios';

import '../CSS/Products.css';
import { useState } from 'react';

function Products({loading, datas, setIsOrder, setSelectedData}) {
    const [cart, setCart] = useState(false)
    const [cart_id, setCart_id] = useState('')
    async function verifyAuth(item) {
        
        axios({
            method: 'get',
            url: 'http://localhost:4000/order/api/verify_auth',
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        }) 
    }

    return (
        <>
            <section>
                <div className="product-container">
                   <div className="prod-card">
                    {datas.map((data,data_index) => (
                            <div className="product-card" key={data_index} onClick={() => {
                                setIsOrder(true)
                                setSelectedData(data)
                                // verifyAuth(data);
                            }}>
                                <div className="product-image"
                                    onMouseEnter={() => {
                                        setCart(!data['isShow'])
                                        setCart_id(data.id)
                                    }}
                                    onMouseLeave={() => {
                                        setCart(data['isShow'])
                                    }}> 
                                    {/* <span className="product-text">{data.prodcode}</span> */}
                                    <i className={cart && cart_id == data.id ? "fa fa-cart-plus icon-cart" : "fa fa-shopping-bag"} aria-hidden="true"></i>
                                </div>
                                <span className="product-title">{data.prodname}</span>
                                <div className="product-price">
                                    <span>{data.prodprice} Php </span>
                                    <span>Stck : {data.prodstock}</span>
                                </div>
                            </div>
                        ))}    
                        
                   </div>
                </div>
            </section>
        </>
    )
}

export default Products;