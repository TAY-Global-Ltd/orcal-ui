/**
 * Get color for a given path based on its root category
 */
export const getPathColor = (path, pathColors) => {
  const root = path.split('/')[1] || 'Default';
  return pathColors[root] || pathColors.Default || '#a1a1aa';
};

/**
 * Get the complementary (opposite) color for better contrast
 * Rotates the hue by 180 degrees while preserving saturation and lightness
 */
export const getComplementaryColor = (hexColor) => {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Convert RGB to HSL
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6;
        break;
    }
  }

  // Rotate hue by 180 degrees (0.5 in normalized form)
  h = (h + 0.5) % 1;

  // Boost saturation and lightness for better visibility
  s = Math.min(1, s * 1.2);
  const newL = l < 0.5 ? Math.min(0.85, l + 0.35) : Math.max(0.6, l);

  // Convert HSL back to RGB
  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
  const p = 2 * newL - q;

  const rOut = Math.round(hueToRgb(p, q, h + 1/3) * 255);
  const gOut = Math.round(hueToRgb(p, q, h) * 255);
  const bOut = Math.round(hueToRgb(p, q, h - 1/3) * 255);

  return `#${rOut.toString(16).padStart(2, '0')}${gOut.toString(16).padStart(2, '0')}${bOut.toString(16).padStart(2, '0')}`;
};
