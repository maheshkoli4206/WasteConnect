/**
 * Calculates priority level, numeric score, and rationale for a Waste Request.
 */
function calculatePriority(wasteCategory, description = '', pickupDate = '') {
  let score = 30; // base score
  const reasons = [];

  const categoryLower = (wasteCategory || '').toLowerCase();
  const descLower = (description || '').toLowerCase();

  // Category based priority
  if (categoryLower.includes('hazardous')) {
    score += 45;
    reasons.push('Hazardous waste type (+45)');
  } else if (categoryLower.includes('e-waste')) {
    score += 30;
    reasons.push('Electronic waste containing heavy metals (+30)');
  } else if (categoryLower.includes('organic')) {
    score += 25;
    reasons.push('Organic perishable material (+25)');
  } else if (categoryLower.includes('metal') || categoryLower.includes('glass')) {
    score += 15;
    reasons.push('Sharp/heavy material (+15)');
  } else {
    score += 10;
    reasons.push('Standard category (+10)');
  }

  // Keyword urgency detection
  const highRiskKeywords = ['urgent', 'spill', 'leak', 'toxic', 'battery', 'chemical', 'acid', 'broken', 'dumping', 'overflow'];
  const matchedKeywords = highRiskKeywords.filter(kw => descLower.includes(kw));
  
  if (matchedKeywords.length > 0) {
    score += 20;
    reasons.push(`Urgency keywords found: ${matchedKeywords.join(', ')} (+20)`);
  }

  // Date proximity
  if (pickupDate) {
    const todayStr = new Date().toISOString().split('T')[0];
    if (pickupDate === todayStr) {
      score += 15;
      reasons.push('Same-day pickup requested (+15)');
    }
  }

  // Determine Level
  let priority = 'LOW';
  if (score >= 60) {
    priority = 'HIGH';
  } else if (score >= 40) {
    priority = 'MEDIUM';
  }

  return {
    priority,
    score,
    reason: reasons.join(' | '),
    reasonsList: reasons,
  };
}

module.exports = { calculatePriority };
