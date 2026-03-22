import { useEffect, useRef, useCallback } from 'react';
import { getPathColor, getNodeLabel, getLabelOpacity, getHullPath } from '../utils';
import { createNodeInteractions } from '../interactions/nodeInteractions';
import { createLabelInteractions } from '../interactions/labelInteractions';
import { createHullInteractions } from '../interactions/hullInteractions';

const getLinkNodeId = (node) => (typeof node === 'string' ? node : node.id);

export const useSimulation = ({
  d3,
  svgRef,
  graphData,
  rootId,
  pathColors,
  specialLabels,
  loading,
  setStatusBarText,
  clickedFunctionNode,
  setClickedFunctionNode,
  clickedObject,
  setClickedObject,
}) => {
  const simulationRef = useRef(null);
  const clickedFunctionNodeRef = useRef(null);
  const clickedObjectRef = useRef(null);
  const zoomRef = useRef(null);
  const zoomTransformRef = useRef(null);
  const pathHighlightRef = useRef(null);
  const didPanToRootRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    clickedFunctionNodeRef.current = clickedFunctionNode;
  }, [clickedFunctionNode]);

  useEffect(() => {
    clickedObjectRef.current = clickedObject;
  }, [clickedObject]);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    if (d3 && svgRef.current) {
      d3.select(svgRef.current).transition().call(d3.zoom().scaleBy, 1.2);
    }
  }, [d3, svgRef]);

  const handleZoomOut = useCallback(() => {
    if (d3 && svgRef.current) {
      d3.select(svgRef.current).transition().call(d3.zoom().scaleBy, 0.8);
    }
  }, [d3, svgRef]);

  // Pan to center a node at given position
  const panToNode = useCallback((x, y) => {
    if (!d3 || !svgRef.current || !zoomRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const currentTransform = zoomTransformRef.current || d3.zoomIdentity;
    const k = currentTransform.k;

    const newTransform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(k)
      .translate(-x, -y);

    svg.transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .call(zoomRef.current.transform, newTransform);
  }, [d3, svgRef]);

  // Expose panToNode globally for interaction handlers
  useEffect(() => {
    window.__panToNode = panToNode;
    return () => {
      delete window.__panToNode;
    };
  }, [panToNode]);

  // Main simulation effect
  useEffect(() => {
    if (!d3 || !svgRef.current || graphData.nodes.length === 0) return;

    didPanToRootRef.current = false;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    if (simulationRef.current) simulationRef.current.stop();

    // Clone data for D3 mutation
    const nodes = graphData.nodes.map((n) => ({ ...n }));
    const links = graphData.links.map((l) => ({ ...l }));

    // --- FORCE CONFIGURATION ---

    // Custom force to attract nodes from the same category
    const categoryAttractionForce = () => {
      const strength = 0.05;
      const forceFunction = (alpha) => {
        const anchors = nodes.filter((n) => n.type === 'object_anchor');

        for (let i = 0; i < anchors.length; i++) {
          for (let j = i + 1; j < anchors.length; j++) {
            const a = anchors[i];
            const b = anchors[j];

            if (a.root === b.root) {
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;

              const force = strength * alpha * distance;
              const fx = (dx / distance) * force;
              const fy = (dy / distance) * force;

              a.vx += fx;
              a.vy += fy;
              b.vx -= fx;
              b.vy -= fy;
            }
          }
        }
      };
      return forceFunction;
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => (d.type === 'structure' ? 35 : 80))
          .strength((d) => (d.type === 'structure' ? 1 : 0.1))
      )
      .force(
        'charge',
        d3.forceManyBody().strength((d) => (d.type === 'object_anchor' ? -400 : -20))
      )
      .force(
        'collide',
        d3.forceCollide((d) => (d.type === 'object_anchor' ? 45 : 8))
      )
      .force('category', categoryAttractionForce());

    // --- RENDERING SETUP ---
    const svg = d3.select(svgRef.current);
    const hullGroup = svg.select('.hulls');
    const linkGroup = svg.select('.links');
    const pathLinkGroup = svg.select('.path-links');
    const nodeGroup = svg.select('.nodes');
    const labelGroup = svg.select('.labels');

    // 1. LINKS
    const visibleLinks = links.filter((d) => d.type !== 'structure');

    const link = linkGroup
      .selectAll('line')
      .data(visibleLinks)
      .join('line')
      .attr('stroke', '#475569')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.count || 1) * 2)
      .attr('marker-end', 'url(#arrow-default)');

    // 2. NODES (Circles)
    const circleNodesData = nodes.filter((n) => n.type === 'function');

    const node = nodeGroup
      .selectAll('g')
      .data(circleNodesData)
      .join('g')
      .call(
        d3
          .drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node.selectAll('*').remove();
    node
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', (d) => getPathColor(d.root || d.path, pathColors))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('cursor', 'pointer');

    node
      .filter((d) => d.isRoot)
      .append('path')
      .attr('d', 'M-5 1 L0 -4 L5 1 V6 H2 V2 H-2 V6 H-5 Z')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('pointer-events', 'none');

    // Node interactions
    const nodeInteractions = createNodeInteractions({
      d3,
      pathColors,
      setStatusBarText,
      setClickedFunctionNode,
      setClickedObject,
      clickedFunctionNodeRef,
      link,
      node,
    });

    node
      .on('mouseover', nodeInteractions.handleMouseOver)
      .on('mouseout', nodeInteractions.handleMouseOut)
      .on('click', (event, d) => nodeInteractions.handleClick(event, d, svg));

    if (rootId) {
      const rootNode = node.filter((d) => d.id === rootId);
      if (!rootNode.empty() && !clickedFunctionNodeRef.current) {
        setTimeout(() => {
          if (clickedFunctionNodeRef.current) return;
          const element = rootNode.node();
          if (!element) return;
          const event = new MouseEvent('click', { bubbles: true });
          element.dispatchEvent(event);
        }, 0);
      }
    }

    // 3. ANCHOR LABELS
    const anchorNodesData = nodes.filter((n) => n.type === 'object_anchor');

    const labels = labelGroup
      .selectAll('text')
      .data(anchorNodesData)
      .join('text')
      .text((d) => getNodeLabel(d, specialLabels))
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('fill', '#e2e8f0')
      .attr('fill-opacity', (d) => getLabelOpacity(d, specialLabels))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('pointer-events', 'auto')
      .style('cursor', 'pointer')
      .style('text-shadow', '0px 1px 2px rgba(0,0,0,0.8)');

    // 4. HULLS
    const groupData = graphData.groups
      .map((g) => {
        const leaves = nodes.filter((n) => n.objectId === g.id && n.type === 'function');
        return { ...g, leaves };
      })
      .filter((g) => g.leaves.length > 0);

    const hulls = hullGroup
      .selectAll('path')
      .data(groupData)
      .join('path')
      .attr('fill', (d) => getPathColor(d.path, pathColors))
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'none')
      .style('cursor', 'pointer')
      .style('pointer-events', 'all');

    // Label interactions (needs hulls reference)
    const labelInteractions = createLabelInteractions({
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
    });

    labels
      .on('mouseover', labelInteractions.handleMouseOver)
      .on('mouseout', labelInteractions.handleMouseOut)
      .on('click', (event, d) => labelInteractions.handleClick(event, d, svg));

    // Hull interactions
    const hullInteractions = createHullInteractions({
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
    });

    hulls
      .on('mouseover', hullInteractions.handleMouseOver)
      .on('mouseout', hullInteractions.handleMouseOut)
      .on('click', (event, d) => hullInteractions.handleClick(event, d, svg));

    const clearPathHighlight = () => {
      pathHighlightRef.current = null;
      pathLinkGroup.selectAll('line').remove();
      node.selectAll('circle.path-highlight-ring').remove();

      link.each(function () {
        const selection = d3.select(this);
        const prevStroke = selection.attr('data-path-prev-stroke');
        if (prevStroke === null) return;
        const prevOpacity = selection.attr('data-path-prev-opacity');
        const prevWidth = selection.attr('data-path-prev-width');
        const prevMarkerEnd = selection.attr('data-path-prev-marker-end');

        selection
          .attr('stroke', prevStroke)
          .attr('stroke-opacity', prevOpacity)
          .attr('stroke-width', prevWidth);

        if (prevMarkerEnd) {
          selection.attr('marker-end', prevMarkerEnd);
        } else {
          selection.attr('marker-end', null);
        }

        selection
          .attr('data-path-prev-stroke', null)
          .attr('data-path-prev-opacity', null)
          .attr('data-path-prev-width', null)
          .attr('data-path-prev-marker-end', null);
      });
    };

    const highlightPathBetweenNodes = (fromId, toId) => {
      clearPathHighlight();

      if (fromId === toId) {
        pathHighlightRef.current = { nodes: new Set([fromId]), links: [] };
      } else {
        const callLinks = links.filter((l) => l.type === 'call');
        const adjacency = new Map();

        callLinks.forEach((l) => {
          const sourceId = getLinkNodeId(l.source);
          const targetId = getLinkNodeId(l.target);
          if (!adjacency.has(sourceId)) {
            adjacency.set(sourceId, []);
          }
          adjacency.get(sourceId).push({ nextId: targetId, link: l });
        });

        const queue = [fromId];
        const visited = new Set([fromId]);
        const prev = new Map();

        while (queue.length > 0) {
          const current = queue.shift();
          if (current === toId) break;
          const neighbors = adjacency.get(current) || [];
          neighbors.forEach(({ nextId, link }) => {
            if (visited.has(nextId)) return;
            visited.add(nextId);
            prev.set(nextId, { prevId: current, link });
            queue.push(nextId);
          });
        }

        if (!prev.has(toId)) {
          return false;
        }

        const pathLinks = [];
        const pathNodeIds = new Set([fromId, toId]);
        let currentId = toId;
        while (currentId !== fromId) {
          const info = prev.get(currentId);
          if (!info) break;
          pathLinks.push(info.link);
          pathNodeIds.add(info.prevId);
          currentId = info.prevId;
        }

        pathLinks.reverse();
        pathHighlightRef.current = { nodes: pathNodeIds, links: pathLinks };
      }

      if (!pathHighlightRef.current) {
        return false;
      }

      const pathLinkData = pathHighlightRef.current.links;
      const pathLinkIds = new Set(
        pathLinkData.map((l) => `${getLinkNodeId(l.source)}::${getLinkNodeId(l.target)}`)
      );

      link.each(function (l) {
        const linkId = `${getLinkNodeId(l.source)}::${getLinkNodeId(l.target)}`;
        if (!pathLinkIds.has(linkId)) return;
        const selection = d3.select(this);
        if (selection.attr('data-path-prev-stroke') === null) {
          selection
            .attr('data-path-prev-stroke', selection.attr('stroke') || '')
            .attr('data-path-prev-opacity', selection.attr('stroke-opacity') || '')
            .attr('data-path-prev-width', selection.attr('stroke-width') || '')
            .attr('data-path-prev-marker-end', selection.attr('marker-end') || '');
        }

        selection
          .attr('stroke', '#facc15')
          .attr('stroke-opacity', 1)
          .attr('stroke-width', 4)
          .attr('marker-end', 'url(#arrow-path)');
      });

      pathLinkGroup
        .selectAll('line')
        .data(pathLinkData, (l) => `${getLinkNodeId(l.source)}-${getLinkNodeId(l.target)}`)
        .join('line')
        .attr('stroke', '#facc15')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 4)
        .attr('marker-end', 'url(#arrow-path)')
        .style('pointer-events', 'none');

      const pathNodeIds = pathHighlightRef.current.nodes;
      node.each(function (n) {
        if (!pathNodeIds.has(n.id)) return;
        const selection = d3.select(this);
        if (!selection.select('circle.path-highlight-ring').empty()) return;
        selection
          .append('circle')
          .attr('class', 'path-highlight-ring')
          .attr('r', 14)
          .attr('fill', 'none')
          .attr('stroke', '#facc15')
          .attr('stroke-width', 2)
          .attr('opacity', 0.9)
          .style('pointer-events', 'none');
      });

      return true;
    };

    const panToNodeById = (nodeId) => {
      const targetNode = nodes.find((n) => n.id === nodeId);
      if (!targetNode || targetNode.x === undefined || targetNode.y === undefined) return false;
      panToNode(targetNode.x, targetNode.y);
      return true;
    };

    const clickNodeById = (nodeId) => {
      let clicked = false;
      node.each(function (d) {
        if (d.id === nodeId) {
          const event = new MouseEvent('click', { bubbles: true });
          this.dispatchEvent(event);
          clicked = true;
        }
      });
      return clicked;
    };

    window.__panToNodeById = panToNodeById;
    window.__clickNodeById = clickNodeById;
    window.__highlightPathBetweenNodes = highlightPathBetweenNodes;
    window.__clearPathHighlight = clearPathHighlight;

    // --- TICK ---
    simulation.on('tick', () => {
      node.attr('transform', (d) => `translate(${d.x},${d.y})`);

      labels.attr('x', (d) => d.x).attr('y', (d) => d.y);

      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      pathLinkGroup
        .selectAll('line')
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      hulls.attr('d', (d) => getHullPath(d.leaves, d3));
    });

    simulation.on('end', () => {
      if (!rootId || didPanToRootRef.current) return;
      const rootNode = nodes.find((n) => n.id === rootId);
      if (!rootNode || rootNode.x === undefined || rootNode.y === undefined) return;
      didPanToRootRef.current = true;
      panToNode(rootNode.x, rootNode.y);
    });

    simulationRef.current = simulation;

    // Zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        linkGroup.attr('transform', event.transform);
        pathLinkGroup.attr('transform', event.transform);
        nodeGroup.attr('transform', event.transform);
        hullGroup.attr('transform', event.transform);
        labelGroup.attr('transform', event.transform);
        zoomTransformRef.current = event.transform;
      });

    svg.call(zoom);
    zoomRef.current = zoom;
    zoomTransformRef.current = d3.zoomIdentity;

    return () => {
      simulation.stop();
      clearPathHighlight();
      delete window.__panToNodeById;
      delete window.__clickNodeById;
      delete window.__highlightPathBetweenNodes;
      delete window.__clearPathHighlight;
    };
  }, [graphData, rootId, loading, d3, svgRef, pathColors, specialLabels, setStatusBarText, setClickedFunctionNode, setClickedObject]);

  return {
    simulationRef,
    clickedFunctionNodeRef,
    handleZoomIn,
    handleZoomOut,
  };
};
