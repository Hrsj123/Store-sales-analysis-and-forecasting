import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductForm = ({ products, onAddProduct }) => {

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [alertProduct, setAlertProduct] = useState('');
    const [storeNumber, setStoreNumber] = useState('');  

    // Show alert on adding asme product again
    const handleShowAlert = (duplicateProduct) => {
        setAlertProduct(duplicateProduct);
        setShowAlert(true);
        setProduct('');
        setQuantity(1);
        setTimeout(() => {
            setShowAlert(false);
            setAlertProduct('');
        }, 3000);
    };

    const handleShowAlert2 = () => {
        setShowAlert2(true);
        setTimeout(() => {
            setShowAlert2(false);
        }, 3000);
    };
  
    // Create product card!
    const addProductView = (e) => {             
        e.preventDefault();
        if (!product) return;
        const addProduct = products.find((new_product) => new_product.name === product);
        const newProduct = { product: addProduct, quantity: quantity }
        setProduct('');                         
        setQuantity(parseInt(1));
        setSelectedProducts([
            ...selectedProducts,
            newProduct
        ]);
    };

    // Select product quantity!
    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    // Select product dropdown!
    const handleProductChange = (e) => {
        const selectedProductName = e.target.value;      
        const duplicate = selectedProducts.find((products) => products.product.name === selectedProductName);
        if (!duplicate) {
            const newSelectedProduct = products.find((product) => product.name === selectedProductName);
            setProduct(newSelectedProduct.name);   
        } else {
            handleShowAlert(selectedProductName);
        }
    };

    // Remove product card! 
    const onRemoveClick = (productName) => {
        const removedArray = selectedProducts.filter(products => products.product.name !== productName);
        setSelectedProducts(removedArray);
    }

    // Submit product list!
    const handleSubmit = (e) => {
        if (!storeNumber) return handleShowAlert2();
        e.preventDefault();
        onAddProduct(selectedProducts, storeNumber);   
        setSelectedProducts([]);
        setStoreNumber('');
        setProduct('');
        setQuantity(1);
    };

    return (
        <div>
            {
                showAlert && (
                    <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                        { alertProduct } Already added to list!
                        </Alert>
                )
            }
            {
                showAlert2 && (
                    <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                        Set a Store number!
                    </Alert>
                )
            }
            <div className="row mb-3">
                <Row className="col-4">
                    <Form.Label>Store Name</Form.Label>
                    <Form>
                        <Form.Group controlId="storeNumber">
                            <Form.Control
                            type="number"
                            placeholder="Enter store number"
                            value={storeNumber}
                            onChange={(event) => setStoreNumber(event.target.value)}
                        />
                        </Form.Group>
                    </Form>
                </Row>
            </div>
            <Form onSubmit={addProductView}>
                <Row className="align-items-end">
                    <Form.Group as={Col} sm={6} controlId="product">
                        <Form.Label>Product</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={product}     
                            onChange={handleProductChange}   
                            >
                                {
                                    product === '' ?
                                    <option >Select a product</option>:
                                    <option >{ product }</option>
                                }
                                {   
                                    products.map((product, index) => (
                                        <option key={index} value={product.name}>
                                            {product.name}
                                        </option>
                                    ))
                                }
                        </Form.Control>
                    </Form.Group>
            
                    <Form.Group as={Col} sm={3} controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={handleQuantityChange}
                    />
                    </Form.Group>
            
                    <Col sm={3} className="text-center">
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={!selectedProducts}
                        >
                            Add to Cart
                        </Button>
                    </Col>
                </Row>
                
            </Form>
            <hr />
            {   // On confirm add! 
                (selectedProducts.length !== 0) &&
                    <div className="">
                        {
                            selectedProducts.map((product, index) => 
                                <span key={index}>
                                    <ProductCard 
                                        selectedProduct={product} 
                                        onRemoveClick={onRemoveClick}
                                    />   
                                </span>
                            )
                        }
                        <Button 
                            variant="success" 
                            type="submit" 
                            onClick={handleSubmit} 
                            className="mt-3"
                        >
                            Add to Cart
                        </Button>
                    </div>
            }
        </div>
    );
}

export default ProductForm
