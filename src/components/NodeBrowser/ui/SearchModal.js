import React from 'react';
import { Search, Circle, Box, Route, Home } from 'lucide-react';
import { getPathColor } from '../utils';

export const SearchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 shadow-xl hover:bg-slate-100 transition-colors"
      title="Search (Press /)"
    >
      <Search className="w-5 h-5 text-slate-500" />
    </button>
  );
};

export const HomeButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-24 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 shadow-xl hover:bg-slate-100 transition-colors"
      title="Go to root node"
    >
      <Home className="w-5 h-5 text-emerald-600" />
    </button>
  );
};

export const PathFinderButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-14 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 shadow-xl hover:bg-slate-100 transition-colors"
      title="Find path from selected node or root"
    >
      <Route className="w-5 h-5 text-amber-500" />
    </button>
  );
};

export const SearchModal = ({
  searchOpen,
  searchQuery,
  setSearchQuery,
  searchResults,
  selectedSearchIndex,
  setSelectedSearchIndex,
  searchInputRef,
  searchResultsRef,
  handleSearchSelect,
  handleSearchKeyDown,
  closeSearch,
  pathColors,
  placeholder = 'Search objects or functions...',
  emptyHint = 'Type to search for objects or functions in the graph',
}) => {
  if (!searchOpen) return null;

  return (
    <div
      className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-start justify-center pt-20 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSearch();
        }
      }}
    >
      <div className="bg-white border border-slate-300 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm"
            onKeyDown={handleSearchKeyDown}
          />
          <span className="text-xs text-slate-400 ml-2">ESC to close</span>
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto" ref={searchResultsRef}>
          {searchQuery.trim() && searchResults.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-400 text-sm">
              No results found for "{searchQuery}"
            </div>
          )}
          {searchResults.map((result, index) => (
            <button
              key={`${result.type}-${result.item.id}`}
              onClick={() => handleSearchSelect(result)}
              onMouseEnter={() => setSelectedSearchIndex(index)}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-colors text-left ${
                index === selectedSearchIndex ? 'bg-slate-100' : ''
              }`}
            >
              {/* Icon with color coding */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  result.type === 'function'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-amber-100 text-amber-600'
                }`}
              >
                {result.type === 'function' ? (
                  <Circle className="w-4 h-4" />
                ) : (
                  <Box className="w-4 h-4" />
                )}
              </div>

              {/* Name and path */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 font-medium truncate">{result.item.name}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      result.type === 'function'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {result.type}
                  </span>
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5">
                  {result.type === 'function'
                    ? result.item.objectPath
                    : result.item.path}
                </div>
              </div>

              {/* Category color indicator */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: getPathColor(
                    result.item.root || result.item.path,
                    pathColors
                  ),
                }}
              />
            </button>
          ))}
        </div>

        {/* Footer hint */}
        {!searchQuery.trim() && (
          <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-400">
            {emptyHint}
          </div>
        )}
      </div>
    </div>
  );
};
