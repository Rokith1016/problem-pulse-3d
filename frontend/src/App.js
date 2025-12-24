import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MapDashboard from "./pages/MapDashboard";
import ReportProblem from "./pages/ReportProblem";
import ProtectedRoute from "./ProtectedRoute";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportProblem />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* 🤖 Floating Chatbot (GLOBAL) */}
      <Chatbot />
    </Router>
  );
}

export default App;
