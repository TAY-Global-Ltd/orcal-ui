/**
 * Fuzzy match function - returns score (higher is better) or -1 if no match
 */
export const fuzzyMatch = (query, target) => {
  const queryLower = query.toLowerCase();
  const targetLower = target.toLowerCase();

  // Normalize query: treat spaces as flexible separators, keep punctuation
  const queryNormalized = queryLower.replace(/\s+/g, '');
  const targetNormalized = targetLower.replace(/\s+/g, '');

  // Exact match gets highest score
  if (targetNormalized === queryNormalized) return 1000;

  // Starts with query gets high score
  if (targetNormalized.startsWith(queryNormalized)) {
    return 900 + (queryNormalized.length / targetNormalized.length) * 50;
  }

  // Contains exact substring
  if (targetNormalized.includes(queryNormalized)) {
    return 800 + (queryNormalized.length / targetNormalized.length) * 50;
  }

  // Fuzzy matching - characters must appear in order
  let queryIdx = 0;
  let score = 0;
  let lastMatchIdx = -1;
  let consecutiveBonus = 0;

  for (let i = 0; i < targetLower.length && queryIdx < queryNormalized.length; i++) {
    if (targetLower[i] === queryNormalized[queryIdx]) {
      // Bonus for consecutive matches
      if (
        lastMatchIdx === i - 1 ||
        (lastMatchIdx >= 0 && /^[\s\/_\-\.]+$/.test(targetLower.slice(lastMatchIdx + 1, i)))
      ) {
        consecutiveBonus += 10;
      }
      // Bonus for matching at start of word
      if (i === 0 || /[\s\/_\-\.]/.test(targetLower[i - 1])) {
        score += 15;
      }
      score += 10 + consecutiveBonus;
      lastMatchIdx = i;
      queryIdx++;
    } else {
      consecutiveBonus = 0;
    }
  }

  // All query characters must be found
  if (queryIdx !== queryNormalized.length) return -1;

  // Penalize longer targets (prefer shorter, more relevant matches)
  score -= (target.length - query.length) * 0.5;

  return Math.max(0, score);
};
