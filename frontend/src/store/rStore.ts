import { Store } from "@tanstack/react-store";

export const rStore = new Store<{ r: string | null }>({
  r: null,
});

export const setR = (value: string | null) => {
  rStore.setState(() => ({ r: value }));
};
