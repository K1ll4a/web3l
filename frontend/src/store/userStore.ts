import { Store } from "@tanstack/react-store";

export interface UserState {
  username: string | null;
  token: string | null;
}

// Загрузка из localStorage при инициализации
const loadUserFromStorage = (): UserState => {
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load user from localStorage", e);
  }
  return { username: null, token: null };
};

// Сохранение в localStorage
const saveUserToStorage = (state: UserState) => {
  try {
    localStorage.setItem("user", JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save user to localStorage", e);
  }
};

export const userStore = new Store<UserState>(loadUserFromStorage());

export const setUser = (username: string) => {
  const newState = { username, token: username };
  userStore.setState(newState);
  saveUserToStorage(newState);
};

export const clearUser = () => {
  const newState = { username: null, token: null };
  userStore.setState(newState);
  saveUserToStorage(newState);
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  const { username } = userStore.state;
  return !!username;
};
