import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportProblem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  // 📍 Detect user location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      () => alert("Location permission denied")
    );
  };

  const submitProblem = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      if (!image) {
        alert("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("image", image);

      // ✅ USE RELATIVE URL (PROXY HANDLES BACKEND)
      await axios.post("/api/problems", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Problem reported successfully ✅");
      navigate("/map");
    } catch (err) {
      console.error("SUBMIT ERROR:", err.response?.data || err.message);
      alert("Failed to submit");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Report Problem</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={detectLocation}>Detect My Location</button>
      <br /><br />

      <input value={latitude} placeholder="Latitude" readOnly />
      <br /><br />

      <input value={longitude} placeholder="Longitude" readOnly />
      <br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br /><br />

      <button onClick={submitProblem}>Submit Problem</button>
    </div>
  );
}

export default ReportProblem;
