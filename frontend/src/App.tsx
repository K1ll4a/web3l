import React, { useEffect, useState } from "react";
import { useStore } from "@tanstack/react-store";
import { userStore, isLoggedIn } from "./store/userStore";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";

export const App: React.FC = () => {
  const [, force] = useState(0);

  useEffect(() => {
    const unsub = userStore.subscribe(() => force((x) => x + 1));
    return () => unsub();
  }, []);

  const { token } = useStore(userStore);
  const logged = isLoggedIn();

  return (
    <div className="app">
      {logged && token ? <MainPage /> : <LoginPage />}
    </div>
  );
};

export default App;
