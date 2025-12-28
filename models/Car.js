import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  // Define fields based on your collection structure
  make: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  available: Boolean,
}, { collection: 'cars' }); // <-- Important to match the collection name

const Car = mongoose.model('Car', carSchema);

export default Car;
