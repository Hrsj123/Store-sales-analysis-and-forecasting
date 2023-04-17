import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const AddProductCard = (props) => {
  return (
    <Card className="bg-dark text-white">
      <Card.Img src="images/cart_background_super_wide.jpg" style={{ opacity: .8 }} alt="Card image" />
      <Card.ImgOverlay className="row">
        <Card.Title className="col-8">{ props.productName }</Card.Title> 
        <input className="col-1 rounded" placholder="Quantity" style={{ margin: "0" }} type="number" name="quantity" id="quantity" value={ props.quantity } />
        {/* <input className="col-1 mx-3 rounded" type="text" value={'+'} style={{ width: "30px", margin: "0", padding: "0", paddingLeft: "7px", paddingBottom: "3px", height: "30px" }} /> */}
        <button className="btn btn-danger col-1 mx-4">-</button>
        {/* <Card.Text>Last updated 3 mins ago</Card.Text> */}
      </Card.ImgOverlay>
    </Card>
  )
}

export default AddProductCard