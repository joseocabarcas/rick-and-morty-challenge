import { useCallback, useEffect, useState } from 'react';

export function useIsVisible() {
  const [isIntersecting, setIntersecting] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const ref = useCallback((element: HTMLDivElement | null) => {
    // Actualiza el nodo solo si el elemento existe
    if (element) {
      setNode(element);
    }
  }, []);

  useEffect(() => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 0.5, rootMargin: '0px' },
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    }
  }, [node]);

  return { isIntersecting, ref };
}
