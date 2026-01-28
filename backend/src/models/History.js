import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  heroImage: { type: String },
});

export const History = mongoose.model('History', historySchema);
