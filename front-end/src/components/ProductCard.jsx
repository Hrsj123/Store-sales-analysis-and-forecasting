import React from 'react'
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const ProductCard = ({ selectedProduct, onRemoveClick }) => {

  const removeBtnStyle = {
      position: 'absolute',
      top: '15px',
      right: '10px',
      width: '30px',
      height: '30px',
      padding: '0',
      lineHeight: '1',
      backgroundColor: 'red',
      border: 'none',
  };

  return (
    <div className="my-4">
      {selectedProduct ? (
        <Card>
          {/* <Card.Img variant="top" src={selectedProduct.image} /> */}
          <Button
            variant="danger"
            size="sm"
            style={removeBtnStyle}
            onClick={() => (onRemoveClick(selectedProduct.product.name))}
          >
            X
          </Button>
          <Card.Body>
            <Card.Title>{selectedProduct.product.name}</Card.Title>
            <Card.Text>{selectedProduct.product.description}</Card.Text>
            <Card.Text>Quantity: {selectedProduct.quantity}</Card.Text>
          </Card.Body>
          
          <Card.Footer>
            <small className="text-muted">₹{selectedProduct.product.selling_price} x {selectedProduct.quantity}</small>
          </Card.Footer>
        </Card>
      ) : null}
    </div>
  )
}

export default ProductCard