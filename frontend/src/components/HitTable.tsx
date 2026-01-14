import React, { useState, useSyncExternalStore } from "react";
import { hitStore, setHits } from "../store/hitStore";
import { userStore } from "../store/userStore";
import { clearHistory } from "../api/historyApi";
import "./HitTable.css";

export const HitTable: React.FC = () => {
  const { items, loading, error } = useSyncExternalStore(
    hitStore.subscribe,
    () => hitStore.state
  );
  const { username } = useSyncExternalStore(
    userStore.subscribe,
    () => userStore.state
  );
  const [clearing, setClearing] = useState(false);

  const handleClearHistory = async () => {
    if (!window.confirm("Вы уверены, что хотите очистить историю проверок?")) {
      return;
    }

    setClearing(true);
    try {
      if (username) {
        await clearHistory(username);
      }
      setHits([]);
    } catch (e) {
      console.error("Ошибка при очистке истории", e);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="hit-table-container">
      <div className="hit-table-header">
        <h3>История проверок</h3>
        <button
          className="btn ghost"
          onClick={handleClearHistory}
          disabled={clearing || items.length === 0}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          {clearing ? "Очистка..." : "Очистить историю"}
        </button>
      </div>

      <div className="hit-table-content">{loading ? (
        <div className="hit-table-loading">Загрузка…</div>
      ) : null}

        {error && <div className="hit-table-error">{error}</div>}

        {!loading && items.length === 0 && (
          <div className="hit-table-empty">Пока нет результатов</div>
        )}

        {items.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Попадание</th>
              </tr>
            </thead>
            <tbody>
              {items.map((h, idx) => (
                <tr key={`${h.x}-${h.y}-${h.r}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{h.x}</td>
                  <td>{h.y}</td>
                  <td>{h.r}</td>
                  <td>
                    <span className={`badge ${h.hit ? "ok" : "bad"}`}>
                      {h.hit ? "HIT" : "MISS"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
