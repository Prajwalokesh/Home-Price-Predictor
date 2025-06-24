import express from 'express';
import Prediction from '../models/Prediction.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all predictions for the current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: predictions.length, predictions });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get a single prediction
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction not found' });
    }
    
    res.status(200).json({ success: true, prediction });
  } catch (error) {
    console.error('Get prediction error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Create a new prediction
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Add user ID to the prediction data
    req.body.user = req.user.userId;
    
    const prediction = await Prediction.create(req.body);
    res.status(201).json({ success: true, prediction });
  } catch (error) {
    console.error('Create prediction error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Delete a prediction
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const prediction = await Prediction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction not found' });
    }
    
    res.status(200).json({ success: true, message: 'Prediction deleted' });
  } catch (error) {
    console.error('Delete prediction error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;