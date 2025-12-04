import type { LoginCredentials } from "@/shared/types";
import type { AuthResponse } from "@/features/auth/types/AuthResponse";

interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
}

/**
 * Authentication API service using proxied endpoints
 * Handles login, logout, and token refresh with automatic cookie management
 */
export const authApi = {
  /**
   * Login with email and password
   * Cookies (refreshToken) are automatically set by the backend via Set-Cookie header
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // CRITICAL: enables cookie handling
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error: ApiResponse<never> = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data: AuthResponse = await response.json();

    // Store access token in localStorage
    if (globalThis.window !== undefined) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    return data;
  },

  /**
   * Logout user and clear tokens
   * Removes refresh token cookie from backend
   */
  logout: async (): Promise<void> => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
      }
    } finally {
      // Always clear local storage
      if (globalThis.window !== undefined) {
        localStorage.removeItem("accessToken");
      }
    }
  },

  /**
   * Refresh access token using refresh token cookie
   * RefreshToken cookie is automatically sent by the browser
   */
  refresh: async (): Promise<string> => {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include", // Cookie sent automatically
    });

    if (!response.ok) {
      const error: ApiResponse<never> = await response.json();
      throw new Error(error.message || "Token refresh failed");
    }

    const data: AuthResponse = await response.json();

    // Update access token in localStorage
    if (globalThis.window !== undefined) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    return data.accessToken;
  },
};
