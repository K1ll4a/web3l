import React, { useState, useEffect } from "react";
import { useStore } from "@tanstack/react-store";

import { Graph } from "../components/Graph";
import { HitTable } from "../components/HitTable";
import { Spinner } from "../components/Spinner";
import { TextInput } from "../components/TextInput";

import { rStore, setR } from "../store/rStore";
import {
  hitStore,
  addHit,
  setHitsLoading,
  setHitsError,
} from "../store/hitStore";
import { userStore, clearUser } from "../store/userStore";
import { coordinatesStore, setX, setY } from "../store/coordinatesStore";

import { checkPoint } from "../api/geometryApi";
import { validateSession } from "../api/sessionApi";
import { getHistory } from "../api/historyApi";

const X_OPTIONS = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"];
const R_OPTIONS = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"];

export const MainPage: React.FC = () => {
  const { r } = useStore(rStore);
  const { x, y } = useStore(coordinatesStore);
  const { username } = useStore(userStore);
  useStore(hitStore);

  const [yError, setYError] = useState<string | null>(null);

  // Проверка сессии и загрузка истории при монтировании
  useEffect(() => {
    const initSession = async () => {
      if (username) {
        try {
          const valid = await validateSession(username);
          if (!valid) {
            console.warn("Пользователь не найден в БД, очистка сессии");
            clearUser();
            return;
          }

          // Загружаем историю проверок с сервера
          try {
            setHitsLoading(true);
            const history = await getHistory(username);
            hitStore.setState({ items: history, loading: false, error: null });
          } catch (e) {
            console.error("Не удалось загрузить историю", e);
            setHitsError("Не удалось загрузить историю проверок");
          }
        } catch (e) {
          console.error("Не удалось проверить сессию", e);
        }
      }
    };
    initSession();
  }, [username]);

  const handleLogout = () => {
    clearUser();
  };

  // обработчик отправки координат
  const handleSubmit = async () => {
    if (!x) {
      alert("Выберите координату X");
      return;
    }
    if (!y) {
      alert("Выберите координату Y");
      return;
    }
    if (!r) {
      alert("Выберите радиус R");
      return;
    }
    if (!username) {
      alert("Сессия истекла, войдите заново");
      return;
    }

    const xNum = parseFloat(x);
    const yNum = parseFloat(y);
    const rNum = parseFloat(r);

    if (isNaN(xNum) || isNaN(yNum) || isNaN(rNum)) {
      alert("Некорректные координаты");
      return;
    }

    try {
      setHitsLoading(true);
      setHitsError(null);

      const hit = await checkPoint(username, xNum, yNum, rNum);
      addHit(hit);
    } catch (e) {
      console.error(e);
      setHitsError("Не удалось выполнить проверку точки");
      alert("Ошибка при обращении к серверу");
    } finally {
      setHitsLoading(false);
    }
  };

  // обработчик нажатия по графику
  const handlePointClick = async (clickX: number, clickY: number) => {
    setX(clickX.toString());
    setY(clickY.toString());

    if (!r) {
      alert("Сначала выберите значение R");
      return;
    }

    if (!username) {
      alert("Сессия истекла, войдите заново");
      return;
    }

    try {
      setHitsLoading(true);
      setHitsError(null);

      const hit = await checkPoint(username, clickX, clickY, parseFloat(r));
      addHit(hit);
    } catch (e) {
      console.error(e);
      setHitsError("Не удалось выполнить проверку точки");
      alert("Ошибка при обращении к серверу");
    } finally {
      setHitsLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>Проверка точек</h1>
          <div style={{ fontSize: "14px", color: "var(--muted)", marginTop: "4px" }}>
            Пользователь: <span style={{ color: "var(--accent)", fontWeight: "600" }}>{username}</span>
          </div>
        </div>
        <button className="btn danger" onClick={handleLogout}>
          Выйти
        </button>
      </header>

      <div className="grid-main">
        {/* Левая панель - контролы ввода */}
        <div className="card">
          <h3>Параметры точки</h3>

          <Spinner
            label="Координата X"
            value={x}
            options={X_OPTIONS}
            onChange={setX}
          />

          <TextInput
            label="Координата Y (-3 до 3)"
            value={y || ""}
            min={-3}
            max={3}
            onChange={setY}
            onError={setYError}
          />

          <Spinner
            label="Радиус R"
            value={r}
            options={R_OPTIONS}
            onChange={setR}
          />

          {yError && <div className="error">{yError}</div>}

          <button
            className="btn primary"
            onClick={handleSubmit}
            style={{ marginTop: "16px", width: "100%" }}
          >
            Проверить точку
          </button>
        </div>

        {/* Правая панель - график и история */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card">
            <Graph r={r ? parseFloat(r) : 1} onPointClick={handlePointClick} />
          </div>

          <div className="card">
            <HitTable />
          </div>
        </div>
      </div>
    </div>
  );
};
