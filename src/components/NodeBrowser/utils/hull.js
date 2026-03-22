/**
 * Generate SVG path for a convex hull around a set of nodes
 */
export const getHullPath = (leaves, d3) => {
  if (leaves.length === 0) return '';

  const points = leaves.map((n) => [n.x ?? 0, n.y ?? 0]);

  if (leaves.length === 1) {
    const p = points[0];
    return `M ${p[0]},${p[1]} L ${p[0]},${p[1]}`;
  }

  if (leaves.length === 2) {
    return `M ${points[0][0]},${points[0][1]} L ${points[1][0]},${points[1][1]}`;
  }

  const hull = d3.polygonHull(points);
  return hull ? 'M' + hull.map((p) => p.join(',')).join('L') + 'Z' : '';
};
