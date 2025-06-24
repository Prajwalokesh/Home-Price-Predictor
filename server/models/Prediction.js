import mongoose from 'mongoose';

const PredictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['Apartment', 'House', 'Townhouse', 'Condo', 'Villa', 'Other']
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 1
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 1
  },
  squareFeet: {
    type: Number,
    required: true,
    min: 100
  },
  yearBuilt: {
    type: Number,
    required: true
  },
  lotSize: {
    type: Number,
    default: 0
  },
  hasGarage: {
    type: Boolean,
    default: false
  },
  hasPool: {
    type: Boolean,
    default: false
  },
  hasBasement: {
    type: Boolean,
    default: false
  },
  predictedPrice: {
    type: Number,
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 85
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster querying by user
PredictionSchema.index({ user: 1, createdAt: -1 });

const Prediction = mongoose.model('Prediction', PredictionSchema);

export default Prediction;