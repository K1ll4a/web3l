import { Store } from "@tanstack/react-store";

export type AuthMode = "login" | "register";

export interface AuthState {
  mode: AuthMode;
}

export const authStore = new Store<AuthState>({
  mode: "login",
});

// Смена режима (вход / регистрация)
export function setAuthMode(mode: AuthMode) {
  authStore.setState({ mode });
}
