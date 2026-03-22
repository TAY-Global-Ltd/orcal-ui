import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { fuzzyMatch } from '../utils';

export const useSearch = ({ data, onSelect, allowedTypes }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

  // Search results computation
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !data) return [];

    const query = searchQuery.trim();
    const results = [];
    const allowObjects = !allowedTypes || allowedTypes.includes('object');
    const allowFunctions = !allowedTypes || allowedTypes.includes('function');

    // Search objects
    if (allowObjects) {
      data.objects.forEach((obj) => {
        const nameScore = fuzzyMatch(query, obj.name);
        const pathScore = fuzzyMatch(query, obj.path);
        const bestScore = Math.max(nameScore, pathScore);

        if (bestScore >= 0) {
          results.push({
            type: 'object',
            item: obj,
            matchField: nameScore >= pathScore ? 'name' : 'path',
            score: bestScore,
          });
        }
      });
    }

    // Search functions
    if (allowFunctions) {
      data.functions.forEach((func) => {
        const nameScore = fuzzyMatch(query, func.name);
        const pathScore = fuzzyMatch(query, func.objectPath);
        const bestScore = Math.max(nameScore, pathScore);

        if (bestScore >= 0) {
          results.push({
            type: 'function',
            item: func,
            matchField: nameScore >= pathScore ? 'name' : 'path',
            score: bestScore,
          });
        }
      });
    }

    // Sort by score (highest first) and limit to 20 results
    return results.sort((a, b) => b.score - a.score).slice(0, 20);
  }, [searchQuery, data, allowedTypes]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedSearchIndex(0);
  }, [searchQuery]);

  // Scroll selected item into view
  useEffect(() => {
    if (searchResultsRef.current && searchResults.length > 0) {
      const selectedElement = searchResultsRef.current.children[selectedSearchIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedSearchIndex, searchResults.length]);

  // Handle search selection
  const handleSearchSelect = useCallback(
    (result) => {
      setSearchOpen(false);
      setSearchQuery('');
      setSelectedSearchIndex(0);
      onSelect(result);
    },
    [onSelect]
  );

  // Open search
  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  }, []);

  // Close search
  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedSearchIndex(0);
  }, []);

  // Handle keyboard navigation in search
  const handleSearchKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && searchResults.length > 0) {
        handleSearchSelect(searchResults[selectedSearchIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSearchIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSearchIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    },
    [searchResults, selectedSearchIndex, handleSearchSelect]
  );

  return {
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
    openSearch,
    closeSearch,
  };
};
