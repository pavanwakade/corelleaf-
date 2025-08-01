import { useEffect, useRef, useState } from "react";

export function useNeonCursor(cursorOptions) {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursor = (e) => {
      // Update main cursor
      cursor.style.transform = `translate(${e.clientX - cursorOptions.offset}px, ${e.clientY - cursorOptions.offset}px)`;

      // Update trail with delay
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          setTimeout(() => {
            trail.style.transform = `translate(${e.clientX - cursorOptions.trailOffset}px, ${e.clientY - cursorOptions.trailOffset}px)`;
          }, index * cursorOptions.trailDelay);
        }
      });
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, []);

  return { cursorRef, trailRefs, isActive };
}
