"use client";

import { useCallback, useSyncExternalStore } from "react";

const noop = () => {};

export function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") {
        return noop;
      }

      const mediaQuery = window.matchMedia(query);
      const handleChange = () => onStoreChange();

      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handleChange);
        return () => {
          mediaQuery.removeEventListener("change", handleChange);
        };
      }

      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
