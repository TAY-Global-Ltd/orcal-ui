import { useEffect } from 'react';

/**
 * Hook to handle keyboard shortcuts for the graph visualizer
 */
export const useKeyboardShortcuts = ({
  onSlash,
  onEscape,
  searchOpen,
  onSearchEscape,
}) => {
  // Keyboard listener for "/" to open search
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger if already in an input field
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (event.key === '/') {
        event.preventDefault();
        onSlash();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSlash]);

  // Close search on Escape
  useEffect(() => {
    const handleSearchEscape = (event) => {
      if (event.key === 'Escape' && searchOpen) {
        onSearchEscape();
      }
    };

    window.addEventListener('keydown', handleSearchEscape);
    return () => window.removeEventListener('keydown', handleSearchEscape);
  }, [searchOpen, onSearchEscape]);

  // Escape key handler for unfocusing/unselecting nodes
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && !searchOpen) {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onEscape, searchOpen]);
};
