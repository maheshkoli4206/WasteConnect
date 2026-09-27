const mongoose = require('mongoose');

const wasteRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    wasteCategory: {
      type: String,
      required: [true, 'Waste category is required'],
    },
    description: {
      type: String,
      default: '',
    },
    pickupAddress: {
      type: String,
      required: [true, 'Pickup address is required'],
    },
    collectionZone: {
      type: String,
      default: 'Zone D / General',
    },
    pickupDate: {
      type: String,
      required: [true, 'Pickup date is required'],
    },
    pickupTime: {
      type: String,
      required: [true, 'Pickup time is required'],
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
    },
    priorityScore: {
      type: Number,
      default: 50,
    },
    priorityReason: {
      type: String,
      default: 'Standard processing priority',
    },
    priorityReasons: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: [
        'SUBMITTED',
        'REVIEWED',
        'SCHEDULED',
        'ASSIGNED',
        'COLLECTED',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'SUBMITTED',
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-validate hook to generate requestId if not provided
wasteRequestSchema.pre('validate', function (next) {
  if (!this.requestId) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    this.requestId = `REQ-${Date.now().toString().slice(-4)}${randomDigits.toString().slice(-2)}`;
  }
  next();
});

module.exports = mongoose.model('WasteRequest', wasteRequestSchema);
