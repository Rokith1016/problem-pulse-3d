import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you?" },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Server error ❌" },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div style={styles.button} onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div style={styles.chatBox}>
          <div style={styles.header}>Problem Pulse Bot</div>

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  background:
                    m.from === "user"
                      ? "#007aff"
                      : "rgba(255,255,255,0.1)",
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.send} onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    cursor: "pointer",
    zIndex: 999,
  },

  chatBox: {
    position: "fixed",
    bottom: 90,
    right: 20,
    width: 300,
    height: 400,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    color: "#fff",
    zIndex: 999,
  },

  header: {
    padding: 12,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    fontWeight: "bold",
    textAlign: "center",
  },

  messages: {
    flex: 1,
    padding: 10,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  message: {
    maxWidth: "80%",
    padding: "8px 12px",
    borderRadius: 12,
    fontSize: 13,
  },

  inputArea: {
    display: "flex",
    padding: 8,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },

  input: {
    flex: 1,
    borderRadius: 10,
    border: "none",
    padding: 8,
    outline: "none",
  },

  send: {
    marginLeft: 6,
    borderRadius: 10,
    border: "none",
    padding: "0 12px",
    cursor: "pointer",
  },
};

export default Chatbot;
