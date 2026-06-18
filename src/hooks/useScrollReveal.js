import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, visible].
 * Attach `ref` to any DOM element — `visible` flips true once it enters the viewport.
 * @param {number} threshold  – 0..1, fraction visible before triggering (default 0.15)
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // fire once only
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
