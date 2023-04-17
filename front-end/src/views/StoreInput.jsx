import React, { useEffect, useState, useRef } from 'react'
import * as const_api_endpoints from '../constants/api_endpoints'
import product, * as products from '../constants/product'
import AddProductCard from '../components/AddProductCard';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const StoreInput = () => {

    const effectRan = useRef(false);
    const [data, setData] = useState(null);
    const [productList, setProductList] = useState({});

    useEffect(() => {
        if (!effectRan.current) {
            fetch(`api/${const_api_endpoints.default.storeData}`)
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
        console.log('--------------');
        console.log(quantity);
        console.log('--------------');
        setProductList({
            ...productList,
            ...{ [product['product']]: quantity }
        })
    }
    
    useEffect(() => {
        console.log(productList);
    }, [productList])

    return (
        <div className='container'>;
            <h1>Homepage</h1>
            <h1>This page: Relation betn weekly dataset and products(at an instance)!</h1>
            <h1>Responsive design for mobile</h1>
            <Form className="mt-3">
                <Form.Group className="mb-3 row" controlId="formBasicEmail">
                    <Dropdown className='col-3'>
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
                    {/* <div className="col-3">
                        <Form.Control type="number" placeholder="quantity" onChange={() => handleQuantityChange()}/>
                    </div> */}
                </Form.Group>
            </Form>
            {/* <AddProductCard /> */}
        </div>
    )
}

export default StoreInput