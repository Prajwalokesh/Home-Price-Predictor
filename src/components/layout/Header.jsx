import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Home, DollarSign, History, LogIn, UserPlus, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const closeMenu = () => {
    setExpanded(false);
  };

  return (
    <Navbar 
      expand="lg" 
      className={`navbar ${scrolled ? 'shadow-sm bg-white' : 'bg-transparent'}`}
      fixed="top"
      expanded={expanded}
      style={{ transition: 'all 0.3s ease' }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <DollarSign size={24} className="me-2 text-primary" />
          <span className="fw-bold text-primary">HomePricer</span>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
          className="border-0"
        >
          <Menu size={24} />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`mx-2 ${location.pathname === '/' ? 'active fw-semibold' : ''}`}
              onClick={closeMenu}
            >
              <Home size={18} className="me-1 d-none d-sm-inline" /> Home
            </Nav.Link>
            
            {isAuthenticated ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/predict" 
                  className={`mx-2 ${location.pathname === '/predict' ? 'active fw-semibold' : ''}`}
                  onClick={closeMenu}
                >
                  <DollarSign size={18} className="me-1 d-none d-sm-inline" /> Predict
                </Nav.Link>
                
              
                <div className="ms-2 d-flex align-items-center">
                  <span className="me-3 d-none d-lg-inline text-secondary">
                    Hello, {user?.name}
                  </span>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={handleLogout}
                    className="d-flex align-items-center"
                  >
                    <LogOut size={18} className="me-1" /> Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  className={`mx-2 ${location.pathname === '/login' ? 'active fw-semibold' : ''}`}
                  onClick={closeMenu}
                >
                  <LogIn size={18} className="me-1 d-none d-sm-inline" /> Login
                </Nav.Link>
                
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary" 
                  className="ms-2 d-flex align-items-center"
                  onClick={closeMenu}
                >
                  <UserPlus size={18} className="me-1" /> Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;