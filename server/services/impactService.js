/**
 * Environmental Impact Calculator
 * Uses completed requests and predefined average weight estimates to compute diverted waste metrics.
 */

const WEIGHT_ESTIMATES_KG = {
  Plastic: 2.0,
  Paper: 1.5,
  Glass: 3.0,
  Metal: 2.5,
  Organic: 2.0,
  'E-Waste': 1.5,
  Other: 1.0,
};

function calculateEnvironmentalImpact(allRequests = []) {
  const totalRequests = allRequests.length;
  const nonCancelledRequests = allRequests.filter((r) => r.status !== 'CANCELLED');
  const completedRequests = allRequests.filter((r) =>
    ['COLLECTED', 'COMPLETED'].includes(r.status)
  );

  const completedCount = completedRequests.length;
  const totalNonCancelledCount = nonCancelledRequests.length;

  const completionRate =
    totalNonCancelledCount > 0
      ? Math.round((completedCount / totalNonCancelledCount) * 1000) / 10
      : 0;

  let totalDivertedKg = 0;
  let ewasteCompletedCount = 0;
  let recyclableCompletedCount = 0;

  const categoryBreakdown = {};

  completedRequests.forEach((req) => {
    const cat = req.wasteCategory || 'Other';
    const weight = WEIGHT_ESTIMATES_KG[cat] || 1.0;
    totalDivertedKg += weight;

    categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;

    if (cat === 'E-Waste') {
      ewasteCompletedCount++;
    }

    if (['Plastic', 'Paper', 'Glass', 'Metal'].includes(cat)) {
      recyclableCompletedCount++;
    }
  });

  return {
    totalRequests,
    totalCompletedCollections: completedCount,
    completionRate,
    estimatedWasteDivertedKg: Math.round(totalDivertedKg * 10) / 10,
    ewasteCompletedCount,
    recyclableCompletedCount,
    categoryBreakdown,
    weightEstimatesReference: WEIGHT_ESTIMATES_KG,
  };
}

module.exports = { calculateEnvironmentalImpact, WEIGHT_ESTIMATES_KG };
