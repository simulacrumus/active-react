import type { ApiClient } from "../ApiClient";
import { AxiosApiClient } from "./AxiosApiClient";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
const apiKey = import.meta.env.VITE_API_KEY || "";

let deviceId = "";
if (typeof window !== "undefined" && window.localStorage) {
  deviceId = localStorage.getItem("deviceId")?.toUpperCase() || "";
}

export const apiClient: ApiClient = new AxiosApiClient(
  apiBaseUrl,
  apiKey,
  deviceId,
);
