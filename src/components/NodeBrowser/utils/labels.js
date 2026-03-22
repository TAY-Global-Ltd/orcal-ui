/**
 * Truncate object name to 16 characters
 */
export const truncateObjectName = (name) => {
  if (name.length > 16) {
    return name.substring(0, 16) + '...';
  }
  return name;
};

/**
 * Get the display label for a node
 */
export const getNodeLabel = (d, specialLabels) => {
  const root = d.path.split('/')[1] || 'Default';
  const specialConfig = specialLabels[root];

  if (specialConfig) {
    return specialConfig.label;
  }

  // Default: Extract the last segment of the path as the display name
  const pathSegments = d.path.split('/').filter((s) => s);
  const shortName = pathSegments[pathSegments.length - 1] || d.name;
  return truncateObjectName(shortName);
};

/**
 * Get the opacity for a label
 */
export const getLabelOpacity = (d, specialLabels) => {
  const root = d.path.split('/')[1] || 'Default';
  const specialConfig = specialLabels[root];

  if (specialConfig && specialConfig.opacity !== undefined) {
    return specialConfig.opacity;
  }

  return 1; // Default opacity
};
