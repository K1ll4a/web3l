import { Store } from "@tanstack/react-store";

export interface Hit {
  id?: number;
  x: number;
  y: number;
  r: number;
  hit: boolean;
  createdAt?: string;
}

interface HitState {
  items: Hit[];
  loading: boolean;
  error: string | null;
}

export const hitStore = new Store<HitState>({
  items: [],
  loading: false,
  error: null,
});

export const setHits = (items: Hit[]) =>
  hitStore.setState((prev) => ({ ...prev, items }));

export const addHit = (hit: Hit) =>
  hitStore.setState((prev) => ({ ...prev, items: [hit, ...prev.items] }));

export const setHitsLoading = (loading: boolean) =>
  hitStore.setState((prev) => ({ ...prev, loading }));

export const setHitsError = (error: string | null) =>
  hitStore.setState((prev) => ({ ...prev, error }));
