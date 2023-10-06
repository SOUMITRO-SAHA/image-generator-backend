import mongoose from 'mongoose';

const imageSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Image URL must be provided'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    overlays: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Image', imageSchema);
