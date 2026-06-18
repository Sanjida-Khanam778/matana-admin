import { useEffect } from "react";

export default function useScrollReveal({
  selector = ".reveal",
  threshold = [0, 0.15, 0.35],
  rootMargin = "0px 0px -10% 0px",
} = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.intersectionRatio > threshold[1];
          entry.target.classList.toggle("reveal-visible", visible);
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, rootMargin]);
}

export function useScrollRevealGentle() {
  useScrollReveal({
    threshold: [0, 0.1, 0.25],
    rootMargin: "0px 0px -30% 0px",
  });
}

export function useScrollRevealSmooth() {
  useScrollReveal({
    threshold: [0, 0.15, 0.35],
    rootMargin: "0px 0px -22% 0px",
  });
}

export function useScrollRevealFloat() {
  useScrollReveal({
    threshold: [0, 0.12, 0.28],
    rootMargin: "0px 0px -18% 0px",
  });
}

export function useScrollRevealBounce() {
  useScrollReveal({
    threshold: [0, 0.2, 0.4],
    rootMargin: "0px 0px -16% 0px",
  });
}
