import { Store } from "@tanstack/react-store";

export interface CoordinatesState {
  x: string | null;
  y: string | null;
}

export const coordinatesStore = new Store<CoordinatesState>({
  x: null,
  y: null,
});

export const setCoordinates = (x: string | null, y: string | null) => {
  coordinatesStore.setState(() => ({ x, y }));
};

export const setX = (x: string | null) => {
  coordinatesStore.setState((prev) => ({ ...prev, x }));
};

export const setY = (y: string | null) => {
  coordinatesStore.setState((prev) => ({ ...prev, y }));
};
