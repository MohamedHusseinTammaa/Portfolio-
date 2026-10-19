import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element scrolls into view.
 * Content is visible by default (CSS opacity: 1); the hook only
 * adds a `.visible` class for the entry animation enhancement.
 */
export function useInView<T extends HTMLElement>(
  threshold = 0.12,
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
