export interface ApiClient {
  get<T>(url: string, params?: Record<string, string>): Promise<T>;
}
