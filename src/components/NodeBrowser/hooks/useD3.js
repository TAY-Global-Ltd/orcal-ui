import { useState, useEffect, useRef } from 'react';

/**
 * Hook to load D3.js dynamically
 * Returns { d3, loading } where d3 is the D3 library reference
 */
export const useD3 = () => {
  const [loading, setLoading] = useState(true);
  const d3Ref = useRef(null);

  useEffect(() => {
    if (window.d3) {
      d3Ref.current = window.d3;
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://d3js.org/d3.v7.min.js';
    script.onload = () => {
      d3Ref.current = window.d3;
      setLoading(false);
    };
    document.body.appendChild(script);
  }, []);

  return { d3: d3Ref.current, d3Ref, loading };
};
