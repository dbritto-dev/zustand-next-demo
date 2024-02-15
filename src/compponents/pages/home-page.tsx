"use client";

import { useCounterStore } from "@/providers/counter-store-provider";

export const HomePage = () => {
  const { count, incrementCount, decrementCount } = useCounterStore();

  return (
    <div>
      Count: {count}
      <hr />
      <button type="button" onClick={() => void incrementCount()}>
        Increment Count
      </button>
      <button type="button" onClick={() => void decrementCount()}>
        Decrement Count
      </button>
    </div>
  );
};
