// index.tsx
import { useState } from "react";
import ReactDOM from "react-dom";
import { deleteUserFromDb, signInWithAPI } from "../api";

export default function IndexPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async () => {
    try {
      const user = await signInWithAPI({ email, password });

      if (user) {
        const isDeleted = await deleteUserFromDb({ email, password });
        if (isDeleted) {
          alert("Deleted account!");
        }
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting account");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#4CAF50" }}>TEST YOUR APP - DELETE ACCOUNT</h1>
      <label htmlFor="email" style={{ color: "#333" }}>
        Email:
      </label>
      <br />
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "5px", margin: "5px", width: "200px" }}
      />
      <br />
      <label htmlFor="password" style={{ color: "#333" }}>
        Password:
      </label>
      <br />
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "5px", margin: "5px", width: "200px" }}
      />
      <br />
      <button
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

ReactDOM.render(<IndexPage />, document.getElementById("root"));
