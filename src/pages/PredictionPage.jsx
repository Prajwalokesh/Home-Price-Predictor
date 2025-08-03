import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { BarChart, DollarSign, Home, CheckSquare, XCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    location: '',
    size: 3,
    sqft: 1500,
    bath: 2,
    balcony: 1
  });

  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Get Prediction - HomePricer';
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.stopPropagation();
    setValidated(true);
    return;
  }

  try {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formattedData = {
      location: formData.location,
      size: Number(formData.size),
      sqft: Number(formData.sqft),
      bath: Number(formData.bath),
      balcony: Number(formData.balcony),
    };
    

    const response = await axios.post('http://127.0.0.1:5000/predict', formattedData);

    if (response.data && response.data.prediction) {
      setResult(response.data.prediction);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      setError('Prediction failed. Please try again.');
    }
  } catch (err) {
    setError(err.message || 'An error occurred.');
  } finally {
    setIsLoading(false);
  }
};



  return (
    <Container className="py-5 mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">House Price Prediction</h1>
          <p className="lead">Fill in the property details to get estimated price.</p>
        </Col>
      </Row>

      {showSuccess && (
        <Alert variant="success" className="d-flex align-items-center">
          <CheckSquare size={24} className="me-2" />
          <div>Prediction retrieved successfully!</div>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="d-flex align-items-center">
          <XCircle size={24} className="me-2" />
          <div>{error}</div>
        </Alert>
      )}

      <Row>
        <Col lg={6}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <Home size={24} className="text-primary me-2" />
                <h3 className="mb-0 fw-bold">Property Details</h3>
              </div>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="size">
                      <Form.Label>BHK</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={formData.size}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="sqft">
                      <Form.Label>Sq. Ft.</Form.Label>
                      <Form.Control
                        type="number"
                        min="100"
                        value={formData.sqft}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="bath">
                      <Form.Label>Bathrooms</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={formData.bath}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="balcony">
                      <Form.Label>Balconies</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={formData.balcony}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid mt-3">
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          className="me-2"
                        />
                        Predicting...
                      </>
                    ) : (
                      <>
                        <BarChart size={20} className="me-2" />
                        Get Price Prediction
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          {result ? (
            <Card className="border-0 shadow-sm h-100 bg-light">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                {/* <DollarSign size={32} className="text-success mb-3" /> */}
                <h4 className="fw-bold">Estimated Price</h4>
                <h2 className="display-4 text-success">
                  ₹{parseFloat(result).toLocaleString('en-IN')} Lakhs
                </h2>
              </Card.Body>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm h-100 bg-light">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <BarChart size={64} className="text-muted mb-4 opacity-25" />
                <h4 className="fw-bold">Your Prediction Will Appear Here</h4>
                <p className="text-secondary">
                  Submit property details to receive an estimated house price.
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PredictionPage;
