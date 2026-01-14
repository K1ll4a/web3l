import React, { useState } from "react";
import { register } from "../api/authApi";
import { setAuthMode } from "../store/authStore";

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }


    setLoading(true);

    try {
      const ok = await register(username, password);
      if (!ok) {
        setError("Пользователь уже существует");
      } else {
        // Успешная регистрация: не логиним автоматически, предлагаем войти
        setAuthMode("login");
        setError("Регистрация успешна. Войдите с паролем.");
      }
    } catch (err) {
      console.error(err);
      setError("Ошибка регистрации. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    setAuthMode("login");
  };

  return (
    <section>
      <h3>Регистрация</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Повтор пароля</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        <button
          type="button"
          style={{ marginLeft: "8px" }}
          onClick={handleGoToLogin}
        >
          Уже есть аккаунт? Войти
        </button>
      </form>
    </section>
  );
};
