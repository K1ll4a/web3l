/// <reference types="vite/client" />

declare module "*.css";
const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "/ws";
