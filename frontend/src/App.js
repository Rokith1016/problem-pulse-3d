function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #000000, #1f2937)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ textAlign: "center" }}>
        
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          ProblemPulse 3D
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "25px" }}>
          Report and visualize local problems on a 3D map
        </p>

        <button style={{
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "16px",
          cursor: "pointer"
        }}>
          View Map
        </button>

      </div>
    </div>
  );
}

export default App;
