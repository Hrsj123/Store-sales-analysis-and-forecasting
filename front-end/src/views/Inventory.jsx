import React, { useState, useEffect,  useRef } from 'react'
import * as const_api_endpoints from '../constants/api_endpoints'

import Restock from '../components/Restock';

const Inventory = () => {
    // const isFirstRender = useRef(true);
    const [storeNo, setStoreNo] = useState('');
    const [inventoryData, setInventoryData] = useState([]);
    const [showRestockModal, setshowRestockModal] = useState(false)
    const [productToRestock, setProductToRestock] = useState('')
    // Temp
    const products = [
        { id: 1, title: "Product 1", description: "This is a great product", quantity: 10, price: 19.99 },
        { id: 2, title: "Product 2", description: "Another amazing product", quantity: 5, price: 24.50 },
        // Add more product objects as needed
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!storeNo) {
            // Show error
        }
        const query_params = `?store-no=${storeNo}`
        await fetch(const_api_endpoints.default.baseUrl + const_api_endpoints.default.inventory + query_params)
            .then(res => res.json())
            .then(data => {                
            setInventoryData([...data])
            })
            .catch(err => console.error(err));
    }

    // useEffect(() => {
    //     if (!isFirstRender.current) {
    //         // Fetch data (only runs on first render)
    //         // fetchData().then(data => setData(data));
    //         isFirstRender.current = false; // Set flag to false for subsequent renders
    //     }
    // }, [productToRestock])
    
    const handleRestock = (product_name) => {
        setProductToRestock(product_name)
        setshowRestockModal(true)
    }
    if (!showRestockModal) {

        return (
            <div className="container mt-3">    
            <form className='row'>
                <h5>
                    <label htmlFor="formFile" className="form-label mx-3 mb-3">Store Inventory</label>
                </h5>
                <div className="mb-3 col-8">
                    <label htmlFor="store-no" className="sr-only">Store No.</label>
                    <input 
                        type="number" className="form-control" id="store-no" placeholder="Store No" 
                        value={storeNo}
                        onChange={(e) => setStoreNo(e.target.value)}
                    />
                </div>
                <div className="col-1"></div>
                <button
                    className='btn btn-primary col-3 h-50 mt-4'
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                >
                    Submit
                </button>
            </form> 
            {
                inventoryData.length !== 0 && 
                <>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Product Title</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Selling Price</th>
                            <th>Restock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map((product, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>₹{product.price.toFixed(2)}</td>
                            <td><button className='btn btn-primary' onClick={() => handleRestock(product.title)}>Restock</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </>
            }
            
            </div>
        )
    } else {
        return (
            <Restock 
                product={productToRestock}
                storeNo={storeNo}
                setshowRestockModal={setshowRestockModal}
                inventoryData={inventoryData}
                setInventoryData={setInventoryData}
            />
        )
    }
}

export default Inventory