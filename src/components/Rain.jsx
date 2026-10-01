import { useEffect, useRef } from "react";
import "../styles/weather.css";

function Rain() {
  const rainRef = useRef(null);

  useEffect(() => {
    const container = rainRef.current;
    const drops = [];

    const dropCount = 350;

    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");

      drop.className = "rain-drop";

      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.35 + Math.random() * 0.4}s`;
      drop.style.animationDelay = `${Math.random() * -2}s`;
      drop.style.height = `${12 + Math.random() * 18}px`;
      drop.style.opacity = `${0.35 + Math.random() * 0.45}`;

      container.appendChild(drop);
      drops.push(drop);
    }

    return () => {
      drops.forEach((drop) => drop.remove());
    };
  }, []);

  return <div ref={rainRef} className="rain-container" />;
}

export default Rain;
