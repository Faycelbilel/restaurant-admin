import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { AppStore } from "@/lib/store/store";
import { API_CONFIG } from "./config";
import { getGlobalAccessToken, setGlobalAccessToken } from "@/shared/contexts/AuthContext";

class DataServiceClass {
  private readonly client: AxiosInstance;
  private store: AppStore | null = null;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    const API_ENDPOINT = API_CONFIG.BASE_URL;

    this.client = axios.create({
      baseURL: API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  public setStore(storeInstance: AppStore): void {
    this.store = storeInstance;
  }

  private authHeader(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    const token = getGlobalAccessToken();

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.headers && config.headers instanceof AxiosHeaders) {
          for (const [key, value] of Object.entries(this.authHeader())) {
            config.headers.set(key, value);
          }
        }
        return config;
      },
      (error: AxiosError) => {
        throw error;
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            // Check if response has no body (empty 401) - only refresh token on empty 401
            // 401 with body means authentication error (like invalid credentials) - treat as 400
            const responseData = error.response.data;
            const hasNoBody = 
              responseData === null || 
              responseData === undefined || 
              responseData === '' ||
              (typeof responseData === 'object' && Object.keys(responseData).length === 0);

            if (hasNoBody) {
              // Empty 401 - token expired, refresh it
              this.refreshTokenPromise ??= (async () => {
                try {
                  // Perform token refresh without access token
                  const refreshResponse = await axios.post<{ accessToken: string }>(
                    `${API_CONFIG.BASE_URL}/auth/refresh`,
                    {},
                    {
                      withCredentials: true,
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  const newAccessToken = refreshResponse.data.accessToken;

                  // Store new access token in global context
                  setGlobalAccessToken(newAccessToken);

                  return newAccessToken;
                } catch (refreshError) {
                  // Clear tokens on refresh failure
                  setGlobalAccessToken(null);
                  throw refreshError;
                } finally {
                  // Clear the promise after completion
                  this.refreshTokenPromise = null;
                }
              })();

              // Wait for the refresh to complete
              const newAccessToken = await this.refreshTokenPromise;

              // Update the authorization header with new token
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }

              // Retry the original request with new token
              return this.client.request(originalRequest);
            } else {
              // 401 with body - authentication error (invalid credentials, etc.)
              // Treat like 400 - don't refresh, just throw the error
              throw error;
            }
          } catch (refreshError) {
            throw refreshError;
          }
        }
        throw error;
      }
    );
  }

  async get<T = unknown>(
    path: string = "",
    params: Record<string, unknown> = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.get(path, { params });
  }

  async post<T = unknown>(
    path: string = "",
    data: unknown = {},
    optionalHeader: Record<string, string> = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.post(path, data, {
      headers: { ...this.authHeader(), ...optionalHeader },
    });
  }

  async patch<T = unknown>(
    path: string = "",
    data: unknown = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.patch(path, data);
  }

  async put<T = unknown>(
    path: string = "",
    data: unknown = {},
    optionalHeader: Record<string, string> = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.put(path, data, {
      headers: { ...this.authHeader(), ...optionalHeader },
    });
  }

  async delete<T = unknown>(
    path: string = "",
    data: unknown = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.delete(path, { data });
  }
}

export const DataService = new DataServiceClass();
