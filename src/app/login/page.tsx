"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/contexts";
import { LoginForm } from "@/features/auth";
import type { LoginRequest } from "@/features/auth";
import { AuthStatus } from "@/shared/types";

export default function LoginPage() {
  const { login, status } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === AuthStatus.Authenticated) {
      router.push("/restaurants");
    }
  }, [status, router]);

  const handleLogin = async (data: LoginRequest) => {
    setError("");
    setIsLoading(true);

    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (status === AuthStatus.Loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === AuthStatus.Authenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
