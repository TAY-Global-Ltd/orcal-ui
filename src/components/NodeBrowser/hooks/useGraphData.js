import { useMemo } from 'react';

/**
 * Hook to transform raw graph data into D3-compatible format
 */
export const useGraphData = (data) => {
  return useMemo(() => {
    if (!data) return { nodes: [], links: [], groups: [] };

    const rootId = data.root;

    // 1. Function Nodes
    const funcNodes = data.functions.map((f) => ({
      ...f,
      path: f.objectPath,
      type: 'function',
      r: 6,
      isRoot: rootId === f.id,
    }));

    // 2. Object Nodes (The "Black Holes" / Anchors)
    const objNodes = data.objects.map((o) => ({
      ...o,
      type: 'object_anchor',
      r: 1,
    }));

    // 3. Call Links (Visible)
    const callLinks = data.calls.map((c) => ({
      source: c.source,
      target: c.target,
      type: 'call',
    }));

    // 4. Structural Links (Invisible, High Strength)
    // Connect every function to its object anchor
    const structureLinks = funcNodes.map((f) => ({
      source: f.id,
      target: f.objectId,
      type: 'structure',
    }));

    const nodes = [...funcNodes, ...objNodes];
    const links = [...callLinks, ...structureLinks];

    // Identify groups for hulls
    const groups = data.objects.map((obj) => ({
      id: obj.id,
      root: obj.root,
      path: obj.path,
      name: obj.name,
      leaves: [], // populated in tick
    }));

    return { nodes, links, groups };
  }, [data]);
};
