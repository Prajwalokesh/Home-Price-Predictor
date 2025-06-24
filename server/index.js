import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import predictionRoutes from './routes/predictions.js';
import { PythonShell } from 'python-shell';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predictions', predictionRoutes);

// Python model endpoint
app.post('/api/predict', async (req, res) => {
  try {
    const modelData = req.body;
    
    // Define options for Python Shell
    const options = {
      mode: 'json',
      pythonPath: 'python', // or 'python3' depending on your environment
      scriptPath: path.join(__dirname, 'ml_model'),
      args: [JSON.stringify(modelData)]
    };
    
    // Run Python script
    PythonShell.run('predict.py', options).then(results => {
      if (results && results.length > 0) {
        res.json({ success: true, prediction: results[0] });
      } else {
        res.status(500).json({ success: false, message: 'No prediction result received' });
      }
    }).catch(err => {
      console.error('Python error:', err);
      res.status(500).json({ success: false, message: 'Error running prediction model', error: err.message });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/house_price_prediction')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;