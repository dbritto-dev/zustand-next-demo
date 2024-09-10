"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { useStore } from "zustand";

import { createCounterStore, initCounterStore } from "@/stores/counter-store";

export const CounterStoreContext = createContext<ReturnType<
  typeof createCounterStore
> | null>(null);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const [counterStore] = useState(() => createCounterStore(initCounterStore()));

  return (
    <CounterStoreContext.Provider value={counterStore}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useCounterStore = <T,>(
  selector: (
    state: ReturnType<ReturnType<typeof createCounterStore>["getState"]>
  ) => T
) => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error("useCounterStore must be use within CounterStoreProvider");
  }

  return useStore(counterStoreContext, selector);
};
