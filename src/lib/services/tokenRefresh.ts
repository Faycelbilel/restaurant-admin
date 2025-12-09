import { authApi } from "./authApi";

let refreshPromise: Promise<string> | null = null;

/**
 * Refreshes the access token using the refresh token cookie
 * Prevents multiple simultaneous refresh requests with a singleton pattern
 */
export async function refreshAccessToken(): Promise<string> {
  // Prevent multiple simultaneous refresh requests
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = authApi
    .refresh()
    .then((accessToken) => {
      return accessToken;
    })
    .catch((error) => {
      // Clear tokens and redirect to login on refresh failure
      if (globalThis.window !== undefined) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        globalThis.window.location.href = "/login";
      }
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

/**
 * Fetch wrapper with automatic authentication and token refresh
 * Automatically adds Authorization header and retries with new token on 401
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const hasWindow = globalThis.window !== undefined;
  const storedAccessToken = hasWindow
    ? localStorage.getItem("accessToken")
    : null;
  const storedRefreshToken = hasWindow
    ? localStorage.getItem("refreshToken")
    : null;

  let accessToken = storedAccessToken;

  // Ensure we refresh first if no access token but refresh token exists (initial page load)
  if (!accessToken && storedRefreshToken) {
    try {
      accessToken = await refreshAccessToken();
    } catch (error) {
      throw error;
    }
  }

  // Don't override Content-Type if body is FormData (browser will set it with boundary)
  const headers: HeadersInit = {
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  // Remove Content-Type if body is FormData
  if (options.body instanceof FormData && headers) {
    delete (headers as Record<string, string>)["Content-Type"];
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // Include cookies for refresh token
  });

  // If 401 Unauthorized, try to refresh token
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();

      // Prepare retry headers
      const retryHeaders: HeadersInit = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      // Remove Content-Type if body is FormData
      if (options.body instanceof FormData && retryHeaders) {
        delete (retryHeaders as Record<string, string>)["Content-Type"];
      }

      // Retry original request with new token
      return fetch(url, {
        ...options,
        headers: retryHeaders,
        credentials: "include",
      });
    } catch {
      throw new Error("Session expired. Please login again.");
    }
  }

  return response;
}

/**
 * Type-safe fetchWithAuth wrapper for JSON responses
 */
export async function fetchJsonWithAuth<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetchWithAuth(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "Request failed",
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}
