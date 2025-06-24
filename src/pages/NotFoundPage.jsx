import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <AlertTriangle size={80} className="text-warning mb-4" />
          <h1 className="display-4 fw-bold mb-4">Page Not Found</h1>
          <p className="lead mb-5">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Button 
            as={Link} 
            to="/" 
            variant="primary" 
            size="lg"
            className="d-inline-flex align-items-center"
          >
            <Home size={20} className="me-2" />
            Return to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;