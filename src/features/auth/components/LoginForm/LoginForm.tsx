"use client";

import { useState, type FormEvent } from "react";
import { Button, Card, Input, Label, Text } from "@/shared";
import { ButtonVariant, ButtonSize, TextSize, TextWeight } from "@/shared/types";
import { LoginRequest } from "../../types/LoginRequest";
import { LoginFormProps } from "./types";

export function LoginForm({ onSubmit, isLoading = false, error }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!formData.email || !formData.password) {
      setValidationError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError("Please enter a valid email address");
      return;
    }

    try {
      await onSubmit(formData);
    } catch {
    }
  };

  return (
    <Card className="w-full max-w-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-2">
          <Text 
            size={TextSize.ThreeExtraLarge} 
            weight={TextWeight.Bold}
          >
            Welcome Back
          </Text>
          <Text size={TextSize.Small} className="text-gray-600">
            Sign in to your account to continue
          </Text>
        </div>

        {(error || validationError) && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
            {error || validationError}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" required>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant={ButtonVariant.Primary}
          size={ButtonSize.Medium}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Card>
  );
}
