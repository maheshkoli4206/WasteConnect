const WasteRequest = require('../models/WasteRequest');
const User = require('../models/User');
const { calculateZone } = require('../services/zoneService');
const { generateSuggestedBatches } = require('../services/collectionBatchService');
const { calculateEnvironmentalImpact } = require('../services/impactService');

// @desc    Get all pickup requests for admin (with search & filter)
// @route   GET /api/admin/requests
// @access  Private (Admin)
const getAllRequests = async (req, res) => {
  try {
    const { search, category, status, priority, zone, sortBy } = req.query;

    let query = {};

    if (category) {
      query.wasteCategory = category;
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (zone) {
      query.collectionZone = zone;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { requestId: searchRegex },
        { pickupAddress: searchRegex },
        { wasteCategory: searchRegex },
        { collectionZone: searchRegex },
        { description: searchRegex },
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sortBy === 'priority') {
      sortOptions = { priorityScore: -1, createdAt: -1 };
    } else if (sortBy === 'pickupDate') {
      sortOptions = { pickupDate: 1 };
    }

    let requests = await WasteRequest.find(query)
      .populate('userId', 'name email')
      .sort(sortOptions);

    // Dynamic zone backfill for legacy documents missing collectionZone
    requests = requests.map((reqItem) => {
      const reqObj = reqItem.toObject();
      if (!reqObj.collectionZone) {
        reqObj.collectionZone = calculateZone(reqObj.pickupAddress);
      }
      return reqObj;
    });

    res.json(requests);
  } catch (error) {
    console.error('getAllRequests error:', error);
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

// @desc    Get single request details for admin
// @route   GET /api/admin/requests/:id
// @access  Private (Admin)
const getAdminRequestById = async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id).populate('userId', 'name email role');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    const reqObj = request.toObject();
    if (!reqObj.collectionZone) {
      reqObj.collectionZone = calculateZone(reqObj.pickupAddress);
    }
    res.json(reqObj);
  } catch (error) {
    console.error('getAdminRequestById error:', error);
    res.status(500).json({ message: 'Error fetching request details', error: error.message });
  }
};

// Valid status transition rule engine
const statusOrder = {
  SUBMITTED: 1,
  REVIEWED: 2,
  SCHEDULED: 3,
  ASSIGNED: 4,
  COLLECTED: 5,
  COMPLETED: 6,
  CANCELLED: 99,
};

function isValidStatusTransition(currentStatus, newStatus) {
  if (currentStatus === newStatus) return true;
  // Terminal states cannot be altered
  if (currentStatus === 'COMPLETED' || currentStatus === 'CANCELLED') {
    return false;
  }
  // Any active state can move to CANCELLED
  if (newStatus === 'CANCELLED') {
    return true;
  }
  // Must move forward in lifecycle sequence
  return statusOrder[newStatus] > statusOrder[currentStatus];
}

// @desc    Update request status, priority, or admin notes
// @route   PATCH /api/admin/requests/:id/status
// @access  Private (Admin)
const updateRequestStatus = async (req, res) => {
  try {
    const { status, priority, adminNotes } = req.body;

    const request = await WasteRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (status) {
      const validStatuses = [
        'SUBMITTED',
        'REVIEWED',
        'SCHEDULED',
        'ASSIGNED',
        'COLLECTED',
        'COMPLETED',
        'CANCELLED',
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value provided' });
      }

      // Check transition validity
      if (!isValidStatusTransition(request.status, status)) {
        return res.status(400).json({
          message: `Invalid status transition from ${request.status} to ${status}. Requests cannot move backwards or be altered after completion/cancellation.`,
        });
      }

      request.status = status;
    }

    if (priority) {
      const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Invalid priority value' });
      }
      request.priority = priority;
    }

    if (adminNotes !== undefined) {
      request.adminNotes = adminNotes;
    }

    await request.save();

    res.json({
      message: 'Request updated successfully',
      request,
    });
  } catch (error) {
    console.error('updateRequestStatus error:', error);
    res.status(500).json({ message: 'Error updating request', error: error.message });
  }
};

