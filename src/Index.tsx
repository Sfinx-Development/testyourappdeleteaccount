// index.tsx
import { useState } from "react";
import { deleteUserFromDB, signInWithAPI } from "../api";
import ReactDOM from "react-dom";

function IndexPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async () => {
    try {
      const user = await signInWithAPI({ email: email, password: password });

      if (user) {
        const isDeleted = await deleteUserFromDB(user.uid);
        if (isDeleted) {
          alert("Deleted account!");
        }
      } else {
        alert(`Failed to delete account`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting account");
    }
  };

  return (
    <div>
      <h1>TEST YOUR APP - DELETE ACCOUNT</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

ReactDOM.render(<IndexPage />, document.getElementById("root"));
