"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

import {
  type CounterStore,
  createCounterStore,
  initCounterStore,
} from "@/stores/counter-store";

export const CounterStoreContext = createContext<StoreApi<CounterStore> | null>(
  null
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CounterStore>>();
  if (!storeRef.current) {
    storeRef.current = createCounterStore(initCounterStore());
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const identitySelector = <T,>(store: CounterStore) => store as T;

export const useCounterStore = <T = CounterStore,>(
  selector = identitySelector<T>
): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStoreWithEqualityFn(counterStoreContext, selector);
};
