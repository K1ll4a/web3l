import React, { useState } from "react";
import { login, register } from "../api/authApi";
import { setUser } from "../store/userStore";

interface Props {
  onLoggedIn: () => void;
}

export const LoginForm: React.FC<Props> = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Введите логин и пароль");
      return;
    }

    try {
      setLoading(true);

      // Вызов нужного SOAP-метода
      const ok =
        mode === "login"
          ? await login(username, password)
          : await register(username, password);

      if (!ok) {
        setError(
          mode === "login"
            ? "Неверный логин или пароль"
            : "Пользователь уже существует"
        );
        return;
      }

      if (mode === "login") {
        setUser(username);
        onLoggedIn();
      } else {
        // После успешной регистрации предлагаем войти
        setMode("login");
        setError("Регистрация успешна. Введите пароль для входа.");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ??
          (mode === "login"
            ? "Ошибка входа. Проверьте логин и пароль."
            : "Ошибка регистрации.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Вход в систему</h1>

      <div className="field">
        <label>Логин</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="buttons">
        <button type="submit" disabled={loading}>
          {mode === "login" ? "Войти" : "Зарегистрироваться"}
        </button>

        <button
          type="button"
          onClick={() =>
            setMode((m) => (m === "login" ? "register" : "login"))
          }
        >
          {mode === "login"
            ? "Нет аккаунта? Регистрация"
            : "Уже есть аккаунт? Войти"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
