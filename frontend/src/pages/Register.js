import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* =========================
     🌍 STATIC GLOBE + BLINKING LIGHTS
  ========================= */
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "register-globe",
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      projection: "globe",
      center: [0, 20],
      zoom: 1.3,
      bearing: 0,
      pitch: 0,
      interactive: false,
      antialias: true,
    });

    map.on("style.load", () => {
      map.setFog({
        range: [0.5, 8],
        color: "#000",
        "space-color": "#000",
        "horizon-blend": 0.1,
        "star-intensity": 0.15,
      });

      map.addSource("lights", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            { geometry: { type: "Point", coordinates: [-74, 40.7] } },
            { geometry: { type: "Point", coordinates: [77.2, 28.6] } },
            { geometry: { type: "Point", coordinates: [139.7, 35.6] } },
            { geometry: { type: "Point", coordinates: [2.35, 48.85] } },
            { geometry: { type: "Point", coordinates: [72.87, 19.07] } },
          ],
        },
      });

      map.addLayer({
        id: "lights-layer",
        type: "circle",
        source: "lights",
        paint: {
          "circle-radius": 4,
          "circle-color": "#00ffff",
          "circle-blur": 1,
          "circle-opacity": 0.4,
        },
      });

      // ✨ blinking animation
      let opacity = 0.3;
      let up = true;

      setInterval(() => {
        opacity = up ? opacity + 0.05 : opacity - 0.05;
        if (opacity >= 0.8) up = false;
        if (opacity <= 0.3) up = true;

        map.setPaintProperty("lights-layer", "circle-opacity", opacity);
      }, 140);
    });

    return () => map.remove();
  }, []);

  /* =========================
     📝 REGISTER
  ========================= */
  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created successfully ✅");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* 🌍 Globe */}
      <div
        id="register-globe"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* 🧊 Register Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 380,
            padding: 28,
            borderRadius: 16,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(14px)",
            color: "#fff",
            boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Create Account</h2>
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            Join Problem Pulse
          </p>

          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button onClick={handleRegister} style={buttonStyle}>
            Register
          </button>

          <p style={{ textAlign: "center", marginTop: 12 }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginTop: 12,
  borderRadius: 10,
  border: "none",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  marginTop: 16,
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Register;
