"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./store";
import { DataService } from "@/lib/services";

export function StoreProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // Initialize DataService with store instance
    DataService.setStore(storeRef.current);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
