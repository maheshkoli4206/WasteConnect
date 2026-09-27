const mongoose = require('mongoose');

const wasteCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    disposalGuidance: {
      type: String,
      required: [true, 'Disposal guidance is required'],
    },
    disposalMethod: {
      type: String,
      default: 'Separate and dispose in designated collection stream.',
    },
    dos: {
      type: [String],
      default: [],
    },
    donts: {
      type: [String],
      default: [],
    },
    environmentalNote: {
      type: String,
      default: '',
    },
    safetyNote: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'bi-trash',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WasteCategory', wasteCategorySchema);
