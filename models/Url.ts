import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 * 30, // = 30 days
  },
});

export default mongoose.models.Url || mongoose.model('Url', urlSchema); 