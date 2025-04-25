import { type FormEvent, useState } from "react";
import styles from "./styles.module.css";
import type { LoginFormProps } from "./types";

const LoginForm = ({ onLogin, error }: LoginFormProps) => {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onLogin(userId.trim());
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Welcome to LiveChat</h2>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="userId">Choose your username to start</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Type your name here"
            required
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Enter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
