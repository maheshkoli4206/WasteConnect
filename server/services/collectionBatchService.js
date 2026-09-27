/**
 * Smart Collection Batching Service
 * Groups active requests by Zone and Pickup Date to suggest optimized collection batches.
 */
function generateSuggestedBatches(requests = []) {
  // Filter for active/non-terminal requests
  const activeRequests = requests.filter(
    (req) => !['COMPLETED', 'CANCELLED'].includes(req.status)
  );

  // Group by (collectionZone + pickupDate)
  const groups = {};

  activeRequests.forEach((req) => {
    const zone = req.collectionZone || 'Zone D / General';
    const date = req.pickupDate || 'Unscheduled';
    const key = `${zone}___${date}`;

    if (!groups[key]) {
      groups[key] = {
        zone,
        date,
        items: [],
      };
    }
    groups[key].items.push(req);
  });

  const batches = [];
  let batchIndex = 1;

  Object.values(groups).forEach((group) => {
    // Generate batch if there are active requests in this zone/date slot
    const highPriorityCount = group.items.filter((r) => r.priority === 'HIGH').length;

    const categoryBreakdown = group.items.reduce((acc, r) => {
      acc[r.wasteCategory] = (acc[r.wasteCategory] || 0) + 1;
      return acc;
    }, {});

    const statusSummary = group.items.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {});

    batches.push({
      batchId: `BATCH-${group.zone.replace(/\s+/g, '')}-${group.date}`,
      batchNumber: batchIndex++,
      collectionZone: group.zone,
      pickupDate: group.date,
      requestCount: group.items.length,
      highPriorityCount,
      urgency: highPriorityCount > 0 ? 'HIGH ATTENTION' : 'NORMAL',
      categoryBreakdown,
      statusSummary,
      requests: group.items,
    });
  });

  // Sort batches by High Priority count desc, then date asc
  return batches.sort((a, b) => b.highPriorityCount - a.highPriorityCount || a.pickupDate.localeCompare(b.pickupDate));
}

module.exports = { generateSuggestedBatches };
