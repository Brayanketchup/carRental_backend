import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';
import cors from "cors";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB!');
});

app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

app.get('/cars/search', async (req, res) => {
  const { brand, model } = req.query;

  if (!brand || !model) {
    return res.status(400).json({ error: 'Brand and model are required' });
  }

  try {
    const cars = await Car.find({ brand: brand, model: model });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars by brand and model' });
  }
});

app.get('/cars/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car by ID' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
