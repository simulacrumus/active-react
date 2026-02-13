import { useState, useEffect, useRef } from "react";

export type ScrollDirection = "up" | "down" | null;

const SCROLL_THRESHOLD = 10;

/**
 * Returns the current scroll direction based on window scroll position.
 * Uses a small threshold to avoid jitter. Returns null when at top or not yet scrolled.
 */
export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        if (y <= 0) {
          setDirection(null);
        } else if (Math.abs(y - lastY.current) >= SCROLL_THRESHOLD) {
          setDirection(y > lastY.current ? "down" : "up");
          lastY.current = y;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
}
