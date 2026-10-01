import { useEffect, useRef } from "react";
import "../styles/weather.css";

function Snow() {
  const snowRef = useRef(null);

  useEffect(() => {
    const container = snowRef.current;
    const flakes = [];

    const flakeCount = 180;

    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement("div");

      flake.className = "snow-flake";

      const size = 3 + Math.random() * 6;
      const duration = 5 + Math.random() * 6;

      flake.style.left = `${Math.random() * 100}%`;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.opacity = `${0.4 + Math.random() * 0.6}`;
      flake.style.animationDuration = `${duration}s`;
      flake.style.animationDelay = `${Math.random() * -duration}s`;
      flake.style.setProperty(
        "--snow-drift",
        `${-4 + Math.random() * 8}vw`
      );

      container.appendChild(flake);
      flakes.push(flake);
    }

    return () => {
      flakes.forEach((flake) => flake.remove());
    };
  }, []);

  return <div ref={snowRef} className="snow-container" />;
}

export default Snow;