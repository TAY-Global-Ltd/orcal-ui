import React, { useState, useRef, useCallback } from 'react';
import '../../tailwind.css';
import { useD3, useGraphData, useSearch, useKeyboardShortcuts, useSimulation } from './hooks';
import {
  Header,
  StatusBar,
  Legend,
  FunctionInfoOverlay,
  ObjectInfoOverlay,
  ZoomControls,
  SearchButton,
  PathFinderButton,
  HomeButton,
  SearchModal,
} from './ui';

const NodeBrowser = ({
  data,
  pathColors,
  onRefresh,
  specialLabels = {},
}) => {
  // D3 loading
  const { d3, d3Ref, loading } = useD3();

  // Graph data transformation
  const graphData = useGraphData(data);

  // UI state
  const [statusBarText, setStatusBarText] = useState('');
  const [clickedFunctionNode, setClickedFunctionNode] = useState(null);
  const [clickedObject, setClickedObject] = useState(null);
  const [pathHighlightActive, setPathHighlightActive] = useState(false);

  // Refs
  const svgRef = useRef(null);

  // Search selection handler
  const handleSearchSelectNode = useCallback(
    (result) => {
      const d3Instance = d3Ref.current;
      if (!d3Instance || !svgRef.current) return;

      // Reset any existing selections first
      if (window.__resetFunctionNodeClick) {
        window.__resetFunctionNodeClick();
      }
      if (window.__resetObjectClick) {
        window.__resetObjectClick();
      }

      // Find and click the corresponding node
      if (result.type === 'function') {
        const nodeGroup = d3Instance.select(svgRef.current).select('.nodes');
        nodeGroup.selectAll('g').each(function (d) {
          if (d.id === result.item.id) {
            const event = new MouseEvent('click', { bubbles: true });
            this.dispatchEvent(event);
          }
        });
      } else {
        const labelGroup = d3Instance.select(svgRef.current).select('.labels');
        labelGroup.selectAll('text').each(function (d) {
          if (d.id === result.item.id) {
            const event = new MouseEvent('click', { bubbles: true });
            this.dispatchEvent(event);
          }
        });
      }
    },
    [d3Ref]
  );

  const handlePathSearchSelectNode = useCallback(
    (result) => {
      const fromNodeId = clickedFunctionNode?.id || data.root;
      if (!fromNodeId || result.type !== 'function') return;
      if (window.__highlightPathBetweenNodes) {
        const found = window.__highlightPathBetweenNodes(fromNodeId, result.item.id);
        setPathHighlightActive(Boolean(found));
        setStatusBarText(
          found
            ? `Path highlighted to ${result.item.name}`
            : `No path found to ${result.item.name}`
        );
      }
    },
    [clickedFunctionNode, data.root]
  );

  // Search hook
  const search = useSearch({
    data,
    onSelect: handleSearchSelectNode,
  });

  const pathSearch = useSearch({
    data,
    onSelect: handlePathSearchSelectNode,
    allowedTypes: ['function'],
  });

  const openSearch = useCallback(() => {
    pathSearch.closeSearch();
    search.openSearch();
  }, [pathSearch, search]);

  const openPathSearch = useCallback(() => {
    if (pathHighlightActive && window.__clearPathHighlight) {
      window.__clearPathHighlight();
      setPathHighlightActive(false);
      return;
    }
    search.closeSearch();
    pathSearch.openSearch();
  }, [pathHighlightActive, pathSearch, search]);

  const handlePanToRoot = useCallback(() => {
    if (!data.root) return;
    if (window.__panToNodeById) {
      window.__panToNodeById(data.root);
    }
  }, [data.root]);

  // Simulation hook
  const { handleZoomIn, handleZoomOut } = useSimulation({
    d3,
    svgRef,
    graphData,
    rootId: data.root,
    pathColors,
    specialLabels,
    loading,
    setStatusBarText,
    clickedFunctionNode,
    setClickedFunctionNode,
    clickedObject,
    setClickedObject,
  });

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSlash: openSearch,
    onEscape: () => {
      if (window.__resetFunctionNodeClick) {
        window.__resetFunctionNodeClick();
      }
      if (window.__resetObjectClick) {
        window.__resetObjectClick();
      }
      if (window.__clearPathHighlight) {
        window.__clearPathHighlight();
        setPathHighlightActive(false);
      }
    },
    searchOpen: search.searchOpen || pathSearch.searchOpen,
    onSearchEscape: () => {
      search.closeSearch();
      pathSearch.closeSearch();
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        Loading Physics Engine...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      <Header data={data} onRefresh={onRefresh} />
      <StatusBar text={statusBarText} />

      {/* Main Canvas Area */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden cursor-move">
        <svg ref={svgRef} className="w-full h-full block">
          <defs>
            {/* Default Arrow */}
            <marker
              id="arrow-default"
              viewBox="0 -5 10 10"
              refX="16"
              refY="0"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,-5L10,0L0,5" fill="#475569" fillOpacity="0.5" />
            </marker>

            {/* Input Arrow (Green) */}
            <marker
              id="arrow-input"
              viewBox="0 -5 10 10"
              refX="24"
              refY="0"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0,-5L10,0L0,5" fill="#4ade80" />
            </marker>

            {/* Output Arrow (Pink) */}
            <marker
              id="arrow-output"
              viewBox="0 -5 10 10"
              refX="18"
              refY="0"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0,-5L10,0L0,5" fill="#f472b6" />
            </marker>

            {/* Path Arrow (Yellow) */}
            <marker
              id="arrow-path"
              viewBox="0 -5 10 10"
              refX="18"
              refY="0"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0,-5L10,0L0,5" fill="#facc15" />
            </marker>
          </defs>

          {/* Layer Order */}
          <g className="hulls"></g>
          <g className="links"></g>
          <g className="path-links"></g>
          <g className="nodes"></g>
          <g className="labels"></g>
        </svg>

        <Legend pathColors={pathColors} />

        {clickedFunctionNode && (
          <FunctionInfoOverlay node={clickedFunctionNode} pathColors={pathColors} />
        )}

        {clickedObject && <ObjectInfoOverlay object={clickedObject} pathColors={pathColors} />}

        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

        {data.root && <HomeButton onClick={handlePanToRoot} />}
        {(clickedFunctionNode || data.root) && <PathFinderButton onClick={openPathSearch} />}

        <SearchButton onClick={openSearch} />

        <SearchModal
          searchOpen={search.searchOpen}
          searchQuery={search.searchQuery}
          setSearchQuery={search.setSearchQuery}
          searchResults={search.searchResults}
          selectedSearchIndex={search.selectedSearchIndex}
          setSelectedSearchIndex={search.setSelectedSearchIndex}
          searchInputRef={search.searchInputRef}
          searchResultsRef={search.searchResultsRef}
          handleSearchSelect={search.handleSearchSelect}
          handleSearchKeyDown={search.handleSearchKeyDown}
          closeSearch={search.closeSearch}
          pathColors={pathColors}
        />

        <SearchModal
          searchOpen={pathSearch.searchOpen}
          searchQuery={pathSearch.searchQuery}
          setSearchQuery={pathSearch.setSearchQuery}
          searchResults={pathSearch.searchResults}
          selectedSearchIndex={pathSearch.selectedSearchIndex}
          setSelectedSearchIndex={pathSearch.setSelectedSearchIndex}
          searchInputRef={pathSearch.searchInputRef}
          searchResultsRef={pathSearch.searchResultsRef}
          handleSearchSelect={pathSearch.handleSearchSelect}
          handleSearchKeyDown={pathSearch.handleSearchKeyDown}
          closeSearch={pathSearch.closeSearch}
          pathColors={pathColors}
          placeholder="Search for a destination function..."
          emptyHint="Type to search for a destination function"
        />
      </div>
    </div>
  );
};

export default NodeBrowser;
