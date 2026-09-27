const express = require('express');
const router = express.Router();
const {
  getAllRequests,
  getAdminRequestById,
  updateRequestStatus,
  getStatistics,
  getZones,
  getBatches,
  getImpact,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/statistics', getStatistics);
router.get('/zones', getZones);
router.get('/batches', getBatches);
router.get('/impact', getImpact);
router.get('/requests', getAllRequests);
router.get('/requests/:id', getAdminRequestById);
router.patch('/requests/:id/status', updateRequestStatus);

module.exports = router;
