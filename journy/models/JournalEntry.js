import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'PROCESSING',
  },
  // Using 'Mixed' allows for a flexible, schema-less object for the analysis results
  analysis: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  // This automatically adds createdAt and updatedAt fields
  timestamps: true,
});

// This prevents Mongoose from redefining the model during hot-reloads in development
export default mongoose.models.JournalEntry || mongoose.model('JournalEntry', JournalEntrySchema);
