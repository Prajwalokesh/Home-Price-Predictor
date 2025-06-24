import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DollarSign, BarChart4, Clock, Shield, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  useEffect(() => {
    document.title = 'HomePricer - Accurate House Price Predictions';
  }, []);

  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Hero Section */}
      
       <section className="bg-primary text-white py-5 mt-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Predict Your Home's Value with Precision</h1>
              <p className="lead mb-4">
                Our advanced AI algorithm analyzes thousands of real estate data points to provide you with the most accurate house price predictions on the market.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  as={Link}
                  to={isAuthenticated ? "/predict" : "/register"}
                  variant="light" 
                  size="lg" 
                  className="fw-semibold"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  as="a" 
                  href="#how-it-works"
                >
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="bg-white p-4 rounded-4 shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Modern house" 
                  className="img-fluid rounded-3"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" id="features">
         <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Why Choose HomePricer?</h2>
            <p className="lead text-secondary">
              Our platform combines cutting-edge technology with real estate expertise
            </p>
          </div>
          
          <Row className="g-4">
            {[
              {
                icon: <BarChart4 size={40} className="text-primary mb-3" />,
                title: "Advanced Analytics",
                description: "Our machine learning model analyzes thousands of data points to provide the most accurate predictions possible."
              },
              {
                icon: <Clock size={40} className="text-primary mb-3" />,
                title: "Real-Time Updates",
                description: "Get instant price predictions based on the latest market trends and property data."
              },
              {
                icon: <Shield size={40} className="text-primary mb-3" />,
                title: "Secure & Private",
                description: "Your data is protected with enterprise-grade security. We never share your information with third parties."
              },
              {
                icon: <Trophy size={40} className="text-primary mb-3" />,
                title: "Industry Leading Accuracy",
                description: "Our predictions are consistently within 5% of actual sale prices, outperforming industry standards."
              }
            ].map((feature, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-sm feature-card">
                  <Card.Body className="text-center p-4">
                    {feature.icon}
                    <Card.Title as="h5" className="fw-bold mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-secondary">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="bg-light py-5" id="how-it-works">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">How It Works</h2>
            <p className="lead text-secondary">
              Get your house price prediction in three simple steps
            </p>
          </div>
          
          <Row className="g-4">
            {[
              {
                step: "01",
                title: "Enter Property Details",
                description: "Provide information about your property including location, size, bedrooms, and other relevant details.",
                image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our machine learning algorithm analyzes your property details against our extensive database of real estate information.",
                image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              },
              {
                step: "03",
                title: "Get Your Prediction",
                description: "Receive a detailed report with your property's predicted value and comparable properties in your area.",
                image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
            ].map((step, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 border-0 shadow-sm overflow-hidden">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={step.image} 
                      alt={step.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div 
                      className="position-absolute top-0 start-0 bg-primary text-white fw-bold py-2 px-3"
                      style={{ borderBottomRightRadius: '0.5rem' }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <Card.Title as="h4" className="fw-bold mb-3">{step.title}</Card.Title>
                    <Card.Text className="text-secondary">{step.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="text-center mt-5">
            <Button 
              as={Link}
              to={isAuthenticated ? "/predict" : "/register"}
              variant="primary" 
              size="lg" 
              className="fw-semibold"
            >
              Start Your Prediction Now
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
         <Container className="py-5 text-center">
          <h2 className="display-5 fw-bold mb-4">Ready to Discover Your Home's Value?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Join thousands of satisfied users who have used HomePricer to make informed real estate decisions. 
            Get started today with your first prediction.
          </p>
          <Button 
            as={Link}
            to={isAuthenticated ? "/predict" : "/register"}
            variant="light" 
            size="lg" 
            className="fw-semibold px-4 py-2"
          >
            <DollarSign size={20} className="me-2" />
            Get Your Price Prediction
          </Button>
        </Container>
      </section> 
    </>
  );
};

export default HomePage;