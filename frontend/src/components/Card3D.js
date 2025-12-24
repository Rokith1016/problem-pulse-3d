import { motion } from "framer-motion";

function Card3D({ children }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 180 }}
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px)",
        borderRadius: "22px",
        padding: "28px",
        boxShadow: "0 30px 60px rgba(0,0,0,0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
        maxWidth: "420px",
        margin: "auto",
      }}
    >
      {children}
    </motion.div>
  );
}

export default Card3D;
