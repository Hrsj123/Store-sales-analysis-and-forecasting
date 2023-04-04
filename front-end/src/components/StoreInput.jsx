import React, { useEffect, useState, useRef } from 'react'
import * as const_api_endpoints from '../constants/api_endpoints'
import product, * as products from '../constants/product'
import Dropdown from 'react-bootstrap/Dropdown';

const StoreInput = () => {

    const effectRan = useRef(false);
    const [data, setData] = useState(null);
    const [productList, setProductList] = useState({});

    useEffect(() => {
        console.log(products.default)
        if (!effectRan.current) {
            fetch(const_api_endpoints.default.storeData)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                })
                .catch((err) => {
                    console.error('Unable to parse the data with error: ', err);
                });
            return () => {
                effectRan.current = true;
            }
        }
    }, []);

    
    const handleProductDropdown = (product) => {
        setProductList({                
            ...productList,
            ...{ [product['product']]: 1}
        })
    }

    const handleQuantityChange = (quantity) => {
        setProductList({
            ...productList,
            ...{ [product['product']]: quantity }
        })
    }
    
    useEffect(() => {
        console.log(productList);
    }, [productList])

    return (
        <div className="container mt-3">
            <div className="col-2">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>
                    <Dropdown.Menu 
                        style={{
                            height: "205px",
                            overflowY: "scroll"
                        }}
                    >
                        {
                            products.default.map( (product, index) => 
                                <Dropdown.Item 
                                    key={ index }  
                                    href="#/action-3"
                                    onClick={() => handleProductDropdown({ product })}
                                >
                                    { product }
                                </Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="col-1"></div>
            <div className="col-3">
                <input type="number" onChange={() => handleQuantityChange()}/>  
            </div>    
        </div>
    )
}

export default StoreInput