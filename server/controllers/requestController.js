const WasteRequest = require('../models/WasteRequest');
const { calculatePriority } = require('../services/priorityService');
const { calculateZone } = require('../services/zoneService');

// @desc    Create a new pickup request
// @route   POST /api/requests
// @access  Private (User)
const createRequest = async (req, res) => {
  try {
    const { wasteCategory, description, pickupAddress, pickupDate, pickupTime } = req.body;

    // Validation
    if (!wasteCategory || !pickupAddress || !pickupDate || !pickupTime) {
      return res.status(400).json({
        message: 'Please provide waste category, pickup address, pickup date, and pickup time.',
      });
    }

    // Past date validation
    const todayStr = new Date().toISOString().split('T')[0];
    if (pickupDate < todayStr) {
      return res.status(400).json({
        message: 'Pickup date cannot be in the past. Please select today or a future date.',
      });
    }

    // Calculate smart priority
    const priorityAnalysis = calculatePriority(wasteCategory, description, pickupDate);

    // Calculate collection zone deterministically on backend
    const collectionZone = calculateZone(pickupAddress);

    const newRequest = await WasteRequest.create({
      userId: req.user._id,
      wasteCategory,
      description: description || '',
      pickupAddress,
      collectionZone,
      pickupDate,
      pickupTime,
      priority: priorityAnalysis.priority,
      priorityScore: priorityAnalysis.score,
      priorityReason: priorityAnalysis.reason,
      priorityReasons: priorityAnalysis.reasonsList || [],
      status: 'SUBMITTED',
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('createRequest error:', error);
    res.status(500).json({ message: 'Failed to create pickup request', error: error.message });
  }
};

// @desc    Get logged in user's pickup requests
// @route   GET /api/requests/my
// @access  Private (User)
const getMyRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('getMyRequests error:', error);
    res.status(500).json({ message: 'Error fetching user requests', error: error.message });
  }
};

// @desc    Get user request details by ID
// @route   GET /api/requests/:id
// @access  Private (User/Admin)
const getRequestById = async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id).populate('userId', 'name email');

    if (!request) {
      return res.status(404).json({ message: 'Pickup request not found' });
    }

    // Ensure users can only view their own requests (unless Admin)
    if (req.user.role !== 'ADMIN' && request.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this request' });
    }

    res.json(request);
  } catch (error) {
    console.error('getRequestById error:', error);
    res.status(500).json({ message: 'Error fetching request details', error: error.message });
  }
};

// @desc    Cancel a submitted pickup request
// @route   PATCH /api/requests/:id/cancel
// @access  Private (User)
const cancelRequest = async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this request' });
    }

    if (!['SUBMITTED', 'REVIEWED'].includes(request.status)) {
      return res.status(400).json({
        message: `Cannot cancel request after it has reached ${request.status} stage. Cancellation is only permitted when status is SUBMITTED or REVIEWED.`,
      });
    }

    request.status = 'CANCELLED';
    await request.save();

    res.json(request);
  } catch (error) {
    console.error('cancelRequest error:', error);
    res.status(500).json({ message: 'Error cancelling request', error: error.message });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  getRequestById,
  cancelRequest,
};
