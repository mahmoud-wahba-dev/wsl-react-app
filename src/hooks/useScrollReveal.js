import { useEffect, useRef, useState } from "react";

/**
 * Adds `is-visible` when the element enters the viewport (once).
 * Use with `.landing-reveal` CSS utility.
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
} = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible, className: visible ? "is-visible" : "" };
}

export default useScrollReveal;
