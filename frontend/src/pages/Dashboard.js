import { useNavigate } from "react-router-dom";
import Card3D from "../components/Card3D";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card3D>
        <h2>Dashboard</h2>

        <button
          onClick={() => navigate("/map")}
          style={{ width: "100%", marginTop: "16px" }}
        >
          🗺 View Map
        </button>

        <button
          onClick={() => navigate("/report")}
          style={{ width: "100%", marginTop: "12px" }}
        >
          ➕ Report Problem
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          style={{
            width: "100%",
            marginTop: "12px",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
          }}
        >
          Logout
        </button>
      </Card3D>
    </div>
  );
}

export default Dashboard;
