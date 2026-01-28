import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Estándar', 'Junior Suite', 'Suite', 'Familiar'], required: true },
  description: { type: String, required: true },
  pricePerNightMXN: { type: Number, required: true },
  capacity: { type: Number, default: 2, min: 1, max: 6 },
  amenities: [{ type: String }],
  images: [{ type: String }],
  available: { type: Boolean, default: true },
});

// Virtual for price (alias)
roomSchema.virtual('price').get(function() {
  return this.pricePerNightMXN;
});

roomSchema.set('toJSON', { virtuals: true });

const Room = mongoose.model('Room', roomSchema);
export default Room;
