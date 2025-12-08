"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  type AuthContextValue,
  type User,
  type LoginCredentials,
  type RestaurantAuthInfo,
  AuthStatus,
  UserRole,
} from "@/shared/types";
import { authApi } from "@/lib/services";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

let globalAccessToken: string | null = null;

export const setGlobalAccessToken = (token: string | null): void => {
  globalAccessToken = token;
};

export const getGlobalAccessToken = (): string | null => {
  return globalAccessToken;
};

const normalizeUser = (rawUser: unknown): User => {
  const parsed = rawUser as Partial<User> & Record<string, unknown>;
  const normalizedRole = ((parsed.role as string) || "").toUpperCase() as UserRole;
  const safeRole = Object.values(UserRole).includes(normalizedRole)
    ? normalizedRole
    : UserRole.RestaurantAdmin;

  const restaurantId =
    (parsed.restaurantId as string)?.toString() ||
    (parsed.id as string)?.toString() ||
    "";

  return {
    id: (parsed.id as string)?.toString() || "",
    email: (parsed.email as string) || "",
    name: (parsed.name as string) || "",
    role: safeRole,
    restaurantId,
    token: parsed.token as string | undefined,
  };
};

const normalizeRestaurant = (rawRestaurant: unknown): RestaurantAuthInfo | null => {
  if (!rawRestaurant || typeof rawRestaurant !== "object") return null;
  const parsed = rawRestaurant as Partial<RestaurantAuthInfo> & Record<string, unknown>;
  const id = parsed.id !== undefined ? String(parsed.id) : undefined;

  if (!id) return null;

  return {
    id,
    name: (parsed.name as string) || "",
    nameEn: parsed.nameEn as string | undefined,
    nameFr: parsed.nameFr as string | undefined,
    nameAr: parsed.nameAr as string | undefined,
    description: parsed.description as string | undefined,
    descriptionEn: parsed.descriptionEn as string | undefined,
    descriptionFr: parsed.descriptionFr as string | undefined,
    descriptionAr: parsed.descriptionAr as string | undefined,
    rating: typeof parsed.rating === "number" ? parsed.rating : undefined,
    imageUrl: parsed.imageUrl as string | undefined,
    iconUrl: parsed.iconUrl as string | undefined,
    images: (parsed.images as string[]) || null,
    address: parsed.address as string | undefined,
    manuallyClosed: parsed.manuallyClosed as boolean | undefined,
    sponsored: parsed.sponsored as boolean | undefined,
    phone: parsed.phone as string | undefined,
    licenseNumber: parsed.licenseNumber as string | undefined,
    taxId: parsed.taxId as string | undefined,
    latitude: typeof parsed.latitude === "number" ? parsed.latitude : undefined,
    longitude: typeof parsed.longitude === "number" ? parsed.longitude : undefined,
  };
};

export interface AuthProviderProps {
  readonly children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantAuthInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Loading);
  const router = useRouter();

  useEffect(() => {
    setGlobalAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedRestaurant = localStorage.getItem("restaurant");
      
      // Always try to refresh token on app load
      try {
        const newAccessToken = await authApi.refresh();
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(normalizeUser(parsedUser));
        } else {
          setUser(null);
        }

        if (storedRestaurant) {
          const parsedRestaurant = JSON.parse(storedRestaurant);
          setRestaurant(normalizeRestaurant(parsedRestaurant));
        } else {
          setRestaurant(null);
        }
        
        setAccessToken(newAccessToken);
        setStatus(AuthStatus.Authenticated);
        // Clear any stored token from localStorage after refresh
        localStorage.removeItem("accessToken");
      } catch {
        // Refresh failed, check for stored credentials as fallback
        const storedToken = localStorage.getItem("accessToken");
        
        if (storedUser && storedToken) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(normalizeUser(parsedUser));
            if (storedRestaurant) {
              const parsedRestaurant = JSON.parse(storedRestaurant);
              setRestaurant(normalizeRestaurant(parsedRestaurant));
            }
            setAccessToken(storedToken);
            setStatus(AuthStatus.Authenticated);
            localStorage.removeItem("accessToken");
          } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("restaurant");
            localStorage.removeItem("refreshToken");
            setStatus(AuthStatus.Unauthenticated);
          }
        } else {
          localStorage.removeItem("refreshToken");
          setStatus(AuthStatus.Unauthenticated);
        }
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await authApi.login(credentials);

      const normalizedRole =
        (response.user.role?.toUpperCase() as UserRole) || UserRole.RestaurantAdmin;
      const restaurantData = normalizeRestaurant(response.restaurant);
      const restaurantId =
        restaurantData?.id ||
        response.user.restaurantId?.toString() ||
        response.user.id?.toString() ||
        "";

      const userData: User = {
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.name,
        role: normalizedRole,
        restaurantId,
      };

      setUser(userData);
      setRestaurant(restaurantData);
      setAccessToken(response.accessToken);
      setStatus(AuthStatus.Authenticated);
      localStorage.setItem("user", JSON.stringify(userData));
      if (restaurantData) {
        localStorage.setItem("restaurant", JSON.stringify(restaurantData));
      } else {
        localStorage.removeItem("restaurant");
      }

      router.push("/restaurants");
    } catch {}
  }, [router]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      setUser(null);
      setRestaurant(null);
      setAccessToken(null);
      setStatus(AuthStatus.Unauthenticated);
      localStorage.removeItem("user");
      localStorage.removeItem("restaurant");
      router.push("/login");
    }
  }, [router]);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      restaurant,
      status,
      login,
      logout,
      isAuthenticated: status === AuthStatus.Authenticated,
      isLoading: status === AuthStatus.Loading,
    }),
    [user, restaurant, status, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
