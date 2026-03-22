import { getPathColor, getComplementaryColor } from '../utils';

export const createNodeInteractions = (ctx) => {
  const { d3, pathColors, setStatusBarText, setClickedFunctionNode, setClickedObject, clickedFunctionNodeRef, link, node } = ctx;

  const handleMouseOver = (event, d) => {
    // Don't apply hover effects if this node is already selected
    if (clickedFunctionNodeRef.current?.id === d.id) return;

    const selection = d3.select(event.currentTarget);
    const baseColor = getPathColor(d.root || d.path, pathColors);

    // Update status bar with function path
    const functionPath = `${d.objectPath}/${d.name}()`;
    setStatusBarText(functionPath);

    // 1. Enlarge node and brighten color
    selection
      .select('circle')
      .transition()
      .duration(200)
      .attr('r', 12)
      .attr('fill', d3.color(baseColor)?.brighter(0.8)?.toString() || '#fff')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3);

    // 2. Add Label
    selection
      .append('text')
      .text(d.name)
      .attr('x', 15)
      .attr('y', 5)
      .attr('class', 'node-label')
      .attr('fill', '#fff')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .style('text-shadow', '0px 2px 4px rgba(0,0,0,0.8)')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .transition()
      .duration(200)
      .style('opacity', 1);
  };

  const handleMouseOut = (event, d) => {
    // Clear status bar
    setStatusBarText('');

    const selection = d3.select(event.currentTarget);

    // If this node is selected, ensure the selected styling is maintained
    if (clickedFunctionNodeRef.current?.id === d.id) {
      const nodeColor = getPathColor(d.root || d.path, pathColors);
      const textColor = getComplementaryColor(nodeColor);
      const glowShadow = `0 0 8px ${nodeColor}, 0 0 16px ${nodeColor}, 0 0 24px ${nodeColor}, 0 0 32px ${nodeColor}`;

      selection.select('.node-label')
        .attr('fill', textColor)
        .attr('font-size', '24px')
        .style('text-shadow', glowShadow);
      return;
    }

    selection
      .select('circle')
      .transition()
      .duration(200)
      .attr('r', 6)
      .attr('fill', getPathColor(d.root || d.path, pathColors))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    // Remove Label
    selection.select('.node-label').remove();
  };

  const handleClick = (event, d, svg) => {
    event.stopPropagation();

    // If clicking the same node, deselect it
    if (clickedFunctionNodeRef.current?.id === d.id) {
      if (window.__resetFunctionNodeClick) {
        window.__resetFunctionNodeClick();
      }
      return;
    }

    // If there's a different node already clicked, reset it first
    if (clickedFunctionNodeRef.current && clickedFunctionNodeRef.current.id !== d.id) {
      if (window.__resetFunctionNodeClick) {
        window.__resetFunctionNodeClick();
      }
    }

    // If there's a clicked object, reset it first
    if (window.__resetObjectClick) {
      window.__resetObjectClick();
    }

    // Set clicked function node for details box
    setClickedFunctionNode(d);
    clickedFunctionNodeRef.current = d;
    setClickedObject(null);

    // Pan to center the clicked node
    if (window.__panToNode && d.x !== undefined && d.y !== undefined) {
      window.__panToNode(d.x, d.y);
    }

    const selection = d3.select(event.currentTarget);

    // 1. Highlight Selected Node
    selection
      .select('circle')
      .transition()
      .duration(200)
      .attr('r', 12)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('filter', 'brightness(1.5)');

    // 2. Ensure Label is visible with glowing effect
    const nodeColor = getPathColor(d.root || d.path, pathColors);
    const textColor = getComplementaryColor(nodeColor);
    const glowShadow = `0 0 8px ${nodeColor}, 0 0 16px ${nodeColor}, 0 0 24px ${nodeColor}, 0 0 32px ${nodeColor}`;

    if (selection.select('.node-label').empty()) {
      selection
        .append('text')
        .text(d.name)
        .attr('x', 15)
        .attr('y', 5)
        .attr('class', 'node-label')
        .attr('fill', textColor)
        .attr('font-size', '24px')
        .attr('font-weight', 'bold')
        .style('text-shadow', glowShadow)
        .style('pointer-events', 'none');
    } else {
      selection
        .select('.node-label')
        .transition()
        .duration(200)
        .attr('font-size', '24px')
        .attr('fill', textColor)
        .style('text-shadow', glowShadow);
    }

    // 3. Highlight Edges & Neighbors
    const inputNodeIds = new Set();
    const outputNodeIds = new Set();

    link.each(function (l) {
      const isIncoming = l.target.id === d.id;
      const isOutgoing = l.source.id === d.id;

      if (isIncoming || isOutgoing) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke', isIncoming ? '#4ade80' : '#f472b6')
          .attr('stroke-opacity', 1)
          .attr('stroke-width', 3)
          .attr('marker-end', isIncoming ? 'url(#arrow-input)' : 'url(#arrow-output)');

        if (isIncoming) inputNodeIds.add(l.source.id);
        if (isOutgoing) outputNodeIds.add(l.target.id);
      }
    });

    // 4. Highlight Neighbor Nodes and Add Labels
    node.each(function (n) {
      if (n.id === d.id) return;

      if (inputNodeIds.has(n.id) || outputNodeIds.has(n.id)) {
        const isInput = inputNodeIds.has(n.id);
        const neighborColor = isInput ? '#4ade80' : '#f472b6';

        const neighborSelection = d3.select(this);

        neighborSelection
          .style('opacity', 1)
          .select('circle')
          .transition()
          .duration(200)
          .attr('fill', neighborColor)
          .attr('r', 8)
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);

        // Add label for connected function node
        neighborSelection
          .append('text')
          .text(n.name)
          .attr('x', 15)
          .attr('y', 5)
          .attr('class', 'neighbor-label')
          .attr('fill', neighborColor)
          .attr('font-size', '14px')
          .attr('font-weight', 'bold')
          .style('text-shadow', '0px 2px 4px rgba(0,0,0,0.8)')
          .style('pointer-events', 'none')
          .style('opacity', 0)
          .transition()
          .duration(200)
          .style('opacity', 1);
      }
    });

    // Reset function for click-away
    const resetFunctionNodeClick = () => {
      setClickedFunctionNode(null);
      clickedFunctionNodeRef.current = null;

      // Reset clicked node
      selection
        .select('circle')
        .transition()
        .duration(200)
        .attr('r', 6)
        .attr('fill', getPathColor(d.root || d.path, pathColors))
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .attr('filter', null);

      selection.select('.node-label').remove();

      // Reset Links
      link
        .transition()
        .duration(200)
        .attr('stroke', '#475569')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', (l) => Math.sqrt(l.count || 1) * 2)
        .attr('marker-end', 'url(#arrow-default)');

      // Reset Nodes and remove neighbor labels
      node.each(function () {
        d3.select(this).select('.neighbor-label').remove();
      });

      node
        .transition()
        .duration(200)
        .style('opacity', 1)
        .select('circle')
        .attr('fill', (n) => getPathColor(n.root || n.path, pathColors))
        .attr('r', 6)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);

      svg.on('click.function-reset', null);
    };

    // Store reset function reference
    window.__resetFunctionNodeClick = resetFunctionNodeClick;

    // Add click-away handler
    setTimeout(() => {
      svg.on('click.function-reset', function (e) {
        if (
          !e.target.closest('g') ||
          !e.target.closest('g').__data__ ||
          e.target.closest('g').__data__.id !== d.id
        ) {
          resetFunctionNodeClick();
        }
      });
    }, 100);
  };

  return { handleMouseOver, handleMouseOut, handleClick };
};
