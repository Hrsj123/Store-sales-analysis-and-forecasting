import React, { useEffect, useState, useRef } from 'react';
import * as const_api_endpoints from '../constants/api_endpoints';
import ProductForm from '../components/ProductForm';
import getCookie from '../script'

const StoreInput = () => {

    const effectRan = useRef(false);
    const effectRan2 = useRef(false);
    const [products, setProducts] = useState(null);     
    const [productList, setProductList] = useState(null);   
    const [storeNumber, setStoreNumber] = useState(0);   

    // Get products -> Fetch
    useEffect(() => {
        if (!effectRan.current) {
            fetch(`${const_api_endpoints.default.baseUrl}${const_api_endpoints.default.products}`)
                .then(res => res.json())
                .then(data => setProducts(data))
                .catch((err) => console.error('Unable to parse the data with error: ', err));
                return () => {
                effectRan.current = true;
            }
        }
    }, []);

    useEffect(() => {   
        if (productList && storeNumber) {
            if (!effectRan2.current) {
                // Format response:
                const postProducts = productList.map(prod => `${prod.product.name}$${prod.quantity}`);
                console.log(postProducts);
                fetch(const_api_endpoints.default.baseUrl + const_api_endpoints.default.sales + `?storeNumber=${storeNumber}`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie('csrftoken')
                    },
                    body: JSON.stringify(postProducts)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(err => console.error(err));
                return () => {
                    effectRan2.current = true;
                }
            }
        }
        
    }, [productList, storeNumber]);

    const onAddProduct = (addedProduct, storeNumber) => {
        setStoreNumber(storeNumber);
        setProductList(addedProduct);       
    }

    return (
        <div className='container mt-3'>
            <h2 className='text-center mb-4'>Add product data</h2>
            {/* <AddProductCard /> */}
            {
                products &&
                <ProductForm 
                    products={products} 
                    onAddProduct={onAddProduct} 
                />
            }
        </div>
    )
}

export default StoreInput