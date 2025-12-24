import { useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function GlobeBackground() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "globe-bg",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      projection: "globe",
      center: [0, 20],
      zoom: 1.4,
      pitch: 0,
      bearing: 0,
      antialias: true,
      interactive: false, // 👈 IMPORTANT (login stays usable)
    });

    map.on("style.load", () => {
      map.setFog({
        range: [0.5, 10],
        color: "#000",
        "space-color": "#000",
        "star-intensity": 0.25,
      });
    });

    // 🌍 SLOW AUTO ROTATION
    let bearing = 0;
    const rotate = () => {
      bearing += 0.02; // speed (smaller = slower)
      map.rotateTo(bearing, { duration: 0 });
      requestAnimationFrame(rotate);
    };
    rotate();

    return () => map.remove();
  }, []);

  return (
    <div
      id="globe-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "black",
      }}
    />
  );
}

export default GlobeBackground;
