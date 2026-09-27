/**
 * Collection Zone Intelligence Service
 * Deterministically assigns collection zones based on address keywords.
 */
function calculateZone(address = '') {
  const addrLower = (address || '').toLowerCase();

  // Zone A: Sector / Terrace / Downtown / Central / North
  if (
    addrLower.includes('sector') ||
    addrLower.includes('terrace') ||
    addrLower.includes('downtown') ||
    addrLower.includes('central') ||
    addrLower.includes('north')
  ) {
    return 'Zone A';
  }

  // Zone B: Ridge / Oak / West / Hill / Avenue
  if (
    addrLower.includes('ridge') ||
    addrLower.includes('oak') ||
    addrLower.includes('west') ||
    addrLower.includes('hill') ||
    addrLower.includes('avenue')
  ) {
    return 'Zone B';
  }

  // Zone C: Park / Innovation / East / Boulevard / South
  if (
    addrLower.includes('park') ||
    addrLower.includes('innovation') ||
    addrLower.includes('east') ||
    addrLower.includes('boulevard') ||
    addrLower.includes('south')
  ) {
    return 'Zone C';
  }

  // Default Zone D / General
  return 'Zone D / General';
}

module.exports = { calculateZone };
