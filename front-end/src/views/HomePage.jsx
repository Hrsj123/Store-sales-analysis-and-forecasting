import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="homepage-container">
      <Row className="justify-content-center mt-4">
        <Col md={8} className="text-center">
          <h1 className="homepage-title">STORE ANALYSIS</h1>
          <hr />
          <p className="homepage-subtitle my-4">Get valuable insights into your store's performance</p>
        </Col>
      </Row>
      {/* <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <p className="homepage-intro">Use the dashboard to:</p>
        </Col>
      </Row> */}
      <Row className="justify-content-center mb-5">
        <Col md={3} className="mb-3 mb-md-0">
          <Card className="analysis-card h-100">
            <Card.Header className="analysis-card-header">Sales Analysis</Card.Header>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="analysis-card-title">Track Sales Trends</Card.Title>
              <Card.Text className="analysis-card-text">
                Analyze your store's sales data and forecast future sales to make informed business decisions.
              </Card.Text>
              {/* <Button variant="primary" className="analysis-card-button mt-auto">View Sales Report</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <Card className="analysis-card h-100">
            <Card.Header className="analysis-card-header">Customer Analysis</Card.Header>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="analysis-card-title">Analyze Customer Data</Card.Title>
              <Card.Text className="analysis-card-text">
                Identify top customers and tailor marketing efforts to boost customer loyalty and sales.
              </Card.Text>
              {/* <Button variant="primary" className="analysis-card-button mt-auto">View Customer Data</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="analysis-card h-100">
            <Card.Header className="analysis-card-header">Inventory Analysis</Card.Header>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="analysis-card-title">Get Sales Assessment</Card.Title>
              <Card.Text className="analysis-card-text">
                Predict future weekly sales profit based upon existing trends
              </Card.Text>
              {/* <Button variant="primary" className="analysis-card-button mt-auto">View Inventory Data</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage