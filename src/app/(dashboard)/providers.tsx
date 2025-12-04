"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/shared/contexts";
import { StoreProvider } from "@/lib/store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </StoreProvider>
  );
}
