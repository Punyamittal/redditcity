import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  redditId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  accessToken: { type: String },
  totalKarma: { type: Number, default: 0 },
  linkKarma: { type: Number, default: 0 },
  commentKarma: { type: Number, default: 0 },
  accountCreated: { type: Date },
  cityScore: { type: Number, default: 0 },
  buildingLevel: { type: Number, default: 1 },
  district: { type: String },
  buildingPosition: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
