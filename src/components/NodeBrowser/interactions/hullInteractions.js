import { getPathColor, getComplementaryColor, getNodeLabel, getLabelOpacity } from '../utils';

export const createHullInteractions = (ctx) => {
  const {
    d3,
    pathColors,
    specialLabels,
    setStatusBarText,
    setClickedObject,
    clickedFunctionNodeRef,
    clickedObjectRef,
    nodes,
    node,
    hulls,
    link,
    labelGroup,
  } = ctx;

  const handleMouseOver = (_event, d) => {
    // Don't trigger if there's an active clicked object
    if (clickedFunctionNodeRef.current) return;

    // Update status bar with object path
    setStatusBarText(d.path);

    // Find the label for this hull
    const labelSelection = labelGroup
      .selectAll('text')
      .filter((labelData) => labelData.id === d.id);

    // Increase label size but keep showing the name
    labelSelection
      .transition()
      .duration(200)
      .attr('font-size', '54px')
      .attr('fill', '#fff')
      .attr('fill-opacity', 1) // Full opacity on hover
      .style('text-shadow', '0px 2px 4px rgba(0,0,0,1)')
      .text(getNodeLabel(d, specialLabels));
  };

  const handleMouseOut = (_event, d) => {
    // Clear status bar
    setStatusBarText('');

    // Don't reset if this object is currently clicked
    if (clickedObjectRef.current?.id === d.id) return;

    // Reset label to default
    const labelSelection = labelGroup
      .selectAll('text')
      .filter((labelData) => labelData.id === d.id);

    labelSelection
      .transition()
      .duration(200)
      .attr('font-size', '24px')
      .attr('fill', '#e2e8f0')
      .attr('fill-opacity', (labelData) => getLabelOpacity(labelData, specialLabels))
      .style('text-shadow', '0px 1px 2px rgba(0,0,0,0.8)')
      .text((labelData) => getNodeLabel(labelData, specialLabels));
  };

  const handleClick = (event, d, svg) => {
    event.stopPropagation();

    // If there's a function node clicked, reset it first
    if (clickedFunctionNodeRef.current) {
      if (window.__resetFunctionNodeClick) {
        window.__resetFunctionNodeClick();
      }
    }

    // If there's already a clicked object, reset it first
    if (window.__resetObjectClick) {
      window.__resetObjectClick();
    }

    // Find the object anchor node for this hull
    const objectAnchor = nodes.find(
      (n) => n.id === d.id && n.type === 'object_anchor'
    );
    if (!objectAnchor) return;

    // Find all function nodes that belong to this object
    const objectFunctions = nodes.filter(
      (n) => n.objectId === d.id && n.type === 'function'
    );
    const objectFunctionIds = new Set(objectFunctions.map((n) => n.id));

    const clickedObject = {
      ...objectAnchor,
      functions: objectFunctions,
    };

    // Set the clicked object state to show the info box
    setClickedObject(clickedObject);
    clickedObjectRef.current = clickedObject;

    // Pan to center the clicked hull/object
    if (window.__panToNode && objectAnchor.x !== undefined && objectAnchor.y !== undefined) {
      window.__panToNode(objectAnchor.x, objectAnchor.y);
    }

    // Highlight the label for this object with glowing effect - complementary color for text
    const hullColor = getPathColor(d.path, pathColors);
    const textColor = getComplementaryColor(hullColor);
    const glowShadow = `0 0 10px ${hullColor}, 0 0 20px ${hullColor}, 0 0 30px ${hullColor}, 0 0 40px ${hullColor}`;

    const labelSelection = labelGroup
      .selectAll('text')
      .filter((labelData) => labelData.id === d.id);

    labelSelection
      .transition()
      .duration(200)
      .attr('font-size', '42px')
      .attr('fill', textColor)
      .style('text-shadow', glowShadow);

    // Highlight all function nodes in this object
    node.each(function (n) {
      if (objectFunctionIds.has(n.id)) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', 10)
          .attr('stroke', '#fff')
          .attr('stroke-width', 3)
          .attr('filter', 'brightness(1.5)');
      }
    });

    // Highlight hull for this object
    const hullSelection = d3.select(event.currentTarget);
    hullSelection.transition().duration(200).attr('fill-opacity', 0.6);

    // Store reset function for click-away
    const resetHighlight = () => {
      setClickedObject(null);
      clickedObjectRef.current = null;

      // Reset all labels to default size and color
      labelGroup
        .selectAll('text')
        .transition()
        .duration(200)
        .attr('font-size', '24px')
        .attr('fill', '#e2e8f0')
        .attr('fill-opacity', (labelData) => getLabelOpacity(labelData, specialLabels))
        .style('text-shadow', '0px 1px 2px rgba(0,0,0,0.8)')
        .text((labelData) => getNodeLabel(labelData, specialLabels));

      node
        .transition()
        .duration(200)
        .style('opacity', 1)
        .select('circle')
        .attr('fill', (n) => getPathColor(n.root || n.path, pathColors))
        .attr('r', 6)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .attr('filter', null);

      hulls.transition().duration(200).attr('fill-opacity', 0.3);

      link
        .transition()
        .duration(200)
        .attr('stroke', '#475569')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', (l) => Math.sqrt(l.count || 1) * 2);

      svg.on('click.hull-reset', null);
    };

    // Store reset function reference globally for Escape key
    window.__resetObjectClick = resetHighlight;

    // Add click-away handler
    setTimeout(() => {
      svg.on('click.hull-reset', function (e) {
        // Check if we clicked on a hull or label for this object
        const clickedHull = e.target.tagName === 'path' && e.target.__data__?.id === d.id;
        const clickedLabel = e.target.tagName === 'text' && e.target.__data__?.id === d.id;

        if (!clickedHull && !clickedLabel) {
          resetHighlight();
        }
      });
    }, 100);
  };

  return { handleMouseOver, handleMouseOut, handleClick };
};
