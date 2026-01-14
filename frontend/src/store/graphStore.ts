import { Store } from "@tanstack/store";

export type Hit = {
    x: number;
    y: number;
    r: number;
    hit: boolean;
    timestamp: string;
};

export const graphStore = new Store({
    hits: [] as Hit[],
    r: 1
});

export function addHit(hit: Hit) {
    graphStore.setState((s) => ({
        ...s,
        hits: [...s.hits, hit]
    }));
}

export function setR(r: number) {
    graphStore.setState((s) => ({ ...s, r }));
}
