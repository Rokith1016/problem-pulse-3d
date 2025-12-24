import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function MapDashboard() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      projection: "globe",
      center: [0, 20],
      zoom: 1.5,
      pitch: 0,
      bearing: 0,
      antialias: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // 🌌 Space-like background
    map.on("style.load", () => {
      map.setFog({
        range: [0.5, 10],
        color: "#000000",
        "horizon-blend": 0.2,
        "space-color": "#000000",
        "star-intensity": 0.3,
      });
    });

    /* ===========================
       🌀 MANUAL SPIN WITH MOMENTUM
    ============================ */
    let isDragging = false;
    let lastX = 0;
    let velocity = 0;

    map.on("mousedown", (e) => {
      isDragging = true;
      lastX = e.point.x;
      velocity = 0;
    });

    map.on("mousemove", (e) => {
      if (!isDragging) return;
      const deltaX = e.point.x - lastX;
      lastX = e.point.x;
      velocity = deltaX * 0.15;
      map.rotateTo(map.getBearing() + velocity, { duration: 0 });
    });

    map.on("mouseup", () => {
      isDragging = false;
      const inertia = () => {
        if (Math.abs(velocity) < 0.01) return;
        velocity *= 0.95;
        map.rotateTo(map.getBearing() + velocity, { duration: 0 });
        requestAnimationFrame(inertia);
      };
      inertia();
    });

    // 🚀 Fast zoom
    map.scrollZoom.setWheelZoomRate(1.5);
    map.scrollZoom.enable();

    // 🎯 Double click zoom
    map.on("dblclick", (e) => {
      map.flyTo({
        center: e.lngLat,
        zoom: map.getZoom() + 4,
        speed: 0.9,
        curve: 1.4,
        pitch: 65,
      });
    });

    return () => map.remove();
  }, []);

  /* ===========================
     📍 MARK MY LOCATION
  ============================ */
  const markMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const lng = pos.coords.longitude;
      const lat = pos.coords.latitude;

      // Remove old marker
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add new marker
      markerRef.current = new maplibregl.Marker({ color: "red" })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      // Fly to location
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        pitch: 65,
        bearing: -20,
        speed: 0.8,
        curve: 1.4,
      });
    });
  };

  return (
    <>
      {/* 📍 BUTTON */}
      <button
        onClick={markMyLocation}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          padding: "10px 16px",
          borderRadius: "12px",
          border: "none",
          background: "rgba(255,255,255,0.9)",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        📍 Mark My Location
      </button>

      {/* 🗺️ MAP */}
      <div
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
          background: "black",
        }}
      />
    </>
  );
}

export default MapDashboard;
