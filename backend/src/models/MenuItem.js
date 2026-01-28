import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Desayunos', 'Comidas', 'Bebidas'], required: true },
  description: { type: String },
  priceMXN: { type: Number, required: true },
  image: { type: String },
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
