const express = require('express');
const router = express.Router();
const {
  createRequest,
  getMyRequests,
  getRequestById,
  cancelRequest,
} = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createRequest);
router.get('/my', getMyRequests);
router.get('/:id', getRequestById);
router.patch('/:id/cancel', cancelRequest);

module.exports = router;