// @desc    Get aggregated collection statistics for admin dashboard
// @route   GET /api/admin/statistics
// @access  Private (Admin)
const getStatistics = async (req, res) => {
  try {
    const totalRequests = await WasteRequest.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'USER' });

    const submittedCount = await WasteRequest.countDocuments({ status: 'SUBMITTED' });
    const reviewedCount = await WasteRequest.countDocuments({ status: 'REVIEWED' });
    const scheduledCount = await WasteRequest.countDocuments({ status: 'SCHEDULED' });
    const assignedCount = await WasteRequest.countDocuments({ status: 'ASSIGNED' });
    const collectedCount = await WasteRequest.countDocuments({ status: 'COLLECTED' });
    const completedCount = await WasteRequest.countDocuments({ status: 'COMPLETED' });
    const cancelledCount = await WasteRequest.countDocuments({ status: 'CANCELLED' });

    const highPriorityRequests = await WasteRequest.countDocuments({
      priority: 'HIGH',
      status: { $nin: ['COMPLETED', 'CANCELLED'] },
    });

    const recentRequests = await WasteRequest.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      totalRequests,
      totalUsers,
      submittedCount,
      reviewedCount,
      scheduledCount,
      assignedCount,
      collectedCount,
      completedCount,
      cancelledCount,
      pendingRequests: submittedCount + reviewedCount,
      completedRequests: collectedCount + completedCount,
      highPriorityRequests,
      recentRequests,
    });
  } catch (error) {
    console.error('getStatistics error:', error);
    res.status(500).json({ message: 'Error fetching collection statistics', error: error.message });
  }
};

// @desc    Get collection zone statistics overview
// @route   GET /api/admin/zones
// @access  Private (Admin)
const getZones = async (req, res) => {
  try {
    const allRequests = await WasteRequest.find();

    const definedZones = ['Zone A', 'Zone B', 'Zone C', 'Zone D / General'];
    const zoneMap = {};

    definedZones.forEach((z) => {
      zoneMap[z] = {
        zone: z,
        total: 0,
        pending: 0,
        scheduled: 0,
        completed: 0,
        highPriority: 0,
      };
    });

    allRequests.forEach((reqItem) => {
      const z = reqItem.collectionZone || calculateZone(reqItem.pickupAddress);
      if (!zoneMap[z]) {
        zoneMap[z] = {
          zone: z,
          total: 0,
          pending: 0,
          scheduled: 0,
          completed: 0,
          highPriority: 0,
        };
      }

      zoneMap[z].total++;

      if (['SUBMITTED', 'REVIEWED'].includes(reqItem.status)) {
        zoneMap[z].pending++;
      } else if (['SCHEDULED', 'ASSIGNED'].includes(reqItem.status)) {
        zoneMap[z].scheduled++;
      } else if (['COLLECTED', 'COMPLETED'].includes(reqItem.status)) {
        zoneMap[z].completed++;
      }

      if (reqItem.priority === 'HIGH' && !['COMPLETED', 'CANCELLED'].includes(reqItem.status)) {
        zoneMap[z].highPriority++;
      }
    });

    res.json({ zones: Object.values(zoneMap) });
  } catch (error) {
    console.error('getZones error:', error);
    res.status(500).json({ message: 'Error fetching zone statistics', error: error.message });
  }
};

// @desc    Get suggested smart collection batches
// @route   GET /api/admin/batches
// @access  Private (Admin)
const getBatches = async (req, res) => {
  try {
    const requests = await WasteRequest.find().populate('userId', 'name email');
    const batches = generateSuggestedBatches(requests);
    res.json({ batches });
  } catch (error) {
    console.error('getBatches error:', error);
    res.status(500).json({ message: 'Error generating collection batches', error: error.message });
  }
};

// @desc    Get environmental impact metrics
// @route   GET /api/admin/impact
// @access  Private (Admin)
const getImpact = async (req, res) => {
  try {
    const requests = await WasteRequest.find();
    const impact = calculateEnvironmentalImpact(requests);
    res.json(impact);
  } catch (error) {
    console.error('getImpact error:', error);
    res.status(500).json({ message: 'Error calculating environmental impact', error: error.message });
  }
};

module.exports = {
  getAllRequests,
  getAdminRequestById,
  updateRequestStatus,
  getStatistics,
  getZones,
  getBatches,
  getImpact,
};
