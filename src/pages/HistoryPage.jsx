import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { History, DollarSign, Calendar, Home, Trash2, XCircle, Search } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const HistoryPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Prediction History - HomePricer';
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/predictions', { 
        withCredentials: true 
      });
      
      if (response.data.success) {
        setPredictions(response.data.predictions);
        if (response.data.predictions.length > 0) {
          setSelectedPrediction(response.data.predictions[0]);
        }
      } else {
        setError('Failed to load predictions');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while fetching your predictions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this prediction?')) {
      return;
    }
    
    try {
      const response = await axios.delete(`http://localhost:5000/api/predictions/${id}`, { 
        withCredentials: true 
      });
      
      if (response.data.success) {
        setPredictions(predictions.filter(p => p._id !== id));
        
        if (selectedPrediction?._id === id) {
          const remaining = predictions.filter(p => p._id !== id);
          setSelectedPrediction(remaining.length > 0 ? remaining[0] : null);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete prediction');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (isLoading) {
    return (
      <Container className="py-5 mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your prediction history...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      {/* ... rest of the JSX remains the same ... */}
    </Container>
  );
};

export default HistoryPage;