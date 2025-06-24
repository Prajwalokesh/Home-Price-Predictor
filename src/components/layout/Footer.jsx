import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DollarSign, Mail, Github as GitHub, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <DollarSign size={28} className="text-primary me-2" />
              <h5 className="mb-0 text-white">HomePricer</h5>
            </div>
            <p className="text-light opacity-75">
              Advanced machine learning technology to predict house prices with precision.
              Make informed real estate decisions with our cutting-edge prediction model.
            </p>
            <div className="d-flex mt-3">
              <a href="#" className="text-light me-3 fs-5" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href="#" className="text-light me-3 fs-5" aria-label="GitHub">
                <GitHub size={20} />
              </a>
              <a href="#" className="text-light fs-5" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </Col>
          
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 className="text-uppercase fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none opacity-75 hover-opacity-100">Home</Link>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-light text-decoration-none opacity-75 hover-opacity-100">About</a>
              </li>
              <li className="mb-2">
                <a href="#features" className="text-light text-decoration-none opacity-75 hover-opacity-100">Features</a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-light text-decoration-none opacity-75 hover-opacity-100">Contact</a>
              </li>
            </ul>
          </Col>
          
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 className="text-uppercase fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none opacity-75 hover-opacity-100">Documentation</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none opacity-75 hover-opacity-100">API</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none opacity-75 hover-opacity-100">Guides</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none opacity-75 hover-opacity-100">Blog</a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4 bg-light opacity-25" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-md-0 text-light opacity-75">
            &copy; {currentYear} HomePricer. All rights reserved.
          </p>
          <div>
            <a href="#" className="text-light text-decoration-none opacity-75 me-3">Privacy Policy</a>
            <a href="#" className="text-light text-decoration-none opacity-75 me-3">Terms of Service</a>
            <a href="#" className="text-light text-decoration-none opacity-75">Cookie Policy</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;